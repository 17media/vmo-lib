"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCacheStrategy = exports.handleCacheThenNetwork = exports.handleNetworkOnly = exports.handleNetworkFirst = exports.getApiUrlStrategy = exports.checkCacheUsable = exports.HttpMethod = exports.CacheStrategy = void 0;
const CACHE_STORAGE_NAME_PREFIX = 'lb-cache-v1';
// eslint-disable-next-line no-shadow
var CacheStrategy;
(function (CacheStrategy) {
    /** alias Cache, falling back to network. */
    /** Read the data from the cache first, if not, then get it from the network.  */
    CacheStrategy["CACHE_FIRST"] = "cacheFirst";
    /** Read the data from the cache first, also update cache by network. */
    CacheStrategy["CACHE_THEN_NETWORK"] = "cacheThenNetwork";
    /** Only get data from the network, no data will be cached. */
    CacheStrategy["NETWORK_ONLY"] = "networkOnly";
    CacheStrategy["NETWORK_FIRST"] = "networkFirst";
})(CacheStrategy || (exports.CacheStrategy = CacheStrategy = {}));
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "get";
    HttpMethod["POST"] = "post";
    HttpMethod["PUT"] = "put";
})(HttpMethod || (exports.HttpMethod = HttpMethod = {}));
const cacheWhitelists = [
    {
        path: '/leaderboards/eventory',
        method: HttpMethod.GET,
        cacheStrategy: CacheStrategy.CACHE_THEN_NETWORK,
    },
];
const checkCacheUsable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield caches.open('Test Cache Storage Available');
        return true;
    }
    catch (error) {
        console.error('Cache Storage Unavailable, ', error);
        return false;
    }
});
exports.checkCacheUsable = checkCacheUsable;
const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const formatMonth = month + 1 > 10 ? month + 1 : `0${month + 1}`;
    const formatDay = day > 10 ? day : `0${day}`;
    return `${date.getFullYear()}-${formatMonth}-${formatDay}`;
};
const getDateDaysAgo = (numOfDays, date = new Date()) => {
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - numOfDays);
    return daysAgo;
};
const setAxiosCache = (url, response) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const cacheStorageName = `${CACHE_STORAGE_NAME_PREFIX}-${formatDate(today)}`;
    yield deleteCache();
    try {
        const cacheStorage = yield caches.open(cacheStorageName);
        const options = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const axiosRes = new Response(JSON.stringify(response), options);
        yield cacheStorage.put(url, axiosRes);
    }
    catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error(`Set cache storage QuotaExceededError`);
        }
        else {
            console.error(`Set cache storage ${error}.`);
        }
    }
});
const deleteCache = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKeys = yield caches.keys();
        // 當天和前一天
        // eslint-disable-next-line no-restricted-syntax
        for (const cacheKey of cacheKeys) {
            if (cacheKey.length &&
                cacheKey.includes(CACHE_STORAGE_NAME_PREFIX) &&
                isTwoDaysAgoCache(cacheKey)) {
                // eslint-disable-next-line no-await-in-loop
                yield caches.delete(cacheKey);
            }
        }
    }
    catch (error) {
        console.error(`Delete cache storage ${error}.`);
    }
});
const isTwoDaysAgoCache = (cacheKey) => {
    const twoDaysAgo = getDateDaysAgo(2);
    const cacheDateString = cacheKey.replace(`${CACHE_STORAGE_NAME_PREFIX}-`, '');
    const cacheDate = new Date(cacheDateString);
    return twoDaysAgo >= cacheDate;
};
const getCache = (cacheKey, url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheStorage = yield caches.open(cacheKey);
        const cachedResponse = yield cacheStorage.match(url);
        const cachedBody = yield (cachedResponse === null || cachedResponse === void 0 ? void 0 : cachedResponse.json());
        return { cache: cachedBody };
    }
    catch (error) {
        return { error: new CacheError(error) };
    }
});
const getLatestCache = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKeys = yield caches.keys();
    const sortedCache = cacheKeys.reverse();
    let latestCache;
    // eslint-disable-next-line no-restricted-syntax
    for (const cacheKey of sortedCache) {
        // eslint-disable-next-line no-await-in-loop
        latestCache = yield getCache(cacheKey, url);
        if (latestCache === null || latestCache === void 0 ? void 0 : latestCache.error)
            console.error(latestCache === null || latestCache === void 0 ? void 0 : latestCache.error);
        if (latestCache === null || latestCache === void 0 ? void 0 : latestCache.cache)
            return latestCache.cache;
    }
    console.warn('Cannot find any cache.');
});
const getApiUrlStrategy = (apiUrl, method = HttpMethod.GET) => {
    // Because cache api only accept cache get request.
    if (method !== HttpMethod.GET) {
        return { cacheStrategy: CacheStrategy.NETWORK_ONLY };
    }
    const whitelistItem = cacheWhitelists.find(({ path }) => new RegExp(path).test(apiUrl));
    if (!whitelistItem) {
        return { cacheStrategy: CacheStrategy.NETWORK_ONLY };
    }
    const { cacheStrategy } = whitelistItem;
    return { cacheStrategy };
};
exports.getApiUrlStrategy = getApiUrlStrategy;
class CacheError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CacheError';
    }
}
const handleCallback = (apiCallback) => apiCallback.then(res => ({ data: res })).catch(error => ({ error }));
const handleResponse = (data, callback) => ({
    data,
    callback,
});
const handleNetworkFirst = (apiCallback, url) => __awaiter(void 0, void 0, void 0, function* () {
    const apiRes = yield handleCallback(apiCallback);
    if (apiRes.data) {
        setAxiosCache(url, apiRes.data);
        return handleResponse(apiRes.data);
    }
    const cacheRes = yield getLatestCache(url);
    if (cacheRes)
        return handleResponse(cacheRes);
    throw apiRes.error;
});
exports.handleNetworkFirst = handleNetworkFirst;
const handleNetworkOnly = (apiCallback) => __awaiter(void 0, void 0, void 0, function* () {
    const apiRes = yield handleCallback(apiCallback);
    if (apiRes.data)
        return handleResponse(apiRes.data);
    throw apiRes.error;
});
exports.handleNetworkOnly = handleNetworkOnly;
const handleCacheThenNetwork = (apiCallback, url) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheRes = yield getLatestCache(url);
    const callback = new Promise((resolve, reject) => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const apiRes = yield handleCallback(apiCallback);
            // 理想情況、讀到一半斷網、弱網使用
            if (apiRes.data) {
                setAxiosCache(url, apiRes.data);
                resolve({ data: apiRes.data, cache: cacheRes });
            }
            // 一開始斷網使用
            if (apiRes.error && cacheRes) {
                resolve({ cache: cacheRes, error: apiRes.error });
            }
            reject(apiRes.error);
        }))();
    });
    return handleResponse(cacheRes, callback);
});
exports.handleCacheThenNetwork = handleCacheThenNetwork;
const handleCacheStrategy = ({ cacheStrategy, apiCallback, url, }) => {
    if (cacheStrategy === CacheStrategy.NETWORK_FIRST) {
        return (0, exports.handleNetworkFirst)(apiCallback, url);
    }
    if (cacheStrategy === CacheStrategy.CACHE_THEN_NETWORK) {
        return (0, exports.handleCacheThenNetwork)(apiCallback, url);
    }
    return (0, exports.handleNetworkOnly)(apiCallback);
};
exports.handleCacheStrategy = handleCacheStrategy;
//# sourceMappingURL=cacheManager.service.js.map