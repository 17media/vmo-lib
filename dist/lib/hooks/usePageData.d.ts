import { TimeStatus } from "./useCountdown";
export interface PageContext {
    startDate: string;
    endDate: string;
    nextPage: number;
    endedText: string;
    isResultPage: boolean;
    test: boolean;
    init: boolean;
}
declare const usePageData: ({ startDate, endDate, nextPage, isResultPage, endedText, test, init, }: PageContext) => {
    mockLeaderboard: import("../types").User[];
    countdownText: string;
    status: TimeStatus;
};
export default usePageData;
