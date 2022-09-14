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
    const timeoutKey = react_1.useRef(0);
    const timeoutKeyForFetch = react_1.useRef(0);
    const source = react_1.useRef(axios_1.default.CancelToken.source());
    const firstInit = react_1.useRef(true);
    const [loading, setLoading] = react_1.useState(false);
    const [polling, setPolling] = react_1.useState(false);
    const [requestError, setRequestError] = react_1.useState(null);
    const [leaderboardData, setLeaderboardData] = react_1.useState(initialData);
    const [suspend, setSuspend] = react_1.useState(false);
    const { cacheStrategy } = react_1.useMemo(() => cacheManager_service_1.getApiUrlStrategy(endpoint, cacheManager_service_1.HttpMethod.GET), []);
    const getDataRealTimeAPI = react_1.useCallback((apis = [], strategy) => () => __awaiter(void 0, void 0, void 0, function* () {
        setRequestError(null);
        if (firstInit.current) {
            setLoading(true);
        }
        else {
            setPolling(true);
        }
        const apiPromiseList = apis.map((type) => leaderboardEventory_service_1.getLeaderboardEventory({
            type,
            cancelToken: source.current.token,
            limit: opt.limit,
            cursor: opt.cursor,
            withoutOnliveInfo: opt.withoutOnliveInfo,
            strategy,
        }));
        try {
            const results = yield Promise.all(apiPromiseList);
            setLeaderboardData(results);
        }
        catch (error) {
            setRequestError(error);
        }
        finally {
            if (firstInit.current) {
                setLoading(false);
            }
            else {
                setPolling(false);
            }
            firstInit.current = false;
        }
    }), [opt.cursor, opt.limit, opt.withoutOnliveInfo]);
    const handleCacheStrategy = react_1.useCallback(() => {
        if (cacheStrategy !== cacheManager_service_1.CacheStrategy.CACHE_THEN_NETWORK) {
            const cacheStrategyFn = getDataRealTimeAPI(apiList, cacheStrategy);
            cacheStrategyFn();
        }
        if (cacheStrategy === cacheManager_service_1.CacheStrategy.CACHE_THEN_NETWORK) {
            const cacheOnlyFn = getDataRealTimeAPI(apiList, cacheManager_service_1.CacheStrategy.CACHE_ONLY);
            const networkThenSetCacheFn = getDataRealTimeAPI(apiList, cacheManager_service_1.CacheStrategy.NETWORK_THEN_SET_CACHE);
            cacheOnlyFn();
            networkThenSetCacheFn();
        }
    }, [apiList, cacheStrategy, getDataRealTimeAPI]);
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
    // 取得LB資料
    react_1.useEffect(() => {
        if (suspend)
            return;
        if (loading)
            return;
        if (polling)
            return;
        // 第一次取得LB資料
        if (!loading && firstInit.current) {
            handleCacheStrategy();
        }
        // 重複取得LB資料
        if (!polling && realTime > 0) {
            if (timeoutKey.current)
                clearTimeout(timeoutKey.current);
            timeoutKey.current = window.setTimeout(handleCacheStrategy, realTime);
        }
    }, [
        apiList,
        cacheStrategy,
        getDataRealTimeAPI,
        handleCacheStrategy,
        loading,
        polling,
        realTime,
        suspend,
    ]);
    return { loading, polling, requestError, leaderboardData };
};
exports.useTypeApi = useTypeApi;
exports.default = exports.useTypeApi;
//# sourceMappingURL=useTypeApi.js.map