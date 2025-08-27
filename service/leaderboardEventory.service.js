import { getInstanceEventory } from './axios';
import { getGoapiUrl, getType } from '../utils';
import { handleCacheStrategy } from './cacheManager.service';
const endpoint = `/v1/leaderboards/eventory`;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["TIMEOUT"] = "ECONNABORTED";
})(ErrorCode || (ErrorCode = {}));
const CANCEL_TIME_OUT = 5000;
const getFetchURL = (apiEndpoint, params, env) => {
    const baseURL = getGoapiUrl(env);
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
export const getParsedURL = ({ apiEndpoint, type, limit, cursor, withoutOnliveInfo, allBoards, env, }) => {
    const params = {
        containerID: getType(type, env),
        count: limit,
        cursor,
        withoutOnliveInfo,
        allBoards,
    };
    if (cursor) {
        const [timestampCursor] = cursor.split('-', 1);
        const [totalCount, start, shardSize] = timestampCursor.split(':').slice(1);
        const parsedCursor = `${totalCount}:${start}:${shardSize}`;
        const parsedParams = { ...params, cursor: parsedCursor };
        return getFetchURL(apiEndpoint, parsedParams, env);
    }
    return getFetchURL(apiEndpoint, params, env);
};
const getLBDataCallback = ({ apiEndpoint, eventoryApi, type, limit, cursor, withoutOnliveInfo, allBoards, cancelToken, env, }) => eventoryApi.get(apiEndpoint, {
    params: {
        containerID: getType(type, env),
        count: limit,
        cursor,
        withoutOnliveInfo,
        allBoards,
    },
    cancelToken,
});
export const getLeaderboardEventory = async ({ type, cancelToken, limit = 1000, cursor = '', withoutOnliveInfo, allBoards, strategy, env, }) => {
    const eventoryApi = getInstanceEventory(env);
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
    const parsedURL = getParsedURL({
        apiEndpoint: endpoint,
        type,
        limit,
        cursor,
        withoutOnliveInfo,
        allBoards,
        env,
    });
    const responseData = await handleCacheStrategy({
        cacheStrategy: strategy,
        apiCallback: getLBDataCallback({
            apiEndpoint: endpoint,
            type,
            limit,
            cursor,
            withoutOnliveInfo,
            allBoards,
            cancelToken,
            eventoryApi,
            env,
        }),
        url: parsedURL,
    });
    return responseData;
};
export default getLeaderboardEventory;
//# sourceMappingURL=leaderboardEventory.service.js.map