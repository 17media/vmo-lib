import { CancelToken } from 'axios';

import { getUUID } from '../utils';
import { getInstanceVote } from './axios';
import { User } from '../../types';

const defaultUrl = `/v1/votingEvent/`;

export const getLeaderboardVote = async (
  voteId: {
    sta: string;
    prod: string;
  },
  cancelToken: CancelToken,
): Promise<User[]> => {
  const instance = getInstanceVote();
  instance.interceptors.response.use(undefined, err => {
    const error = err.response;
    if (error.status === 401) {
      return {};
    }
  });
  const currentUrl = `${defaultUrl}${getUUID(voteId)}`;
  const res = await instance.get(currentUrl, { cancelToken });

  return res.data || [];
};

export const doLeaderboardVote = async (
  voteId: {
    sta: string;
    prod: string;
  },
  topic: {
    sta: string;
    prod: string;
  },
  nomineeUserID: string,
  cancelToken: CancelToken,
): Promise<User[]> => {
  const instance = getInstanceVote();
  const currentUrl = `${defaultUrl}${getUUID(voteId)}/vote/${getUUID(
    topic,
  )}/nominee/${nomineeUserID}`;

  const res = await instance.post(currentUrl, { cancelToken });

  return res.data || [];
};
