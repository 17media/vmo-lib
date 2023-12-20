import { getInstanceEventory } from './axios';
import { getGoapiUrl, getType } from '../utils';
import { handleCacheStrategy } from './cacheManager.service';
const endpoint = `/v1/leaderboards/eventory`;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["TIMEOUT"] = "ECONNABORTED";
})(ErrorCode || (ErrorCode = {}));
const CANCEL_TIME_OUT = 5000;
<<<<<<< Updated upstream
const getFetchURL = (apiEndpoint, params) => {
    const baseURL = utils_1.isProdVmo17Media()
        ? 'https://api.17app.co/api'
        : 'https://sta-api.17app.co/api';
=======
const getFetchURL = (apiEndpoint, params, env) => {
    const baseURL = getGoapiUrl(env);
>>>>>>> Stashed changes
    const fetchURL = new URL(baseURL + apiEndpoint);
    Object.keys(params).forEach(key => {
        const value = params[key];
        if (value) {
            fetchURL.searchParams.append(key, value.toString());
        }
    });
    return fetchURL.toString();
};
/**
 * @description
 * cursor       => {timestamp}:{total count}:{start}:{shard size}-{hash value}
 *
 * parsedCursor => {total count}:{start}:{shard size}
 */
<<<<<<< Updated upstream
const getParsedURL = ({ apiEndpoint, type, limit, cursor, withoutOnliveInfo, }) => {
    const params = {
        containerID: utils_1.getType(type),
=======
export const getParsedURL = ({ apiEndpoint, type, limit, cursor, withoutOnliveInfo, env, }) => {
    const params = {
        containerID: getType(type, env),
>>>>>>> Stashed changes
        count: limit,
        cursor,
        withoutOnliveInfo,
    };
    if (cursor) {
        const [timestampCursor] = cursor.split('-', 1);
        const [totalCount, start, shardSize] = timestampCursor.split(':').slice(1);
        const parsedCursor = `${totalCount}:${start}:${shardSize}`;
<<<<<<< Updated upstream
        const parsedParams = Object.assign(Object.assign({}, params), { cursor: parsedCursor });
        return getFetchURL(apiEndpoint, parsedParams);
=======
        const parsedParams = { ...params, cursor: parsedCursor };
        return getFetchURL(apiEndpoint, parsedParams, env);
>>>>>>> Stashed changes
    }
    return getFetchURL(apiEndpoint, params);
};
<<<<<<< Updated upstream
exports.getParsedURL = getParsedURL;
const getLBDataCallback = ({ apiEndpoint, eventoryApi, type, limit, cursor, withoutOnliveInfo, cancelToken, }) => eventoryApi.get(apiEndpoint, {
    params: {
        containerID: utils_1.getType(type),
=======
const getLBDataCallback = ({ apiEndpoint, eventoryApi, type, limit, cursor, withoutOnliveInfo, cancelToken, env, }) => eventoryApi.get(apiEndpoint, {
    params: {
        containerID: getType(type, env),
>>>>>>> Stashed changes
        count: limit,
        cursor,
        withoutOnliveInfo,
    },
    cancelToken,
});
<<<<<<< Updated upstream
const getLeaderboardEventory = ({ type, cancelToken, limit = 1000, cursor = '', withoutOnliveInfo, strategy, }) => __awaiter(void 0, void 0, void 0, function* () {
    const eventoryApi = axios_1.getInstanceEventory();
=======
export const getLeaderboardEventory = async ({ type, cancelToken, limit = 1000, cursor = '', withoutOnliveInfo, strategy, env, }) => {
    const eventoryApi = getInstanceEventory(env);
>>>>>>> Stashed changes
    if (!withoutOnliveInfo) {
        const responseHandler = (response) => response;
        const errorHandler = (error) => {
            if (error?.code === ErrorCode.TIMEOUT) {
                const payload = error?.config?.params;
                if (!payload.withoutOnliveInfo) {
                    delete eventoryApi.defaults.timeout;
                    return eventoryApi.get(endpoint, {
                        params: {
                            ...payload,
                            withoutOnliveInfo: true,
                        },
                        cancelToken,
                    });
                }
            }
            return Promise.reject(error);
        };
        eventoryApi.defaults.timeout = CANCEL_TIME_OUT;
        eventoryApi.interceptors.response.use(responseHandler, errorHandler);
    }
<<<<<<< Updated upstream
    const parsedURL = exports.getParsedURL({
=======
    const parsedURL = getParsedURL({
>>>>>>> Stashed changes
        apiEndpoint: endpoint,
        type,
        limit,
        cursor,
        withoutOnliveInfo,
    });
<<<<<<< Updated upstream
    const responseData = yield cacheManager_service_1.handleCacheStrategy({
=======
    const responseData = await handleCacheStrategy({
>>>>>>> Stashed changes
        cacheStrategy: strategy,
        apiCallback: getLBDataCallback({
            apiEndpoint: endpoint,
            type,
            limit,
            cursor,
            withoutOnliveInfo,
            cancelToken,
            eventoryApi,
        }),
        url: parsedURL,
    });
    return responseData;
};
export default getLeaderboardEventory;
//# sourceMappingURL=leaderboardEventory.service.js.map