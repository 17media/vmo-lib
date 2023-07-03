import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useTypeApi, { APIType } from '../lib/hooks/useTypeApi';
import { TransitionLeaderboardWrapper } from '../lib/components/TransitionLeaderboardWrapper';
import { ItemStyle } from '../lib/hooks/useItemTransition';
import { User, EventoryApiOption } from '../lib/types';
import useFilter from '../lib/hooks/useFilter';
import handleClickAvatar from '../lib/helpers/handleClickAvatar';

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
  cursor: pointer;
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

interface SearchFilterProps {
  handleOnChange: (value: string) => void;
}

const SearchFilter = ({ handleOnChange }: SearchFilterProps) => (
  <div>
    <span>Filter 主播名稱:</span>
    <Input
      placeholder="請輸入主播名稱"
      onChange={evt => handleOnChange(evt.target.value)}
    />
  </div>
);

const LeaderboardData = ({ config }) => {
  const { loading, polling, requestError, leaderboardData } = useTypeApi({
    apiList: config.apiList,
    realTime: config.realTime,
    initialData: [
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
    ],
    opt: config.opt,
  });

  // 因為apiList只有一筆，所以使用leaderboardData[0]資料，如果apiList有更多筆資料，後端資料會相對應leaderboardData[]位置
  const final =
    leaderboardData && leaderboardData.length > 0 ? leaderboardData[0] : [];

  const { data, handleOnChange } = useFilter(final);

  return (
    <>
      <SearchFilter handleOnChange={handleOnChange} />
      <span>is loading: {loading.toString()}</span> <br />
      <span>is polling: {polling.toString()}</span> <br />
      {requestError && <span>Error: {(requestError as any).message}</span>}{' '}
      <br />
      <p>
        點擊主播行為由 <b>helpers/handleClickAvatar </b>提供（deepLink &
        有開播情形會連至主播頁面）
      </p>
      {!requestError && (
        <Wrapper>
          <TransitionLeaderboardWrapper
            itemStyle={itemStyle}
            rowCount={rowCount}
            user={data}
          >
            {data.map(item => (
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
        </Wrapper>
      )}
    </>
  );
};

const TypeApi = () => {
  const [eventoryContainerId, setEventoryContainerId] = useState<string>(
    '7f92082d-844e-4094-b661-a10e2c9c79a9',
  );
  const [realTime, setRealTime] = useState(0);
  const [limit, setLimit] = useState<number>(1000);
  const [config, setConfig] = useState<{
    apiList: APIType[];
    realTime: number;
    initialData?: User[][];
    opt?: EventoryApiOption;
  } | null>();

  const eventoryContainerIdHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEventoryContainerId(e.target.value);
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
          sta: eventoryContainerId,
          prod: '',
        },
      ],
      realTime: +realTime,
      opt: {
        limit,
        cursor: '',
        withoutOnliveInfo: false,
      },
    });
  };

  return (
    <div>
      <span>取得單一榜單資料</span>
      <br />
      <span>Eventory Container ID:</span>
      <Input
        type="text"
        value={eventoryContainerId}
        placeholder="請輸入 Eventory Container ID"
        onChange={eventoryContainerIdHandler}
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
      <span>向後端每次拿取的數量:</span>
      <Input
        type="number"
        value={limit}
        placeholder="請輸入向後端每次拿取的數量"
        onChange={limitHandler}
      />
      <br />
      <Button onClick={submitHandler}>送出</Button>
      <br />
      {config && <LeaderboardData config={config} />}
    </div>
  );
};

export default React.memo(TypeApi);
