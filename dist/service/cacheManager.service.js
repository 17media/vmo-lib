const CACHE_STORAGE_NAME_PREFIX = 'lb-cache-v1';
// eslint-disable-next-line no-shadow
export var CacheStrategy;
(function (CacheStrategy) {
    /** alias Cache, falling back to network. */
    /** Read the data from the cache first, if not, then get it from the network.  */
    CacheStrategy["CACHE_FIRST"] = "cacheFirst";
    /** Read the data from the cache first, also update cache by network. */
    CacheStrategy["CACHE_THEN_NETWORK"] = "cacheThenNetwork";
    /** Only get data from the network, no data will be cached. */
    CacheStrategy["NETWORK_ONLY"] = "networkOnly";
    CacheStrategy["NETWORK_FIRST"] = "networkFirst";
<<<<<<< Updated upstream
})(CacheStrategy = exports.CacheStrategy || (exports.CacheStrategy = {}));
var HttpMethod;
=======
})(CacheStrategy || (CacheStrategy = {}));
export var HttpMethod;
>>>>>>> Stashed changes
(function (HttpMethod) {
    HttpMethod["GET"] = "get";
    HttpMethod["POST"] = "post";
    HttpMethod["PUT"] = "put";
<<<<<<< Updated upstream
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
=======
})(HttpMethod || (HttpMethod = {}));
>>>>>>> Stashed changes
const cacheWhitelists = [
    {
        path: '/leaderboards/eventory',
        method: HttpMethod.GET,
        cacheStrategy: CacheStrategy.CACHE_THEN_NETWORK,
    },
];
export const checkCacheUsable = async () => {
    try {
        await caches.open('Test Cache Storage Available');
        return true;
    }
    catch (error) {
        console.error('Cache Storage Unavailable, ', error);
        return false;
    }
};
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
const setAxiosCache = async (url, response) => {
    const today = new Date();
    const cacheStorageName = `${CACHE_STORAGE_NAME_PREFIX}-${formatDate(today)}`;
    await deleteCache();
    try {
        const cacheStorage = await caches.open(cacheStorageName);
        const options = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const axiosRes = new Response(JSON.stringify(response), options);
        await cacheStorage.put(url, axiosRes);
    }
    catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error(`Set cache storage QuotaExceededError`);
        }
        else {
            console.error(`Set cache storage ${error}.`);
        }
    }
};
const deleteCache = async () => {
    try {
        const cacheKeys = await caches.keys();
        // 當天和前一天
        // eslint-disable-next-line no-restricted-syntax
        for (const cacheKey of cacheKeys) {
            if (cacheKey.length &&
                cacheKey.includes(CACHE_STORAGE_NAME_PREFIX) &&
                isTwoDaysAgoCache(cacheKey)) {
                // eslint-disable-next-line no-await-in-loop
                await caches.delete(cacheKey);
            }
        }
    }
    catch (error) {
        console.error(`Delete cache storage ${error}.`);
    }
};
const isTwoDaysAgoCache = (cacheKey) => {
    const twoDaysAgo = getDateDaysAgo(2);
    const cacheDateString = cacheKey.replace(`${CACHE_STORAGE_NAME_PREFIX}-`, '');
    const cacheDate = new Date(cacheDateString);
    return twoDaysAgo >= cacheDate;
};
const getCache = async (cacheKey, url) => {
    try {
        const cacheStorage = await caches.open(cacheKey);
        const cachedResponse = await cacheStorage.match(url);
        const cachedBody = await cachedResponse?.json();
        return { cache: cachedBody };
    }
    catch (error) {
        return { error: new CacheError(error) };
    }
};
const getLatestCache = async (url) => {
    const cacheKeys = await caches.keys();
    const sortedCache = cacheKeys.reverse();
    let latestCache;
    // eslint-disable-next-line no-restricted-syntax
    for (const cacheKey of sortedCache) {
        // eslint-disable-next-line no-await-in-loop
        latestCache = await getCache(cacheKey, url);
        if (latestCache?.error)
            console.error(latestCache?.error);
        if (latestCache?.cache)
            return latestCache.cache;
    }
    console.warn('Cannot find any cache.');
};
export const getApiUrlStrategy = (apiUrl, method = HttpMethod.GET) => {
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
export const handleNetworkFirst = async (apiCallback, url) => {
    const apiRes = await handleCallback(apiCallback);
    if (apiRes.data) {
        setAxiosCache(url, apiRes.data);
        return handleResponse(apiRes.data);
    }
    const cacheRes = await getLatestCache(url);
    if (cacheRes)
        return handleResponse(cacheRes);
    throw apiRes.error;
};
export const handleNetworkOnly = async (apiCallback) => {
    const apiRes = await handleCallback(apiCallback);
    if (apiRes.data)
        return handleResponse(apiRes.data);
    throw apiRes.error;
};
export const handleCacheThenNetwork = async (apiCallback, url) => {
    const cacheRes = await getLatestCache(url);
    const callback = new Promise((resolve, reject) => {
        (async () => {
            const apiRes = await handleCallback(apiCallback);
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
        })();
    });
    return handleResponse(cacheRes, callback);
};
export const handleCacheStrategy = ({ cacheStrategy, apiCallback, url, }) => {
    if (cacheStrategy === CacheStrategy.NETWORK_FIRST) {
<<<<<<< Updated upstream
        return exports.handleNetworkFirst(apiCallback, url);
    }
    if (cacheStrategy === CacheStrategy.CACHE_THEN_NETWORK) {
        return exports.handleCacheThenNetwork(apiCallback, url);
    }
    return exports.handleNetworkOnly(apiCallback);
=======
        return handleNetworkFirst(apiCallback, url);
    }
    if (cacheStrategy === CacheStrategy.CACHE_THEN_NETWORK) {
        return handleCacheThenNetwork(apiCallback, url);
    }
    return handleNetworkOnly(apiCallback);
>>>>>>> Stashed changes
};
//# sourceMappingURL=cacheManager.service.js.map