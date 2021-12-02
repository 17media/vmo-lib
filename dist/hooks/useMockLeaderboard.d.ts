import { User } from '../types';
export declare const usersID: string[];
export declare const mockUsers: User[];
/**
 * 測試用 leaderboard 資料
 * @param enable 開啟
 * @param initMockList 初始化榜單
 * @param stable 是否固定還是要持續增加 user
 * @param limit 最多幾名 users
 */
export declare const useMockLeaderboard: (enable?: boolean, initMockList?: boolean, stable?: boolean, limit?: number) => {
    readonly leaderboard: User[];
};
export default useMockLeaderboard;
