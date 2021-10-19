import { useState, useEffect } from 'react';
import { getUserFollowers } from '../service/follower.service';

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
        const callback = (data: string[]) => {
          setFollowers(data);
        };
        const data = await getUserFollowers({ userID, accessToken, callback });
        setFollowers(data);
      } catch (error) {
        if (error?.response && error?.response.data) {
          setErrorMsg(error?.response.data?.errorMessage ?? 'something wrong!');
        } else {
          setErrorMsg('something wrong!');
        }
      }
    };

    fetchFollowers();
  }, [userID, accessToken]);

  return { followers, errorMsg };
};

export default useFollower;
