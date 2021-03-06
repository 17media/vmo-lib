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
    const source = react_1.useRef();
    const [loading, setLoading] = react_1.useState(false);
    const [polling, setPolling] = react_1.useState(false);
    const [requestError, setRequestError] = react_1.useState(null);
    const [leaderboardData, setLeaderboardData] = react_1.useState(initialData);
    const getDataRealTimeAPI = react_1.useCallback((apis = [], time, previousData) => {
        const pollingProcess = () => __awaiter(void 0, void 0, void 0, function* () {
            setRequestError(null);
            setPolling(true);
            const apiPromiseList = apis.map((type) => leaderboardEventory_service_1.getLeaderboardEventory({
                type,
                cancelToken: source.current.token,
                limit: opt.limit,
                cursor: opt.cursor,
                withoutOnliveInfo: opt.withoutOnliveInfo,
            }));
            try {
                const results = yield Promise.all(apiPromiseList);
                setLeaderboardData(results);
            }
            catch (error) {
                setRequestError(error);
            }
            finally {
                setPolling(false);
            }
        });
        timeoutKey.current = window.setTimeout(pollingProcess, time);
    }, [opt.cursor, opt.limit, opt.withoutOnliveInfo]);
    react_1.useEffect(() => {
        if (!apiList.length)
            return;
        function promiseAll(promiseList) {
            return __awaiter(this, void 0, void 0, function* () {
                setLoading(true);
                setRequestError(null);
                try {
                    const results = yield Promise.all(promiseList);
                    setLeaderboardData(results);
                }
                catch (error) {
                    setRequestError(error);
                }
                finally {
                    setLoading(false);
                }
            });
        }
        source.current = axios_1.default.CancelToken.source();
        const callback = (item) => (data) => {
            setLoading(false);
            const index = apiList.findIndex(value => value.sta === item.sta);
            setLeaderboardData(prev => {
                if (prev) {
                    prev[index] = [...data];
                    return [...prev];
                }
            });
        };
        const apiPromiseList = apiList.map(type => leaderboardEventory_service_1.getLeaderboardEventory({
            type,
            cancelToken: source.current.token,
            limit: opt.limit,
            cursor: opt.cursor,
            withoutOnliveInfo: opt.withoutOnliveInfo,
            callback: callback(type),
        }));
        promiseAll(apiPromiseList);
        return () => {
            if (source.current)
                source.current.cancel();
            if (timeoutKey.current)
                clearTimeout(timeoutKey.current);
        };
    }, [apiList, opt.cursor, opt.limit, opt.withoutOnliveInfo]);
    react_1.useEffect(() => {
        if (!polling && realTime > 0) {
            clearTimeout(timeoutKey.current);
            timeoutKey.current = 0;
            getDataRealTimeAPI(apiList, realTime, leaderboardData);
        }
    }, [polling, leaderboardData, apiList, realTime, getDataRealTimeAPI]);
    return { loading, polling, requestError, leaderboardData };
};
exports.useTypeApi = useTypeApi;
exports.default = exports.useTypeApi;
//# sourceMappingURL=useTypeApi.js.map