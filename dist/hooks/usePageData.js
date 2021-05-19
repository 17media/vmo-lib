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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePageData = void 0;
const dad_1 = require("@17media/dad");
const useCountdown_1 = __importStar(require("./useCountdown"));
const useAutoNext_1 = __importDefault(require("./useAutoNext"));
const useMockLeaderboard_1 = __importDefault(require("./useMockLeaderboard"));
const usePageData = ({ startDate, endDate, nextPage, isResultPage, endedText, test, init, }) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const { status, text: countdownText } = useCountdown_1.default(start, end, endedText);
    const isEnded = status === useCountdown_1.TimeStatus.Ended && dad_1.now() < end + 5000;
    useAutoNext_1.default(isEnded, nextPage);
    const { leaderboard: mockLeaderboard } = useMockLeaderboard_1.default(test, init, isResultPage);
    return {
        mockLeaderboard,
        countdownText,
        status,
    };
};
exports.usePageData = usePageData;
exports.default = exports.usePageData;
//# sourceMappingURL=usePageData.js.map