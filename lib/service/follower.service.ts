import { getInstanceEventory } from './axios';

interface Props {
  userID: string;
  accessToken: string;
  cursor?: string;
  count?: number;
  callback?: Function;
  preData?: string[];
}

const DEFAULT_EACH_FOLLOWER_COUNT = 100;

export const getUserFollowers = async ({
  userID,
  accessToken,
  cursor,
  count = DEFAULT_EACH_FOLLOWER_COUNT,
  callback,
  preData = [],
}: Props): Promise<string[]> => {
  const axios = getInstanceEventory();

  const url = `/v1/users/${userID}/followeeIDs`;
  const res = await axios.get(url, {
    headers: {
      accessToken,
    },
    params: {
      count,
      cursor,
    },
  });

  const { nextCursor, followeeIDs } = res.data;

  const currentData = [...preData, ...followeeIDs];

  if (callback) {
    callback(currentData);
  }

  if (nextCursor) {
    const nextData = await getUserFollowers({
      userID,
      accessToken,
      cursor: nextCursor,
      callback,
      preData: currentData,
    });

    return [...followeeIDs, ...nextData];
  }

  return followeeIDs;
};
