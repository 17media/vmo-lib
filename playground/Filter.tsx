import React from 'react';
import styled from 'styled-components';
import useFilter from '../lib/hooks/useFilter';
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

const leaderboardData: User[] = [
  {
    userInfo: {
      userID: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0',
      displayName: '我是柔柔',
      picture: '24661c0e-a4da-4d34-8d5b-f85ba5bf98bc.jpg',
      name: '',
      level: 0,
      openID: '123',
      region: 'TW',
      gloryroadMode: 0,
    },
    score: 1000000,
    rank: 1,
    meta: { eventoryKey: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0' },
  },
  {
    userInfo: {
      userID: 'ewe123',
      displayName: '我是硬硬且剛剛',
      picture: '789',
      name: '',
      level: 0,
      openID: '789',
      region: 'TW',
      gloryroadMode: 0,
    },
    score: 1000000,
    rank: 2,
    meta: { eventoryKey: '1234' },
  },
  {
    userInfo: {
      userID: '123gwe4',
      displayName: '我是剛剛',
      picture: '78910',
      name: '',
      level: 0,
      openID: '7894',
      region: 'TW',
      gloryroadMode: 0,
    },
    score: 1000000,
    rank: 3,
    meta: { eventoryKey: '1235' },
  },
  {
    userInfo: {
      userID: '123dd4',
      displayName: '我是軟軟',
      picture: '7891ee0',
      name: '',
      level: 0,
      openID: '7894',
      region: 'TW',
      gloryroadMode: 0,
    },
    score: 1000000,
    rank: 4,
    meta: { eventoryKey: '123we5' },
  },
];

const SearchFilter = props => (
  <div>
    <span>Filter 主播名稱:</span>
    <Input
      placeholder="請輸入主播名稱"
      onChange={evt => props.handleOnChange(evt.target.value)}
    />
  </div>
);

const Filter = () => {
  const { data, handleOnChange } = useFilter(leaderboardData);

  return (
    <div>
      <SearchFilter handleOnChange={handleOnChange} />
      <br />
      顯示資料為假資料，不是實際api資料，僅測試filter功能
      <Wrapper>
        <TransitionLeaderboardWrapper
          itemStyle={itemStyle}
          rowCount={rowCount}
          user={data}
        >
          {data.map(item => (
            <Item key={item.userInfo.userID}>
              <b>主播名稱:</b> {item.userInfo.displayName}
              <br />
              <b>Rank:</b> {item.rank}
            </Item>
          ))}
        </TransitionLeaderboardWrapper>
      </Wrapper>
    </div>
  );
};

export default React.memo(Filter);
