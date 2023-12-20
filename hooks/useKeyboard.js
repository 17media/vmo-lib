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
};
export const eventFunc = (event, settings) => {
    const setting = settings.find(item => item.key === event.key);
    if (setting) {
        switch (setting.type) {
            case EventTypes.PAGE: {
                switchPageEvent(setting.page);
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
export const useKeyboard = (settings) => {
    useEffect(() => {
        const handleOnKeyup = (event) => eventFunc(event, settings);
        window.addEventListener('keyup', handleOnKeyup);
        return () => {
            window.removeEventListener('keyup', handleOnKeyup);
        };
    }, [settings]);
};
export default useKeyboard;
//# sourceMappingURL=useKeyboard.js.map