<<<<<<< Updated upstream
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineNormalTemplate = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const usePageData_1 = __importDefault(require("../hooks/usePageData"));
const TransitionLeaderboardWrapper_1 = require("../components/TransitionLeaderboardWrapper");
const utils_1 = require("../utils");
const { test, initMockList } = utils_1.qs();
=======
import React from 'react';
import styled from 'styled-components';
import usePageData from '../hooks/usePageData';
import { TransitionLeaderboardWrapper } from '../components/TransitionLeaderboardWrapper';
import { qs } from '../utils';
const { test, initMockList } = qs();
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
const OfflineNormalTemplate = () => {
    const { countdownText, mockLeaderboard } = usePageData_1.default(round1);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("span", null, countdownText),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(TransitionLeaderboardWrapper_1.TransitionLeaderboardWrapper, { itemStyle: itemStyle, rowCount: rowCount, user: mockLeaderboard }, mockLeaderboard.map(item => (react_1.default.createElement(Item, { key: item.userInfo.userID },
=======
export const OfflineNormalTemplate = () => {
    const { countdownText, mockLeaderboard } = usePageData(round1);
    return (React.createElement("div", null,
        React.createElement("span", null, countdownText),
        React.createElement(Wrapper, null,
            React.createElement(TransitionLeaderboardWrapper, { itemStyle: itemStyle, rowCount: rowCount, user: mockLeaderboard }, mockLeaderboard.map(item => (React.createElement(Item, { key: item.userInfo.userID },
>>>>>>> Stashed changes
                item.userInfo.openID,
                ": ",
                item.score)))))));
};
export default OfflineNormalTemplate;
//# sourceMappingURL=offlineNormal.js.map