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
exports.getUserFollowers = void 0;
const axios_1 = require("./axios");
const DEFAULT_EACH_FOLLOWER_COUNT = 100;
const getUserFollowers = ({ userID, accessToken, cursor, count = DEFAULT_EACH_FOLLOWER_COUNT, callback, preData = [], }) => __awaiter(void 0, void 0, void 0, function* () {
    const axios = axios_1.getInstanceEventory();
    const url = `/v1/users/${userID}/followeeIDs`;
    const res = yield axios.get(url, {
        headers: {
            accessToken,
        },
        params: {
            count,
            cursor,
        },
    });
    const { nextCursor, followeeIDs } = res.data;
    const currentData = [...preData, ...followeeIDs];
    if (callback) {
        callback(currentData);
    }
    if (nextCursor) {
        const nextData = yield exports.getUserFollowers({
            userID,
            accessToken,
            cursor: nextCursor,
            callback,
            preData: currentData,
        });
        return [...followeeIDs, ...nextData];
    }
    return followeeIDs;
});
exports.getUserFollowers = getUserFollowers;
//# sourceMappingURL=follower.service.js.map