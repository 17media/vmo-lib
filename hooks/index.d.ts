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
export * from './useCheckWebview';
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
        readonly leaderboard: import("..").User[];
    };
    usePageData: ({ startDate, endDate, nextPage, isResultPage, endedText, test, init, }: import("./usePageData").PageContext) => {
        mockLeaderboard: import("..").User[];
        countdownText: string;
        status: import("./useCountdown").TimeStatus;
    };
    useLuckyDraw: (allCandidates: import("..").User[], willAutoDrawRemainCount?: Boolean | undefined) => {
        candidates: import("..").User[];
        winners: import("..").User[];
        allWinners: import("..").User[][];
        draw: (roundWinnersCount: number) => void;
        clearWinners: () => void;
        reset: () => void;
        currentRound: number;
        hasDraw: Boolean;
        MaskDiv: import("react").FC<{}>;
    };
    useSyncScroll: () => {
        handleScroll: (e: any) => void;
        elPoolRef: import("react").MutableRefObject<Element[]>;
    };
    useTypeApi: ({ apiList, realTime, initialData, cacheStrategy, opt, env, }: {
        apiList: import("./useTypeApi").APIType[];
        realTime: number;
        initialData?: import("..").User[][] | undefined;
        cacheStrategy?: import("./useTypeApi").CacheStrategy | undefined;
        opt?: import("..").EventoryApiOption | undefined;
        env?: import("..").Env | undefined;
    }) => {
        loading: boolean;
        polling: boolean;
        requestError: any;
        leaderboardData: import("..").User[][] | undefined;
    };
    useFilter: (initialData: import("..").User[]) => {
        data: import("..").User[];
        handleOnChange: (value: any) => void;
    };
    useScrollToLoadingContainer: (loading: boolean) => void;
    useKeyboard: (settings: import("./useKeyboard").ISettings) => void;
    useFollower: (userID: string, accessToken: string, jwtAccessToken: string) => {
        followers: string[];
        errorMsg?: string | undefined;
    };
    useCheckWebview: () => boolean;
    useCacheImage: (imageUrls: string[]) => Record<string, string>;
};
export default _default;
