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
exports.getExpiredDate = void 0;
const react_1 = __importStar(require("react"));
const useExpired_1 = __importDefault(require("../lib/hooks/useExpired"));
/**
 * @param sec 欲增加的過期秒數
 * @returns expiredDate 現在時間 + sec, ex: 2020-04-10T23:59:59+08:00
 */
const getExpiredDate = (sec) => {
    const n = new Date();
    const offset = -n.getTimezoneOffset() / 60;
    n.setHours(n.getHours() + offset);
    n.setSeconds(n.getSeconds() + sec);
    const offsetString = 
    // eslint-disable-next-line no-nested-ternary
    offset >= 0
        ? offset <= 9
            ? `+0${offset.toString()}:00`
            : `+${offset.toString()}:00`
        : offset >= -9
            ? `-0${offset.toString()}:00`
            : `-${offset.toString()}:00`;
    const expiredDate = n.toISOString().split('.')[0] + offsetString;
    return expiredDate;
};
exports.getExpiredDate = getExpiredDate;
const Expired = () => {
    const expiredDate = react_1.useRef(exports.getExpiredDate(10));
    const isExpired = useExpired_1.default(expiredDate.current);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("span", null,
            "\u904E\u671F\u6642\u9593(expiredDate) \u90FD\u662F\u6309\u4E0B\u6B64 playground \u7684\u6642\u9593+10\u79D2\uFF0C\u5230\u9054\u8A2D\u5B9A\u7684\u904E\u671F\u6642\u9593(expiredDate)\u6642\u6703\u5C07\u662F\u5426\u904E\u671F(isExpired)\u72C0\u614B\u5F9E false \u6539\u6210 true",
            react_1.default.createElement("br", null),
            "\u5BE6\u969B\u4E0A\u904E\u671F\u6642\u9593(expiredDate)\u70BA\u958B\u767C\u8005\u81EA\u884C\u5B9A\u7FA9\u50B3\u5165useExpired\uFF0C\u9019\u908A\u53EA\u662F\u65B9\u4FBF\u505A playground \u9A57\u8B49"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("span", null,
            "\u904E\u671F\u6642\u9593(expiredDate): ",
            expiredDate.current),
        react_1.default.createElement("br", null),
        react_1.default.createElement("span", null,
            "\u662F\u5426\u904E\u671F(isExpired): ",
            isExpired.toString()),
        react_1.default.createElement("br", null)));
};
exports.default = react_1.default.memo(Expired);
//# sourceMappingURL=Expired.js.map