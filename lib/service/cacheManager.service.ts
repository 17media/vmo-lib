import { AxiosResponse } from 'axios';

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
    cacheStrategy: CacheStrategy.NETWORK_FIRST,
  },
];

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
  await deleteCache(cacheStorageName);
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

const deleteCache = async (cacheStorageName: string) => {
  try {
    const cacheKeys = await caches.keys();
    // 當天和前一天
    const twoDaysAgo = getDateDaysAgo(2);

    // eslint-disable-next-line no-restricted-syntax
    for (const cacheKey of cacheKeys) {
      if (
        cacheKey.includes(CACHE_STORAGE_NAME_PREFIX) &&
        cacheKey !== cacheStorageName &&
        isTwoDaysAgoCache(cacheKey, twoDaysAgo)
      ) {
        // eslint-disable-next-line no-await-in-loop
        await caches.delete(cacheKey);
      }
    }
  } catch (error) {
    console.error(`Delete cache storage ${error}.`);
  }
};

const isTwoDaysAgoCache = (cacheKey: string, twoDaysAgo: Date) => {
  const cacheDateString = cacheKey.replace(`${CACHE_STORAGE_NAME_PREFIX}-`, '');
  const cacheDate = new Date(cacheDateString);
  return twoDaysAgo >= cacheDate;
};

const getCache = async (cacheKey: string, url: string, networkErr: any) => {
  try {
    const cacheStorage = await caches.open(cacheKey);
    const cachedResponse = await cacheStorage.match(url);
    const cachedBody = await cachedResponse?.json();
    return cachedBody;
  } catch (error) {
    throw new Error(`Get cache storage ${error}.\nNetwork ${networkErr}`);
  }
};

const getLatestCache = async (url: string, networkErr: any) => {
  const cacheKeys = await caches.keys();
  const sortedCache = cacheKeys.reverse();
  if (!sortedCache || sortedCache.length === 0)
    throw new Error(`Cannot find any cache.\nNetwork ${networkErr}`);

  let latestCache;
  // eslint-disable-next-line no-restricted-syntax
  for (const cacheKey of sortedCache) {
    // eslint-disable-next-line no-await-in-loop
    latestCache = await getCache(cacheKey, url, networkErr);
    if (latestCache) {
      break;
    }
  }
  console.error(`Network ${networkErr}.`);
  return latestCache;
};

export const getApiUrlStrategy = (
  apiUrl: string,
  method = 'get',
): { cacheStrategy: CacheStrategy } => {
  // Because cache api only accept cache get request.
  if (method !== 'get') {
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

export const handleNetworkFirst = async (
  apiCallback: Promise<AxiosResponse<any>>,
  fetchURL: string,
) => {
  let response: AxiosResponse<any>;
  let networkErr;
  try {
    response = await apiCallback;
  } catch (error) {
    networkErr = error;
    response = await getLatestCache(fetchURL, networkErr);
  }
  if (!networkErr) {
    await setAxiosCache(fetchURL, response);
  }
  return response;
};

export const handleNetworkOnly = async (
  apiCallback: Promise<AxiosResponse<any>>,
) => {
  let response: AxiosResponse<any>;
  try {
    response = await apiCallback;
    return response;
  } catch (error) {
    throw new Error(`Network ${error}`);
  }
};

export const handleCacheStrategy = (
  cacheStrategy: CacheStrategy,
  apiCallback: Promise<AxiosResponse<any>>,
  fetchURL: string,
) => {
  if (cacheStrategy === CacheStrategy.NETWORK_FIRST) {
    return handleNetworkFirst(apiCallback, fetchURL);
  }
  return handleNetworkOnly(apiCallback);
};
