"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * 設定 startRender 為 true 並且回傳
 * @returns startRender
 */
const useStartRender = () => {
    const [startRender, setStartRender] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setStartRender(true);
    }, []);
    return startRender;
};
exports.default = useStartRender;
//# sourceMappingURL=useStartRender.js.map