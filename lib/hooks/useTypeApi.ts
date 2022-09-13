import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios, { CancelTokenSource, AxiosResponse } from 'axios';

import { getLeaderboardEventory } from '../service/leaderboardEventory.service';
import {
  CacheStrategy,
  getApiUrlStrategy,
  HttpMethod,
} from '../service/cacheManager.service';
import { User } from '../types';

const endpoint = `/v1/leaderboards/eventory`;

export type APIType = {
  /** staging site container ID */
  sta: string;

  /** production site container ID */
  prod: string;
};

/**
 * 取得 container 資料<br />
 * @param apiList APIType
 * @param method HTTP Method, Legacy 可棄用
 * @param realTime Request 自動重發更新間隔時間(ms), ex: 1000為一秒發送一次
 * @param initialData leaderboard 起始資料, 如果有1個containerID => [[]], 2個=> [[],[]]
 * @param opt limit: 一次取得多少筆資料<br />cursor: 上次資料的 offset, ex: 1627489719629532322:23:6:10-yCUQM_rqdi3kW6tu8p2uBgMcIJY=<br />withoutOnliveInfo: 是否取得 onliveInfo
 *
 * @returns 取得 Container Leaderboard 資料以及 Loading 狀態
 */

export const useTypeApi = (
  apiList: APIType[] = [],
  method = 'GET',
  realTime: number,
  initialData?: User[][],
  opt = {
    limit: 1000,
    cursor: '',
    withoutOnliveInfo: false,
  },
) => {
  const timeoutKey = useRef(0);
  const timeoutKeyForFetch = useRef(0);
  const source = useRef<CancelTokenSource>(axios.CancelToken.source());
  const firstInit = useRef(true);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [requestError, setRequestError] = useState<any | null>(null);
  const [leaderboardData, setLeaderboardData] = useState(initialData);
  const [suspend, setSuspend] = useState(false);
  const { cacheStrategy } = useMemo(
    () => getApiUrlStrategy(endpoint, HttpMethod.GET),
    [],
  );

  const getDataRealTimeAPI = useCallback(
    (apis: APIType[] = [], strategy: CacheStrategy) =>
      async () => {
        setRequestError(null);
        if (firstInit.current) {
          setLoading(true);
        } else {
          setPolling(true);
        }
        const apiPromiseList = apis.map((type: APIType) =>
          getLeaderboardEventory({
            type,
            cancelToken: source.current!.token,
            limit: opt.limit,
            cursor: opt.cursor,
            withoutOnliveInfo: opt.withoutOnliveInfo,
            strategy,
          }),
        );

        try {
          const results = await Promise.all(apiPromiseList);
          setLeaderboardData(results);
        } catch (error) {
          setRequestError(error);
        } finally {
          if (firstInit.current) {
            setLoading(false);
          } else {
            setPolling(false);
          }
          firstInit.current = false;
        }
      },
    [opt.cursor, opt.limit, opt.withoutOnliveInfo],
  );

  const handleCacheStrategy = useCallback(() => {
    if (cacheStrategy !== CacheStrategy.CACHE_THEN_NETWORK) {
      const cacheStrategyFn = getDataRealTimeAPI(apiList, cacheStrategy);
      cacheStrategyFn();
    }
    if (cacheStrategy === CacheStrategy.CACHE_THEN_NETWORK) {
      const cacheOnlyFn = getDataRealTimeAPI(apiList, CacheStrategy.CACHE_ONLY);
      const networkThenSetCacheFn = getDataRealTimeAPI(
        apiList,
        CacheStrategy.NETWORK_THEN_SET_CACHE,
      );
      cacheOnlyFn();
      networkThenSetCacheFn();
    }
  }, [apiList, cacheStrategy, getDataRealTimeAPI]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setSuspend(true);
      } else {
        setSuspend(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 取得LB資料
  useEffect(() => {
    if (suspend) return;
    if (loading) return;
    if (polling) return;
    // 第一次取得LB資料
    if (!loading && firstInit.current) {
      handleCacheStrategy();
    }

    // 重複取得LB資料
    if (!polling && realTime > 0) {
      if (timeoutKey.current) clearTimeout(timeoutKey.current);
      timeoutKey.current = window.setTimeout(handleCacheStrategy, realTime);
    }
  }, [
    apiList,
    cacheStrategy,
    getDataRealTimeAPI,
    handleCacheStrategy,
    loading,
    polling,
    realTime,
    suspend,
  ]);

  return { loading, polling, requestError, leaderboardData };
};

export default useTypeApi;
