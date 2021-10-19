import { useState, useEffect } from 'react';

import { getUserFollowers } from '../service/follower.service';
import { User } from '../types';

type Props = (
  userID: string,
  accessToken: string,
) => {
  followers: string[];
  errorMsg?: string;
};

export const useFollower: Props = (userID, accessToken) => {
  const [followers, setFollowers] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await getUserFollowers({ userID, accessToken });
        setFollowers(data);
      } catch (error) {
        setErrorMsg(error?.response?.data?.errorMessage ?? 'something wrong!');
      }
    };

    fetchFollowers();
  }, [userID, accessToken]);

  return { followers, errorMsg };
};

export default useFollower;
