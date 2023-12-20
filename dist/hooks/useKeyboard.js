<<<<<<< Updated upstream
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyboard = exports.eventFunc = exports.switchPageEvent = void 0;
const react_1 = require("react");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const switchPageEvent = (page) => {
    const search = utils_1.qs();
    window.scrollTo(0, 0);
    const query = Object.assign(Object.assign({}, search), { page });
    utils_1.getNextLocation(query);
=======
import { useEffect } from 'react';
import { EventTypes } from '../enums';
import { qs, getNextLocation } from '../utils';
export const switchPageEvent = (page) => {
    const search = qs();
    window.scrollTo(0, 0);
    const query = {
        ...search,
        page,
    };
    getNextLocation(query);
>>>>>>> Stashed changes
};
export const eventFunc = (event, settings) => {
    const setting = settings.find(item => item.key === event.key);
    if (setting) {
        switch (setting.type) {
<<<<<<< Updated upstream
            case enums_1.EventTypes.PAGE: {
                exports.switchPageEvent(setting.page);
=======
            case EventTypes.PAGE: {
                switchPageEvent(setting.page);
>>>>>>> Stashed changes
                break;
            }
            case EventTypes.CUSTOM: {
                setting.fn();
                break;
            }
            default:
                break;
        }
    }
};
/**
 * 當使用者用 keyboard 直接鍵入 1~9 或左右方向鍵時，會對應切換到該頁面或前後頁<br />
 * 開發者也能自行定義 fn 偵測不同的鍵入直，對url query string做改動，並切到改動的網址<br />
 * @param settings Settings
 * @returns void
 */
<<<<<<< Updated upstream
const useKeyboard = (settings) => {
    react_1.useEffect(() => {
        const handleOnKeyup = (event) => exports.eventFunc(event, settings);
=======
export const useKeyboard = (settings) => {
    useEffect(() => {
        const handleOnKeyup = (event) => eventFunc(event, settings);
>>>>>>> Stashed changes
        window.addEventListener('keyup', handleOnKeyup);
        return () => {
            window.removeEventListener('keyup', handleOnKeyup);
        };
    }, [settings]);
};
export default useKeyboard;
//# sourceMappingURL=useKeyboard.js.map