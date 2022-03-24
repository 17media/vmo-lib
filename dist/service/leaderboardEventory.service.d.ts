import { CancelToken } from 'axios';
import { User } from '../types';
interface Params {
    type: {
        sta: string;
        prod: string;
    };
    cancelToken: CancelToken;
    limit: number;
    cursor: string;
    withoutOnliveInfo?: boolean;
    callback?: Function;
    preData?: User[];
}
export declare const getLeaderboardEventory: ({ type, cancelToken, limit, cursor, withoutOnliveInfo, callback, preData, }: Params) => Promise<User[]>;
export default getLeaderboardEventory;
