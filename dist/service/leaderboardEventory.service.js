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
exports.getLeaderboardEventory = void 0;
const axios_1 = require("./axios");
const utils_1 = require("../utils");
const cacheManager_service_1 = require("./cacheManager.service");
const endpoint = `/v1/leaderboards/eventory`;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["TIMEOUT"] = "ECONNABORTED";
})(ErrorCode || (ErrorCode = {}));
const CANCEL_TIME_OUT = 5000;
const getFetchURL = ({ apiEndpoint, type, limit, cursor, withoutOnliveInfo, }) => {
    const baseURL = window.location.hostname === 'vmo.17.media'
        ? 'https://api.17app.co/api'
        : 'https://sta-api.17app.co/api';
    const fetchURL = new URL(baseURL + apiEndpoint);
    const params = {
        containerID: utils_1.getType(type),
        count: limit,
        cursor,
        withoutOnliveInfo,
    };
    Object.keys(params).forEach(key => {
        const value = params[key];
        if (value) {
            fetchURL.searchParams.append(key, value.toString());
        }
    });
    return fetchURL.toString();
};
const getLBDataCallback = ({ apiEndpoint, eventoryApi, type, limit, cursor, withoutOnliveInfo, cancelToken, }) => eventoryApi.get(apiEndpoint, {
    params: {
        containerID: utils_1.getType(type),
        count: limit,
        cursor,
        withoutOnliveInfo,
    },
    cancelToken,
});
const cachedApiData = ({ cacheStrategy, apiEndpoint, eventoryApi, type, limit, cursor, withoutOnliveInfo, cancelToken, }) => {
    const fetchURL = getFetchURL({
        apiEndpoint,
        type,
        limit,
        cursor,
        withoutOnliveInfo,
    });
    return cacheManager_service_1.handleCacheStrategy({
        cacheStrategy,
        apiCallback: getLBDataCallback({
            apiEndpoint,
            type,
            limit,
            cursor,
            withoutOnliveInfo,
            cancelToken,
            eventoryApi,
        }),
        fetchURL,
    });
};
const getLeaderboardEventory = ({ type, cancelToken, limit = 1000, cursor = '', withoutOnliveInfo, callback, preData = [], }) => __awaiter(void 0, void 0, void 0, function* () {
    const eventoryApi = axios_1.getInstanceEventory();
    if (!withoutOnliveInfo) {
        const responseHandler = (response) => response;
        const errorHandler = (error) => {
            var _a;
            if ((error === null || error === void 0 ? void 0 : error.code) === ErrorCode.TIMEOUT) {
                const payload = (_a = error === null || error === void 0 ? void 0 : error.config) === null || _a === void 0 ? void 0 : _a.params;
                if (!payload.withoutOnliveInfo) {
                    delete eventoryApi.defaults.timeout;
                    return eventoryApi.get(endpoint, {
                        params: Object.assign(Object.assign({}, payload), { withoutOnliveInfo: true }),
                        cancelToken,
                    });
                }
            }
            return Promise.reject(error);
        };
        eventoryApi.defaults.timeout = CANCEL_TIME_OUT;
        eventoryApi.interceptors.response.use(responseHandler, errorHandler);
    }
    const { cacheStrategy } = cacheManager_service_1.getApiUrlStrategy(endpoint, cacheManager_service_1.HttpMethod.GET);
    const { data: responseData } = yield cachedApiData({
        cacheStrategy,
        apiEndpoint: endpoint,
        type,
        limit,
        cursor,
        withoutOnliveInfo,
        cancelToken,
        eventoryApi,
    });
    const { nextCursor, data = [] } = responseData;
    const currentData = [...preData, ...data];
    if (callback)
        callback(currentData);
    if (nextCursor) {
        const nextPayload = {
            type,
            cancelToken,
            limit,
            cursor: nextCursor,
            withoutOnliveInfo,
            callback,
            preData: currentData,
        };
        const nextData = yield exports.getLeaderboardEventory(nextPayload);
        return [...data, ...nextData];
    }
    return data;
});
exports.getLeaderboardEventory = getLeaderboardEventory;
exports.default = exports.getLeaderboardEventory;
//# sourceMappingURL=leaderboardEventory.service.js.map