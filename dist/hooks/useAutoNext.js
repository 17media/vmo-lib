"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const utils_1 = require("../utils");
const useAutoNext = (isEnded, nextPage) => {
    react_1.useEffect(() => {
        const _a = utils_1.qs(), { page = 1 } = _a, search = __rest(_a, ["page"]);
        if (+page === nextPage)
            return;
        if (isEnded) {
            const query = Object.assign(Object.assign({}, search), { page: nextPage });
            const queryPath = Object.entries(query).map(([key, value]) => `${key}=${value}`);
            const nextLocation = `${utils_1.globalThis.location.pathname}?${queryPath.join("&")}`;
            utils_1.globalThis.location.href = nextLocation;
        }
    }, [isEnded, nextPage, utils_1.qs]);
};
exports.default = useAutoNext;
//# sourceMappingURL=useAutoNext.js.map