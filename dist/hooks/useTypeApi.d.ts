import { User } from '../types';
export declare type APIType = {
    /** staging site container ID */
    sta: string;
    /** production site container ID */
    prod: string;
};
/**
 * 取得 container 資料<br />
 * @param apiList APIType
 * @param method HTTP Method
 * @param realTime Request 自動重發更新間隔時間(ms), ex: 1000為一秒發送一次
 * @param initialData leaderboard 起始資料, 如果有1個containerID => [[]], 2個=> [[],[]]
 * @param opt limit: 一次取得多少筆資料<br />cursor: 上次資料的 offset, ex: 1627489719629532322:23:6:10-yCUQM_rqdi3kW6tu8p2uBgMcIJY=
 * @returns 取得 Container Leaderboard 資料以及 Loading 狀態
 */
export declare const useTypeApi: (apiList: APIType[] | undefined, method: string | undefined, realTime: number, initialData?: User[][] | undefined, opt?: {
    limit: number;
    cursor: string;
}) => {
    loading: boolean;
    polling: boolean;
    requestError: null;
    leaderboardData: User[][] | undefined;
};
export default useTypeApi;
