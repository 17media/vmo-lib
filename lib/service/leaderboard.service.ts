import { CancelToken } from 'axios';
import { getInstance } from './axios';
import { User } from '../types';
import { getType } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getLeaderboard = async (
  type: {
    sta: string;
    prod: string;
  },
  cancelToken: CancelToken,
  limit = 1000,
  cursor = '',
  method = 'POST',
): Promise<User[]> => {
  const axios = getInstance();

  const url = `/v1/leaderboards/mktevent`;
  const body = { type: getType(type), count: limit, cursor };
  let res;
  if (method === 'POST') {
    res = await axios.post(url, body, { cancelToken });
  } else {
    res = await axios.get(url, {
      params: {
        type: getType(type),
        count: limit,
        cursor,
        onliveInfo: 1,
      },
      cancelToken,
    });
  }

  const { nextCursor, data } = res.data;

  if (nextCursor) {
    return [
      ...data,
      ...(await getLeaderboard(type, cancelToken, limit, nextCursor, method)),
    ];
  }
  return data;
};
