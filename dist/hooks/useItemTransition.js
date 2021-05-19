"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useItemTransition = (itemStyle, transition, rowItems, currentRank) => {
    const { width, height, offsetX, offsetY, } = itemStyle;
    if (typeof currentRank === 'number') {
        const itemTransitionStyle = Object.assign({ left: ((currentRank - 1) % rowItems) * (width + offsetX), top: Math.floor((currentRank - 1) / rowItems) * (height + offsetY) }, transition);
        return {
            itemTransitionStyle,
        };
    }
    return {
        itemTransitionStyle: currentRank.map((rank) => (Object.assign({ left: ((rank - 1) % rowItems) * (width + offsetX), top: Math.floor((rank - 1) / rowItems) * (height + offsetY) }, transition))),
    };
};
exports.default = useItemTransition;
//# sourceMappingURL=useItemTransition.js.map