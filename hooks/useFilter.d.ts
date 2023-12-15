import { User as LeaderboardItemInterface } from '../types';
/**
 * 篩選 (search filter) leaderboard 資料<br />
 * 傳送追蹤篩選行為到 firebase
 * @param initialData 未經過濾的 leaderboard 資料
 * @returns data: 取得過濾後的 leaderboard 資料, handleOnChange: handle filter 資料的 method
 */
export declare const useFilter: (initialData: LeaderboardItemInterface[]) => {
    data: LeaderboardItemInterface[];
    handleOnChange: (value: any) => void;
};
export default useFilter;
