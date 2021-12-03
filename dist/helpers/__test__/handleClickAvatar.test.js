"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleClickAvatar_1 = __importDefault(require("../handleClickAvatar"));
const utils_1 = require("../../utils");
const useMockLeaderboard_1 = require("../../hooks/useMockLeaderboard");
const domainUrl = 'http://localhost';
describe('test handleClickAvatar helper - web', () => {
    beforeAll(() => {
        delete utils_1.globalThis.location;
        delete utils_1.globalThis.navigator;
        delete utils_1.globalThis.open;
        utils_1.globalThis.location = {
            pathname: domainUrl,
            href: domainUrl,
            search: '',
        };
        utils_1.globalThis.navigator = {
            userAgent: 'web/testing/userAgent',
        };
        utils_1.globalThis.open = jest.fn();
    });
    test('should web browser userAgent to correct location href url which has streamID (the streamer is living)', () => __awaiter(void 0, void 0, void 0, function* () {
        const defaultStreamID = 1;
        const mockUser = useMockLeaderboard_1.mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
        const streamID = (onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID) || defaultStreamID;
        handleClickAvatar_1.default(userID, openID, streamID);
        expect(utils_1.globalThis.open).toHaveBeenCalled();
    }));
});
describe('test handleClickAvatar helper - ios', () => {
    beforeAll(() => {
        delete utils_1.globalThis.location;
        delete utils_1.globalThis.navigator;
        delete utils_1.globalThis.open;
        utils_1.globalThis.location = {
            pathname: domainUrl,
            href: domainUrl,
            search: '',
        };
        utils_1.globalThis.navigator = {
            userAgent: 'Mobile/iPhone|iPad|iPod/testing/userAgent',
        };
    });
    test('should iOS /iPhone|iPad|iPod/ userAgent to correct location href url which has streamID (the streamer is living)', () => __awaiter(void 0, void 0, void 0, function* () {
        const defaultStreamID = 1;
        const mockUser = useMockLeaderboard_1.mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
        const streamID = (onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID) || defaultStreamID;
        handleClickAvatar_1.default(userID, openID, streamID);
        const expectUrl = `media17://live/${streamID}`;
        expect(utils_1.globalThis.location.href).toBe(expectUrl);
    }));
    test('should iOS /iPhone|iPad|iPod/ userAgent to correct location href url without streamID (the streamer is not on living)', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = useMockLeaderboard_1.mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
        const streamID = onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID;
        handleClickAvatar_1.default(userID, openID, streamID);
        const expectUrl = `media17://u/${userID}`;
        expect(utils_1.globalThis.location.href).toBe(expectUrl);
    }));
});
// jest.mock('openProfile', () => jest.fn());
describe('test handleClickAvatar helper - android', () => {
    beforeAll(() => {
        delete utils_1.globalThis.location;
        delete utils_1.globalThis.navigator;
        delete utils_1.globalThis.open;
        utils_1.globalThis.location = {
            pathname: domainUrl,
            href: domainUrl,
            search: '',
        };
        utils_1.globalThis.navigator = {
            userAgent: 'Mobile/Android/testing/userAgent',
        };
        utils_1.globalThis.java17WebObject = {
            openProfile: jest.fn(),
        };
    });
    test('should android /Android/ userAgent to correct location href url which has streamID (the streamer is living)', () => __awaiter(void 0, void 0, void 0, function* () {
        const defaultStreamID = 1;
        const mockUser = useMockLeaderboard_1.mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
        const streamID = (onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID) || defaultStreamID;
        handleClickAvatar_1.default(userID, openID, streamID);
        const expectUrl = `http://17.media/share/live/${streamID}`;
        expect(utils_1.globalThis.location.href).toBe(expectUrl);
    }));
    test('should android /Android/ userAgent call java17WebObject.openProfile without streamID (the streamer is not on living)', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = useMockLeaderboard_1.mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
        const streamID = onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID;
        handleClickAvatar_1.default(userID, openID, streamID);
        expect(java17WebObject.openProfile).toHaveBeenCalled();
    }));
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