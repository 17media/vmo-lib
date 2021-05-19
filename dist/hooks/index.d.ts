export * from "./useCountdown";
export * from "./useItemTransition";
export * from "./useMergeLeaderboardData";
export * from "./usePageData";
declare const _default: {
    useAutoNext: (isEnded: boolean, page: number) => void;
    useCountdown: (start: number, end: number, timeEndText: string) => {
        status: import("./useCountdown").TimeStatus;
        text: string;
    };
    useItemTransition: (itemStyle: import("./useItemTransition").ItemStyle, transition: import("./useItemTransition").TransitionStyle, rowItems: number, currentRank: number | number[]) => {
        itemTransitionStyle: {
            transition: string;
            left: number;
            top: number;
        };
    } | {
        itemTransitionStyle: {
            transition: string;
            left: number;
            top: number;
            position: string;
        }[];
    };
    useMergeLeaderboardData: ({ data, bonus, blackList, }: import("./useMergeLeaderboardData").LeaderboardDataList) => {
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
    useMockLeaderboard: (enable?: boolean, initMockList?: boolean, stable?: boolean, limit?: number) => {
        readonly leaderboard: import("../types").User[];
    };
    usePageData: ({ startDate, endDate, nextPage, isResultPage, endedText, test, init, }: import("./usePageData").PageContext) => {
        mockLeaderboard: import("../types").User[];
        countdownText: string;
        status: import("./useCountdown").TimeStatus;
    };
};
export default _default;
