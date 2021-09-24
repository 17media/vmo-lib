import { User } from '../types';
/**
 * @TODO isCache, isVote, firstRender, needBonus, 以及預設行為 getLeaderboard 目前不常使用，未完整驗證<br />
 * getLeaderboard, getLeaderboardCache, getLeaderboardVote 這三個 service 目前不常使用，未完整驗證，且未將檔案移植<br />
 * 之後驗證完成後將功能逐步釋出
 */
export declare type APIType = {
    /** staging site container ID */
    sta: string;
    /** production site container ID */
    prod: string;
    /** 是不是 Leaderboard Eventory 類型 */
    isEventory?: boolean;
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
