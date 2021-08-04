"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const jest_mock_random_1 = require("jest-mock-random");
const useMockLeaderboard_1 = __importStar(require("../useMockLeaderboard"));
describe('test mock leaderboard hook', () => {
    // user0 userID[0] 1000
    // user1 userID[1] 2000
    jest_mock_random_1.mockRandomForEach([0, 0.1, 0, 0.01, 0.2]);
    test('should change the leaderboard users each seconds', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedFirstUser = {
            user: 'user0',
            userID: useMockLeaderboard_1.usersID[0],
            score: 1000,
        };
        const expectedSecondUser = {
            user: 'user1',
            userID: useMockLeaderboard_1.usersID[1],
            score: 2000,
        };
        const { result, waitForNextUpdate } = react_hooks_1.renderHook(() => useMockLeaderboard_1.default(true));
        yield waitForNextUpdate({ timeout: false });
        expect(result.current.leaderboard[0].userInfo.openID).toEqual(expectedFirstUser.user);
        expect(result.current.leaderboard[0].userInfo.userID).toEqual(expectedFirstUser.userID);
        expect(result.current.leaderboard[0].score).toEqual(expectedFirstUser.score);
        yield waitForNextUpdate({ timeout: false });
        expect(result.current.leaderboard[0].userInfo.openID).toEqual(expectedSecondUser.user);
        expect(result.current.leaderboard[0].userInfo.userID).toEqual(expectedSecondUser.userID);
        expect(result.current.leaderboard[0].score).toEqual(expectedSecondUser.score);
    }));
    test('should return initial and stable users while enter the page', () => {
        const { result } = react_hooks_1.renderHook(() => useMockLeaderboard_1.default(true, true, true));
        expect(result.current.leaderboard).toEqual(useMockLeaderboard_1.mockUsers);
    });
    test('should return correct users while the users is limited', () => {
        const limit = 20;
        const { result } = react_hooks_1.renderHook(() => useMockLeaderboard_1.default(true, true, true, limit));
        expect(result.current.leaderboard.length).toEqual(limit);
    });
});
//# sourceMappingURL=mockLeaderboard.test.js.map