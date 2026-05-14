import { ISetting } from '../types';
export interface ISettings extends Array<ISetting> {
}
export declare const switchPageEvent: (page: string) => void;
export declare const eventFunc: (event: KeyboardEvent, settings: ISettings) => void;
/**
 * 當使用者用 keyboard 直接鍵入 1~9 或左右方向鍵時，會對應切換到該頁面或前後頁<br />
 * 開發者也能自行定義 fn 偵測不同的鍵入直，對url query string做改動，並切到改動的網址<br />
 * @param settings Settings
 * @returns void
 */
export declare const useKeyboard: (settings: ISettings) => void;
export default useKeyboard;
