/// <reference types="react" />
export * from './useCountdown';
export * from './useItemTransition';
export * from './usePageData';
export * from './useAutoNext';
export * from './useMockLeaderboard';
export * from './useLuckyDraw';
export * from './useSyncScroll';
export * from './useTypeApi';
export * from './useFilter';
export * from './useScrollToLoadingContainer';
export * from './useKeyboard';
export * from './useFollower';
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
    useMockLeaderboard: (enable?: boolean, initMockList?: boolean, stable?: boolean, limit?: number) => {
        readonly leaderboard: import("../types").User[];
    };
    usePageData: ({ startDate, endDate, nextPage, isResultPage, endedText, test, init, }: import("./usePageData").PageContext) => {
        mockLeaderboard: import("../types").User[];
        countdownText: string;
        status: import("./useCountdown").TimeStatus;
    };
    useLuckyDraw: (allCandidates: import("../types").User[], willAutoDrawRemainCount?: Boolean | undefined) => {
        candidates: import("../types").User[];
        winners: import("../types").User[];
        allWinners: import("../types").User[][];
        draw: (roundWinnersCount: number) => void;
        clearWinners: () => void;
        reset: () => void;
        currentRound: number;
        hasDraw: Boolean;
        MaskDiv: import("react").FC<{}>;
    };
    useSyncScroll: () => {
        handleSroll: (e: any) => void;
        elPoolRef: import("react").MutableRefObject<Element[]>;
    };
    useTypeApi: (apiList: import("./useTypeApi").APIType[] | undefined, method: string | undefined, realTime: number, initialData?: import("../types").User[][] | undefined, opt?: {
        limit: number;
        cursor: string;
        withoutOnliveInfo: boolean;
    }) => {
        loading: boolean;
        polling: boolean;
        requestError: null;
        leaderboardData: import("../types").User[][] | undefined;
    };
    useFilter: (initialData: import("../types").User[]) => {
        data: import("../types").User[];
        handleOnChange: (value: any) => void;
    };
    useScrollToLoadingContainer: (loading: boolean) => void;
    useKeyboard: (settings: import("./useKeyboard").ISettings) => void;
    useFollower: (userID: string, accessToken: string) => {
        followers: string[];
        errorMsg?: string | undefined;
    };
};
export default _default;
