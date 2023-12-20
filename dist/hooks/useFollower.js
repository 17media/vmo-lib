import { useState, useEffect } from 'react';
import { getUserFollowers } from '../service/follower.service';
/**
 * 給 userID 跟 accessToken 來取得 user followers 追蹤名單<br />
 * @param userID 17 live 上的 account userID
 * @param accessToken 17 live 上的 account accessToken
 * @param jwtAccessToken 17 live 上的 account JWT
 * @returns 取得 followers 資料以及 errMsg 判斷是否有問題
 */
<<<<<<< Updated upstream
const useFollower = (userID, accessToken, jwtAccessToken) => {
    const [followers, setFollowers] = react_1.useState([]);
    const [errorMsg, setErrorMsg] = react_1.useState('');
    react_1.useEffect(() => {
        const fetchFollowers = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
=======
export const useFollower = (userID, accessToken, jwtAccessToken) => {
    const [followers, setFollowers] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        const fetchFollowers = async () => {
>>>>>>> Stashed changes
            try {
                if (!userID) {
                    setErrorMsg('empty userID');
                    return;
                }
                if (!accessToken && !jwtAccessToken) {
                    setErrorMsg('empty token');
                    return;
                }
                const callback = (data) => {
                    setFollowers(data);
                };
<<<<<<< Updated upstream
                const data = yield follower_service_1.getUserFollowers({
=======
                const data = await getUserFollowers({
>>>>>>> Stashed changes
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
                if (error?.response && error?.response.data) {
                    setErrorMsg(error?.response.data?.errorMessage ?? 'something wrong!');
                }
                else {
                    setErrorMsg('something wrong!');
                }
            }
        };
        fetchFollowers();
    }, [userID, accessToken, jwtAccessToken]);
    return { followers, errorMsg };
};
export default useFollower;
//# sourceMappingURL=useFollower.js.map