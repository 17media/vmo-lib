"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 更新原始榜單
 * @param prevLB 原始榜單
 * @param newLB 新榜單資料
 * @returns 更新後的原始榜單
 */
function updateLeaderboard(prevLB, newLB) {
    const prevLBMap = new Map(prevLB.map(user => [user.userInfo.userID, user]));
    newLB.forEach(user => {
        const curData = prevLBMap.get(user.userInfo.userID);
        if (curData) {
            curData.score += user.score;
        }
        else {
            prevLBMap.set(user.userInfo.userID, user);
        }
    });
    return Array.from(prevLBMap.values());
}
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
class LeaderboardData {
    constructor(data) {
        this.data = data;
        this.leaderboardMap = {};
    }
    /**
     * 分配 input 的 data array 至 leaderboardMap,
     * 把 name 跟 [users] 綁成key-value pair. e.g. kitty隊 - [users]).
     * 結果：leaderboardMap被更新
     * @param lbIndex 要被設定的榜單index
     * @param name 榜單要對應的name
     */
    setLeaderboard(lbIndex, name) {
        const curData = this.data[lbIndex];
        if (this.leaderboardMap[name]) {
            this.leaderboardMap[name] = updateLeaderboard(this.leaderboardMap[name], curData);
            return this;
        }
        this.leaderboardMap[name] = curData;
        this.leaderboardMap[name].sort((a, b) => b.score - a.score);
        return this;
    }
    setLeaderboards(lbIndexes, names) {
        lbIndexes.forEach((lbIndex, index) => {
            this.setLeaderboard(lbIndex, names[index]);
        });
        return this;
    }
    /**
     * 有在白名單的user才留在leaderboard裡,
     * 結果：input榜單被更新
     * @param index 要被更新的榜單index
     * @param name whitelist在leaderboardMap裡對應的name
     */
    setWhiteList(index, name) {
        if (!this.leaderboardMap[name])
            return this;
        const curData = this.data[index];
        const curDataUserSet = new Set(curData.map(user => user.userInfo.userID));
        this.leaderboardMap[name] = this.leaderboardMap[name].filter(user => curDataUserSet.has(user.userInfo.userID));
        return this;
    }
    /**
     * 沒有在黑名單的user才留在leaderboard裡.
     * 結果：input榜單被更新
     * @param index 要被更新的榜單index
     * @param name blacklist在leaderboardMap裡對應的name
     */
    setBlackList(index, name) {
        if (!this.leaderboardMap[name])
            return this;
        const curData = this.data[index];
        const curDataUserSet = new Set(curData.map(user => user.userInfo.userID));
        this.leaderboardMap[name] = this.leaderboardMap[name].filter(user => !curDataUserSet.has(user.userInfo.userID));
        return this;
    }
    /**
     * bonus 只合併 bonus key 與 meta key, 不合併分數.
     * 對name(榜單) 做index(bonus)的操作.
     * 結果：input榜單被更新
     * @param index bonus data的index
     * @param name 要被更新的榜單的name
     */
    setBonus(index, name) {
        if (!this.leaderboardMap[name])
            return this;
        const bonusData = this.data[index];
        const leaderboardData = this.leaderboardMap[name];
        const leaderboardDataMap = new Map(leaderboardData.map(user => [user.userInfo.userID, user]));
        bonusData.forEach(data => {
            const curData = leaderboardDataMap.get(data.userInfo.userID);
            if (curData && curData.bonus) {
                curData.bonus += data.score;
                curData.meta = Object.assign(Object.assign({}, curData.meta), { [name]: data.score });
            }
        });
        return this;
    }
    setBonuses(bonusIndexes, names) {
        bonusIndexes.forEach((bonusIndex, index) => {
            this.setBonus(bonusIndex, names[index]);
        });
        return this;
    }
    /**
     * 取得 leaderboard
     * @param operation 額外邏輯處理
     */
    getLeaderboard(operation) {
        if (operation) {
            operation(this.leaderboardMap);
            return this.leaderboardMap;
        }
        return this.leaderboardMap;
    }
}
exports.default = LeaderboardData;
//# sourceMappingURL=LeaderboardData.js.map