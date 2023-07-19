"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyboard = exports.eventFunc = exports.switchPageEvent = void 0;
const react_1 = require("react");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const switchPageEvent = (page) => {
    const search = (0, utils_1.qs)();
    window.scrollTo(0, 0);
    const query = Object.assign(Object.assign({}, search), { page });
    (0, utils_1.getNextLocation)(query);
};
exports.switchPageEvent = switchPageEvent;
const eventFunc = (event, settings) => {
    const setting = settings.find(item => item.key === event.key);
    if (setting) {
        switch (setting.type) {
            case enums_1.EventTypes.PAGE: {
                (0, exports.switchPageEvent)(setting.page);
                break;
            }
            case enums_1.EventTypes.CUSTOM: {
                setting.fn();
                break;
            }
            default:
                break;
        }
    }
};
exports.eventFunc = eventFunc;
/**
 * 當使用者用 keyboard 直接鍵入 1~9 或左右方向鍵時，會對應切換到該頁面或前後頁<br />
 * 開發者也能自行定義 fn 偵測不同的鍵入直，對url query string做改動，並切到改動的網址<br />
 * @param settings Settings
 * @returns void
 */
const useKeyboard = (settings) => {
    (0, react_1.useEffect)(() => {
        const handleOnKeyup = (event) => (0, exports.eventFunc)(event, settings);
        window.addEventListener('keyup', handleOnKeyup);
        return () => {
            window.removeEventListener('keyup', handleOnKeyup);
        };
    }, [settings]);
};
exports.useKeyboard = useKeyboard;
exports.default = exports.useKeyboard;
//# sourceMappingURL=useKeyboard.js.map