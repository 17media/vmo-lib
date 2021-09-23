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
  callBack = (data: any) => {},
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
        onliveInfo: 1,
      },
      cancelToken,
    });
  }

  const { nextCursor, data } = res.data;

  if (callBack) {
    callBack(data);
  }

  const leaderboardData = nextCursor
    ? [
        ...data,
        ...(await getLeaderboardEventory(
          type,
          cancelToken,
          limit,
          nextCursor,
          method,
        )),
      ]
    : data;

  return leaderboardData;
};

export const getLeaderboardEventoryBonus = async (
  type: {
    sta: string;
    prod: string;
  },
  cancelToken: CancelToken,
  userId: string,
  limit = 1000,
  cursor = '',
  method = 'GET',
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
        'subkeys[]': userId,
      },
      cancelToken,
    });
  }

  const { nextCursor, data } = res.data;
  return data;
};
