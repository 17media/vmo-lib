"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMockLeaderboard = exports.mockUsers = exports.usersID = void 0;
const react_1 = require("react");
const uuid_1 = require("uuid");
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
        onLiveInfo: {
            liveStreamID: '',
            premiumType: 0,
            streamID: 0,
            streamerType: 0,
        },
    },
};
exports.usersID = new Array(100).fill(0).map(() => (0, uuid_1.v4)());
const createDefaultUser = (id, index, score = 1000) => (Object.assign(Object.assign({}, defaultUser), { score, rank: index + 1, userInfo: Object.assign(Object.assign({}, defaultUser.userInfo), { displayName: `user${index}`, name: `user${index}`, openID: `user${index}`, picture: '', userID: id }) }));
exports.mockUsers = exports.usersID.map((user, index) => createDefaultUser(user, index));
const createMockGiftedUsers = (count, limit) => {
    const giftedUsers = new Array(count).fill(0).map(() => {
        const randomUserIndex = Math.floor(limit * Math.random());
        const randomScore = Math.floor(10000 * Math.random());
        return {
            userID: exports.usersID[randomUserIndex],
            score: randomScore,
        };
    });
    return giftedUsers;
};
const replaceLeaderboard = (curLeaderboard, limit) => {
    const mockGiftedUsers = createMockGiftedUsers(1, limit);
    const nextLeaderboard = [...curLeaderboard];
    mockGiftedUsers.forEach(user => {
        const curUser = nextLeaderboard.find(u => u.userInfo.userID === user.userID);
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
/**
 * 測試用 leaderboard 資料
 * @param enable 開啟
 * @param initMockList 初始化榜單
 * @param stable 是否固定還是要持續增加 user
 * @param limit 最多幾名 users
 */
const useMockLeaderboard = (enable = false, initMockList = false, stable = false, limit = 100) => {
    const [leaderboard, setLeaderboard] = (0, react_1.useState)([]);
    const timer = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(() => {
        if (initMockList) {
            setLeaderboard(exports.mockUsers);
        }
    }, [initMockList]);
    (0, react_1.useEffect)(() => {
        if (enable && stable) {
            setLeaderboard(exports.mockUsers.slice(0, limit));
        }
        if (enable && !timer.current && !stable) {
            timer.current = window.setInterval(() => {
                setLeaderboard(prev => replaceLeaderboard(prev, limit));
            }, 1000);
        }
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
                timer.current = 0;
            }
        };
    }, [enable, limit, stable]);
    return { leaderboard };
};
exports.useMockLeaderboard = useMockLeaderboard;
exports.default = exports.useMockLeaderboard;
//# sourceMappingURL=useMockLeaderboard.js.map