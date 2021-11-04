import { CancelToken } from 'axios';
import { User } from '../types';
export declare const getLeaderboardEventory: (type: {
    sta: string;
    prod: string;
}, cancelToken: CancelToken, limit?: number, cursor?: string, method?: string, callBack?: (data: any) => void) => Promise<User[]>;
export declare const getLeaderboardEventoryBonus: (type: {
    sta: string;
    prod: string;
}, cancelToken: CancelToken, userId: string, limit?: number, cursor?: string, method?: string) => Promise<User[]>;
