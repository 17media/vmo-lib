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
const endpoint = `/v1/leaderboards/eventory`;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["TIMEOUT"] = "ECONNABORTED";
})(ErrorCode || (ErrorCode = {}));
const CANCEL_TIME_OUT = 5000;
const getLeaderboardEventory = ({ type, cancelToken, limit = 1000, cursor = '', withoutOnliveInfo, callback, preData = [], }) => __awaiter(void 0, void 0, void 0, function* () {
    const eventoryApi = axios_1.getInstanceEventory();
    if (!withoutOnliveInfo) {
        const responseHandler = (response) => response;
        const errorHandler = (error) => {
            var _a;
            if ((error === null || error === void 0 ? void 0 : error.code) === ErrorCode.TIMEOUT) {
                const payload = (_a = error === null || error === void 0 ? void 0 : error.config) === null || _a === void 0 ? void 0 : _a.params;
                if (!payload.withoutOnliveInfo) {
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
    const { data: resonseData } = yield eventoryApi.get(endpoint, {
        params: {
            containerID: utils_1.getType(type),
            count: limit,
            cursor,
            withoutOnliveInfo,
        },
        cancelToken,
    });
    const { nextCursor, data = [] } = resonseData;
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