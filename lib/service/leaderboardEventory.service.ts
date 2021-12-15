import { CancelToken } from 'axios';
import { getInstanceEventory } from './axios';
import { User } from '../types';
import { getType } from '../utils';

const url = `/v1/leaderboards/eventory`;

export const getLeaderboardEventory = async (
  type: {
    sta: string;
    prod: string;
  },
  cancelToken: CancelToken,
  limit = 1000,
  cursor = '',
  method = 'POST',
  withoutOnliveInfo?: boolean,
  callBack = (data: any) => {},
  preData: any[] = [],
): Promise<User[]> => {
  const axios = getInstanceEventory();

  const body = { type: getType(type), count: limit, cursor };
  let res;
  if (method === 'POST') {
    res = await axios.post(url, body, { cancelToken });
  } else {
    res = await axios.get(url, {
      params: {
        containerID: getType(type),
        count: limit,
        cursor,
        withoutOnliveInfo,
      },
      cancelToken,
    });
  }

  const { nextCursor, data = [] } = res.data;

  const currentData = [...preData, ...data];

  if (callBack) {
    callBack(currentData);
  }

  if (nextCursor) {
    const nextData = await getLeaderboardEventory(
      type,
      cancelToken,
      limit,
      nextCursor,
      method,
      withoutOnliveInfo,
      callBack,
      currentData,
    );

    return [...data, ...nextData];
  }

  return data;
};

export default getLeaderboardEventory;
