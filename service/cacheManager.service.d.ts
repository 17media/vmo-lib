import { AxiosResponse, AxiosError } from 'axios';
export declare enum CacheStrategy {
    /** alias Cache, falling back to network. */
    /** Read the data from the cache first, if not, then get it from the network.  */
    CACHE_FIRST = "cacheFirst",
    /** Read the data from the cache first, also update cache by network. */
    CACHE_THEN_NETWORK = "cacheThenNetwork",
    /** Only get data from the network, no data will be cached. */
    NETWORK_ONLY = "networkOnly",
    NETWORK_FIRST = "networkFirst"
}
export declare enum HttpMethod {
    GET = "get",
    POST = "post",
    PUT = "put"
}
export declare const checkCacheUsable: () => Promise<boolean>;
export declare const getApiUrlStrategy: (apiUrl: string, method?: HttpMethod) => {
    cacheStrategy: CacheStrategy;
};
declare class CacheError extends Error {
    constructor(message: string);
}
type CaughtError = null | Error | AxiosError | CacheError;
export interface FulfillFormat<T = any> {
    data?: AxiosResponse<T>;
    cache?: AxiosResponse<T>;
    error?: CaughtError;
}
export interface HandleCacheStrategyResponse<T = any> {
    data?: AxiosResponse<T>;
    callback?: Promise<FulfillFormat<T>>;
}
export declare const handleNetworkFirst: <T = any>(apiCallback: Promise<AxiosResponse<T, any>>, url: string) => Promise<HandleCacheStrategyResponse<T>>;
export declare const handleNetworkOnly: <T = any>(apiCallback: Promise<AxiosResponse<T, any>>) => Promise<HandleCacheStrategyResponse<T>>;
export declare const handleCacheThenNetwork: <T = any>(apiCallback: Promise<AxiosResponse<T, any>>, url: string) => Promise<HandleCacheStrategyResponse<T>>;
interface HandleCacheStrategyParams<T> {
    cacheStrategy: CacheStrategy;
    apiCallback: Promise<AxiosResponse<T>>;
    url: string;
}
export declare const handleCacheStrategy: <T = any>({ cacheStrategy, apiCallback, url, }: HandleCacheStrategyParams<T>) => Promise<HandleCacheStrategyResponse<T>>;
export {};
