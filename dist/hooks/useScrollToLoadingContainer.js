"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollToLoadingContainer = void 0;
const react_1 = require("react");
/**
 * 在傳入值 loading=true 時，將畫面移動到 html element id=loading-container 的位置
 * @param loading boolean
 */
const useScrollToLoadingContainer = (loading) => {
    react_1.useEffect(() => {
        if (loading) {
            const target = document.getElementById('loading-container');
            if (target) {
                target.scrollIntoView();
            }
        }
    }, [loading]);
};
exports.useScrollToLoadingContainer = useScrollToLoadingContainer;
exports.default = exports.useScrollToLoadingContainer;
//# sourceMappingURL=useScrollToLoadingContainer.js.map