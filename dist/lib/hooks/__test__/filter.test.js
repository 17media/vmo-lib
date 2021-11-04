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
// yarn test ./lib/hooks/__test__/filter.test.ts
const react_hooks_1 = require("@testing-library/react-hooks");
const _17media_browser_spy_1 = require("17media-browser-spy");
const useFilter_1 = __importDefault(require("../useFilter"));
jest.mock('17media-browser-spy');
const leaderboardData = [
    {
        userInfo: {
            userID: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0',
            displayName: '我是柔柔',
            picture: '24661c0e-a4da-4d34-8d5b-f85ba5bf98bc.jpg',
            name: '',
            level: 0,
            openID: '123',
            region: 'TW',
            gloryroadMode: 0,
        },
        score: 1000000,
        rank: 1,
        meta: { eventoryKey: '4bfcd001-5ff1-4ec7-88fe-e395b05386b0' },
    },
    {
        userInfo: {
            userID: 'ewe123',
            displayName: '我是硬硬且剛剛',
            picture: '789',
            name: '',
            level: 0,
            openID: '789',
            region: 'TW',
            gloryroadMode: 0,
        },
        score: 1000000,
        rank: 2,
        meta: { eventoryKey: '1234' },
    },
    {
        userInfo: {
            userID: '123gwe4',
            displayName: '我是剛剛',
            picture: '78910',
            name: '',
            level: 0,
            openID: '7894',
            region: 'TW',
            gloryroadMode: 0,
        },
        score: 1000000,
        rank: 3,
        meta: { eventoryKey: '1235' },
    },
    {
        userInfo: {
            userID: '123dd4',
            displayName: '我是軟軟',
            picture: '7891ee0',
            name: '',
            level: 0,
            openID: '7894',
            region: 'TW',
            gloryroadMode: 0,
        },
        score: 1000000,
        rank: 4,
        meta: { eventoryKey: '123we5' },
    },
];
describe('test filter hook', () => {
    test('should get filtered data length equals to two', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = react_hooks_1.renderHook(() => useFilter_1.default(leaderboardData));
        result.current.handleOnChange('剛');
        yield waitForNextUpdate();
        expect(_17media_browser_spy_1.createSearchAction).toHaveBeenCalled();
        expect(result.current.data.length).toEqual(2);
    }));
    test('should get no filtered data', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = react_hooks_1.renderHook(() => useFilter_1.default(leaderboardData));
        result.current.handleOnChange('0');
        yield waitForNextUpdate();
        expect(_17media_browser_spy_1.createSearchAction).toHaveBeenCalled();
        expect(result.current.data.length).toEqual(0);
    }));
});
//# sourceMappingURL=filter.test.js.map