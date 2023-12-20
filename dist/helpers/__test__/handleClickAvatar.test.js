import handleClickAvatar from '../handleClickAvatar';
import { globalThis } from '../../utils';
import { mockUsers } from '../../hooks/useMockLeaderboard';
const domainUrl = 'http://localhost';
describe('test handleClickAvatar helper - web', () => {
    beforeAll(() => {
        delete globalThis.location;
        delete globalThis.navigator;
        delete globalThis.open;
        globalThis.location = {
            pathname: domainUrl,
            href: domainUrl,
            search: '',
        };
        globalThis.navigator = {
            userAgent: 'web/testing/userAgent',
        };
        globalThis.open = jest.fn();
    });
    test('should web browser userAgent to correct location href url which has streamID (the streamer is living)', async () => {
        const defaultStreamID = 1;
        const mockUser = mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
<<<<<<< Updated upstream
        const streamID = (onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID) || defaultStreamID;
        handleClickAvatar_1.default(userID, openID, streamID);
        expect(utils_1.globalThis.open).toHaveBeenCalled();
    }));
=======
        const streamID = onLiveInfo?.streamID || defaultStreamID;
        handleClickAvatar(userID, openID, streamID);
        expect(globalThis.open).toHaveBeenCalled();
    });
>>>>>>> Stashed changes
});
describe('test handleClickAvatar helper - ios', () => {
    beforeAll(() => {
        delete globalThis.location;
        delete globalThis.navigator;
        delete globalThis.open;
        globalThis.location = {
            pathname: domainUrl,
            href: domainUrl,
            search: '',
        };
        globalThis.navigator = {
            userAgent: 'Mobile/iPhone|iPad|iPod/testing/userAgent',
        };
    });
    test('should iOS /iPhone|iPad|iPod/ userAgent to correct location href url which has streamID (the streamer is living)', async () => {
        const defaultStreamID = 1;
        const mockUser = mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
<<<<<<< Updated upstream
        const streamID = (onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID) || defaultStreamID;
        handleClickAvatar_1.default(userID, openID, streamID);
=======
        const streamID = onLiveInfo?.streamID || defaultStreamID;
        handleClickAvatar(userID, openID, streamID);
>>>>>>> Stashed changes
        const expectUrl = `media17://live/${streamID}`;
        expect(globalThis.location.href).toBe(expectUrl);
    });
    test('should iOS /iPhone|iPad|iPod/ userAgent to correct location href url without streamID (the streamer is not on living)', async () => {
        const mockUser = mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
<<<<<<< Updated upstream
        const streamID = onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID;
        handleClickAvatar_1.default(userID, openID, streamID);
=======
        const streamID = onLiveInfo?.streamID;
        handleClickAvatar(userID, openID, streamID);
>>>>>>> Stashed changes
        const expectUrl = `media17://u/${userID}`;
        expect(globalThis.location.href).toBe(expectUrl);
    });
});
// jest.mock('openProfile', () => jest.fn());
describe('test handleClickAvatar helper - android', () => {
    beforeAll(() => {
        delete globalThis.location;
        delete globalThis.navigator;
        delete globalThis.open;
        globalThis.location = {
            pathname: domainUrl,
            href: domainUrl,
            search: '',
        };
        globalThis.navigator = {
            userAgent: 'Mobile/Android/testing/userAgent',
        };
        globalThis.java17WebObject = {
            openProfile: jest.fn(),
        };
    });
    test('should android /Android/ userAgent to correct location href url which has streamID (the streamer is living)', async () => {
        const defaultStreamID = 1;
        const mockUser = mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
<<<<<<< Updated upstream
        const streamID = (onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID) || defaultStreamID;
        handleClickAvatar_1.default(userID, openID, streamID);
=======
        const streamID = onLiveInfo?.streamID || defaultStreamID;
        handleClickAvatar(userID, openID, streamID);
>>>>>>> Stashed changes
        const expectUrl = `http://17.media/share/live/${streamID}`;
        expect(globalThis.location.href).toBe(expectUrl);
    });
    test('should android /Android/ userAgent call java17WebObject.openProfile without streamID (the streamer is not on living)', async () => {
        const mockUser = mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
<<<<<<< Updated upstream
        const streamID = onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID;
        handleClickAvatar_1.default(userID, openID, streamID);
=======
        const streamID = onLiveInfo?.streamID;
        handleClickAvatar(userID, openID, streamID);
>>>>>>> Stashed changes
        expect(java17WebObject.openProfile).toHaveBeenCalled();
    });
});
describe('test handleClickAvatar helper - server', () => {
    // beforeAll((): void => {
    //   delete globalThis.location;
    //   delete globalThis.navigator;
    //   delete globalThis.open;
    //   globalThis.location = {
    //     pathname: domainUrl,
    //     href: domainUrl,
    //     search: '',
    //   };
    //   globalThis.navigator = {
    //     userAgent: 'web/testing/userAgent',
    //   };
    //   globalThis.open = jest.fn();
    // });
    test('should not using in server side.', () => __awaiter(void 0, void 0, void 0, function* () {
        const defaultStreamID = 1;
        const mockUser = useMockLeaderboard_1.mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
        const streamID = (onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID) || defaultStreamID;
        handleClickAvatar_1.default(userID, openID, streamID);
        const msg = 'can only use in client side.';
        const consoleSpy = jest.spyOn(console, 'warn');
        expect(consoleSpy).toHaveBeenCalledWith(msg);
    }));
});
//# sourceMappingURL=handleClickAvatar.test.js.map