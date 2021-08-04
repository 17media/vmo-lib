"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const useAutoNext_1 = require("./useAutoNext");
const useCountdown_1 = require("./useCountdown");
const useItemTransition_1 = require("./useItemTransition");
const useMockLeaderboard_1 = require("./useMockLeaderboard");
const usePageData_1 = require("./usePageData");
const useLuckyDraw_1 = require("./useLuckyDraw");
const useSyncScroll_1 = require("./useSyncScroll");
__exportStar(require("./useCountdown"), exports);
__exportStar(require("./useItemTransition"), exports);
__exportStar(require("./usePageData"), exports);
__exportStar(require("./useAutoNext"), exports);
__exportStar(require("./useMockLeaderboard"), exports);
__exportStar(require("./useLuckyDraw"), exports);
__exportStar(require("./useSyncScroll"), exports);
exports.default = {
    useAutoNext: useAutoNext_1.useAutoNext,
    useCountdown: useCountdown_1.useCountdown,
    useItemTransition: useItemTransition_1.useItemTransition,
    useMockLeaderboard: useMockLeaderboard_1.useMockLeaderboard,
    usePageData: usePageData_1.usePageData,
    useLuckyDraw: useLuckyDraw_1.useLuckyDraw,
    useSyncScroll: useSyncScroll_1.useSyncScroll,
};
//# sourceMappingURL=index.js.map