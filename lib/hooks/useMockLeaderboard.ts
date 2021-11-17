import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

const defaultUser = {
  bonus: 0,
  meta: {},
  rank: 0,
  score: 0,
  userInfo: {
    displayName: '',
    gloryroadMode: 0,
    level: 0,
    name: '',
    openID: '',
    picture: '36a80c61-89d9-40b5-803d-5b0437f293c4.jpg',
    region: 'TW',
    userID: '',
    onLiveInfo: {
      liveStreamID: '',
      premiumType: 0,
      streamID: 0,
      streamerType: 0,
    },
  },
};

export const usersID = new Array(100).fill(0).map(() => uuidv4());

const createDefaultUser = (id: string, index: number, score = 1000) => ({
  ...defaultUser,
  score,
  rank: index + 1,
  userInfo: {
    ...defaultUser.userInfo,
    displayName: `user${index}`,
    name: `user${index}`,
    openID: `user${index}`,
    picture: '',
    userID: id,
  },
});

export const mockUsers = usersID.map<User>((user, index) =>
  createDefaultUser(user, index),
);

const createMockGiftedUsers = (
  count: number,
  limit: number,
): { userID: string; score: number }[] => {
  const giftedUsers = new Array(count).fill(0).map(() => {
    const randomUserIndex = Math.floor(limit * Math.random());
    const randomScore = Math.floor(10000 * Math.random());
    return {
      userID: usersID[randomUserIndex],
      score: randomScore,
    };
  });
  return giftedUsers;
};

const replaceLeaderboard = (curLeaderboard: User[], limit: number) => {
  const mockGiftedUsers = createMockGiftedUsers(1, limit);
  const nextLeaderboard = [...curLeaderboard];
  mockGiftedUsers.forEach(user => {
    const curUser = nextLeaderboard.find(
      u => u.userInfo.userID === user.userID,
    );
    if (!curUser) {
      nextLeaderboard.push(
        createDefaultUser(user.userID, nextLeaderboard.length, user.score),
      );
    } else {
      curUser.score += user.score;
    }
  });
  return nextLeaderboard
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({ ...user, rank: index + 1 }));
};

/**
 * 測試用 leaderboard 資料
 * @param enable 開啟
 * @param initMockList 初始化榜單
 * @param stable 是否固定還是要持續增加 user
 * @param limit 最多幾名 users
 */
export const useMockLeaderboard = (
  enable = false,
  initMockList = false,
  stable = false,
  limit = 100,
) => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const timer = useRef(0);

  useEffect(() => {
    if (initMockList) {
      setLeaderboard(mockUsers);
    }
  }, [initMockList]);

  useEffect(() => {
    if (enable && stable) {
      setLeaderboard(mockUsers.slice(0, limit));
    }
    if (enable && !timer.current && !stable) {
      timer.current = window.setInterval(() => {
        setLeaderboard(prev => replaceLeaderboard(prev, limit));
      }, 1000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [limit, stable]);

  return { leaderboard } as const;
};

export default useMockLeaderboard;
