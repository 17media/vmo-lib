import { useState, useEffect, useRef, useCallback } from 'react';
import axios, { CancelTokenSource } from 'axios';

import { getLeaderboardEventory } from '../service/leaderboardEventory.service';
import { User } from '../types';

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
  const source = useRef<CancelTokenSource>();
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [requestError, setRequestError] = useState<any | null>(null);
  const [leaderboardData, setLeaderboardData] = useState(initialData);
  const [suspend, setSuspend] = useState(false);

  const getDataRealTimeAPI = useCallback(
    (apis: APIType[] = [], time, previousData) => {
      const pollingProcess = async () => {
        setRequestError(null);
        setPolling(true);

        const apiPromiseList = apis.map((type: APIType) =>
          getLeaderboardEventory({
            type,
            cancelToken: source.current!.token,
            limit: opt.limit,
            cursor: opt.cursor,
            withoutOnliveInfo: opt.withoutOnliveInfo,
          }),
        );

        try {
          const results = await Promise.all(apiPromiseList);
          setLeaderboardData(results);
        } catch (error) {
          setRequestError(error);
        } finally {
          setPolling(false);
        }
      };

      timeoutKey.current = window.setTimeout(pollingProcess, time);
    },
    [opt.cursor, opt.limit, opt.withoutOnliveInfo],
  );

  useEffect(() => {
    const handleVisibilityCange = () => {
      if (document.visibilityState === 'hidden') {
        setSuspend(true);
      } else {
        setSuspend(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityCange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityCange);
    };
  }, []);

  useEffect(() => {
    if (!apiList.length) return;

    async function promiseAll(promiseList: Promise<User[]>[]) {
      setLoading(true);
      setRequestError(null);
      try {
        const results: User[][] = await Promise.all(promiseList);
        setLeaderboardData(results);
      } catch (error) {
        setRequestError(error);
      } finally {
        setLoading(false);
      }
    }

    source.current = axios.CancelToken.source();

    const callback = (item: APIType) => (data: User[]) => {
      setLoading(false);
      const index = apiList.findIndex(value => value.sta === item.sta);
      setLeaderboardData(prev => {
        if (prev) {
          prev[index] = [...data];
          return [...prev];
        }
      });
    };
    const apiPromiseList = apiList.map(type =>
      getLeaderboardEventory({
        type,
        cancelToken: source.current!.token,
        limit: opt.limit,
        cursor: opt.cursor,
        withoutOnliveInfo: opt.withoutOnliveInfo,
        callback: callback(type),
      }),
    );

    promiseAll(apiPromiseList);

    return () => {
      if (source.current) source.current.cancel();
      if (timeoutKey.current) clearTimeout(timeoutKey.current);
    };
  }, [apiList, opt.cursor, opt.limit, opt.withoutOnliveInfo]);

  useEffect(() => {
    if (!polling && realTime > 0) {
      if (suspend) return;

      clearTimeout(timeoutKey.current);
      timeoutKey.current = 0;
      getDataRealTimeAPI(apiList, realTime, leaderboardData);
    }
  }, [
    polling,
    leaderboardData,
    apiList,
    realTime,
    getDataRealTimeAPI,
    suspend,
  ]);

  return { loading, polling, requestError, leaderboardData };
};

export default useTypeApi;
