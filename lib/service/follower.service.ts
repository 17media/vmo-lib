import { getInstanceEventory } from './axios';

interface Props {
  userID: string;
  accessToken: string;
  cursor?: string;
  count?: number;
}

const DEFAULT_EACH_FOLLOWER_COUNT = 1000;

export const getUserFollowers = async ({
  userID,
  accessToken,
  cursor,
  count = DEFAULT_EACH_FOLLOWER_COUNT,
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

  if (nextCursor) {
    const nextData = await getUserFollowers({
      userID,
      accessToken,
      cursor: nextCursor,
    });

    return [...followeeIDs, ...nextData];
  }

  return followeeIDs;
};
