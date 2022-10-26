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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTypeApi = void 0;
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const leaderboardEventory_service_1 = require("../service/leaderboardEventory.service");
const cacheManager_service_1 = require("../service/cacheManager.service");
const utils_1 = require("../utils");
const endpoint = `/v1/leaderboards/eventory`;
/**
 * 取得 container 資料<br />
 * @param apiList APIType
 * @param method HTTP Method, Legacy 可棄用
 * @param realTime Request 自動重發更新間隔時間(ms), ex: 1000為一秒發送一次
 * @param initialData leaderboard 起始資料, 如果有1個containerID => [[]], 2個=> [[],[]]
 * @param opt limit: 一次取得多少筆資料<br />cursor: 上次資料的 offset, ex: 1627489719629532322:23:6:10-yCUQM_rqdi3kW6tu8p2uBgMcIJY=<br />withoutOnliveInfo: 是否取得 onliveInfo
 *
 * @returns 取得 Container Leaderboard 資料以及 Loading 狀態
 */
const useTypeApi = (apiList = [], method = 'GET', realTime, initialData, opt = {
    limit: 1000,
    cursor: '',
    withoutOnliveInfo: false,
}) => {
    const [requestError, setRequestError] = react_1.useState(null);
    const [leaderboardData, setLeaderboardData] = react_1.useState(initialData);
    const [suspend, setSuspend] = react_1.useState(false);
    const [reload, setReload] = react_1.useState(false);
    const timeoutKey = react_1.useRef(0);
    const { limit, cursor, withoutOnliveInfo } = opt;
    const initialConfig = react_1.useMemo(() => ({
        cacheData: [],
        networkData: [],
        options: [],
        sources: [],
    }), []);
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
            axios_1.default.CancelToken.source(),
        ];
    });
    const [cacheData, setCacheData] = react_1.useState(initialConfig.cacheData);
    const [networkData, setNetworkData] = react_1.useState(initialConfig.networkData);
    const [options, setOptions] = react_1.useState(initialConfig.options);
    const sourceRef = react_1.useRef(initialConfig.sources);
    const isFirstInitRef = react_1.useRef(true);
    const isFirstInitErrorRef = react_1.useRef(false);
    const shouldDelayRef = react_1.useRef(false);
    const hasInitCacheRef = react_1.useRef(false);
    const loadingRef = react_1.useRef(false);
    const pollingRef = react_1.useRef(false);
    const finishedGetLBProcessRef = react_1.useRef(false);
    const reacquireCountRef = react_1.useRef(0);
    const { cacheStrategy } = react_1.useMemo(() => cacheManager_service_1.getApiUrlStrategy(endpoint, cacheManager_service_1.HttpMethod.GET), []);
    const getLeaderboardData = react_1.useCallback((apis = [], strategy) => __awaiter(void 0, void 0, void 0, function* () {
        setRequestError(null);
        const apiPromiseList = apis
            .map((type, index) => {
            var _a, _b, _c, _d;
            /**
             * 有 2 種情況會有下一次的 api promise
             * 1. 第一次讀取 (包含因為 realtime > 0 refresh() 時 first load 重設)
             * 2. 還未讀取完成，有回傳cursor
             * 其他情況都不需要api promise，回傳null，最後會filter掉
             * */
            if (isFirstInitRef.current || ((_a = options[index]) === null || _a === void 0 ? void 0 : _a.cursor)) {
                return leaderboardEventory_service_1.getLeaderboardEventory({
                    type,
                    cancelToken: sourceRef.current[index].token,
                    limit: (_b = options[index]) === null || _b === void 0 ? void 0 : _b.limit,
                    cursor: (_c = options[index]) === null || _c === void 0 ? void 0 : _c.cursor,
                    withoutOnliveInfo: (_d = options[index]) === null || _d === void 0 ? void 0 : _d.withoutOnliveInfo,
                    strategy,
                });
            }
            return null;
        })
            .filter(Boolean);
        const requestApiIndex = apis
            .map((_, index) => {
            var _a;
            if (isFirstInitRef.current || ((_a = options[index]) === null || _a === void 0 ? void 0 : _a.cursor)) {
                return index;
            }
            return -1;
        })
            .filter(index => index >= 0);
        if (!apiPromiseList.length)
            return;
        finishedGetLBProcessRef.current = false;
        loadingRef.current =
            isFirstInitRef.current && reacquireCountRef.current < 1;
        pollingRef.current = true;
        let nextOptions = [];
        try {
            const results = yield Promise.all(apiPromiseList);
            if (cacheStrategy !== cacheManager_service_1.CacheStrategy.CACHE_THEN_NETWORK) {
                setLeaderboardData(results.map(result => result.data.data));
                return;
            }
            /**
             * CacheStrategy === CACHE_THEN_NETWORK
             * 首筆資料一定是先使用 cache，之後的資料是看 callbackResponses 回應模式
             * */
            setCacheData(pre => pre.map((preResult, index) => {
                var _a, _b;
                const findIndex = requestApiIndex.findIndex(targetIndex => index === targetIndex);
                if (findIndex >= 0 && ((_b = (_a = results[findIndex].data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data)) {
                    hasInitCacheRef.current = true;
                    const nextCache = [...results[findIndex].data.data.data];
                    return [...preResult, ...nextCache];
                }
                return [];
            }));
            if (isFirstInitRef.current && hasInitCacheRef.current) {
                loadingRef.current = false;
            }
            // 如果需要 delay 下一次的 request，且不是一開始就斷網，執行 delay
            if (!isFirstInitErrorRef.current && shouldDelayRef.current) {
                yield utils_1.sleep(1000);
                setReload(false);
            }
            const networkCallbacks = results.map(result => result.callback);
            const callbackResponses = yield Promise.all(networkCallbacks);
            // 紀錄是否一開始就斷網, 只要其中一個出錯就當作全部有問題
            const callbacksError = callbackResponses.some(callbackRes => callbackRes.error);
            if (callbacksError && isFirstInitRef.current) {
                isFirstInitErrorRef.current = true;
            }
            // 紀錄是否需要 delay 下一次的 request
            shouldDelayRef.current = callbacksError;
            if (!isFirstInitErrorRef.current && shouldDelayRef.current) {
                setReload(true);
            }
            /**
             * 理想情況：一開始立即顯示 cache data(100筆), 然後 network api 每一百筆更新畫面一次, 整個取代
             * 讀到一半斷網：同理想情況, api 沒回來就不處理 例如顯示到500筆就是500筆
             * 如果有其中一個api error沒有回傳data，就完全不更新資料，等到下一次callback成功才更新
             * */
            if (!isFirstInitErrorRef.current) {
                setNetworkData(pre => pre.map((preResult, index) => {
                    var _a, _b;
                    const findIndex = requestApiIndex.findIndex(targetIndex => index === targetIndex);
                    if (findIndex >= 0 &&
                        ((_b = (_a = callbackResponses[findIndex].data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data)) {
                        const nextData = [
                            ...callbackResponses[findIndex].data.data.data,
                        ];
                        return [...preResult, ...nextData];
                    }
                    return [];
                }));
            }
            /**
             * 一開始就斷網: 立即顯示 cache data(all) 全部，只有一開始就斷網會使用 cache 剩餘的資料
             * 讀到一半斷網雖然也會回傳 callbackResponses?.error，但不是一開始就斷網，所以不會set cache data，會一直重新觸發load()
             * */
            if (isFirstInitErrorRef.current) {
                setNetworkData(pre => pre.map((preResult, index) => {
                    var _a, _b;
                    const findIndex = requestApiIndex.findIndex(targetIndex => index === targetIndex);
                    if (findIndex >= 0 &&
                        ((_b = (_a = callbackResponses[findIndex].cache) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data)) {
                        const nextCache = [
                            ...callbackResponses[findIndex].cache.data.data,
                        ];
                        return [...preResult, ...nextCache];
                    }
                    return [];
                }));
            }
            nextOptions = options.map((option, index) => {
                const findIndex = requestApiIndex.findIndex(targetIndex => index === targetIndex);
                if (findIndex >= 0) {
                    const nextCursor = isFirstInitErrorRef.current
                        ? callbackResponses[findIndex].cache.data.nextCursor
                        : callbackResponses[findIndex].data.data.nextCursor;
                    return {
                        limit: opt.limit,
                        cursor: nextCursor,
                        withoutOnliveInfo: opt.withoutOnliveInfo,
                    };
                }
                return option;
            });
        }
        catch (error) {
            setRequestError(error);
        }
        finally {
            loadingRef.current = false;
            pollingRef.current = false;
            isFirstInitRef.current = false;
            if (isFirstInitErrorRef.current || !shouldDelayRef.current) {
                setOptions(nextOptions);
            }
            finishedGetLBProcessRef.current = true;
        }
    }), [cacheStrategy, opt.limit, opt.withoutOnliveInfo, options]);
    const refresh = react_1.useCallback(() => {
        setCacheData(initialConfig.cacheData);
        setNetworkData(initialConfig.networkData);
        isFirstInitRef.current = true;
        isFirstInitErrorRef.current = false;
        getLeaderboardData(apiList, cacheStrategy);
    }, [apiList, cacheStrategy, getLeaderboardData, initialConfig]);
    /**
     * 讀到一半斷網：重新執行 geLeaderboardData
     * */
    react_1.useEffect(() => {
        if (reload) {
            getLeaderboardData(apiList, cacheStrategy);
        }
    }, [apiList, cacheStrategy, getLeaderboardData, reload]);
    react_1.useEffect(() => {
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
    // 計數每次重新取得全部資料
    react_1.useEffect(() => {
        const finishedRetrievedAllNetworkData = networkData === null || networkData === void 0 ? void 0 : networkData.every((data, index) => {
            var _a;
            // 需要確保option已經被設定完成
            if (!finishedGetLBProcessRef.current)
                return false;
            const nextCursor = (_a = options[index]) === null || _a === void 0 ? void 0 : _a.cursor;
            // 有cursor時，看回傳的network資料長度是不是已經達到total count，達到代表以經將此次的資料讀取完成
            if (nextCursor) {
                const [timestampCursor] = nextCursor.split('-', 1);
                const totalCount = timestampCursor.split(':').slice(1)[0];
                return networkData[index].length === +totalCount;
            }
            // 沒有cursor時，表示單次api就可以取得完成，直接回傳true
            return true;
        });
        if (finishedRetrievedAllNetworkData && networkData.length > 0)
            reacquireCountRef.current += 1;
    }, [networkData, options]);
    react_1.useEffect(() => {
        if (cacheStrategy === cacheManager_service_1.CacheStrategy.CACHE_THEN_NETWORK) {
            const canSetNetworkData = networkData.some(data => data.length > 0);
            // 全部資料只取1次(不需自動重發api更新資料)
            if (realTime <= 0) {
                if (canSetNetworkData) {
                    setLeaderboardData(networkData);
                }
                else {
                    setLeaderboardData(cacheData);
                }
                return;
            }
            // 全部資料按時間重新取得(需自動重發api更新資料)
            const finishedAll = options.every(option => !option.cursor);
            // 當首次還未取得全部資料時，讓資料慢慢更新上畫面
            if (reacquireCountRef.current === 0) {
                if (canSetNetworkData) {
                    setLeaderboardData(networkData);
                }
                else {
                    setLeaderboardData(cacheData);
                }
            }
            // 當已經取得全部資料時，等資料全部拿完之後再一起更新
            if (reacquireCountRef.current > 0 &&
                finishedAll &&
                finishedGetLBProcessRef.current &&
                canSetNetworkData) {
                setLeaderboardData(networkData);
            }
        }
    }, [networkData, cacheData, options, realTime, apiList, cacheStrategy]);
    react_1.useEffect(() => {
        if (loadingRef.current || pollingRef.current || suspend)
            return;
        // init getLeaderboardData
        if (isFirstInitRef.current)
            getLeaderboardData(apiList, cacheStrategy);
        // 當需要取得更多資料時，使用最新的options重新執行getLeaderboardData
        const hasMore = options.find(option => option.cursor);
        if (hasMore) {
            getLeaderboardData(apiList, cacheStrategy);
        }
        // 重複取得LB資料
        if (!pollingRef.current && realTime > 0) {
            if (timeoutKey.current)
                clearTimeout(timeoutKey.current);
            timeoutKey.current = window.setTimeout(refresh, realTime);
        }
    }, [
        options,
        apiList,
        cacheStrategy,
        getLeaderboardData,
        suspend,
        realTime,
        refresh,
    ]);
    return {
        loading: loadingRef.current,
        polling: pollingRef.current,
        requestError,
        leaderboardData,
    };
};
exports.useTypeApi = useTypeApi;
exports.default = exports.useTypeApi;
//# sourceMappingURL=useTypeApi.js.map