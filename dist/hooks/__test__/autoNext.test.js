"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const useAutoNext_1 = __importDefault(require("../useAutoNext"));
const utils_1 = require("../../utils");
describe("test auto change page hook", () => {
    // workaround with https://wildwolf.name/jest-how-to-mock-window-location-href/
    const { location } = utils_1.globalThis;
    beforeAll(() => {
        // @ts-ignore
        delete utils_1.globalThis.location;
        // @ts-ignore
        utils_1.globalThis.location = {
            pathname: "http://localhost",
            href: "http://localhost",
            search: "",
        };
    });
    afterAll(() => {
        utils_1.globalThis.location = location;
    });
    test("should be current page while is not end", () => {
        const isEnd = false;
        const nextPage = 2;
        const expectedPageUrl = "http://localhost";
        react_hooks_1.renderHook(() => useAutoNext_1.default(isEnd, nextPage));
        expect(utils_1.globalThis.location.href).toBe(expectedPageUrl);
    });
    test("should be next page while isEnd", () => {
        const isEnd = true;
        const nextPage = 2;
        const expectedPageUrl = "http://localhost?page=2";
        react_hooks_1.renderHook(() => useAutoNext_1.default(isEnd, nextPage));
        expect(utils_1.globalThis.location.href).toBe(expectedPageUrl);
    });
});
//# sourceMappingURL=autoNext.test.js.map