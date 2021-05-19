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
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const dad_1 = require("@17media/dad");
const useCountdown_1 = __importStar(require("../useCountdown"));
describe("test stage countdown hook", () => {
    test("should return rest of the end time and not yet status", () => {
        const start = new Date("2026-05-01T18:55:00+08:00").getTime();
        const end = new Date("2026-06-01T18:55:00+08:00").getTime();
        const endText = "ended";
        const defaultCountdownTime = end - start;
        const { result } = react_hooks_1.renderHook(() => useCountdown_1.default(start, end, endText));
        expect(result.current.status).toBe(useCountdown_1.TimeStatus.NotYet);
        expect(result.current.text).toBe(useCountdown_1.formatCountdownText(useCountdown_1.getRelatedDistance(defaultCountdownTime)));
    });
    test("should return rest of the end time and ongoing status", () => {
        const start = new Date("2021-05-01T18:55:00+08:00").getTime();
        const end = new Date("2026-06-01T18:55:00+08:00").getTime();
        const endText = "ended";
        const currentTime = end - dad_1.now() * 1000;
        const { result } = react_hooks_1.renderHook(() => useCountdown_1.default(start, end, endText));
        expect(result.current.status).toBe(useCountdown_1.TimeStatus.Ongoing);
        expect(result.current.text).toBe(useCountdown_1.formatCountdownText(useCountdown_1.getRelatedDistance(currentTime)));
    });
    test("should return end test and end status", () => {
        const start = new Date("2021-05-01T18:55:00+08:00").getTime();
        const end = new Date("2021-05-02T18:55:00+08:00").getTime();
        const endText = "ended";
        const { result } = react_hooks_1.renderHook(() => useCountdown_1.default(start, end, endText));
        expect(result.current.status).toBe(useCountdown_1.TimeStatus.Ended);
        expect(result.current.text).toBe(endText);
    });
});
//# sourceMappingURL=countdown.test.js.map