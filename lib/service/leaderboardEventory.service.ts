import { CancelToken, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { getInstanceEventory } from './axios';
import { User } from '../types';
import { getType, isProdVmo17Media } from '../utils';
import { CacheStrategy, handleCacheStrategy } from './cacheManager.service';

const endpoint = `/v1/leaderboards/eventory`;

interface Params {
  type: {
    sta: string;
    prod: string;
  };
  cancelToken: CancelToken;
  limit: number;
  cursor: string;
  withoutOnliveInfo?: boolean;
  callback?: Function;
  preData?: User[];
}

type UserNoLiveInfo = Omit<User, 'onliveInfo'>;

export interface Response<T> {
  data: T[];
  nextCursor: string | '';
  type: string;
}

enum ErrorCode {
  TIMEOUT = 'ECONNABORTED',
}

const CANCEL_TIME_OUT = 5000;

type FetchURL = Omit<Params, 'cancelToken' | 'callback' | 'preData'> & {
  apiEndpoint: string;
};

interface FetchURLParams {
  containerID: string;
  count: number;
  cursor: string;
  withoutOnliveInfo?: boolean;
}

const getFetchURL = (apiEndpoint: string, params: FetchURLParams) => {
  const baseURL = isProdVmo17Media()
    ? 'https://api.17app.co/api'
    : 'https://sta-api.17app.co/api';

  const fetchURL = new URL(baseURL + apiEndpoint);
  Object.keys(params).forEach(key => {
    const value = params[key as keyof FetchURLParams];
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
export const getParsedURL = ({
  apiEndpoint,
  type,
  limit,
  cursor,
  withoutOnliveInfo,
}: FetchURL) => {
  const params: FetchURLParams = {
    containerID: getType(type),
    count: limit,
    cursor,
    withoutOnliveInfo,
  };
  if (cursor) {
    const [timestampCursor] = (cursor as string).split('-', 1);
    const [totalCount, start, shardSize] = timestampCursor.split(':').slice(1);
    const parsedCursor = `${totalCount}:${start}:${shardSize}`;
    const parsedParams = { ...params, cursor: parsedCursor };
    return getFetchURL(apiEndpoint, parsedParams);
  }
  return getFetchURL(apiEndpoint, params);
};

const getLBDataCallback = ({
  apiEndpoint,
  eventoryApi,
  type,
  limit,
  cursor,
  withoutOnliveInfo,
  cancelToken,
}: Params & {
  apiEndpoint: string;
  eventoryApi: AxiosInstance;
}) =>
  eventoryApi.get<Response<User>>(apiEndpoint, {
    params: {
      containerID: getType(type),
      count: limit,
      cursor,
      withoutOnliveInfo,
    },
    cancelToken,
  });

export const getLeaderboardEventory = async ({
  type,
  cancelToken,
  limit = 1000,
  cursor = '',
  withoutOnliveInfo,
  strategy,
}: Params & {
  strategy: CacheStrategy;
}) => {
  const eventoryApi = getInstanceEventory();

  if (!withoutOnliveInfo) {
    const responseHandler = (response: AxiosResponse) => response;
    const errorHandler = (
      error: AxiosError,
    ): Promise<AxiosError | AxiosResponse> => {
      if (error?.code === ErrorCode.TIMEOUT) {
        const payload: Params = error?.config?.params;

        if (!payload.withoutOnliveInfo) {
          delete eventoryApi.defaults.timeout;

          return eventoryApi.get<Response<UserNoLiveInfo>>(endpoint, {
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

  const responseData = await handleCacheStrategy<Response<User>>({
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
