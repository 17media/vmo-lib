import { useState, useEffect, useRef, useCallback } from 'react';
import axios, { CancelTokenSource } from 'axios';

import { getLeaderboardEventory } from '../service/leaderboardEventory.service';
import { User } from '../types';

/**
 * @TODO isCache, isVote, firstRender, needBonus, 以及預設行為 getLeaderboard 目前不常使用，未完整驗證<br />
 * getLeaderboard, getLeaderboardCache, getLeaderboardVote 這三個 service 目前不常使用，未完整驗證，且未將檔案移植<br />
 * 之後驗證完成後將功能逐步釋出
 */
export type APIType = {
  /** staging site container ID */
  sta: string;

  /** production site container ID */
  prod: string;

  /** 是不是 Leaderboard Eventory 類型 */
  isEventory?: boolean;

  // isCache?: boolean;
  // isVote?: boolean; 在 vmo-frontend 2108-jp-anniversary4 使用
  // firstRender?: boolean; 在 vmo-frontend 2108-jp-anniversary4 使用
  // needBonus?: boolean; 在 vmo-frontend 2008-tw-star-offline 使用，但無實際用途
};

/**
 * 取得 container 資料<br />
 * 支援取得 eventory 類型資料<br />
 * 不支援取得 cache, vote 類型資料
 * @param apiList APIType
 * @param method HTTP Method
 * @param realTime 等待發 request 的毫秒数(ms), ex: 1000為一秒發送一次
 * @param initialData leaderboard 起始資料
 * @param opt limit: 一次取得多少筆資料<br />cursor: 上次資料的 offset, ex: 1627489719629532322:23:6:10-yCUQM_rqdi3kW6tu8p2uBgMcIJY=
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
  },
) => {
  const timeoutKey = useRef(0);
  const source = useRef<CancelTokenSource>();
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState(initialData);

  const getDataRealTimeAPI = useCallback(
    (apis = [], time, previousData) => {
      timeoutKey.current = window.setTimeout(async () => {
        setRequestError(null);
        setPolling(true);
        const apiArr: Promise<User[]>[] = [];
        apis.forEach((item: APIType) => {
          if (item.isEventory) {
            apiArr.push(
              getLeaderboardEventory(
                item,
                source.current!.token,
                opt.limit,
                opt.cursor,
                method,
              ),
            );
          }
        });
        try {
          const results = await Promise.all(apiArr);
          setLeaderboardData(results);
          setPolling(false);
        } catch (error) {
          setPolling(false);
          setRequestError(error);
        }
      }, time);
    },
    [method, opt.cursor, opt.limit],
  );

  useEffect(() => {
    async function promiseAll(promiseList: any) {
      try {
        const results: User[][] = await Promise.all(promiseList);
        setLeaderboardData(results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setRequestError(error);
      }
    }

    setLoading(true);
    setRequestError(null);
    const promiseList: Promise<User[]>[] = [];
    source.current = axios.CancelToken.source();
    apiList.forEach((item: APIType) => {
      if (item.isEventory) {
        promiseList.push(
          getLeaderboardEventory(
            item,
            source.current!.token,
            opt.limit,
            opt.cursor,
            method,
          ),
        );
      }

      /**
       * @TODO isCache, isVote, firstRender, 以及預設行為 getLeaderboard 目前不常使用，未完整驗證，將其註解掉
       * 之後驗證完成後將功能逐步釋出
       */
      // if (item.isCache) {
      //   promiseList.push(
      //     getLeaderboardCache(
      //       {
      //         sta: item.sta,
      //         prod: item.prod,
      //       },
      //       source.current!.token,
      //     ),
      //   );
      // } else if (item.isVote) {
      //   promiseList.push(
      //     getLeaderboardVote(
      //       {
      //         sta: item.sta,
      //         prod: item.prod,
      //       },
      //       source.current!.token,
      //     ),
      //   );
      // } else if (item.isEventory) {
      //   promiseList.push(
      //     getLeaderboardEventory(
      //       item,
      //       source.current!.token,
      //       opt.limit,
      //       opt.cursor,
      //       method,
      //     ),
      //   );
      // } else {
      //   promiseList.push(
      //     getLeaderboard(
      //       item,
      //       source.current!.token,
      //       opt.limit,
      //       opt.cursor,
      //       method,
      //     ),
      //   );
      // }
    });
    if (apiList && apiList.length > 0 && method) {
      promiseAll(promiseList);
    }

    return () => {
      if (source.current) source.current.cancel();
      if (timeoutKey.current) clearTimeout(timeoutKey.current);
    };
  }, [apiList, method, opt.cursor, opt.limit]);

  useEffect(() => {
    if (!polling && realTime > 0) {
      clearTimeout(timeoutKey.current);
      timeoutKey.current = 0;
      getDataRealTimeAPI(apiList, realTime, leaderboardData);
    }
  }, [polling, leaderboardData, apiList, realTime, getDataRealTimeAPI]);
  return { loading, polling, requestError, leaderboardData };
};

export default useTypeApi;
