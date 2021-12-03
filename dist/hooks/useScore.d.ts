import { RegionLanguage } from '../utils';
/**
 * 給 givenScore 跟 duration 來產生能持續動態改變值的 score <br />
 * @param givenScore 給定的值
 * @param duration 動態改變值的時間, default 1000
 */
declare const useScore: (givenScore: number, duration?: number, regionLanguage?: RegionLanguage | undefined) => string;
export default useScore;
