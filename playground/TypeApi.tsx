import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useTypeApi from '../lib/hooks/useTypeApi';
import { TransitionLeaderboardWrapper } from '../lib/components/TransitionLeaderboardWrapper';
import { ItemStyle } from '../lib/hooks/useItemTransition';
import { User } from '../lib/types';

const rowCount = 4;

const itemStyle: ItemStyle = {
  width: 250,
  height: 100,
  offsetX: 20,
  offsetY: 20,
};

const Wrapper = styled.div`
  width: 100%;
`;

const Item = styled.div`
  width: 250px;
  height: 100px;
  border: 1px solid black;
`;

const Input = styled.input`
  margin: 0 0 20px 20px;
  padding: 5px 10px;
  width: 500px;
`;

const Button = styled.button`
  margin: 20px 0 20px 20px;
  padding: 5px 10px;
`;

const TypeApi = () => {
  const [eventoryContainerId, setEventoryContainerId] = useState<string>('');
  // requestMethod 目前都需要設定成 'GET'，所以不開放設定
  const [requestMethod, setRequestMethod] = useState<string>('GET');
  const [realTime, setRealTime] = useState<number>(0);
  // isEventory 目前都需要設定成 true，所以不開放設定
  const [isEventory, setIsEventory] = useState<boolean>(true);
  const [apiList, setApiList] = useState([]);
  const realTimeRef = useRef(null);

  const init: User[][] = [
    [
      {
        userInfo: {
          userID: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0',
          displayName: '我是柔柔',
          picture: '24661c0e-a4da-4d34-8d5b-f85ba5bf98bc.jpg',
          name: '',
          level: 0,
          openID: '',
          region: 'TW',
          gloryroadMode: 0,
        },
        score: 1000000,
        rank: 1,
        meta: { eventoryKey: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0' },
      },
    ],
  ];

  const { loading, polling, requestError, leaderboardData } = useTypeApi(
    apiList,
    requestMethod,
    realTimeRef.current,
    init,
  );

  const eventoryContainerIdHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEventoryContainerId(e.target.value);

  const realTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRealTime(+e.target.value);

  const submitHandler = () => {
    realTimeRef.current = realTime;
    setApiList([
      {
        sta: eventoryContainerId,
        prod: '',
        isEventory,
      },
    ]);
  };

  // 因為apiList只有一筆，所以使用leaderboardData[0]資料，如果apiList有更多筆資料，後端資料會相對應leaderboardData[]位置
  const final =
    leaderboardData.length > 0 && leaderboardData[0] ? leaderboardData[0] : [];

  return (
    <div>
      <span>Eventory Container ID:</span>
      <Input
        type="text"
        value={eventoryContainerId}
        placeholder="請輸入 Eventory Container ID"
        onChange={eventoryContainerIdHandler}
      />
      <br />
      <span>Request 間隔時間:</span>
      <Input
        type="number"
        ref={realTimeRef}
        value={realTime}
        placeholder="請輸入request間隔時間"
        onChange={realTimeHandler}
      />
      <span>/毫秒数(ms)</span>
      <br />
      <Button onClick={submitHandler}>送出</Button>
      <br />
      <span>is loading: {loading.toString()}</span> <br />
      <span>is polling: {polling.toString()}</span> <br />
      {requestError && <span>Error: {requestError.message}</span>} <br />
      {final === init[0] && (
        <span>
          <b>Init Leaderboard</b>
        </span>
      )}
      {!requestError && (
        <Wrapper>
          <TransitionLeaderboardWrapper
            itemStyle={itemStyle}
            rowCount={rowCount}
            user={final}
          >
            {final.map(item => (
              <Item key={item.userInfo.userID}>
                <b>id: </b> {item.userInfo.userID} <br />
                <b>value:</b> {item.score}
              </Item>
            ))}
          </TransitionLeaderboardWrapper>
        </Wrapper>
      )}
    </div>
  );
};

export default React.memo(TypeApi);
