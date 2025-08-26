import React, { useEffect } from 'react';
import useLogin from '../lib/hooks/useLogin';
import { getUserInfo, storeUserInfo } from '../lib/utils';

const Login = () => {
  const { login } = useLogin();
  const { userID = '', jwtAccessToken = '' } = getUserInfo();

  const clearUserInfo = () => {
    const userInfoStorageName = 'userInfo';
    localStorage.setItem(
      userInfoStorageName,
      JSON.stringify({
        updateTime: Date.now(),
      }),
    );
    window.location.reload();
  };

  useEffect(() => {
    storeUserInfo();
  }, []);

  return (
    <div>
      <h3>
        Click button will go to 17live official website, login and redirect back
        with userID/jwtAccessToken(url).
      </h3>
      <p>
        test login:{' '}
        <button type="button" onClick={login}>
          Login
        </button>
      </p>
      <p>
        clear userInfo:{' '}
        <button type="button" onClick={clearUserInfo}>
          clear userInfo
        </button>
      </p>
      <p>userID: {userID}</p>
      <p>jwtAccessToken: {jwtAccessToken}</p>
    </div>
  );
};

export default React.memo(Login);
