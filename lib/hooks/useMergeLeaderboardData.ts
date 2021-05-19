import { useMemo } from "react";
import { User } from "../types";

export interface LeaderboardDataList {
  data: User[];
  bonus: User[];
  blackList: User[];
}

export const useMergeLeaderboardData = ({
  data = [],
  bonus = [],
  blackList = [],
}: LeaderboardDataList) =>
  useMemo(
    () =>
      data
        .map((item, index) => ({
          ...item,
          bonus: bonus[index].score,
        }))
        .filter(
          (item) =>
            !blackList
              .map((user) => user.userInfo.userID)
              .includes(item.userInfo.userID)
        ),
    [blackList, bonus, data]
  );

export default useMergeLeaderboardData;
