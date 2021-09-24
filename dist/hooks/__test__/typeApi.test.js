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
// yarn test ./lib/hooks/__test__/typeApi.test.ts
const react_hooks_1 = require("@testing-library/react-hooks");
const useTypeApi_1 = __importDefault(require("../useTypeApi"));
describe('test type api hook', () => {
    test('should get eventory leaderboard backend data.', () => __awaiter(void 0, void 0, void 0, function* () {
        const eventoryLeaderboardApiList = [
            {
                sta: 'dbda13a5-70b4-445a-95a5-52f0802c4781',
                prod: '',
                isEventory: true,
            },
        ];
        const { result, waitForNextUpdate } = react_hooks_1.renderHook(() => useTypeApi_1.default(eventoryLeaderboardApiList, 'GET', 0, []));
        yield waitForNextUpdate({ timeout: 5000 });
        expect(result.current.loading).toBe(false);
        expect(result.current.polling).toBe(false);
        expect(result.current.leaderboardData);
        if (result.current.leaderboardData) {
            expect(result.current.leaderboardData.length).toBeGreaterThan(0);
            expect(result.current.leaderboardData[0].length).toBeGreaterThanOrEqual(0);
        }
    }));
    test('should get eventory leaderboard init data.', () => {
        const init = [
            [
                {
                    userInfo: {
                        userID: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0',
                        displayName: '我是柔柔',
                        picture: '24661c0e-a4da-4d34-8d5b-f85ba5bf98bc.jpg',
                        name: '',
                        level: 0,
                        openID: '',
                        region: 'TW',
                        gloryroadMode: 0,
                    },
                    score: 1000000,
                    rank: 1,
                    meta: { eventoryKey: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0' },
                },
            ],
        ];
        const { result } = react_hooks_1.renderHook(() => useTypeApi_1.default([], 'GET', 0, init));
        expect(result.current.leaderboardData);
        if (result.current.leaderboardData) {
            expect(result.current.leaderboardData[0][0].userInfo.userID).toEqual(init[0][0].userInfo.userID);
        }
    });
});
//# sourceMappingURL=typeApi.test.js.map