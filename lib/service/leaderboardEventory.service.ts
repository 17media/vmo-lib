import { CancelToken, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { getInstanceEventory } from './axios';
import { Env } from '../enums';
import { User } from '../types';
import { getGoapiUrl, getType } from '../utils';
import { CacheStrategy, handleCacheStrategy } from './cacheManager.service';

const endpoint = `/v1/leaderboards/eventory`;

interface Params {
  type: {
    uat?: string;
    sta: string;
    prod: string;
  };
  cancelToken: CancelToken;
  limit: number;
  cursor: string;
  withoutOnliveInfo?: boolean;
  allBoards?: 'true' | 'false';
  callback?: Function;
  preData?: User[];
}

type UserNoLiveInfo = Omit<User, 'onliveInfo'>;

export interface Response<T> {
  data: T[];
  nextCursor: string;
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
  allBoards?: 'true' | 'false';
}

const getFetchURL = (
  apiEndpoint: string,
  params: FetchURLParams,
  env?: Env,
) => {
  const baseURL = getGoapiUrl(env);

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
  allBoards,
  env,
}: FetchURL & {
  env?: Env;
}) => {
  const params: FetchURLParams = {
    containerID: getType(type, env),
    count: limit,
    cursor,
    withoutOnliveInfo,
    allBoards,
  };
  if (cursor) {
    const [timestampCursor] = (cursor as string).split('-', 1);
    const [totalCount, start, shardSize] = timestampCursor.split(':').slice(1);
    const parsedCursor = `${totalCount}:${start}:${shardSize}`;
    const parsedParams = { ...params, cursor: parsedCursor };
    return getFetchURL(apiEndpoint, parsedParams, env);
  }
  return getFetchURL(apiEndpoint, params, env);
};

const getLBDataCallback = ({
  apiEndpoint,
  eventoryApi,
  type,
  limit,
  cursor,
  withoutOnliveInfo,
  allBoards,
  cancelToken,
  env,
}: Params & {
  apiEndpoint: string;
  eventoryApi: AxiosInstance;
  env?: Env;
}) =>
  eventoryApi.get<Response<User>>(apiEndpoint, {
    params: {
      containerID: getType(type, env),
      count: limit,
      cursor,
      withoutOnliveInfo,
      allBoards,
    },
    cancelToken,
  });

export const getLeaderboardEventory = async ({
  type,
  cancelToken,
  limit = 1000,
  cursor = '',
  withoutOnliveInfo,
  allBoards,
  strategy,
  env,
}: Params & {
  strategy: CacheStrategy;
  env?: Env;
}) => {
  const eventoryApi = getInstanceEventory(env);

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
    allBoards,
    env,
  });

  const responseData = await handleCacheStrategy<Response<User>>({
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
