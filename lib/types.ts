import { EventTypes } from './enums';

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
  onliveInfo?: OnliveInfo;
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
  onLiveInfo?: OnliveInfo; // 主播有開播狀態下才會有
}

export interface OnliveInfo {
  liveStreamID: string;
  premiumType: number;
  streamID: number;
  streamerType: number;
}

export interface ISetting {
  type: EventTypes;
  key: string;
  page?: string;
  fn?: () => void;
}

export interface LeaderboardItem extends User {
  roomID?: number;
}

export interface EventoryApiOption {
  limit: number;
  cursor: string;
  withoutOnliveInfo: boolean;
}
