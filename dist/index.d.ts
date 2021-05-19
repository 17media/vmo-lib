/// <reference types="react" />
export * from "./hooks";
export * from "./components";
declare const _default: {
    TransitionLeaderboardWrapper: import("react").FC<import("./components").Props>;
    useAutoNext: (isEnded: boolean, nextPage: number) => void;
    useCountdown: (start: number, end: number, timeEndText: string) => {
        status: import("./hooks").TimeStatus;
        text: string;
    };
    useItemTransition: (itemStyle: import("./hooks").ItemStyle, transition: import("./hooks").TransitionStyle, rowItems: number, currentRank: number | number[]) => {
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
    useMergeLeaderboardData: ({ data, bonus, blackList, }: import("./hooks").LeaderboardDataList) => {
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
        readonly leaderboard: import("./types").User[];
    };
    usePageData: ({ startDate, endDate, nextPage, isResultPage, endedText, test, init, }: import("./hooks").PageContext) => {
        mockLeaderboard: import("./types").User[];
        countdownText: string;
        status: import("./hooks").TimeStatus;
    };
};
export default _default;
