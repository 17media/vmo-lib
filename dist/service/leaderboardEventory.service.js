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
const url = `/v1/leaderboards/eventory`;
const getLeaderboardEventory = (type, cancelToken, limit = 1000, cursor = '', method = 'POST', withoutOnliveInfo, callBack = (data) => { }, preData = []) => __awaiter(void 0, void 0, void 0, function* () {
    const axios = axios_1.getInstanceEventory();
    const body = { type: utils_1.getType(type), count: limit, cursor };
    let res;
    if (method === 'POST') {
        res = yield axios.post(url, body, { cancelToken });
    }
    else {
        res = yield axios.get(url, {
            params: {
                containerID: utils_1.getType(type),
                count: limit,
                cursor,
                withoutOnliveInfo,
            },
            cancelToken,
        });
    }
    const { nextCursor, data = [] } = res.data;
    const currentData = [...preData, ...data];
    if (callBack) {
        callBack(currentData);
    }
    if (nextCursor) {
        const nextData = yield exports.getLeaderboardEventory(type, cancelToken, limit, nextCursor, method, withoutOnliveInfo, callBack, currentData);
        return [...data, ...nextData];
    }
    return data;
});
exports.getLeaderboardEventory = getLeaderboardEventory;
exports.default = exports.getLeaderboardEventory;
//# sourceMappingURL=leaderboardEventory.service.js.map