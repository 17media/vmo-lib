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
const react_hooks_1 = require("@testing-library/react-hooks");
const useFollower_1 = __importDefault(require("../useFollower"));
describe('test follower hook', () => {
    test('should get follower data from api.', () => __awaiter(void 0, void 0, void 0, function* () {
        const userID = '3a4464b5-8228-4d96-bd82-c0fe5e8be673';
        const accessToken = 'fe45a40b-962d-44f4-acac-a8f5362fe611';
        const { result, waitForNextUpdate } = react_hooks_1.renderHook(() => useFollower_1.default(userID, accessToken));
        yield waitForNextUpdate({ timeout: 5000 });
        expect(result.current.errorMsg).toEqual('');
        expect(result.current.followers.length).toBeGreaterThan(0);
    }));
    test('should get empty followers array and errorMsg when user token invalid.', () => __awaiter(void 0, void 0, void 0, function* () {
        const userID = '3a4464b5-8228-4d96-bd82-c0fe5e8be673';
        const accessToken = 'wrong token';
        const { result, waitForNextUpdate } = react_hooks_1.renderHook(() => useFollower_1.default(userID, accessToken));
        yield waitForNextUpdate({ timeout: 5000 });
        expect(result.current.errorMsg).toEqual('invalid token');
        expect(result.current.followers).toEqual([]);
    }));
    test('should get empty followers array and errorMsg when no given user.', () => __awaiter(void 0, void 0, void 0, function* () {
        const userID = '';
        const accessToken = '';
        const { result, waitForNextUpdate } = react_hooks_1.renderHook(() => useFollower_1.default(userID, accessToken));
        yield waitForNextUpdate();
        expect(result.current.errorMsg).toEqual('something wrong!');
        expect(result.current.followers).toEqual([]);
    }));
});
//# sourceMappingURL=follower.test.js.map