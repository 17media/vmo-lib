/// <reference types="react" />
export * from "./useCountdown";
export * from "./useItemTransition";
export * from "./useMergeLeaderboardData";
export * from "./usePageData";
export * from "./useAutoNext";
export * from "./useMockLeaderboard";
export * from "./useLuckyDraw";
export * from "./useSyncScroll";
declare const _default: {
    useAutoNext: (isEnded: boolean, nextPage: number) => void;
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
    useLuckyDraw: (allCandidates: import("../types").User[]) => {
        candidates: import("../types").User[];
        winners: import("../types").User[];
        allWinners: import("../types").User[][];
        draw: (roundWinnersCount: number) => void;
        clearWinners: () => void;
        reset: () => void;
    };
    useSyncScroll: () => {
        handleSroll: (e: any) => void;
        elPoolRef: import("react").MutableRefObject<Element[]>;
    };
};
export default _default;
