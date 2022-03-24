import { AxiosResponse } from 'axios';
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
export declare const getApiUrlStrategy: (apiUrl: string, method?: HttpMethod) => {
    cacheStrategy: CacheStrategy;
};
export declare const handleNetworkFirst: <T = any>(apiCallback: Promise<AxiosResponse<T>>, fetchURL: string) => Promise<any>;
export declare const handleNetworkOnly: <T = any>(apiCallback: Promise<AxiosResponse<T>>) => Promise<AxiosResponse<T> | undefined>;
interface HandleCacheStrategyParams<T> {
    cacheStrategy: CacheStrategy;
    apiCallback: Promise<AxiosResponse<T>>;
    fetchURL: string;
}
export declare const handleCacheStrategy: <T = any>({ cacheStrategy, apiCallback, fetchURL, }: HandleCacheStrategyParams<T>) => Promise<any>;
export {};
