import { CancelToken } from 'axios';

import { getUUID } from '../utils';
import { getInstanceCache } from './axios';
import { User } from '../types';

const defaultUrl = `/campaign/cache/`;

// eslint-disable-next-line import/prefer-default-export
export const getLeaderboardCache = async (
  uuid: {
    sta: string;
    prod: string;
  },
  cancelToken: CancelToken,
): Promise<User[]> => {
  const instance = getInstanceCache();
  const currentUrl = `${defaultUrl}${getUUID(uuid)}`;

  const res = await instance.get(currentUrl, { cancelToken });

  return res.data || [];
};
