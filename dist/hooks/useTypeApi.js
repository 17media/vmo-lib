import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import { getLeaderboardEventory, } from '../service/leaderboardEventory.service';
import { CacheStrategy, getApiUrlStrategy, HttpMethod, checkCacheUsable, } from '../service/cacheManager.service';
import { sleep } from '../utils';
const endpoint = `/v1/leaderboards/eventory`;
export { CacheStrategy } from '../service/cacheManager.service';
/**
 * 取得 container 資料<br />
 * @param apiList APIType
 * @param realTime Request 自動重發更新間隔時間(ms), ex: 1000為一秒發送一次
 * @param initialData leaderboard 起始資料, 如果有1個containerID => [[]], 2個=> [[],[]]
 * @param opt limit: 一次取得多少筆資料<br />cursor: 上次資料的 offset, ex: 1627489719629532322:23:6:10-yCUQM_rqdi3kW6tu8p2uBgMcIJY=<br />withoutOnliveInfo: 是否取得 onliveInfo
 * @param cacheStrategy cacheStrategy: cache 策略
 *
 * @returns 取得 Container Leaderboard 資料以及 Loading 狀態
 */
export const useTypeApi = ({ apiList = [], realTime, initialData, cacheStrategy, opt = {
    limit: 1000,
    cursor: '',
    withoutOnliveInfo: false,
<<<<<<< Updated upstream
}, }) => {
    const [requestError, setRequestError] = react_1.useState();
    const [leaderboardData, setLeaderboardData] = react_1.useState(initialData);
    const [suspend, setSuspend] = react_1.useState(false);
    const [reload, setReload] = react_1.useState(false);
    const timeoutKey = react_1.useRef(0);
    const { limit, cursor, withoutOnliveInfo } = opt;
    const initialConfig = react_1.useMemo(() => ({
=======
}, env, }) => {
    const [requestError, setRequestError] = useState();
    const [leaderboardData, setLeaderboardData] = useState(initialData);
    const [suspend, setSuspend] = useState(false);
    const [reload, setReload] = useState(false);
    const timeoutKey = useRef(0);
    const { limit, cursor, withoutOnliveInfo } = opt;
    const initialConfig = useMemo(() => ({
>>>>>>> Stashed changes
        cacheData: [],
        networkData: [],
        options: [],
        sources: [],
    }), []);
    if (initialConfig.options.length !== apiList.length) {
        apiList.forEach(() => {
            initialConfig.cacheData = [...initialConfig.cacheData, []];
            initialConfig.networkData = [...initialConfig.networkData, []];
            initialConfig.options = [
                ...initialConfig.options,
                {
                    limit,
                    cursor,
                    withoutOnliveInfo,
                },
            ];
            initialConfig.sources = [
                ...initialConfig.sources,
                axios.CancelToken.source(),
            ];
        });
    }
<<<<<<< Updated upstream
    const [cacheData, setCacheData] = react_1.useState(initialConfig.cacheData);
    const [networkData, setNetworkData] = react_1.useState(initialConfig.networkData);
    const [options, setOptions] = react_1.useState(initialConfig.options);
    const [loading, setLoading] = react_1.useState(false);
    const [polling, setPolling] = react_1.useState(false);
    const sourceRef = react_1.useRef(initialConfig.sources);
    const isFirstInitRef = react_1.useRef(true);
    const isFirstInitErrorRef = react_1.useRef(false);
    const shouldDelayRef = react_1.useRef(false);
    const hasInitCacheRef = react_1.useRef(false);
    const finishedGetLBProcessRef = react_1.useRef(false);
    const reacquireCountRef = react_1.useRef(0);
    const finalCacheStrategyRef = react_1.useRef();
    const { cacheStrategy: defaultCacheStrategy } = react_1.useMemo(() => cacheManager_service_1.getApiUrlStrategy(endpoint, cacheManager_service_1.HttpMethod.GET), []);
    const getApiPromiseList = react_1.useCallback((apis = [], strategy) => apis
=======
    const [cacheData, setCacheData] = useState(initialConfig.cacheData);
    const [networkData, setNetworkData] = useState(initialConfig.networkData);
    const [options, setOptions] = useState(initialConfig.options);
    const [loading, setLoading] = useState(false);
    const [polling, setPolling] = useState(false);
    const sourceRef = useRef(initialConfig.sources);
    const isFirstInitRef = useRef(true);
    const isFirstInitErrorRef = useRef(false);
    const shouldDelayRef = useRef(false);
    const hasInitCacheRef = useRef(false);
    const finishedGetLBProcessRef = useRef(false);
    const reacquireCountRef = useRef(0);
    const finalCacheStrategyRef = useRef();
    const { cacheStrategy: defaultCacheStrategy } = useMemo(() => getApiUrlStrategy(endpoint, HttpMethod.GET), []);
    const getApiPromiseList = useCallback((strategy, apis = []) => apis
>>>>>>> Stashed changes
        .map((type, index) => {
        /**
         * 有 2 種情況會有下一次的 api promise
         * 1. 第一次讀取 (包含因為 realtime > 0 refresh() 時 first load 重設)
         * 2. 還未讀取完成，有回傳cursor
         * 其他情況都不需要api promise，回傳null，最後會filter掉
         * */
<<<<<<< Updated upstream
        if (isFirstInitRef.current || ((_a = options[index]) === null || _a === void 0 ? void 0 : _a.cursor)) {
            return leaderboardEventory_service_1.getLeaderboardEventory({
=======
        if (isFirstInitRef.current || options[index]?.cursor) {
            return getLeaderboardEventory({
>>>>>>> Stashed changes
                type,
                cancelToken: sourceRef.current[index].token,
                limit: options[index]?.limit,
                cursor: options[index]?.cursor,
                withoutOnliveInfo: options[index]?.withoutOnliveInfo,
                strategy,
            });
        }
        return undefined;
    })
        .filter((i) => Boolean(i)), [options]);
<<<<<<< Updated upstream
    const getRequestApiIndex = react_1.useCallback((apis = []) => apis
=======
    const getRequestApiIndex = useCallback((apis = []) => apis
>>>>>>> Stashed changes
        .map((_, index) => {
        if (isFirstInitRef.current || options[index]?.cursor) {
            return index;
        }
        return undefined;
    })
        .filter((i) => Number.isFinite(i)), [options]);
<<<<<<< Updated upstream
    const setOthersStrategyData = react_1.useCallback((results, requestApiIndex) => {
=======
    const setOthersStrategyData = useCallback((results, requestApiIndex) => {
>>>>>>> Stashed changes
        setNetworkData(pre => {
            if (!pre)
                return results.map(result => result.data.data.data);
            const newData = pre.map((preResult, index) => {
                const foundIndex = requestApiIndex.findIndex(targetIndex => index === targetIndex);
                const nextData = results[foundIndex]?.data?.data?.data;
                const combineData = foundIndex >= 0 && nextData && preResult
                    ? [...preResult, ...nextData]
                    : preResult;
                return combineData;
            });
            return newData;
        });
        return results;
    }, []);
<<<<<<< Updated upstream
    const setCacheThenNetworkData = react_1.useCallback((results, requestApiIndex) => __awaiter(void 0, void 0, void 0, function* () {
=======
    const setCacheThenNetworkData = useCallback(async (results, requestApiIndex) => {
>>>>>>> Stashed changes
        /**
         * CacheStrategy === CACHE_THEN_NETWORK
         * 首筆資料一定是先使用 cache，之後的資料是看 callbackResponses 回應模式
         * */
        setCacheData(pre => {
            const newData = pre.map((preResult, index) => {
                const foundIndex = requestApiIndex.findIndex(targetIndex => index === targetIndex);
                const nextCache = results[foundIndex]?.data?.data?.data;
                if (foundIndex >= 0 && nextCache && preResult) {
                    hasInitCacheRef.current = true;
                    return [...preResult, ...nextCache];
                }
                return preResult;
            });
            return newData;
        });
        if (isFirstInitRef.current && hasInitCacheRef.current) {
            setLoading(false);
        }
        // 如果需要 delay 下一次的 request，且不是一開始就斷網，執行 delay
        if (!isFirstInitErrorRef.current && shouldDelayRef.current) {
            yield utils_1.sleep(1000);
            setReload(false);
<<<<<<< Updated upstream
=======
            await sleep(1000);
>>>>>>> Stashed changes
        }
        const networkCallbacks = results.map(result => result.callback);
        const callbackResponses = await Promise.all(networkCallbacks);
        // 紀錄是否一開始就斷網, 只要其中一個出錯就當作全部有問題
        const callbacksError = callbackResponses.some(callbackRes => callbackRes?.error);
        if (callbacksError && isFirstInitRef.current) {
            isFirstInitErrorRef.current = true;
        }
        // 紀錄是否需要 delay 下一次的 request
        shouldDelayRef.current = callbacksError;
        if (!isFirstInitErrorRef.current && shouldDelayRef.current) {
            setReload(true);
        }
        /**
         * 理想情況：dataSource = 'data'
         * 一開始立即顯示 cache data(100筆), 然後 network api 每一百筆更新畫面一次, 整個取代
         * 讀到一半斷網：同理想情況, api 沒回來就不處理 例如顯示到500筆就是500筆
         * 如果有其中一個api error沒有回傳data，就完全不更新資料，等到下一次callback成功才更新
         *
         * 一開始就斷網: dataSource = 'cache'
         * 立即顯示 cache data(all) 全部，只有一開始就斷網會使用 cache 剩餘的資料
         * 讀到一半斷網雖然也會回傳 callbackResponses?.error，但不是一開始就斷網，所以不會set cache data，會一直重新觸發load()
         * */
        const dataSource = isFirstInitErrorRef.current ? 'cache' : 'data';
        setNetworkData(pre => {
            const newData = pre.map((preResult, index) => {
                const foundIndex = requestApiIndex.findIndex(targetIndex => index === targetIndex);
                const nextData = callbackResponses[foundIndex]?.[dataSource]?.data.data;
                const combineData = foundIndex >= 0 && nextData && preResult
                    ? [...preResult, ...nextData]
                    : preResult;
                return combineData;
            });
            return newData;
        });
        return callbackResponses;
<<<<<<< Updated upstream
    }), []);
    const getNextOptions = react_1.useCallback((results, requestApiIndex, strategy) => options.map((option, index) => {
=======
    }, []);
    const getNextOptions = useCallback((results, requestApiIndex, strategy) => options.map((option, index) => {
>>>>>>> Stashed changes
        const foundIndex = requestApiIndex.findIndex(targetIndex => index === targetIndex);
        if (foundIndex >= 0) {
            const dataSource = isFirstInitErrorRef.current ? 'cache' : 'data';
            const { nextCursor } = results[foundIndex][dataSource].data;
            return {
                limit: opt.limit,
                cursor: nextCursor,
                withoutOnliveInfo: opt.withoutOnliveInfo,
            };
        }
        return option;
    }), [opt.limit, opt.withoutOnliveInfo, options]);
<<<<<<< Updated upstream
    const handleLeaderboardData = react_1.useCallback((apis = []) => __awaiter(void 0, void 0, void 0, function* () {
=======
    const handleLeaderboardData = useCallback(async (apis = []) => {
>>>>>>> Stashed changes
        setRequestError(undefined);
        const loadingStatus = isFirstInitRef.current && reacquireCountRef.current < 1;
        setLoading(loadingStatus);
        setPolling(true);
        if (cacheStrategy === CacheStrategy.NETWORK_ONLY) {
            finalCacheStrategyRef.current = cacheStrategy;
        }
        if (!finalCacheStrategyRef.current) {
<<<<<<< Updated upstream
            const isCacheSupported = yield cacheManager_service_1.checkCacheUsable();
=======
            const isCacheSupported = await checkCacheUsable();
>>>>>>> Stashed changes
            finalCacheStrategyRef.current = isCacheSupported
                ? cacheStrategy ?? defaultCacheStrategy
                : CacheStrategy.NETWORK_ONLY;
        }
        const apiPromiseList = getApiPromiseList(apis, finalCacheStrategyRef.current);
        if (!apiPromiseList.length)
            return;
        const requestApiIndex = getRequestApiIndex(apis);
        finishedGetLBProcessRef.current = false;
        let nextOptions = [];
        try {
            const results = (await Promise.all(apiPromiseList));
            /**
             * CacheStrategy === NETWORK_ONLY, NETWORK_FIRST
             * */
            if (finalCacheStrategyRef.current !== CacheStrategy.CACHE_THEN_NETWORK) {
                const responses = setOthersStrategyData(results, requestApiIndex);
                nextOptions = getNextOptions(responses, requestApiIndex, finalCacheStrategyRef.current);
                return;
            }
            /**
             * CacheStrategy === CACHE_THEN_NETWORK
             * */
            const responses = await setCacheThenNetworkData(results, requestApiIndex);
            nextOptions = getNextOptions(responses, requestApiIndex, finalCacheStrategyRef.current);
        }
        catch (error) {
            setRequestError(error);
            if (finalCacheStrategyRef.current !== CacheStrategy.CACHE_THEN_NETWORK) {
                setOptions(initialConfig.options);
            }
        }
        finally {
            setLoading(false);
            setPolling(false);
            isFirstInitRef.current = false;
            if (nextOptions.length > 0 &&
                (isFirstInitErrorRef.current || !shouldDelayRef.current)) {
                setOptions(nextOptions);
            }
            finishedGetLBProcessRef.current = true;
        }
    }, [
        cacheStrategy,
        defaultCacheStrategy,
        getApiPromiseList,
        getNextOptions,
        getRequestApiIndex,
        initialConfig.options,
        setCacheThenNetworkData,
        setOthersStrategyData,
    ]);
<<<<<<< Updated upstream
    const handleLeaderboardDataStrategy = react_1.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        handleLeaderboardData(apiList);
    }), [apiList, handleLeaderboardData]);
    const refresh = react_1.useCallback(() => {
=======
    const handleLeaderboardDataStrategy = useCallback(async () => {
        handleLeaderboardData(apiList);
    }, [apiList, handleLeaderboardData]);
    const refresh = useCallback(() => {
>>>>>>> Stashed changes
        setCacheData(initialConfig.cacheData);
        setNetworkData(initialConfig.networkData);
        isFirstInitRef.current = true;
        isFirstInitErrorRef.current = false;
        handleLeaderboardDataStrategy();
    }, [handleLeaderboardDataStrategy, initialConfig]);
<<<<<<< Updated upstream
    const getFinishedRetrievedAllNetworkData = react_1.useCallback(() => networkData === null || networkData === void 0 ? void 0 : networkData.every((data, index) => {
        var _a;
=======
    const getFinishedRetrievedAllNetworkData = useCallback(() => networkData?.every((data, index) => {
>>>>>>> Stashed changes
        // 需要確保option已經被設定完成
        if (!finishedGetLBProcessRef.current)
            return false;
        const nextCursor = options[index]?.cursor;
        // 有cursor時，看回傳的network資料長度是不是已經達到total count，達到代表以經將此次的資料讀取完成
        if (nextCursor) {
            const [timestampCursor] = nextCursor.split('-', 1);
            const totalCount = timestampCursor.split(':').slice(1)[0];
            return networkData[index].length === +totalCount;
        }
        // 沒有cursor時，表示單次api就可以取得完成，直接回傳true
        return true;
    }), [networkData, options]);
    /**
     * 讀到一半斷網：重新執行 geLeaderboardData
     * */
<<<<<<< Updated upstream
    react_1.useEffect(() => {
=======
    useEffect(() => {
>>>>>>> Stashed changes
        if (reload) {
            handleLeaderboardDataStrategy();
        }
    }, [apiList, handleLeaderboardData, handleLeaderboardDataStrategy, reload]);
<<<<<<< Updated upstream
    react_1.useEffect(() => {
=======
    useEffect(() => {
>>>>>>> Stashed changes
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                setSuspend(true);
            }
            else {
                setSuspend(false);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
<<<<<<< Updated upstream
    // 計數每次重新取得全部資料
    react_1.useEffect(() => {
=======
    useEffect(() => {
        if (isFirstInitRef.current && hasInitCacheRef.current) {
            setLoading(false);
        }
    }, [cacheData, initialConfig.cacheData]);
    // 計數每次重新取得全部資料
    useEffect(() => {
>>>>>>> Stashed changes
        const finishedRetrievedAllNetworkData = getFinishedRetrievedAllNetworkData();
        if (finishedRetrievedAllNetworkData && networkData.length > 0) {
            reacquireCountRef.current += 1;
        }
    }, [networkData, getFinishedRetrievedAllNetworkData]);
<<<<<<< Updated upstream
    react_1.useEffect(() => {
=======
    useEffect(() => {
>>>>>>> Stashed changes
        const canSetNetworkData = networkData.some(data => data.length > 0);
        const dataSource = canSetNetworkData ? networkData : cacheData;
        // 全部資料只取1次(不需自動重發api更新資料)
        if (realTime <= 0) {
            setLeaderboardData(dataSource);
            return;
        }
        // 全部資料按時間重新取得(需自動重發api更新資料)
        const finishedAll = options.every(option => !option.cursor);
        // 當首次還未取得全部資料時，讓資料慢慢更新上畫面
        if (reacquireCountRef.current === 0) {
            setLeaderboardData(dataSource);
        }
        else if (reacquireCountRef.current > 0) {
            // 當已經取得全部資料時，等資料全部拿完之後再一起更新
            if (finishedAll && finishedGetLBProcessRef.current && canSetNetworkData)
                setLeaderboardData(networkData);
        }
    }, [networkData, cacheData, options, realTime, apiList]);
    // 當需要取得更多資料時，使用最新的options重新執行handleLeaderboardData
<<<<<<< Updated upstream
    react_1.useEffect(() => {
=======
    useEffect(() => {
>>>>>>> Stashed changes
        const hasMore = options.find(option => option.cursor);
        if (hasMore) {
            handleLeaderboardDataStrategy();
        }
    }, [handleLeaderboardDataStrategy, options]);
    // 重複取得LB資料
<<<<<<< Updated upstream
    react_1.useEffect(() => {
=======
    useEffect(() => {
>>>>>>> Stashed changes
        if (polling || suspend)
            return;
        const finishedRetrievedAllNetworkData = getFinishedRetrievedAllNetworkData();
        if (!polling &&
            realTime > 0 &&
            !isFirstInitRef.current &&
            finishedRetrievedAllNetworkData) {
            if (timeoutKey.current) {
                clearTimeout(timeoutKey.current);
                timeoutKey.current = 0;
            }
            timeoutKey.current = window.setTimeout(refresh, realTime);
        }
    }, [getFinishedRetrievedAllNetworkData, polling, realTime, refresh, suspend]);
    // init handleLeaderboardDataStrategy
<<<<<<< Updated upstream
    react_1.useEffect(() => {
=======
    useEffect(() => {
>>>>>>> Stashed changes
        if (suspend || !isFirstInitRef.current)
            return;
        handleLeaderboardDataStrategy();
    }, [handleLeaderboardDataStrategy, suspend]);
    return {
        loading,
        polling,
        requestError,
        leaderboardData,
    };
};
export default useTypeApi;
//# sourceMappingURL=useTypeApi.js.map