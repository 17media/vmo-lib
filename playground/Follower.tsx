import React, { useState } from 'react';
import styled from 'styled-components';
import useFollower from '../lib/hooks/useFollower';
import { getUserInfo, storeUserInfo } from '../lib/utils';

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;

const Item = styled.div`
  flex: 1;
  border: 1px solid black;
  margin: 0 20px;
`;

const StyledInput = styled.input`
  min-width: 400px;
`;

const ErrorSection = ({ errorMsg }: { errorMsg: string }) => (
  <p>error: {errorMsg}</p>
);

const NoFollowersSection = () => (
  <p>user hasn`&apos;t follower any streamers.</p>
);

const Follower = () => {
  // const {
  //   accessToken: storeAccessToken,
  //   jwtAccessToken: storeJwtAccessToken,
  //   userID: storeUserID,
  // } = getUserInfo();

  const {
    accessToken: storeAccessToken,
    jwtAccessToken: storeJwtAccessToken,
    userID: storeUserID,
  } = storeUserInfo();

  const defaultAccessToken =
    storeAccessToken ?? 'fe45a40b-962d-44f4-acac-a8f5362fe611';
  const defaultJwtAccessToken = storeJwtAccessToken ?? '';
  const defaultUserID = storeUserID ?? '3a4464b5-8228-4d96-bd82-c0fe5e8be673';

  const [inputUserID, setInputUserID] = useState<string>(defaultUserID);
  const [inputAccessToken, setInputAccessToken] =
    useState<string>(defaultAccessToken);
  const [inputJwtAccessToken, setInputJwtAccessToken] = useState<string>(
    defaultJwtAccessToken,
  );
  const [userID, setUserID] = useState<string>(defaultUserID);
  const [accessToken, setAccessToken] = useState<string>(defaultAccessToken);
  const [jwtAccessToken, setJwtAccessToken] = useState<string>(
    defaultJwtAccessToken,
  );
  const { followers, errorMsg } = useFollower(
    userID,
    accessToken,
    jwtAccessToken,
  );

  const handleChangeUser = () => {
    setUserID(inputUserID);
    setAccessToken(inputAccessToken);
    setJwtAccessToken(inputJwtAccessToken);
  };

  return (
    <div>
      <h4>
        given user id and accessToken to get user followers.(get it from url or
        session token or whatever.)
      </h4>
      <p>Note: 搭配榜單使用時，須注意下面幾種情形.</p>
      <ol>
        <li>使用者無任何追蹤主播.</li>
        <li>使用者追蹤主播不在榜單上.</li>
        <li>正常顯示使者者追蹤主播在該榜上名單與排名.</li>
      </ol>
      <p>
        test user id: <br />
        <StyledInput
          type="text"
          defaultValue={inputUserID}
          onChange={e => setInputUserID(e.target.value)}
        />
      </p>
      <p>
        test user accessToken: <br />
        <StyledInput
          type="text"
          defaultValue={inputAccessToken}
          onChange={e => setInputAccessToken(e.target.value)}
        />
      </p>
      <p>
        test user JWT: <br />
        <StyledInput
          type="text"
          defaultValue={inputJwtAccessToken}
          onChange={e => setInputJwtAccessToken(e.target.value)}
        />
      </p>
      <button type="button" onClick={handleChangeUser}>
        確認
      </button>
      <h3>追蹤名單</h3>
      <FlexContainer>
        {
          // eslint-disable-next-line no-nested-ternary
          errorMsg ? (
            <ErrorSection errorMsg={errorMsg} />
          ) : followers.length > 0 ? (
            followers.map(followerID => (
              <Item key={followerID}>
                <b>ID:</b>
                <br />
                {followerID}
              </Item>
            ))
          ) : (
            <NoFollowersSection />
          )
        }
      </FlexContainer>
    </div>
  );
};

export default React.memo(Follower);
