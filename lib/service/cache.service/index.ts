/**
 * https://www.npmjs.com/package/node-cache
 */
// import NodeCache from 'node-cache';
// @eslint-ignore
import {
  set as idbSet,
  get as idbGet,
  del as idbDel,
  setMany as idbSetMany,
} from 'idb-keyval';
import store from 'store2';

const defaultTTL = 600; // seconds
const namespace = 'vmo-meta';

// const myCache = new NodeCache({ stdTTL: defaultTTL, checkperiod: 120 });

// cache service

interface Cache {
  key: string;
  value: unknown;
  ttl: string | number;
}

console.log(store);

const metaStore = store.namespace(namespace);

const idb = {
  set: idbSet,
  get: idbGet,
  del: idbDel,
  mset: idbSetMany,
};

const cacheService = (provider: typeof idb) => {
  // provider here is an abstraction of redis or in memory node
  // implement your logic

  // const set = (...args: [string, unknown, (string | number)?]) => {
  //   provider.set(...args);
  //   // return promise callback etc
  // };

  const checkPeriod: number = 10 * 1000;
  const metaPrefix = 'exp@';
  let timer;

  const setExp = (key: string, ttl: string | number) => {
    const expiredAt = Math.floor(Date.now() / 1000) + +ttl;
    metaStore.set(key, metaPrefix + expiredAt);
  };

  const parseExp = (value: string | undefined) => {
    if (!value || !value.startsWith(metaPrefix)) return 0;
    return +value.replace(metaPrefix, '');
  };

  const getExp = (key: string) => {
    const value = metaStore.get(key) as string | undefined;
    return parseExp(value);
  };

  const checkExpire = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    return now >= timestamp;
  };

  const set = (
    key: string,
    value: unknown,
    ttl: string | number = defaultTTL,
  ) => {
    setExp(key, ttl);
    return provider.set(key, value);
  };

  const get = <T>(key: string) => {
    // provider.get<T>(key)
    const expiredAt = getExp(key);
    const isExpired = checkExpire(expiredAt);
    if (isExpired) return;
    return provider.get<T>(key);
  };

  const del = (key: string) => {
    metaStore.remove(key);
    return provider.del(key);
  };

  const mset = (caches: Cache[]) => {
    const newArr: [string, string][] = [];

    caches.forEach((item, index) => {
      setExp(item.key, item.ttl ?? defaultTTL);
      newArr.push([item.key, item.value as string]);
    });

    return provider.mset(newArr);
  };

  // const mget = (keys: string[]) => {
  //   return provider.mget(keys);
  // };

  const tick = () => {
    window.requestIdleCallback(() => {
      console.log('tick check');

      const meta = metaStore.getAll();

      console.log('meta: ', meta);

      Object.keys(meta).forEach(key => {
        const value = meta[key];
        const expiredAt = parseExp(value);
        const isExpired = checkExpire(expiredAt);

        if (isExpired) window.requestIdleCallback(del.bind(this, key));
      });

      timer = setTimeout(tick, checkPeriod);
    });
  };

  (async function init() {
    timer = setTimeout(tick, checkPeriod);
  })();

  return {
    set,
    get,
    del,
  };
};

export default cacheService(idb);
