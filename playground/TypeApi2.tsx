import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useTypeApi from '../lib/hooks/useTypeApi';
import { TransitionLeaderboardWrapper } from '../lib/components/TransitionLeaderboardWrapper';
import { ItemStyle } from '../lib/hooks/useItemTransition';
import { User } from '../lib/types';

const rowCount = 2;

const itemStyle: ItemStyle = {
  width: 250,
  height: 100,
  offsetX: 20,
  offsetY: 20,
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px 20px;
  border: 1px solid black;
  height: 640px;
  overflow-y: auto;
`;

const WrapperSection = styled.div`
  width: calc(50% - 4px);
  height: 640px;
  overflow-y: auto;
  border-left: 1px solid black;
  border-right: 1px solid black;
`;

const Left = styled(WrapperSection)``;
const Right = styled(WrapperSection)``;

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

const TypeApi2 = () => {
  const [eventoryContainerIdLeft, setEventoryContainerIdLeft] =
    useState<string>('dbda13a5-70b4-445a-95a5-52f0802c4781');
  const [eventoryContainerIdRight, setEventoryContainerIdRight] =
    useState<string>('4a03f9c8-8c7e-402e-9cca-67dc81abc0b8');
  const [apiList, setApiList] = useState([]);
  const [requestMethod, setRequestMethod] = useState<string>('GET');
  const [realTime, setRealTime] = useState<number>(0);
  // isEventory 目前都需要設定成 true，所以不開放設定
  const [isEventory, setIsEventory] = useState<boolean>(true);
  const realTimeRef = useRef(null);
  const [limit, setLimit] = useState<number>(1000);
  const optRef = useRef({
    limit: 1000,
    cursor: '',
  });

  const init: User[][] = [[], []];

  const { loading, polling, requestError, leaderboardData } = useTypeApi(
    apiList,
    requestMethod,
    realTimeRef.current,
    init,
    optRef.current,
  );

  const eventoryContainerIdLeftHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setEventoryContainerIdLeft(e.target.value);

  const eventoryContainerIdRightHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setEventoryContainerIdRight(e.target.value);

  const realTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRealTime(+e.target.value);

  const limitHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLimit(+e.target.value);

  const submitHandler = () => {
    realTimeRef.current = realTime;
    optRef.current.limit = limit;
    setApiList([
      {
        sta: eventoryContainerIdLeft,
        prod: '',
        isEventory,
      },
      {
        sta: eventoryContainerIdRight,
        prod: '',
        isEventory,
      },
    ]);
  };

  const final1 = leaderboardData.length > 0 ? leaderboardData[0] : [];
  const final2 = leaderboardData.length > 0 ? leaderboardData[1] : [];

  return (
    <div>
      <span>左邊 Eventory Container ID:</span>
      <Input
        type="text"
        value={eventoryContainerIdLeft}
        placeholder="請輸入 Eventory Container ID"
        onChange={eventoryContainerIdLeftHandler}
      />
      <br />
      <span>右邊 Eventory Container ID:</span>
      <Input
        type="text"
        value={eventoryContainerIdRight}
        placeholder="請輸入 Eventory Container ID"
        onChange={eventoryContainerIdRightHandler}
      />
      <br />
      <span>向後端每次拿取的數量:</span>
      <Input
        type="number"
        value={limit}
        placeholder="請輸入向後端每次拿取的數量"
        onChange={limitHandler}
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
      <span>
        note: 這邊useTypeApi傳入的 initialData
        因為有兩張榜單，所以格式要是[[],[]]
      </span>
      <br />
      <Button onClick={submitHandler}>送出</Button>
      <br />
      <span>is loading: {loading.toString()}</span> <br />
      <span>is polling: {polling.toString()}</span> <br />
      {requestError && <span>Error: {requestError.message}</span>} <br />
      {!requestError && (
        <Wrapper>
          <Left>
            Eventory Container ID: {eventoryContainerIdLeft}
            <TransitionLeaderboardWrapper
              itemStyle={itemStyle}
              rowCount={rowCount}
              user={final1}
            >
              {final1.map(item => (
                <Item key={item.userInfo.userID}>
                  <b>主播名稱:</b> {item.userInfo.displayName}
                  <br />
                  <b>id: </b> {item.userInfo.userID} <br />
                  <b>value:</b> {item.score}
                </Item>
              ))}
            </TransitionLeaderboardWrapper>
          </Left>
          <Right>
            Eventory Container ID: {eventoryContainerIdRight}
            <TransitionLeaderboardWrapper
              itemStyle={itemStyle}
              rowCount={rowCount}
              user={final2}
            >
              {final2.map(item => (
                <Item key={item.userInfo.userID}>
                  <b>主播名稱:</b> {item.userInfo.displayName}
                  <br />
                  <b>id: </b> {item.userInfo.userID} <br />
                  <b>value:</b> {item.score}
                </Item>
              ))}
            </TransitionLeaderboardWrapper>
          </Right>
        </Wrapper>
      )}
    </div>
  );
};

export default React.memo(TypeApi2);
