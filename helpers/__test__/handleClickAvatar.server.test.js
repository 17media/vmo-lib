/**
 * @jest-environment node
 */
import handleClickAvatar from '../handleClickAvatar';
import { mockUsers } from '../../hooks/useMockLeaderboard';
describe('test handleClickAvatar helper - server', () => {
    test('should not using in server side.', async () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        const defaultStreamID = 1;
        const mockUser = mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
        const streamID = onLiveInfo?.streamID || defaultStreamID;
        handleClickAvatar(userID, openID, streamID);
        const msg = 'can only use in client side.';
        expect(consoleSpy).toBeCalledWith(msg);
        consoleSpy.mockRestore();
    });
});
//# sourceMappingURL=handleClickAvatar.server.test.js.map