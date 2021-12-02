export declare enum TimeStatus {
    NotYet = 0,
    Ongoing = 1,
    Ended = 2
}
export interface TimeCount {
    d: number;
    h: number;
    m: number;
    s: number;
    ms: number;
}
export declare const formatCountdownText: (times: TimeCount) => string;
export declare const getRelatedDistance: (dist: number) => TimeCount;
/**
 * 線下倒數計時
 * @param start 開始時間
 * @param end 結束時間
 * @param timeEndText 結束時 text
 * when you use this hook, outside component should use React.memo() to prevent rerender.
 */
export declare const useCountdown: (start: number, end: number, timeEndText: string) => {
    status: TimeStatus;
    text: string;
};
export default useCountdown;
