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

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
  const source = useRef<CancelTokenSource[]>(
    apiList.map(() => axios.CancelToken.source()),
  );
  const isFirstInit = useRef(true);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [requestError, setRequestError] = useState<any | null>(null);
  const [leaderboardData, setLeaderboardData] = useState(initialData);
  const [cacheData, setCacheData] = useState<any[]>([]);
  const [networkData, setNetworkData] = useState<any[]>([]);
  const [suspend, setSuspend] = useState(false);
  const [options, setOptions] = useState<any[]>(
    apiList.map(() => ({
      limit: opt.limit,
      cursor: opt.cursor,
      withoutOnliveInfo: opt.withoutOnliveInfo,
    })),
  );

  const [reload, setReload] = useState(false);

  // const isFirstInit = useRef<boolean[]>(apiList.map(() => true));

  // const isFirstInitErrorRef = useRef<boolean[]>(apiList.map(() => false));

  // const shouldDelayRef = useRef<boolean[]>(apiList.map(() => false));

  // const isFirstInit = useRef(true);

  const isFirstInitErrorRef = useRef(false);

  const shouldDelayRef = useRef(false);

  const { cacheStrategy } = useMemo(
    () => getApiUrlStrategy(endpoint, HttpMethod.GET),
    [],
  );

  const getDataRealTimeAPI = useCallback(
    (apis: APIType[] = [], strategy: CacheStrategy) =>
      async () => {
        setRequestError(null);
        if (isFirstInit.current) {
          setLoading(true);
        } else {
          setPolling(true);
        }
        const apiPromiseList = apis
          .map((type: APIType, index) => {
            if (options[index].noMore) return null;
            return getLeaderboardEventory({
              type,
              cancelToken: source.current[index]!.token,
              limit: options[index].limit,
              cursor: options[index].cursor,
              withoutOnliveInfo: options[index].withoutOnliveInfo,
              strategy,
            });
          })
          .filter(Boolean);

        if (apiPromiseList.length > 0) {
          try {
            const results = await Promise.all(apiPromiseList);

            if (cacheStrategy === CacheStrategy.CACHE_THEN_NETWORK) {
              /**
               * 首筆資料一定是先使用 cache，之後的資料是看 callbackResponses 回應模式
               * */
              setCacheData(pre =>
                results.map((result, index) => {
                  if (pre[index]) {
                    return [...pre[index], ...result.data.data.data];
                  }
                  const nextCache = [...result.data.data.data];
                  return nextCache;
                }),
              );

              if (isFirstInit.current) {
                setLoading(false);
              } else {
                setPolling(false);
              }

              // 如果需要 delay 下一次的 request，且不是一開始就斷網，執行 delay
              if (!isFirstInitErrorRef.current && shouldDelayRef.current) {
                await sleep(1000);
                setReload(false);
              }

              const networkCallbacks = results.map(result => result.callback);
              const callbackResponses = await Promise.all(networkCallbacks);

              // 紀錄是否一開始就斷網
              const callbacksError = callbackResponses.some(
                callbackRes => callbackRes.error,
              );
              if (callbacksError && isFirstInit.current) {
                isFirstInitErrorRef.current = true;
              }

              // 紀錄是否需要 delay 下一次的 request
              shouldDelayRef.current = callbacksError;
              if (!isFirstInitErrorRef.current && shouldDelayRef.current) {
                setReload(true);
              }

              /**
               * 理想情況：一開始立即顯示 cache data(100筆), 然後 network api 每一百筆更新畫面一次, 整個取代
               * 讀到一半斷網：同理想情況, api 沒回來就不處理 例如顯示到500筆就是500筆
               * */
              const callbacksData = callbackResponses.filter(
                callbackRes => callbackRes.data,
              );
              if (
                callbacksData.length === apiList.length &&
                !isFirstInitErrorRef.current
              ) {
                setNetworkData(pre =>
                  callbackResponses.map((callbackRes, index) => {
                    if (pre[index]) {
                      return [...pre[index], ...callbackRes.data.data.data];
                    }
                    const nextCache = [...callbackRes.data.data.data];
                    return nextCache;
                  }),
                );
              }

              /**
               * 一開始就斷網: 立即顯示 cache data(all) 全部，只有一開始就斷網會使用 cache 剩餘的資料
               * 讀到一半斷網雖然也會回傳 callbackResponses?.error，但不是一開始就斷網，所以不會set cache data，會一直重新觸發load()
               * */
              if (isFirstInitErrorRef.current) {
                setNetworkData(pre =>
                  callbackResponses.map((callbackRes, index) => {
                    if (pre[index]) {
                      return [...pre[index], ...callbackRes.cache.data.data];
                    }
                    const nextCache = [...callbackRes.cache.data.data];
                    return nextCache;
                  }),
                );
              }

              const nextOptions = callbackResponses.map(callbackRes => ({
                limit: opt.limit,
                cursor: isFirstInitErrorRef.current
                  ? callbackRes.cache.data.nextCursor
                  : callbackRes.data.data.nextCursor,
                withoutOnliveInfo: opt.withoutOnliveInfo,
                noMore: isFirstInitErrorRef.current
                  ? !callbackRes.cache.data.nextCursor
                  : !callbackRes.data.data.nextCursor,
              }));

              if (isFirstInitErrorRef.current || !shouldDelayRef.current) {
                setOptions(nextOptions);
              }
            } else {
              setLeaderboardData(results.map(result => result.data.data.data));
            }
          } catch (error) {
            setRequestError(error);
          } finally {
            setPolling(false);
            setLoading(false);
            isFirstInit.current = false;
          }
        }
      },
    [opt.cursor, opt.limit, opt.withoutOnliveInfo, options],
  );

  const handleCacheStrategy = useCallback(() => {
    const cacheStrategyFn = getDataRealTimeAPI(apiList, cacheStrategy);
    cacheStrategyFn();
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

  useEffect(() => {
    if (networkData && networkData.length) {
      setLeaderboardData(networkData);
    } else {
      setLeaderboardData(cacheData);
    }
  }, [networkData, cacheData]);

  useEffect(() => {
    if (!polling && !loading) {
      handleCacheStrategy();
      return () => {
        if (polling || loading) cancelAll();
      };
    }
  }, [options]);

  const cancelAll = () => {
    source.current.map(s => s.cancel());
  };

  useEffect(() => {
    if (reload) {
      handleCacheStrategy();
    }
  }, [reload]);

  // 取得LB資料
  useEffect(() => {
    if (suspend) return;
    if (loading) return;
    if (polling) return;
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
    JSON.stringify(options),
  ]);
  return { loading, polling, requestError, leaderboardData };
};

export default useTypeApi;
