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
// yarn test ./lib/hooks/__test__/expired.test.ts
const react_hooks_1 = require("@testing-library/react-hooks");
const useExpired_1 = __importDefault(require("../useExpired"));
const Expired_1 = require("../../../playground/Expired");
describe('test useExpired hook', () => {
    test('expired should be false', () => __awaiter(void 0, void 0, void 0, function* () {
        const expiredTime = Expired_1.getExpiredDate(4);
        const { result } = react_hooks_1.renderHook(() => useExpired_1.default(expiredTime));
        expect(result.current).toBe(false);
    }));
    test('expired should be true', () => __awaiter(void 0, void 0, void 0, function* () {
        const expiredTime = Expired_1.getExpiredDate(4);
        const { result, waitForNextUpdate } = react_hooks_1.renderHook(() => useExpired_1.default(expiredTime));
        yield waitForNextUpdate({ timeout: 5000 });
        expect(result.current).toEqual(true);
    }));
});
//# sourceMappingURL=expired.test.js.map