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
exports.useFollower = void 0;
const react_1 = require("react");
const follower_service_1 = require("../service/follower.service");
/**
 * 給 userID 跟 accessToken 來取得 user followers 追蹤名單<br />
 * @param userID 17 live 上的 account userID
 * @param accessToken 17 live 上的 account accessToken
 * @param jwtAccessToken 17 live 上的 account JWT
 * @returns 取得 followers 資料以及 errMsg 判斷是否有問題
 */
const useFollower = (userID, accessToken, jwtAccessToken) => {
    const [followers, setFollowers] = react_1.useState([]);
    const [errorMsg, setErrorMsg] = react_1.useState('');
    react_1.useEffect(() => {
        const fetchFollowers = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            try {
                const callback = (data) => {
                    setFollowers(data);
                };
                const data = yield follower_service_1.getUserFollowers({
                    userID,
                    accessToken,
                    jwtAccessToken,
                    callback,
                });
                setFollowers(data);
                setErrorMsg('');
            }
            catch (error) {
                setFollowers([]);
                if ((error === null || error === void 0 ? void 0 : error.response) && (error === null || error === void 0 ? void 0 : error.response.data)) {
                    setErrorMsg((_b = (_a = error === null || error === void 0 ? void 0 : error.response.data) === null || _a === void 0 ? void 0 : _a.errorMessage) !== null && _b !== void 0 ? _b : 'something wrong!');
                }
                else {
                    setErrorMsg('something wrong!');
                }
            }
        });
        fetchFollowers();
    }, [userID, accessToken, jwtAccessToken]);
    return { followers, errorMsg };
};
exports.useFollower = useFollower;
exports.default = exports.useFollower;
//# sourceMappingURL=useFollower.js.map