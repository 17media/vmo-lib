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
// yarn test ./lib/hooks/__test__/startRender.test.ts
const react_hooks_1 = require("@testing-library/react-hooks");
const useStartRender_1 = __importDefault(require("../useStartRender"));
describe('test useStartRender hook', () => {
    test('should get startRender true', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = react_hooks_1.renderHook(() => useStartRender_1.default());
        expect(result.current).toEqual(true);
    }));
});
//# sourceMappingURL=startRender.test.js.map