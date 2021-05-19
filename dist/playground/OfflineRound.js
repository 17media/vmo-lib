"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const usePageData_1 = __importDefault(require("../lib/hooks/usePageData"));
const TransitionLeaderboardWrapper_1 = require("../lib/components/TransitionLeaderboardWrapper");
const utils_1 = require("../lib/utils");
const { test, initMockList } = utils_1.qs();
const round1 = {
    startDate: "2021-05-01T18:55:00+08:00",
    endDate: "2021-06-01T18:55:00+08:00",
    nextPage: 2,
    isResultPage: false,
    endedText: "活動結束",
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
const Wrapper = styled_components_1.default.div `
  width: 100%;
`;
const Item = styled_components_1.default.div `
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;
const OfflineRound = () => {
    const { countdownText, mockLeaderboard } = usePageData_1.default(round1);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("span", null, countdownText),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(TransitionLeaderboardWrapper_1.TransitionLeaderboardWrapper, { itemStyle: itemStyle, rowCount: rowCount, user: mockLeaderboard }, mockLeaderboard.map((item) => (react_1.default.createElement(Item, { key: item.userInfo.userID },
                item.userInfo.openID,
                ": ",
                item.score)))))));
};
exports.default = OfflineRound;
//# sourceMappingURL=OfflineRound.js.map