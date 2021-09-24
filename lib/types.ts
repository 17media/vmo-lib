interface UserInfo {
  displayName?: any;
  gloryroadMode?: number;
  level: number;
  userID: string;
  openID: string;
  name: string;
  followerCount?: number;
  roomID?: number;
  experience?: number;
  picture: string;
  region: string;
}

export interface User {
  bonus?: number;
  meta?: Record<string, number | string>;
  rank: number;
  score: number;
  userInfo: UserInfo;
  theme?: any;
  userID?: string;
  amount?: number;
  lastTimestamp?: number;
  member?: any;
  missions?: any;
}
