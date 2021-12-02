"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSyncScroll = void 0;
const react_1 = require("react");
/**
 * 多個榜單同時下滑
 */
const useSyncScroll = () => {
    // element which want to handle scroll
    const elPoolRef = react_1.useRef([]);
    const handleSroll = (e) => {
        if (!elPoolRef.current)
            return;
        Array.from(elPoolRef.current).forEach(el => {
            el.scrollTop = e.target.scrollTop;
        });
    };
    return {
        handleSroll,
        elPoolRef,
    };
};
exports.useSyncScroll = useSyncScroll;
exports.default = exports.useSyncScroll;
//# sourceMappingURL=useSyncScroll.js.map