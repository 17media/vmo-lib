"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCheckWebview = void 0;
const react_1 = require("react");
const useCheckWebview = () => {
    const [isWebview, setIsWebview] = react_1.useState(false);
    react_1.useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const safari = /safari/.test(userAgent);
        const ios = /iphone|ipod|ipad/.test(userAgent);
        setIsWebview((ios && !safari) || (!ios && userAgent.includes('wv')));
    }, []);
    return isWebview;
};
exports.useCheckWebview = useCheckWebview;
exports.default = exports.useCheckWebview;
//# sourceMappingURL=useCheckWebview.js.map