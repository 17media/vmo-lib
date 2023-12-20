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
        const streamID = onLiveInfo?.streamID || defaultStreamID;
        handleClickAvatar(userID, openID, streamID);
        expect(globalThis.open).toHaveBeenCalled();
    });
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
        const streamID = onLiveInfo?.streamID || defaultStreamID;
        handleClickAvatar(userID, openID, streamID);
        const expectUrl = `media17://live/${streamID}`;
        expect(globalThis.location.href).toBe(expectUrl);
    });
    test('should iOS /iPhone|iPad|iPod/ userAgent to correct location href url without streamID (the streamer is not on living)', async () => {
        const mockUser = mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
        const streamID = onLiveInfo?.streamID;
        handleClickAvatar(userID, openID, streamID);
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
        const streamID = onLiveInfo?.streamID || defaultStreamID;
        handleClickAvatar(userID, openID, streamID);
        const expectUrl = `http://17.media/share/live/${streamID}`;
        expect(globalThis.location.href).toBe(expectUrl);
    });
    test('should android /Android/ userAgent call java17WebObject.openProfile without streamID (the streamer is not on living)', async () => {
        const mockUser = mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
        const streamID = onLiveInfo?.streamID;
        handleClickAvatar(userID, openID, streamID);
        expect(java17WebObject.openProfile).toHaveBeenCalled();
    });
});
//# sourceMappingURL=handleClickAvatar.test.js.map