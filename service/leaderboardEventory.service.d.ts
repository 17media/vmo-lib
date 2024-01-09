import { CancelToken } from 'axios';
import { User } from '../types';
import { CacheStrategy } from './cacheManager.service';
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
export interface Response<T> {
    data: T[];
    nextCursor: string;
    type: string;
}
type FetchURL = Omit<Params, 'cancelToken' | 'callback' | 'preData'> & {
    apiEndpoint: string;
};
/**
 * @description
 * cursor       => {timestamp}:{total count}:{start}:{shard size}-{hash value}
 *
 * parsedCursor => {total count}:{start}:{shard size}
 */
export declare const getParsedURL: ({ apiEndpoint, type, limit, cursor, withoutOnliveInfo, }: FetchURL) => string;
export declare const getLeaderboardEventory: ({ type, cancelToken, limit, cursor, withoutOnliveInfo, strategy, }: Params & {
    strategy: CacheStrategy;
}) => Promise<import("./cacheManager.service").HandleCacheStrategyResponse<Response<User>>>;
export default getLeaderboardEventory;
