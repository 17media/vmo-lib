<<<<<<< Updated upstream
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCheckWebview = void 0;
const react_1 = require("react");
const useCheckWebview = () => {
    const [isWebview, setIsWebview] = react_1.useState(false);
    react_1.useEffect(() => {
=======
import { useState, useEffect } from 'react';
export const useCheckWebview = () => {
    const [isWebview, setIsWebview] = useState(false);
    useEffect(() => {
>>>>>>> Stashed changes
        const userAgent = window.navigator.userAgent.toLowerCase();
        const safari = /safari/.test(userAgent);
        const ios = /iphone|ipod|ipad/.test(userAgent);
        setIsWebview((ios && !safari) || (!ios && userAgent.includes('wv')));
    }, []);
    return isWebview;
};
export default useCheckWebview;
//# sourceMappingURL=useCheckWebview.js.map