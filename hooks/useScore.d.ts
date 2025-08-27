import { RegionLanguage } from '../utils';
interface UseScoreProps {
    givenScore: number;
    duration?: number;
    regionLanguage?: RegionLanguage;
    useAnimation?: boolean;
}
/**
 * 給 givenScore 跟 duration 來產生能持續動態改變值的 score <br />
 * @param givenScore 給定的值
 * @param duration 動態改變值的時間, default 1000
 * @param useAnimation 是否使用動畫, default true
 */
export declare const useScore: ({ givenScore, duration, regionLanguage, useAnimation, }: UseScoreProps) => string;
export default useScore;
