import { getInstanceEventory } from './axios';
const DEFAULT_EACH_FOLLOWER_COUNT = 100;
<<<<<<< Updated upstream
const getUserFollowers = ({ userID, accessToken, jwtAccessToken, cursor, count = DEFAULT_EACH_FOLLOWER_COUNT, callback, preData = [], }) => __awaiter(void 0, void 0, void 0, function* () {
    const axios = axios_1.getInstanceEventory();
=======
export const getUserFollowers = async ({ userID, accessToken, jwtAccessToken, cursor, count = DEFAULT_EACH_FOLLOWER_COUNT, callback, preData = [], }) => {
    const axios = getInstanceEventory();
>>>>>>> Stashed changes
    const url = `/v1/users/${userID}/followeeIDs`;
    const res = await axios.get(url, {
        headers: {
            ...(jwtAccessToken && {
                Authorization: `Bearer ${jwtAccessToken}`,
            }),
            ...(accessToken && { accessToken }),
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
<<<<<<< Updated upstream
        const nextData = yield exports.getUserFollowers({
=======
        const nextData = await getUserFollowers({
>>>>>>> Stashed changes
            userID,
            accessToken,
            jwtAccessToken,
            cursor: nextCursor,
            callback,
            preData: currentData,
        });
        return [...followeeIDs, ...nextData];
    }
    return followeeIDs;
};
export default getUserFollowers;
//# sourceMappingURL=follower.service.js.map