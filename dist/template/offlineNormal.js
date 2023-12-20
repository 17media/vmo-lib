import React from 'react';
import styled from 'styled-components';
import usePageData from '../hooks/usePageData';
import { TransitionLeaderboardWrapper } from '../components/TransitionLeaderboardWrapper';
import { qs } from '../utils';
const { test, initMockList } = qs();
const round1 = {
    startDate: '2021-05-01T18:55:00+08:00',
    endDate: '2021-05-11T18:55:00+08:00',
    nextPage: 2,
    isResultPage: false,
    endedText: '活動結束',
    test: !!test,
    init: !!initMockList,
};
const rowCount = 4;
const itemStyle = {
    width: 100,
    height: 100,
    offsetX: 20,
    offsetY: 20,
};
const Wrapper = styled.div `
  width: 100%;
`;
const Item = styled.div `
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;
export const OfflineNormalTemplate = () => {
    const { countdownText, mockLeaderboard } = usePageData(round1);
    return (React.createElement("div", null,
        React.createElement("span", null, countdownText),
        React.createElement(Wrapper, null,
            React.createElement(TransitionLeaderboardWrapper, { itemStyle: itemStyle, rowCount: rowCount, user: mockLeaderboard }, mockLeaderboard.map(item => (React.createElement(Item, { key: item.userInfo.userID },
                item.userInfo.openID,
                ": ",
                item.score)))))));
};
export default OfflineNormalTemplate;
//# sourceMappingURL=offlineNormal.js.map