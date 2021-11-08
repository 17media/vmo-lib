import { CancelToken } from 'axios';
import { User } from '../types';
export declare const getLeaderboardEventory: (type: {
    sta: string;
    prod: string;
}, cancelToken: CancelToken, limit?: number, cursor?: string, method?: string, callBack?: (data: any) => void, preData?: any[]) => Promise<User[]>;
export default getLeaderboardEventory;
