import { CancelToken, AxiosResponse, AxiosError } from 'axios';
import { getInstanceEventory } from './axios';
import { User } from '../types';
import { getType } from '../utils';

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

  const { data: responseData } = await eventoryApi.get<Response<User>>(
    endpoint,
    {
      params: {
        containerID: getType(type),
        count: limit,
        cursor,
        withoutOnliveInfo,
      },
      cancelToken,
    },
  );

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
