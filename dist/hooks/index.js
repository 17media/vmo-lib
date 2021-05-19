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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useAutoNext_1 = __importDefault(require("./useAutoNext"));
const useCountdown_1 = __importDefault(require("./useCountdown"));
const useItemTransition_1 = __importDefault(require("./useItemTransition"));
const useMergeLeaderboardData_1 = __importDefault(require("./useMergeLeaderboardData"));
const useMockLeaderboard_1 = __importDefault(require("./useMockLeaderboard"));
const usePageData_1 = __importDefault(require("./usePageData"));
__exportStar(require("./useCountdown"), exports);
__exportStar(require("./useItemTransition"), exports);
__exportStar(require("./useMergeLeaderboardData"), exports);
__exportStar(require("./usePageData"), exports);
exports.default = {
    useAutoNext: useAutoNext_1.default,
    useCountdown: useCountdown_1.default,
    useItemTransition: useItemTransition_1.default,
    useMergeLeaderboardData: useMergeLeaderboardData_1.default,
    useMockLeaderboard: useMockLeaderboard_1.default,
    usePageData: usePageData_1.default,
};
//# sourceMappingURL=index.js.map