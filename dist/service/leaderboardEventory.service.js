import { getInstanceEventory } from './axios';
import { getType, isProdVmo17Media } from '../utils';
import { handleCacheStrategy } from './cacheManager.service';
const endpoint = `/v1/leaderboards/eventory`;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["TIMEOUT"] = "ECONNABORTED";
})(ErrorCode || (ErrorCode = {}));
const CANCEL_TIME_OUT = 5000;
const getFetchURL = (apiEndpoint, params) => {
    const baseURL = isProdVmo17Media()
        ? 'https://api.17app.co/api'
        : 'https://sta-api.17app.co/api';
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
export const getParsedURL = ({ apiEndpoint, type, limit, cursor, withoutOnliveInfo, }) => {
    const params = {
        containerID: getType(type),
        count: limit,
        cursor,
        withoutOnliveInfo,
    };
    if (cursor) {
        const [timestampCursor] = cursor.split('-', 1);
        const [totalCount, start, shardSize] = timestampCursor.split(':').slice(1);
        const parsedCursor = `${totalCount}:${start}:${shardSize}`;
        const parsedParams = { ...params, cursor: parsedCursor };
        return getFetchURL(apiEndpoint, parsedParams);
    }
    return getFetchURL(apiEndpoint, params);
};
const getLBDataCallback = ({ apiEndpoint, eventoryApi, type, limit, cursor, withoutOnliveInfo, cancelToken, }) => eventoryApi.get(apiEndpoint, {
    params: {
        containerID: getType(type),
        count: limit,
        cursor,
        withoutOnliveInfo,
    },
    cancelToken,
});
export const getLeaderboardEventory = async ({ type, cancelToken, limit = 1000, cursor = '', withoutOnliveInfo, strategy, }) => {
    const eventoryApi = getInstanceEventory();
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
    });
    const responseData = await handleCacheStrategy({
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