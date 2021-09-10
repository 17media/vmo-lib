import React from 'react';
import styled from 'styled-components';
import useTypeApi from '../lib/hooks/useTypeApi';
import { TransitionLeaderboardWrapper } from '../lib/components/TransitionLeaderboardWrapper';
import { ItemStyle } from '../lib/hooks/useItemTransition';

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

const apiList = [
  {
    sta: 'dbda13a5-70b4-445a-95a5-52f0802c4781',
    prod: '16e0e4fd-9c36-4fac-9bcd-4b715e9cd6a3',
    isEventory: true,
  },
];

const TypeApi = () => {
  const { loading, leaderboardData = [] } = useTypeApi(apiList, 'GET', 0, []);
  // 因為apiList只有一筆，所以使用leaderboardData[0]資料，如果apiList有更多筆資料，後端資料會相對應leaderboardData[]位置
  const final =
    leaderboardData.length > 0 && leaderboardData[0] ? leaderboardData[0] : [];

  return (
    <div>
      <span>資料來源：夏末</span>
      <br />
      <span>is loading: {loading.toString()}</span>
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
    </div>
  );
};

export default React.memo(TypeApi);
