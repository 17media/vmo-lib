import LeaderboardData from '../LeaderboardData';
/* 榜單資料集：
[
    [User], [User], [WhiteList], [fake WhiteList], [BlackList],
    [User], [User], [User], [Bonus], [User]
]
*/
const userInfo = [
    // 0 baby team
    [
        {
            bonus: 50,
            meta: { eventoryKey: '004aa3d6-5297-43a4-a05a-bbbebc66cb4f' },
            rank: 1,
            score: 1000300,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '004aa3d6-5297-43a4-a05a-bbbebc66cb4f',
            },
        },
        {
            bonus: 35,
            meta: { eventoryKey: '00498625-e42e-47ce-b2a4-54b275c7e9d0' },
            rank: 2,
            score: 1000200,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00498625-e42e-47ce-b2a4-54b275c7e9d0',
            },
        },
        {
            bonus: 25,
            meta: { eventoryKey: '0049f213-2a56-4bce-a820-969243fb3939' },
            rank: 3,
            score: 1000100,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '0049f213-2a56-4bce-a820-969243fb3939',
            },
        },
    ],
    // 1 kitty team
    [
        {
            bonus: 50,
            meta: { eventoryKey: '00480d6f-3b01-4f62-91d9-5f946ae705d6' },
            rank: 1,
            score: 1000300,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00480d6f-3b01-4f62-91d9-5f946ae705d6',
            },
        },
        {
            bonus: 35,
            meta: { eventoryKey: '004ab331-e4a0-4261-8267-8848d4d42075' },
            rank: 2,
            score: 1000200,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '004ab331-e4a0-4261-8267-8848d4d42075',
            },
        },
        {
            bonus: 25,
            meta: { eventoryKey: '00499814-5904-447d-af01-e2703b23926f' },
            rank: 3,
            score: 1000100,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00499814-5904-447d-af01-e2703b23926f',
            },
        },
    ],
    // 2 WhiteList
    [
        {
            bonus: 50,
            meta: { eventoryKey: '004aa3d6-5297-43a4-a05a-bbbebc66cb4f' },
            rank: 1,
            score: 1000300,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '004aa3d6-5297-43a4-a05a-bbbebc66cb4f',
            },
        },
    ],
    // 3 fake WhiteList
    [
        {
            bonus: 50,
            meta: { eventoryKey: 'this is fake' },
            rank: 1,
            score: 1000300,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: 'this is fake',
            },
        },
    ],
    // 4 BlackList
    [
        {
            bonus: 35,
            meta: { eventoryKey: '00498625-e42e-47ce-b2a4-54b275c7e9d0' },
            rank: 2,
            score: 1000200,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00498625-e42e-47ce-b2a4-54b275c7e9d0',
            },
        },
        {
            bonus: 25,
            meta: { eventoryKey: '0049f213-2a56-4bce-a820-969243fb3939' },
            rank: 3,
            score: 1000100,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '0049f213-2a56-4bce-a820-969243fb3939',
            },
        },
    ],
    // 5 reverse baby team
    [
        {
            bonus: 25,
            meta: { eventoryKey: '0049f213-2a56-4bce-a820-969243fb3939' },
            rank: 3,
            score: 1000100,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '0049f213-2a56-4bce-a820-969243fb3939',
            },
        },
        {
            bonus: 35,
            meta: { eventoryKey: '00498625-e42e-47ce-b2a4-54b275c7e9d0' },
            rank: 2,
            score: 1000200,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00498625-e42e-47ce-b2a4-54b275c7e9d0',
            },
        },
        {
            bonus: 50,
            meta: { eventoryKey: '004aa3d6-5297-43a4-a05a-bbbebc66cb4f' },
            rank: 1,
            score: 1000300,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '004aa3d6-5297-43a4-a05a-bbbebc66cb4f',
            },
        },
    ],
    // 6 update baby team
    [
        {
            bonus: 50,
            meta: { eventoryKey: '004aa3d6-5297-43a4-a05a-bbbebc66cb4f' },
            rank: 1,
            score: 300,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '004aa3d6-5297-43a4-a05a-bbbebc66cb4f',
            },
        },
        {
            bonus: 35,
            meta: { eventoryKey: '00498625-e42e-47ce-b2a4-54b275c7e9d0' },
            rank: 2,
            score: 200,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00498625-e42e-47ce-b2a4-54b275c7e9d0',
            },
        },
        {
            bonus: 25,
            meta: { eventoryKey: '0049f213-2a56-4bce-a820-969243fb3939' },
            rank: 3,
            score: 100,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '0049f213-2a56-4bce-a820-969243fb3939',
            },
        },
        {
            bonus: 25,
            meta: { eventoryKey: '00480d6f-3b01-4f62-91d9-5f946ae705d6' },
            rank: 4,
            score: 10,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00480d6f-3b01-4f62-91d9-5f946ae705d6',
            },
        },
    ],
    // 7 after update baby team
    [
        {
            bonus: 50,
            meta: { eventoryKey: '004aa3d6-5297-43a4-a05a-bbbebc66cb4f' },
            rank: 1,
            score: 1000600,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '004aa3d6-5297-43a4-a05a-bbbebc66cb4f',
            },
        },
        {
            bonus: 35,
            meta: { eventoryKey: '00498625-e42e-47ce-b2a4-54b275c7e9d0' },
            rank: 2,
            score: 1000400,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00498625-e42e-47ce-b2a4-54b275c7e9d0',
            },
        },
        {
            bonus: 25,
            meta: { eventoryKey: '0049f213-2a56-4bce-a820-969243fb3939' },
            rank: 3,
            score: 1000200,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '0049f213-2a56-4bce-a820-969243fb3939',
            },
        },
        {
            bonus: 25,
            meta: { eventoryKey: '00480d6f-3b01-4f62-91d9-5f946ae705d6' },
            rank: 4,
            score: 10,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00480d6f-3b01-4f62-91d9-5f946ae705d6',
            },
        },
    ],
    // 8 bonus array for kitty team(round1)
    [
        {
            bonus: 50,
            meta: { eventoryKey: '00480d6f-3b01-4f62-91d9-5f946ae705d6' },
            rank: 1,
            score: 5,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00480d6f-3b01-4f62-91d9-5f946ae705d6',
            },
        },
        {
            bonus: 35,
            meta: { eventoryKey: '004ab331-e4a0-4261-8267-8848d4d42075' },
            rank: 2,
            score: 5,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '004ab331-e4a0-4261-8267-8848d4d42075',
            },
        },
        {
            bonus: 25,
            meta: { eventoryKey: '00499814-5904-447d-af01-e2703b23926f' },
            rank: 3,
            score: 5,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00499814-5904-447d-af01-e2703b23926f',
            },
        },
    ],
    // 9 kitty team after bonus
    [
        {
            bonus: 55,
            meta: {
                eventoryKey: '00480d6f-3b01-4f62-91d9-5f946ae705d6',
                round1: 5,
            },
            rank: 1,
            score: 1000300,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00480d6f-3b01-4f62-91d9-5f946ae705d6',
            },
        },
        {
            bonus: 40,
            meta: {
                eventoryKey: '004ab331-e4a0-4261-8267-8848d4d42075',
                round1: 5,
            },
            rank: 2,
            score: 1000200,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '004ab331-e4a0-4261-8267-8848d4d42075',
            },
        },
        {
            bonus: 30,
            meta: {
                eventoryKey: '00499814-5904-447d-af01-e2703b23926f',
                round1: 5,
            },
            rank: 3,
            score: 1000100,
            userInfo: {
                displayName: '',
                gloryroadMode: 0,
                level: 0,
                name: '',
                openID: '',
                picture: '',
                region: 'TW',
                userID: '00499814-5904-447d-af01-e2703b23926f',
            },
        },
    ],
];
describe('leaderboard data testing', () => {
    test('should return correct team map and leaderboard users order', () => {
        const copyUserInfo = userInfo;
        const lb = new LeaderboardData(copyUserInfo);
        lb.setLeaderboard(5, 'baby');
        const leaderboardMap = lb.getLeaderboard();
        expect(leaderboardMap.baby).toEqual(userInfo[0]);
    });
    test('should return correct teams map', () => {
        const copyUserInfo = userInfo;
        const lb = new LeaderboardData(copyUserInfo);
        lb.setLeaderboards([0, 1], ['baby', 'kitty']);
        const leaderboardMap = lb.getLeaderboard();
        expect(leaderboardMap.baby).toEqual(userInfo[0]);
        expect(leaderboardMap.kitty).toEqual(userInfo[1]);
    });
    test('should return correct leaderboard after whitelist filter', () => {
        const copyUserInfo = userInfo;
        const lb = new LeaderboardData(copyUserInfo);
        lb.setLeaderboard(0, 'baby');
        lb.setWhiteList(2, 'baby');
        const leaderboardMap = lb.getLeaderboard();
        expect(leaderboardMap.baby).toEqual(userInfo[2]);
    });
    test('should return correct leaderboard after whitelist filter at the case no one in the whitelist', () => {
        const copyUserInfo = userInfo;
        const lb = new LeaderboardData(copyUserInfo);
        lb.setLeaderboard(0, 'baby');
        lb.setWhiteList(3, 'baby');
        const leaderboardMap = lb.getLeaderboard();
        expect(leaderboardMap.baby).toEqual([]);
    });
    test('should return correct leaderboard after blacklist filter', () => {
        const copyUserInfo = userInfo;
        const lb = new LeaderboardData(copyUserInfo);
        lb.setLeaderboard(0, 'baby');
        lb.setBlackList(4, 'baby');
        const leaderboardMap = lb.getLeaderboard();
        expect(leaderboardMap.baby).toEqual(userInfo[2]);
    });
    test('should return correct team map after updateLeaderboard function works', () => {
        const copyUserInfo = userInfo;
        const lb = new LeaderboardData(copyUserInfo);
        lb.setLeaderboard(0, 'baby');
        lb.setLeaderboard(6, 'baby');
        const leaderboardMap = lb.getLeaderboard();
        expect(leaderboardMap.baby).toEqual(userInfo[7]);
    });
    test('should return correct team map after setBonus function works', () => {
        const copyUserInfo = userInfo;
        const lb = new LeaderboardData(copyUserInfo);
        lb.setLeaderboard(1, 'round1');
        lb.setBonus(8, 'round1');
        const leaderboardMap = lb.getLeaderboard();
        expect(leaderboardMap.round1).toEqual(userInfo[9]);
    });
});
//# sourceMappingURL=LeaderboardData.test.js.map