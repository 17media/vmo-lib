"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const defaultUser = {
    bonus: 0,
    meta: {},
    rank: 0,
    score: 0,
    userInfo: {
        displayName: '',
        gloryroadMode: 0,
        level: 0,
        name: '',
        openID: '',
        picture: '36a80c61-89d9-40b5-803d-5b0437f293c4.jpg',
        region: 'TW',
        userID: '',
    },
};
const usersID = new Array(100).fill(0).map(() => uuid_1.v4());
const createDefaultUser = (id, index, score = 1000) => (Object.assign(Object.assign({}, defaultUser), { score, rank: index + 1, userInfo: Object.assign(Object.assign({}, defaultUser.userInfo), { displayName: `user${index}`, name: `user${index}`, openID: `user${index}`, picture: '', userID: id }) }));
const mockUsers = usersID.map((user, index) => createDefaultUser(user, index));
const createMockGiftedUsers = (count, limit) => {
    const giftedUsers = new Array(count).fill(0).map(() => {
        const randomUserIndex = Math.floor(limit * Math.random());
        const randomScore = Math.floor(10000 * Math.random());
        return {
            userID: usersID[randomUserIndex],
            score: randomScore,
        };
    });
    return giftedUsers;
};
const replaceLeaderboard = (curLeaderboard, limit) => {
    const mockGiftedUsers = createMockGiftedUsers(1, limit);
    const nextLeaderboard = [...curLeaderboard];
    mockGiftedUsers.forEach((user) => {
        const curUser = nextLeaderboard.find((u) => u.userInfo.userID === user.userID);
        if (!curUser) {
            nextLeaderboard.push(createDefaultUser(user.userID, nextLeaderboard.length, user.score));
        }
        else {
            curUser.score += user.score;
        }
    });
    return nextLeaderboard
        .sort((a, b) => b.score - a.score)
        .map((user, index) => (Object.assign(Object.assign({}, user), { rank: index + 1 })));
};
const useMockLeaderboard = (stable = false, limit = 100) => {
    const [leaderboard, setLeaderboard] = react_1.useState([]);
    const [enable, setEnable] = react_1.useState('');
    const timer = react_1.useRef(0);
    const { test, initMockList } = utils_1.qs();
    react_1.useEffect(() => {
        if (initMockList) {
            setLeaderboard(mockUsers);
        }
        if (test)
            setEnable(test);
    }, [test, initMockList]);
    react_1.useEffect(() => {
        if (enable && stable) {
            setLeaderboard(mockUsers.slice(0, limit));
        }
        if (enable && !timer.current && !stable) {
            timer.current = window.setInterval(() => {
                setLeaderboard((prev) => replaceLeaderboard(prev, limit));
            }, 1000);
        }
        return () => {
            clearInterval(timer.current);
        };
    }, [enable, limit, stable]);
    return { leaderboard, enable };
};
exports.default = useMockLeaderboard;
//# sourceMappingURL=useMockLeaderboard.js.map