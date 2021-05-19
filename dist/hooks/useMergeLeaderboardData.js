"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useMergeLeaderboardData = ({ data = [], bonus = [], blackList = [], }) => react_1.useMemo(() => data
    .map((item, index) => (Object.assign(Object.assign({}, item), { bonus: bonus[index].score })))
    .filter((item) => !blackList
    .map((user) => user.userInfo.userID)
    .includes(item.userInfo.userID)), [blackList, bonus, data]);
exports.default = useMergeLeaderboardData;
//# sourceMappingURL=useMergeLeaderboardData.js.map