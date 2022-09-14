import { AxiosResponse } from 'axios';
export declare enum CacheStrategy {
    /** alias Cache, falling back to network. */
    /** Read the data from the cache first, if not, then get it from the network.  */
    CACHE_FIRST = "cacheFirst",
    /** Read the data from the cache first, also update cache by network. */
    CACHE_THEN_NETWORK = "cacheThenNetwork",
    /** Only get data from the network, no data will be cached. */
    NETWORK_ONLY = "networkOnly",
    NETWORK_FIRST = "networkFirst",
    CACHE_ONLY = "cacheOnly",
    /** Get data from the network, data will be cached, but will not return cache. */
    NETWORK_THEN_SET_CACHE = "networkThenSetCache"
}
export declare enum HttpMethod {
    GET = "get",
    POST = "post",
    PUT = "put"
}
export declare const getApiUrlStrategy: (apiUrl: string, method?: HttpMethod) => {
    cacheStrategy: CacheStrategy;
};
export declare const handleNetworkFirst: <T = any>(apiCallback: () => Promise<AxiosResponse<T>>, url: string) => Promise<any>;
export declare const handleNetworkThenSetCache: <T = any>(apiCallback: () => Promise<AxiosResponse<T>>, url: string) => Promise<AxiosResponse<T> | undefined>;
export declare const handleNetworkOnly: <T = any>(apiCallback: () => Promise<AxiosResponse<T>>) => Promise<AxiosResponse<T> | undefined>;
export declare const handleCacheOnly: (url: string) => Promise<any>;
interface HandleCacheStrategyParams<T> {
    cacheStrategy: CacheStrategy;
    apiCallback: () => Promise<AxiosResponse<T>>;
    url: string;
}
export declare const handleCacheStrategy: <T = any>({ cacheStrategy, apiCallback, url, }: HandleCacheStrategyParams<T>) => Promise<any>;
export {};
