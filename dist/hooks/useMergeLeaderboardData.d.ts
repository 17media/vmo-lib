import { User } from "../types";
export interface LeaderboardDataList {
    data: User[];
    bonus: User[];
    blackList: User[];
}
export declare const useMergeLeaderboardData: ({ data, bonus, blackList, }: LeaderboardDataList) => {
    bonus: number;
    meta: Record<string, number>;
    rank: number;
    score: number;
    userInfo: {
        displayName: string;
        gloryroadMode: number;
        level: number;
        name: string;
        openID: string;
        picture: string;
        region: string;
        userID: string;
    };
}[];
export default useMergeLeaderboardData;
