import { useState, useEffect } from 'react';
import { AxiosError, isAxiosError } from 'axios';
import { getUserFollowers } from '../service/follower.service';

type Props = (
  userID: string,
  accessToken: string,
  jwtAccessToken: string,
) => {
  followers: string[];
  errorMsg?: string;
};

/**
 * 給 userID 跟 accessToken 來取得 user followers 追蹤名單<br />
 * @param userID 17 live 上的 account userID
 * @param accessToken 17 live 上的 account accessToken
 * @param jwtAccessToken 17 live 上的 account JWT
 * @returns 取得 followers 資料以及 errMsg 判斷是否有問題
 */
export const useFollower: Props = (userID, accessToken, jwtAccessToken) => {
  const [followers, setFollowers] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        if (!userID) {
          setErrorMsg('empty userID');
          return;
        }
        if (!accessToken && !jwtAccessToken) {
          setErrorMsg('empty token');
          return;
        }

        const callback = (data: string[]) => {
          setFollowers(data);
        };
        const data = await getUserFollowers({
          userID,
          accessToken,
          jwtAccessToken,
          callback,
        });
        setFollowers(data);
        setErrorMsg('');
      } catch (error: any) {
        setFollowers([]);

        if (isAxiosError(error)) {
          setErrorMsg(
            error?.response?.data?.errorMessage ??
              'something wrong from axios error!',
          );
        } else {
          setErrorMsg('something wrong!');
        }
      }
    };

    fetchFollowers();
  }, [userID, accessToken, jwtAccessToken]);

  return { followers, errorMsg };
};

export default useFollower;
