import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios, { CancelTokenSource, AxiosResponse } from 'axios';

import { getLeaderboardEventory } from '../service/leaderboardEventory.service';
import {
  CacheStrategy,
  getApiUrlStrategy,
  HttpMethod,
} from '../service/cacheManager.service';
import { User, Option } from '../types';

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
  const [requestError, setRequestError] = useState<any | null>(null);
  const [leaderboardData, setLeaderboardData] = useState(initialData);
  const [cacheData, setCacheData] = useState<User[][]>(apiList.map(() => []));
  const [networkData, setNetworkData] = useState<User[][]>(
    apiList.map(() => []),
  );
  const [suspend, setSuspend] = useState(false);
  const [reload, setReload] = useState(false);
  const [options, setOptions] = useState<Option[]>(
    apiList.map(() => ({
      limit: opt.limit,
      cursor: opt.cursor,
      withoutOnliveInfo: opt.withoutOnliveInfo,
    })),
  );

  const timeoutKey = useRef(0);
  const source = useRef<CancelTokenSource[]>(
    apiList.map(() => axios.CancelToken.source()),
  );
  const isFirstInitRef = useRef(true);
  const isFirstInitErrorRef = useRef(false);
  const shouldDelayRef = useRef(false);
  const hasInitCacheRef = useRef(false);
  const loadingRef = useRef(false);
  const pollingRef = useRef(false);
  const finishedGetLBProcessRef = useRef(false);
  const reacquireCount = useRef(0);

  const { cacheStrategy } = useMemo(
    () => getApiUrlStrategy(endpoint, HttpMethod.GET),
    [],
  );

  const getLeaderboardData = useCallback(
    async (apis: APIType[] = [], strategy: CacheStrategy) => {
      setRequestError(null);

      let requestApiIndex: number[] = [];
      const apiPromiseList = apis
        .map((type: APIType, index) => {
          /**
           * 有3種情況會有下一次的 api promise
           * 1. 第一次讀取
           * 2. 還未讀取完成，有回傳cursor
           * 3. 重複讀取(realTime >0): 不管上次回傳結果為何，都需要再一次的使用同一次api promise
           * 其他情況都不需要api promise，回傳null，最後會filter掉
           * */
          if (
            isFirstInitRef.current ||
            options[index]?.cursor ||
            realTime > 0
          ) {
            requestApiIndex = [...requestApiIndex, index];
            return getLeaderboardEventory({
              type,
              cancelToken: source.current[index]!.token,
              limit: options[index]?.limit,
              cursor: options[index]?.cursor,
              withoutOnliveInfo: options[index]?.withoutOnliveInfo,
              strategy,
            });
          }
          return null;
        })
        .filter(Boolean);

      if (apiPromiseList.length > 0) {
        finishedGetLBProcessRef.current = false;

        if (isFirstInitRef.current) {
          loadingRef.current = true;
        } else {
          pollingRef.current = true;
        }
        let nextOptions: Option[] = [];
        try {
          const results = await Promise.all(apiPromiseList);

          if (cacheStrategy === CacheStrategy.CACHE_THEN_NETWORK) {
            /**
             * 首筆資料一定是先使用 cache，之後的資料是看 callbackResponses 回應模式
             * */
            setCacheData(pre =>
              pre.map((preResult, index) => {
                const findIndex = requestApiIndex.findIndex(i => i === index);
                if (findIndex >= 0 && results[findIndex].data?.data?.data) {
                  hasInitCacheRef.current = true;
                  const nextCache = [...results[findIndex].data.data.data];
                  return [...preResult, ...nextCache];
                }
                return [];
              }),
            );

            if (isFirstInitRef.current && hasInitCacheRef.current) {
              loadingRef.current = false;
            }

            // 如果需要 delay 下一次的 request，且不是一開始就斷網，執行 delay
            if (!isFirstInitErrorRef.current && shouldDelayRef.current) {
              await sleep(1000);
              setReload(false);
            }

            const networkCallbacks = results.map(result => result.callback);
            const callbackResponses = await Promise.all(networkCallbacks);

            // 紀錄是否一開始就斷網, 只要其中一個出錯就當作全部有問題
            const callbacksError = callbackResponses.some(
              callbackRes => callbackRes.error,
            );
            if (callbacksError && isFirstInitRef.current) {
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
             * 如果有其中一個api error沒有回傳data，就完全不更新資料，等到下一次callback成功才更新
             * */
            const callbacksData = callbackResponses.filter(
              callbackRes => callbackRes.data,
            );
            if (
              callbacksData.length === apiList.length &&
              !isFirstInitErrorRef.current
            ) {
              setNetworkData(pre =>
                pre.map((preResult, index) => {
                  const findIndex = requestApiIndex.findIndex(i => i === index);
                  if (
                    findIndex >= 0 &&
                    callbackResponses[findIndex].data?.data?.data
                  ) {
                    const nextData = [
                      ...callbackResponses[findIndex].data.data.data,
                    ];
                    return [...preResult, ...nextData];
                  }
                  return [];
                }),
              );
            }

            /**
             * 一開始就斷網: 立即顯示 cache data(all) 全部，只有一開始就斷網會使用 cache 剩餘的資料
             * 讀到一半斷網雖然也會回傳 callbackResponses?.error，但不是一開始就斷網，所以不會set cache data，會一直重新觸發load()
             * */
            if (isFirstInitErrorRef.current) {
              setNetworkData(pre =>
                pre.map((preResult, index) => {
                  const findIndex = requestApiIndex.findIndex(i => i === index);
                  if (
                    findIndex >= 0 &&
                    callbackResponses[findIndex].cache?.data?.data
                  ) {
                    const nextCache = [
                      ...callbackResponses[findIndex].cache.data.data,
                    ];
                    return [...preResult, ...nextCache];
                  }
                  return [];
                }),
              );
            }

            nextOptions = options.map((option, index) => {
              const findIndex = requestApiIndex.findIndex(i => i === index);
              if (findIndex >= 0) {
                const cursor = isFirstInitErrorRef.current
                  ? callbackResponses[findIndex].cache.data.nextCursor
                  : callbackResponses[findIndex].data.data.nextCursor;

                return {
                  limit: opt.limit,
                  cursor,
                  withoutOnliveInfo: opt.withoutOnliveInfo,
                };
              }
              return option;
            });
          } else {
            setLeaderboardData(results.map(result => result.data.data.data));
          }
        } catch (error) {
          setRequestError(error);
        } finally {
          loadingRef.current = false;
          pollingRef.current = false;
          isFirstInitRef.current = false;
          if (isFirstInitErrorRef.current || !shouldDelayRef.current) {
            setOptions(nextOptions);
          }
          finishedGetLBProcessRef.current = true;
        }
      }
    },
    [
      apiList.length,
      cacheStrategy,
      opt.limit,
      opt.withoutOnliveInfo,
      options,
      realTime,
    ],
  );

  const refresh = useCallback(() => {
    setCacheData(apiList.map(() => []));
    setNetworkData(apiList.map(() => []));
    getLeaderboardData(apiList, cacheStrategy);
  }, [apiList, cacheStrategy, getLeaderboardData]);

  /**
   * 讀到一半斷網：重新執行 geLeaderboardData
   * */
  useEffect(() => {
    if (reload) {
      getLeaderboardData(apiList, cacheStrategy);
    }
  }, [apiList, cacheStrategy, getLeaderboardData, reload]);

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

  // 計數每次重新取得全部資料
  useEffect(() => {
    const finishedRetrievedAllNetworkData = networkData?.every(
      (data, index) => {
        // 需要確保option已經被設定完成
        if (finishedGetLBProcessRef.current) {
          const cursor = options[index]?.cursor;
          // 有cursor時，看回傳的network資料長度是不是已經達到total count，達到代表以經將此次的資料讀取完成
          if (cursor) {
            const [timestampCursor] = (cursor as string).split('-', 1);
            const totalCount = timestampCursor.split(':').slice(1)[0];
            return networkData[index].length === +totalCount;
          }
          // 沒有cursor時，表示單次api就可以取得完成，直接回傳true
          return true;
        }
        return false;
      },
    );
    if (finishedRetrievedAllNetworkData && networkData.length > 0)
      reacquireCount.current += 1;
  }, [networkData, options]);

  useEffect(() => {
    const canSetNetworkData = networkData.some(data => data.length > 0);

    // 全部資料只取1次(不需自動重發api更新資料)
    if (realTime <= 0) {
      if (canSetNetworkData) {
        setLeaderboardData(networkData);
      } else {
        setLeaderboardData(cacheData);
      }
    } else {
      // 全部資料按時間重新取得(需自動重發api更新資料)
      const finishedAll = options.every(option => !option.cursor);
      // 當首次還未取得全部資料時，讓資料慢慢更新上畫面
      if (reacquireCount.current === 0) {
        if (canSetNetworkData) {
          setLeaderboardData(networkData);
        } else {
          setLeaderboardData(cacheData);
        }
      }
      // 當已經取得全部資料時，等資料全部拿完之後再一起更新
      if (
        reacquireCount.current > 0 &&
        finishedAll &&
        finishedGetLBProcessRef.current &&
        canSetNetworkData
      ) {
        setLeaderboardData(networkData);
      }
    }
  }, [networkData, cacheData, options, realTime, apiList]);

  // init getLeaderboardData
  useEffect(() => {
    getLeaderboardData(apiList, cacheStrategy);
  }, []);

  // 當需要取得更多資料時，使用最新的options重新執行getLeaderboardData
  useEffect(() => {
    if (loadingRef.current || pollingRef.current || suspend) return;
    const hasMore = options.find(option => option.cursor);
    if (hasMore) {
      getLeaderboardData(apiList, cacheStrategy);
    }
  }, [options, apiList, cacheStrategy, getLeaderboardData, suspend]);

  // 重複取得LB資料
  useEffect(() => {
    if (loadingRef.current || pollingRef.current || suspend) return;
    if (!pollingRef.current && realTime > 0) {
      if (timeoutKey.current) clearTimeout(timeoutKey.current);
      timeoutKey.current = window.setTimeout(refresh, realTime);
    }
  }, [
    apiList,
    cacheStrategy,
    getLeaderboardData,
    realTime,
    suspend,
    options,
    refresh,
  ]);

  return {
    loading: loadingRef.current,
    polling: pollingRef.current,
    requestError,
    leaderboardData,
  };
};

export default useTypeApi;
