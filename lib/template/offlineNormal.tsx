import React from 'react';
import styled from 'styled-components';
import usePageData from '../hooks/usePageData';
import { TransitionLeaderboardWrapper } from '../components/TransitionLeaderboardWrapper';
import { ItemStyle } from '../hooks/useItemTransition';
import { qs } from '../utils';

const { test, initMockList } = qs<{ test: string; initMockList: string }>();

const round1 = {
  startDate: '2023-06-18T18:55:00+08:00',
  endDate: '2023-06-20T18:55:00+08:00',
  nextPage: 2,
  isResultPage: false,
  endedText: '活動結束',
  test: !!test,
  init: !!initMockList,
};

console.log('test push');

const rowCount = 4;

const itemStyle: ItemStyle = {
  width: 100,
  height: 100,
  offsetX: 20,
  offsetY: 20,
};

const Wrapper = styled.div`
  width: 100%;
`;

const Item = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

export const OfflineNormalTemplate = () => {
  const { countdownText, mockLeaderboard } = usePageData(round1);
  return (
    <div>
      <span>{countdownText}</span>
      <Wrapper>
        <TransitionLeaderboardWrapper
          itemStyle={itemStyle}
          rowCount={rowCount}
          user={mockLeaderboard}
        >
          {mockLeaderboard.map(item => (
            <Item key={item.userInfo.userID}>
              {item.userInfo.openID}: {item.score}
            </Item>
          ))}
        </TransitionLeaderboardWrapper>
      </Wrapper>
    </div>
  );
};

export default OfflineNormalTemplate;
