/// <reference types="react" />
export * from './hooks';
export * from './components';
declare const _default: {
    OfflineNormalTemplate: () => JSX.Element;
    TransitionLeaderboardWrapper: import("react").FC<import("./components").Props>;
    VirtualizedList: import("react").FC<import("./components").IVirtualizedListProps>;
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
    useMockLeaderboard: (enable?: boolean, initMockList?: boolean, stable?: boolean, limit?: number) => {
        readonly leaderboard: import("./types").User[];
    };
    usePageData: ({ startDate, endDate, nextPage, isResultPage, endedText, test, init, }: import("./hooks").PageContext) => {
        mockLeaderboard: import("./types").User[];
        countdownText: string;
        status: import("./hooks").TimeStatus;
    };
    useLuckyDraw: (allCandidates: import("./types").User[], willAutoDrawRemainCount?: Boolean | undefined) => {
        candidates: import("./types").User[];
        winners: import("./types").User[];
        allWinners: import("./types").User[][];
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
    useTypeApi: (apiList: import("./hooks").APIType[] | undefined, method: string | undefined, realTime: number, initialData?: import("./types").User[][] | undefined, opt?: {
        limit: number;
        cursor: string;
        withoutOnliveInfo: boolean;
    }) => {
        loading: boolean;
        polling: boolean;
        requestError: null;
        leaderboardData: import("./types").User[][] | undefined;
    };
    useFilter: (initialData: import("./types").User[]) => {
        data: import("./types").User[];
        handleOnChange: (value: any) => void;
    };
    useScrollToLoadingContainer: (loading: boolean) => void;
    useKeyboard: (settings: import("./hooks").ISettings) => void;
    useFollower: (userID: string, accessToken: string) => {
        followers: string[];
        errorMsg?: string | undefined;
    };
};
export default _default;
