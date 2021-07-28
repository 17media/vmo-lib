import { User } from '../types';

function updateLeaderboard(prevLB: User[], newLB: User[]) {
  const prevLBMap = new Map(prevLB.map(user => [user.userInfo.userID, user]));

  newLB.forEach(user => {
    const curData = prevLBMap.get(user.userInfo.userID);
    if (curData) {
      curData.score += user.score;
    } else {
      prevLBMap.set(user.userInfo.userID, user);
    }
  });

  return Array.from(prevLBMap.values());
}

/**
 * 處理榜單資料 data
 * input data: 榜單資料集 (data array 包含 data, bonus, whiteList, blackList)
 * output data: 榜單 map (for 多榜單)
 */
class LeaderboardData {
  private data: User[][];

  private leaderboardMap: Record<string, User[]>;

  constructor(data: User[][]) {
    this.data = data;
    this.leaderboardMap = {};
  }

  /**
   * 分配 input 的 data array 至 leaderboardMap
   */
  setLeaderboard(lbIndex: number, name: string) {
    const curData = this.data[lbIndex];

    if (this.leaderboardMap[name]) {
      this.leaderboardMap[name] = updateLeaderboard(
        this.leaderboardMap[name],
        curData,
      );
      return this;
    }
    this.leaderboardMap[name] = curData;
    this.leaderboardMap[name].sort((a, b) => b.score - a.score);
    return this;
  }

  setLeaderboards(lbIndexes: number[], names: string[]) {
    lbIndexes.forEach((lbIndex, index) => {
      this.setLeaderboard(lbIndex, names[index]);
    });
    return this;
  }

  setWhiteList(index: number, name: string) {
    if (!this.leaderboardMap[name]) return this;
    const curData = this.data[index];
    const curDataUserSet = new Set(curData.map(user => user.userInfo.userID));
    this.leaderboardMap[name] = this.leaderboardMap[name].filter(user =>
      curDataUserSet.has(user.userInfo.userID),
    );
    return this;
  }

  setBlackList(index: number, name: string) {
    if (!this.leaderboardMap[name]) return this;
    const curData = this.data[index];
    const curDataUserSet = new Set(curData.map(user => user.userInfo.userID));
    this.leaderboardMap[name] = this.leaderboardMap[name].filter(
      user => !curDataUserSet.has(user.userInfo.userID),
    );
    return this;
  }

  /**
   * bonus 只合併 bonus key 與 meta key 不合併分數
   */
  setBonus(index: number, name: string) {
    if (!this.leaderboardMap[name]) return this;
    const bonusData = this.data[index];
    const leaderboardData = this.leaderboardMap[name];

    const leaderboardDataMap = new Map(
      leaderboardData.map(user => [user.userInfo.userID, user]),
    );

    bonusData.forEach(data => {
      const curData = leaderboardDataMap.get(data.userInfo.userID);
      if (curData) {
        curData.bonus += data.score;
        curData.meta = {
          ...curData.meta,
          [name]: data.score,
        };
      }
    });

    return this;
  }

  setBonuses(bonusIndexes: number[], names: string[]) {
    bonusIndexes.forEach((bonusIndex, index) => {
      this.setBonus(bonusIndex, names[index]);
    });
    return this;
  }

  /**
   * 取得 leaderboard
   * @param operation 額外邏輯處理
   */
  getLeaderboard(operation?: (data: Record<string, User[]>) => void) {
    if (operation) {
      operation(this.leaderboardMap);
      return this.leaderboardMap;
    }
    return this.leaderboardMap;
  }
}

export default LeaderboardData;
