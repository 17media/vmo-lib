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

interface UserInfo {
  displayName?: any;
  gloryroadMode?: number;
  level: number;
  userID: string;
  openID: string;
  name: string;
  followerCount?: number;
  experience?: number;
  picture: string;
  region: string;
  onliveinfo?: OnLiveinfo; // 主播有開播狀態下才會有
}

interface OnLiveinfo {
  liveStreamID: string;
  premiumType: number;
  streamID: number;
  streamerType: number;
}
