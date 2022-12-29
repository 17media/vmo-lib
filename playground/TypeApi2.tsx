import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useTypeApi, { APIType } from '../lib/hooks/useTypeApi';
import { TransitionLeaderboardWrapper } from '../lib/components/TransitionLeaderboardWrapper';
import { ItemStyle } from '../lib/hooks/useItemTransition';
import { User, EventoryApiOption } from '../lib/types';
import handleClickAvatar from '../lib/helpers/handleClickAvatar';

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

const LeaderboardData = ({ config, left, right }) => {
  const { loading, polling, requestError, leaderboardData } = useTypeApi({
    apiList: config.apiList,
    realTime: config.realTime,
    initialData: [],
    opt: config.opt,
  });

  const final1 =
    leaderboardData && leaderboardData.length > 0 ? leaderboardData[0] : [];
  const final2 =
    leaderboardData && leaderboardData.length > 0 ? leaderboardData[1] : [];

  return (
    <>
      <span>is loading: {loading.toString()}</span> <br />
      <span>is polling: {polling.toString()}</span> <br />
      {requestError && (
        <span>Error: {(requestError as any)?.message}</span>
      )}{' '}
      <br />
      {!requestError && (
        <Wrapper>
          <Left>
            Eventory Container ID: {left}
            <TransitionLeaderboardWrapper
              itemStyle={itemStyle}
              rowCount={rowCount}
              user={final1}
            >
              {final1.map(item => (
                <Item
                  key={item.userInfo.userID}
                  onClick={() =>
                    handleClickAvatar(
                      item.userInfo.userID,
                      item.userInfo.openID,
                      item.userInfo?.onLiveInfo?.streamID,
                    )
                  }
                >
                  <b>主播名稱:</b> {item.userInfo.displayName}
                  <br />
                  <b>id: </b> {item.userInfo.userID} <br />
                  <b>value:</b> {item.score}
                </Item>
              ))}
            </TransitionLeaderboardWrapper>
          </Left>
          <Right>
            Eventory Container ID: {right}
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
    </>
  );
};

const TypeApi2 = () => {
  const [eventoryContainerIdLeft, setEventoryContainerIdLeft] =
    useState<string>('8f112c2c-d466-4427-9406-c2b040ea399f');
  const [eventoryContainerIdRight, setEventoryContainerIdRight] =
    useState<string>('0fd39941-f077-4990-aaf7-78b8a77f04c5');
  const [realTime, setRealTime] = useState(0);
  const [limit, setLimit] = useState(1000);
  const [config, setConfig] = useState<{
    apiList: APIType[];
    realTime: number;
    initialData?: User[][];
    opt?: EventoryApiOption;
  } | null>();

  const eventoryContainerIdLeftHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEventoryContainerIdLeft(e.target.value);
    setConfig(null);
  };

  const eventoryContainerIdRightHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEventoryContainerIdRight(e.target.value);
    setConfig(null);
  };

  const realTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRealTime(+e.target.value);
    setConfig(null);
  };

  const limitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(+e.target.value);
    setConfig(null);
  };

  const submitHandler = () => {
    setConfig({
      apiList: [
        {
          sta: eventoryContainerIdLeft,
          prod: '',
        },
        {
          sta: eventoryContainerIdRight,
          prod: '',
        },
      ],
      realTime,
      opt: {
        limit,
        cursor: '',
        withoutOnliveInfo: false,
      },
    });
  };

  return (
    <div>
      <span>
        取得單雙榜單資料，主要是考量到有可能會有複數取得榜單資料的情況，例如榜單＋加分榜
      </span>
      <br />
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
      <span>Request 自動重發更新間隔時間:</span>
      <Input
        type="number"
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
      <p>
        點擊主播行為由 <b>helpers/handleClickAvatar </b>提供（deepLink &
        有開播情形會連至主播頁面）
      </p>
      <br />
      <Button onClick={submitHandler}>送出</Button>
      <br />
      {config && (
        <LeaderboardData
          config={config}
          left={eventoryContainerIdLeft}
          right={eventoryContainerIdRight}
        />
      )}
    </div>
  );
};

export default React.memo(TypeApi2);
