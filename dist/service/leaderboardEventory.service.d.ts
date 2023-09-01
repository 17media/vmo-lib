import { CancelToken } from 'axios';
import { Env } from '../enums';
import { User } from '../types';
import { CacheStrategy } from './cacheManager.service';
interface Params {
    type: {
        uat?: string;
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
export declare const getParsedURL: ({ apiEndpoint, type, limit, cursor, withoutOnliveInfo, env, }: Omit<Params, "cancelToken" | "callback" | "preData"> & {
    apiEndpoint: string;
} & {
    env?: Env | undefined;
}) => string;
export declare const getLeaderboardEventory: ({ type, cancelToken, limit, cursor, withoutOnliveInfo, strategy, env, }: Params & {
    strategy: CacheStrategy;
    env?: Env | undefined;
}) => Promise<import("./cacheManager.service").HandleCacheStrategyResponse<Response<User>>>;
export default getLeaderboardEventory;
