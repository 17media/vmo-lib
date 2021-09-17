/// <reference types="react" />
export * from './hooks';
export * from './components';
declare const _default: {
    OfflineNormalTemplate: () => JSX.Element;
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
};
export default _default;
