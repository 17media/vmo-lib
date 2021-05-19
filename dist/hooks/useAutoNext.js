"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const utils_1 = require("../utils");
const useAutoNext = (isEnded, page) => {
    react_1.useEffect(() => {
        if (isEnded) {
            const search = utils_1.qs();
            const query = Object.assign(Object.assign({}, search), { page });
            const queryPath = Object.entries(query).map(([key, value]) => `${key}=${value}`);
            const nextLocation = `${utils_1.globalThis.location.pathname}?${queryPath.join("&")}`;
            utils_1.globalThis.location.href = nextLocation;
        }
    }, [isEnded, page]);
};
exports.default = useAutoNext;
//# sourceMappingURL=useAutoNext.js.map