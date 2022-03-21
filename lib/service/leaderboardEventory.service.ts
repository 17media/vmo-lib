import { CancelToken, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { getInstanceEventory } from './axios';
import { User } from '../types';
import { getType } from '../utils';
import {
  CacheStrategy,
  checkApiUrlStrategy,
  handleCacheStrategy,
} from './cacheManager.service';

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

interface Response<T> {
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

const getFetchURL = ({
  apiEndpoint,
  type,
  limit,
  cursor,
  withoutOnliveInfo,
}: FetchURL) => {
  const baseURL =
    window.location.hostname === 'vmo.17.media'
      ? 'https://api.17app.co/api'
      : 'https://sta-api.17app.co/api';

  const fetchURL = new URL(baseURL + apiEndpoint);
  const params: FetchURLParams = {
    containerID: getType(type),
    count: limit,
    cursor,
    withoutOnliveInfo,
  };
  Object.keys(params).forEach(key => {
    const value = params[key as keyof FetchURLParams];
    if (value) {
      fetchURL.searchParams.append(key, value.toString());
    }
  });
  return fetchURL.toString();
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

const cachedApiData = ({
  cacheStrategy,
  apiEndpoint,
  eventoryApi,
  type,
  limit,
  cursor,
  withoutOnliveInfo,
  cancelToken,
}: Params & {
  cacheStrategy: CacheStrategy;
  apiEndpoint: string;
  eventoryApi: AxiosInstance;
}) => {
  const fetchURL = getFetchURL({
    apiEndpoint,
    type,
    limit,
    cursor,
    withoutOnliveInfo,
  });

  return handleCacheStrategy(
    cacheStrategy,
    getLBDataCallback({
      apiEndpoint,
      type,
      limit,
      cursor,
      withoutOnliveInfo,
      cancelToken,
      eventoryApi,
    }),
    fetchURL,
  );
};

export const getLeaderboardEventory = async ({
  type,
  cancelToken,
  limit = 1000,
  cursor = '',
  withoutOnliveInfo,
  callback,
  preData = [],
}: Params): Promise<User[]> => {
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

  const { cacheStrategy } = checkApiUrlStrategy(endpoint, 'get');

  const { data: responseData } = await cachedApiData({
    cacheStrategy,
    apiEndpoint: endpoint,
    type,
    limit,
    cursor,
    withoutOnliveInfo,
    cancelToken,
    eventoryApi,
  });

  const { nextCursor, data = [] } = responseData;
  const currentData = [...preData, ...data];

  if (callback) callback(currentData);

  if (nextCursor) {
    const nextPayload = {
      type,
      cancelToken,
      limit,
      cursor: nextCursor,
      withoutOnliveInfo,
      callback,
      preData: currentData,
    };
    const nextData = await getLeaderboardEventory(nextPayload);

    return [...data, ...nextData];
  }

  return data;
};

export default getLeaderboardEventory;
