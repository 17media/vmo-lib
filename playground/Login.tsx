import React, { useEffect, useState } from 'react';
import useLogin from '../lib/hooks/useLogin';
import { getUserInfo, storeUserInfo } from '../lib/utils';

const Login = () => {
  const { login } = useLogin();
  const { userID = '', jwtAccessToken = '' } = getUserInfo();
  const [showUserID, setShowUserID] = useState('');
  const [showJwtAccessToken, setShowJwtAccessToken] = useState('');

  const clearUserInfo = () => {
    const userInfoStorageName = 'userInfo';
    localStorage.setItem(
      userInfoStorageName,
      JSON.stringify({
        updateTime: Date.now(),
      }),
    );

    setShowUserID('');
    setShowJwtAccessToken('');
  };

  useEffect(() => {
    storeUserInfo();
    setShowUserID(userID);
    setShowJwtAccessToken(jwtAccessToken);
  }, [jwtAccessToken, userID]);

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
          Clear User Info
        </button>
      </p>
      <p>userID: {showUserID}</p>
      <p>jwtAccessToken: {showJwtAccessToken}</p>
    </div>
  );
};

export default React.memo(Login);
