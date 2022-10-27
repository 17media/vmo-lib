import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios, { CancelTokenSource } from 'axios';

import { getLeaderboardEventory } from '../service/leaderboardEventory.service';
import {
  CacheStrategy,
  getApiUrlStrategy,
  HttpMethod,
} from '../service/cacheManager.service';
import { User, EventoryApiOption } from '../types';
import { sleep } from '../utils';

const endpoint = `/v1/leaderboards/eventory`;

interface Config {
  cacheData: User[][];
  networkData: User[][];
  options: EventoryApiOption[];
  sources: CancelTokenSource[];
}

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
  const [suspend, setSuspend] = useState(false);
  const [reload, setReload] = useState(false);
  const timeoutKey = useRef(0);
  const { limit, cursor, withoutOnliveInfo } = opt;
  const initialConfig: Config = useMemo(
    () => ({
      cacheData: [],
      networkData: [],
      options: [],
      sources: [],
    }),
    [],
  );
  if (initialConfig.options.length !== apiList.length) {
    apiList.forEach(() => {
      initialConfig.cacheData = [...initialConfig.cacheData, []];
      initialConfig.networkData = [...initialConfig.networkData, []];
      initialConfig.options = [
        ...initialConfig.options,
        {
          limit,
          cursor,
          withoutOnliveInfo,
        },
      ];
      initialConfig.sources = [
        ...initialConfig.sources,
        axios.CancelToken.source(),
      ];
    });
  }

  const [cacheData, setCacheData] = useState<User[][]>(initialConfig.cacheData);
  const [networkData, setNetworkData] = useState<User[][]>(
    initialConfig.networkData,
  );
  const [options, setOptions] = useState<EventoryApiOption[]>(
    initialConfig.options,
  );
  const sourceRef = useRef<CancelTokenSource[]>(initialConfig.sources);

  const isFirstInitRef = useRef(true);
  const isFirstInitErrorRef = useRef(false);
  const shouldDelayRef = useRef(false);
  const hasInitCacheRef = useRef(false);
  const loadingRef = useRef(false);
  const pollingRef = useRef(false);
  const finishedGetLBProcessRef = useRef(false);
  const reacquireCountRef = useRef(0);

  const { cacheStrategy } = useMemo(
    () => getApiUrlStrategy(endpoint, HttpMethod.GET),
    [],
  );

  const getLeaderboardData = useCallback(
    async (apis: APIType[] = [], strategy: CacheStrategy) => {
      setRequestError(null);

      const apiPromiseList = apis
        .map((type: APIType, index) => {
          /**
           * 有 2 種情況會有下一次的 api promise
           * 1. 第一次讀取 (包含因為 realtime > 0 refresh() 時 first load 重設)
           * 2. 還未讀取完成，有回傳cursor
           * 其他情況都不需要api promise，回傳null，最後會filter掉
           * */
          if (isFirstInitRef.current || options[index]?.cursor) {
            return getLeaderboardEventory({
              type,
              cancelToken: sourceRef.current[index]!.token,
              limit: options[index]?.limit,
              cursor: options[index]?.cursor,
              withoutOnliveInfo: options[index]?.withoutOnliveInfo,
              strategy,
            });
          }
          return null;
        })
        .filter(Boolean);

      const requestApiIndex = apis
        .map((_, index) => {
          if (isFirstInitRef.current || options[index]?.cursor) {
            return index;
          }
          return null;
        })
        .filter(Number.isFinite);

      if (!apiPromiseList.length) return;
      finishedGetLBProcessRef.current = false;
      loadingRef.current =
        isFirstInitRef.current && reacquireCountRef.current < 1;
      pollingRef.current = true;

      let nextOptions: EventoryApiOption[] = [];
      try {
        const results = await Promise.all(apiPromiseList);

        if (cacheStrategy !== CacheStrategy.CACHE_THEN_NETWORK) {
          setLeaderboardData(results.map(result => result.data.data));
          return;
        }

        /**
         * CacheStrategy === CACHE_THEN_NETWORK
         * 首筆資料一定是先使用 cache，之後的資料是看 callbackResponses 回應模式
         * */
        setCacheData(pre => {
          const newData = pre.map((preResult, index) => {
            const foundIndex = requestApiIndex.findIndex(
              targetIndex => index === targetIndex,
            );
            if (
              foundIndex >= 0 &&
              results[foundIndex].data?.data?.data &&
              preResult
            ) {
              hasInitCacheRef.current = true;
              const nextCache = [...results[foundIndex].data.data.data];
              return [...preResult, ...nextCache];
            }
            return preResult;
          });
          return newData;
        });

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
         * 理想情況：dataSource = 'data'
         * 一開始立即顯示 cache data(100筆), 然後 network api 每一百筆更新畫面一次, 整個取代
         * 讀到一半斷網：同理想情況, api 沒回來就不處理 例如顯示到500筆就是500筆
         * 如果有其中一個api error沒有回傳data，就完全不更新資料，等到下一次callback成功才更新
         *
         * 一開始就斷網: dataSource = 'cache'
         * 立即顯示 cache data(all) 全部，只有一開始就斷網會使用 cache 剩餘的資料
         * 讀到一半斷網雖然也會回傳 callbackResponses?.error，但不是一開始就斷網，所以不會set cache data，會一直重新觸發load()
         * */
        const dataSource = isFirstInitErrorRef.current ? 'cache' : 'data';
        setNetworkData(pre => {
          const newData = pre.map((preResult, index) => {
            const foundIndex = requestApiIndex.findIndex(
              targetIndex => index === targetIndex,
            );
            if (
              foundIndex >= 0 &&
              callbackResponses[foundIndex][dataSource]?.data?.data &&
              preResult
            ) {
              const nextData = [
                ...callbackResponses[foundIndex][dataSource]?.data.data,
              ];
              return [...preResult, ...nextData];
            }
            return preResult;
          });
          return newData;
        });

        nextOptions = options.map((option, index) => {
          const foundIndex = requestApiIndex.findIndex(
            targetIndex => index === targetIndex,
          );
          if (foundIndex >= 0) {
            const nextCursor = isFirstInitErrorRef.current
              ? callbackResponses[foundIndex].cache.data.nextCursor
              : callbackResponses[foundIndex].data.data.nextCursor;

            return {
              limit: opt.limit,
              cursor: nextCursor,
              withoutOnliveInfo: opt.withoutOnliveInfo,
            };
          }
          return option;
        });
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
    },
    [cacheStrategy, opt.limit, opt.withoutOnliveInfo, options],
  );

  const getLeaderboardDataStrategy = useCallback(
    () => getLeaderboardData(apiList, cacheStrategy),
    [apiList, cacheStrategy, getLeaderboardData],
  );

  const refresh = useCallback(() => {
    setCacheData(initialConfig.cacheData);
    setNetworkData(initialConfig.networkData);
    isFirstInitRef.current = true;
    isFirstInitErrorRef.current = false;
    getLeaderboardDataStrategy();
  }, [getLeaderboardDataStrategy, initialConfig]);

  /**
   * 讀到一半斷網：重新執行 geLeaderboardData
   * */
  useEffect(() => {
    if (reload) {
      getLeaderboardDataStrategy();
    }
  }, [
    apiList,
    cacheStrategy,
    getLeaderboardData,
    getLeaderboardDataStrategy,
    reload,
  ]);

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
        if (!finishedGetLBProcessRef.current) return false;
        const nextCursor = options[index]?.cursor;
        // 有cursor時，看回傳的network資料長度是不是已經達到total count，達到代表以經將此次的資料讀取完成
        if (nextCursor) {
          const [timestampCursor] = nextCursor.split('-', 1);
          const totalCount = timestampCursor.split(':').slice(1)[0];
          return networkData[index].length === +totalCount;
        }
        // 沒有cursor時，表示單次api就可以取得完成，直接回傳true
        return true;
      },
    );
    if (finishedRetrievedAllNetworkData && networkData.length > 0) {
      reacquireCountRef.current += 1;
    }
  }, [networkData, options]);

  useEffect(() => {
    if (cacheStrategy === CacheStrategy.CACHE_THEN_NETWORK) {
      const canSetNetworkData = networkData.some(data => data.length > 0);
      const dataSource = canSetNetworkData ? networkData : cacheData;

      // 全部資料只取1次(不需自動重發api更新資料)
      if (realTime <= 0) {
        setLeaderboardData(dataSource);
        return;
      }
      // 全部資料按時間重新取得(需自動重發api更新資料)
      const finishedAll = options.every(option => !option.cursor);
      // 當首次還未取得全部資料時，讓資料慢慢更新上畫面
      if (reacquireCountRef.current === 0) {
        setLeaderboardData(dataSource);
      } else if (reacquireCountRef.current > 0) {
        // 當已經取得全部資料時，等資料全部拿完之後再一起更新
        if (finishedAll && finishedGetLBProcessRef.current && canSetNetworkData)
          setLeaderboardData(networkData);
      }
    }
  }, [networkData, cacheData, options, realTime, apiList, cacheStrategy]);

  useEffect(() => {
    if (loadingRef.current || pollingRef.current || suspend) return;

    // init getLeaderboardData
    if (isFirstInitRef.current) {
      getLeaderboardDataStrategy();
      return;
    }

    // 當需要取得更多資料時，使用最新的options重新執行getLeaderboardData
    const hasMore = options.find(option => option.cursor);
    if (hasMore) {
      getLeaderboardDataStrategy();
    }

    // 重複取得LB資料
    if (!pollingRef.current && realTime > 0) {
      if (timeoutKey.current) clearTimeout(timeoutKey.current);
      timeoutKey.current = window.setTimeout(refresh, realTime);
    }
  }, [
    options,
    apiList,
    cacheStrategy,
    getLeaderboardData,
    suspend,
    realTime,
    refresh,
    getLeaderboardDataStrategy,
  ]);

  console.log('leaderboardData', leaderboardData);

  return {
    loading: loadingRef.current,
    polling: pollingRef.current,
    requestError,
    leaderboardData,
  };
};

export default useTypeApi;
