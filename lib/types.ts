export interface User {
  bonus: number;
  meta: Record<string, number>;
  rank: number;
  score: number;
  userInfo: {
    displayName: string;
    gloryroadMode: number;
    level: number;
    name: string;
    openID: string;
    picture: string;
    region: string;
    userID: string;
  };
}
