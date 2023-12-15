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
/**
 * @jest-environment node
 */
const handleClickAvatar_1 = __importDefault(require("../handleClickAvatar"));
const useMockLeaderboard_1 = require("../../hooks/useMockLeaderboard");
describe('test handleClickAvatar helper - server', () => {
    test('should not using in server side.', () => __awaiter(void 0, void 0, void 0, function* () {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        const defaultStreamID = 1;
        const mockUser = useMockLeaderboard_1.mockUsers[0];
        const { userID, openID, onLiveInfo } = mockUser.userInfo;
        const streamID = (onLiveInfo === null || onLiveInfo === void 0 ? void 0 : onLiveInfo.streamID) || defaultStreamID;
        (0, handleClickAvatar_1.default)(userID, openID, streamID);
        const msg = 'can only use in client side.';
        expect(consoleSpy).toBeCalledWith(msg);
        consoleSpy.mockRestore();
    }));
});
//# sourceMappingURL=handleClickAvatar.server.test.js.map