import { User } from '../types';
declare const useMockLeaderboard: (stable?: boolean, limit?: number) => {
    readonly leaderboard: User[];
    readonly enable: string;
};
export default useMockLeaderboard;
