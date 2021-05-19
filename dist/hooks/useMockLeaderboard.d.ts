import { User } from "../types";
export declare const usersID: string[];
export declare const mockUsers: User[];
export declare const useMockLeaderboard: (enable?: boolean, initMockList?: boolean, stable?: boolean, limit?: number) => {
    readonly leaderboard: User[];
};
export default useMockLeaderboard;
