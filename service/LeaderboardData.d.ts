import { User } from '../types';
/**
 * @example
 * ```
 * const team1 = []
 * const team2 = []
 * const team3 = []
 * const bonus1 = []
 * const whiteList = []
 * const data = [team1, team2, team3, bonus, whiteList] // 資料集
 * const { team1, team2, team3 } = new LeaderboardData(data)
 * .setLeaderboard(0, 'team1') // 設置資料集 0 為 team1
 * .setLeaderboard(1, 'team2') // 設置資料集 1 為 team2
 * .setLeaderboard(2, 'team3') // 設置資料集 2 為 team3
 * .setBonus(3, 'team1') // 把資料集 3 的 分數 設置為 team1 bomus meta
 * .setWhiteList(4, 'team2') // 把資料集 4 的 名單 設置為 team2 白名單
 * .getLeaderboard()
 * ```
 */
declare class LeaderboardData {
    private data;
    private leaderboardMap;
    constructor(data: User[][]);
    /**
     * 分配 input 的 data array 至 leaderboardMap,
     * 把 name 跟 [users] 綁成key-value pair. e.g. kitty隊 - [users]).
     * 結果：leaderboardMap被更新
     * @param lbIndex 要被設定的榜單index
     * @param name 榜單要對應的name
     */
    setLeaderboard(lbIndex: number, name: string): this;
    setLeaderboards(lbIndexes: number[], names: string[]): this;
    /**
     * 有在白名單的user才留在leaderboard裡,
     * 結果：input榜單被更新
     * @param index 要被更新的榜單index
     * @param name whitelist在leaderboardMap裡對應的name
     */
    setWhiteList(index: number, name: string): this;
    /**
     * 沒有在黑名單的user才留在leaderboard裡.
     * 結果：input榜單被更新
     * @param index 要被更新的榜單index
     * @param name blacklist在leaderboardMap裡對應的name
     */
    setBlackList(index: number, name: string): this;
    /**
     * bonus 只合併 bonus key 與 meta key, 不合併分數.
     * 對name(榜單) 做index(bonus)的操作.
     * 結果：input榜單被更新
     * @param index bonus data的index
     * @param name 要被更新的榜單的name
     */
    setBonus(index: number, name: string): this;
    setBonuses(bonusIndexes: number[], names: string[]): this;
    /**
     * 取得 leaderboard
     * @param operation 額外邏輯處理
     */
    getLeaderboard(operation?: (data: Record<string, User[]>) => void): Record<string, User[]>;
}
export default LeaderboardData;
