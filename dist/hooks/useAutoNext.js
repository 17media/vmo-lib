"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = __importDefault(require("next/router"));
const utils_1 = require("../utils");
const useAutoNext = (isEnded, page) => {
    react_1.useEffect(() => {
        if (isEnded) {
            const search = utils_1.qs();
            window.scrollTo(0, 0);
            router_1.default.push({
                pathname: window.location.pathname,
                query: Object.assign(Object.assign({}, search), { page }),
            });
        }
    }, [isEnded, page]);
};
exports.default = useAutoNext;
//# sourceMappingURL=useAutoNext.js.map