import { AxiosResponse, AxiosError } from 'axios';

const CACHE_STORAGE_NAME_PREFIX = 'lb-cache-v1';

// eslint-disable-next-line no-shadow
export enum CacheStrategy {
  /** alias Cache, falling back to network. */
  /** Read the data from the cache first, if not, then get it from the network.  */
  CACHE_FIRST = 'cacheFirst',
  /** Read the data from the cache first, also update cache by network. */
  CACHE_THEN_NETWORK = 'cacheThenNetwork',
  /** Only get data from the network, no data will be cached. */
  NETWORK_ONLY = 'networkOnly',
  NETWORK_FIRST = 'networkFirst',
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
}

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
  } catch (error) {
    console.error('Cache Storage Unavailable, ', error);
    return false;
  }
};

const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const formatMonth = month + 1 > 10 ? month + 1 : `0${month + 1}`;
  const formatDay = day > 10 ? day : `0${day}`;
  return `${date.getFullYear()}-${formatMonth}-${formatDay}`;
};

const getDateDaysAgo = (numOfDays: number, date = new Date()) => {
  const daysAgo = new Date(date.getTime());
  daysAgo.setDate(date.getDate() - numOfDays);
  return daysAgo;
};

const setAxiosCache = async (url: string, response: any) => {
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
  } catch (error) {
    if ((error as Error).name === 'QuotaExceededError') {
      console.error(`Set cache storage QuotaExceededError`);
    } else {
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
      if (
        cacheKey.length &&
        cacheKey.includes(CACHE_STORAGE_NAME_PREFIX) &&
        isTwoDaysAgoCache(cacheKey)
      ) {
        // eslint-disable-next-line no-await-in-loop
        await caches.delete(cacheKey);
      }
    }
  } catch (error) {
    console.error(`Delete cache storage ${error}.`);
  }
};

const isTwoDaysAgoCache = (cacheKey: string) => {
  const twoDaysAgo = getDateDaysAgo(2);
  const cacheDateString = cacheKey.replace(`${CACHE_STORAGE_NAME_PREFIX}-`, '');
  const cacheDate = new Date(cacheDateString);
  return twoDaysAgo >= cacheDate;
};

const getCache = async <T = any>(
  cacheKey: string,
  url: string,
): Promise<FulfillFormat<T>> => {
  try {
    const cacheStorage = await caches.open(cacheKey);
    const cachedResponse = await cacheStorage.match(url);
    const cachedBody = await cachedResponse?.json();
    return { cache: cachedBody };
  } catch (error) {
    return { error: new CacheError(error as string) };
  }
};

const getLatestCache = async <T = any>(url: string) => {
  const cacheKeys = await caches.keys();
  const sortedCache = cacheKeys.reverse();

  let latestCache: FulfillFormat;
  // eslint-disable-next-line no-restricted-syntax
  for (const cacheKey of sortedCache) {
    // eslint-disable-next-line no-await-in-loop
    latestCache = await getCache<T>(cacheKey, url);
    if (latestCache?.error) console.error(latestCache?.error);
    if (latestCache?.cache) return latestCache.cache;
  }

  console.warn('Cannot find any cache.');
};

export const getApiUrlStrategy = (
  apiUrl: string,
  method = HttpMethod.GET,
): { cacheStrategy: CacheStrategy } => {
  // Because cache api only accept cache get request.
  if (method !== HttpMethod.GET) {
    return { cacheStrategy: CacheStrategy.NETWORK_ONLY };
  }

  const whitelistItem = cacheWhitelists.find(({ path }) =>
    new RegExp(path).test(apiUrl),
  );

  if (!whitelistItem) {
    return { cacheStrategy: CacheStrategy.NETWORK_ONLY };
  }

  const { cacheStrategy } = whitelistItem;

  return { cacheStrategy };
};

class CacheError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CacheError';
  }
}

type CaughtError = null | Error | AxiosError | CacheError;

interface FulfillFormat<T = any> {
  data?: AxiosResponse<T>;
  cache?: AxiosResponse<T>;
  error?: CaughtError;
}

const handleCallback = <T = any>(
  apiCallback: Promise<AxiosResponse<T>>,
): Promise<FulfillFormat<T>> =>
  apiCallback.then(res => ({ data: res })).catch(error => ({ error }));

const handleResponse = <T = any>(
  data?: AxiosResponse<T>,
  callback?: Promise<FulfillFormat<T>>,
): HandleCacheStrategyResponse<T> => ({
  data,
  callback,
});

export const handleNetworkFirst = async <T = any>(
  apiCallback: Promise<AxiosResponse<T>>,
  url: string,
) => {
  const apiRes = await handleCallback<T>(apiCallback);
  if (apiRes.data) {
    setAxiosCache(url, apiRes.data);
    return handleResponse<T>(apiRes.data);
  }

  const cacheRes = await getLatestCache<T>(url);
  if (cacheRes) return handleResponse<T>(cacheRes);
  throw apiRes.error;
};

export const handleNetworkOnly = async <T = any>(
  apiCallback: Promise<AxiosResponse<T>>,
) => {
  const apiRes = await handleCallback<T>(apiCallback);
  if (apiRes.data) return handleResponse<T>(apiRes.data);
  throw apiRes.error;
};

interface HandleCacheStrategyParams<T> {
  cacheStrategy: CacheStrategy;
  apiCallback: Promise<AxiosResponse<T>>;
  url: string;
}

export interface HandleCacheStrategyResponse<T = any> {
  data?: AxiosResponse<T>;
  callback?: Promise<FulfillFormat<T>>;
}

export const handleCacheThenNetwork = async <T = any>(
  apiCallback: Promise<AxiosResponse<T>>,
  url: string,
) => {
  const cacheRes = await getLatestCache<T>(url);
  const callback = new Promise<FulfillFormat<T>>((resolve, reject) => {
    (async () => {
      const apiRes = await handleCallback<T>(apiCallback);
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
  return handleResponse<T>(cacheRes, callback);
};

export const handleCacheStrategy = <T = any>({
  cacheStrategy,
  apiCallback,
  url,
}: HandleCacheStrategyParams<T>) => {
  if (cacheStrategy === CacheStrategy.NETWORK_FIRST) {
    return handleNetworkFirst<T>(apiCallback, url);
  }
  if (cacheStrategy === CacheStrategy.CACHE_THEN_NETWORK) {
    return handleCacheThenNetwork<T>(apiCallback, url);
  }
  return handleNetworkOnly<T>(apiCallback);
};
