import { Env } from './enums';
import { ISetting, LeaderboardItem } from './types';
export declare const globalThis: any;
export declare const qs: <T extends {
    [k: string]: string | boolean;
}>(search?: string) => Partial<T>;
export declare const addLeadingZeros: (value: number) => string | number;
/**
 *
 * check is using in client side.
 */
export declare const isBrowser: () => boolean;
/**
 * random integer number between min to max.
 */
export declare const getRandomInteger: (min: number, max: number) => number;
export declare const isProdVmo17Media: () => boolean;
export declare const isStagVmo17Media: () => boolean;
export declare const isUatVmo17Media: () => boolean;
export declare const getGoapiUrl: (env?: Env) => "https://wap-api.17app.co/api" | "https://sta-wap-api.17app.co/api" | "https://uat-api.17app.co/api";
export declare const getType: (api: {
    sta: string;
    prod: string;
    uat?: string;
}, env?: Env) => string;
export declare function debounce<Params extends any[]>(func: (...args: Params) => any, timeout: number): (...args: Params) => void;
/**
 * Get browser languages or manually queryString. e.g. ?lang=ja
 */
export declare const getUserLangs: () => string[];
/**
 * languages defined from Eventory
 * @enum
 */
export declare enum RegionLanguage {
    TAIWAN = "zh_TW",
    CHINA = "zh_CN",
    HONGKONG = "zh_HK",
    JAPAN = "ja",
    EUROPE = "en_US",
    ARAB = "ar"
}
/**
 * Get Currently selected language from campaign setting
 * @param {RegionLanguage[]} supportLangs languages provide by campaign setting
 * @returns enum RegionLanguage
 */
export declare const getCurrentTranslateLang: (supportLangs: RegionLanguage[]) => RegionLanguage;
/**
 * Get datetime text which shown on countdown date range, its language depends on RegionLanguage
 * @param {string} dateString datetime, i.e. 2021-09-25T18:00:00+08:00
 * @param {string} format if wants to change return format, default is 'MM/DD(WN)hh:mm:ss'
 * @param {RegionLanguage} regionLanguage return language, options from enum RegionLanguage
 * @returns formated dateString
 */
export declare const getStringDateByLocalFormat: (dateString: string, format?: string, regionLanguage?: RegionLanguage) => string;
/**
 * Get datetime text which shown on countdown remaining time
 * @param {Object}
 * @param {string} formatText format want to replace. i.e. 剩餘 D 天 hh:mm:ss
 * @returns formated text
 */
export declare const getStringDateCountdownByLocalFormat: ({ d, h, m, s, ms, }: {
    d: number;
    h: number;
    m: number;
    s: number;
    ms: number;
}, formatText: string) => string;
/**
 * Get time text which shown on countdown remaining time. * if remaining time is less than one day.
 * @param {string} dateString datetime, i.e. 2021-09-25T18:00:00+08:00
 * @returns {string}
 */
export declare const convertDateToTime: (dateString: string) => string;
/**
 * Get result for compare two datetime is same or not
 * @param {string} startDate datetime, i.e. 2021-09-25T18:00:00+08:00
 * @param {string} endDate datetime, i.e. 2021-09-25T18:00:00+08:00
 * @returns {boolean}
 */
export declare const isSameDate: (startDate: string, endDate: string) => boolean;
export declare const cumulativeOffset: (element: any) => {
    top: number;
    left: number;
};
/**
 * Format number by toLocaleString and remove digit number.
 * @param {RegionLanguage} regionLanguage language provide by campaign setting for toLocaleString
 * @param {number} value digit number, i.e. 1234.56
 * @returns {string}
 */
export declare const numberFormat: (value: number, regionLanguage?: RegionLanguage) => string;
/**
 * check isMobile by navigator userAgent.
 */
export declare const isMobile: (userAgent: string) => boolean;
/**
 * check isAndroid by navigator userAgent.
 */
export declare const isAndroid: (userAgent: string) => boolean;
/**
 * check isIOS by navigator userAgent.
 */
export declare const isIOS: (userAgent: string) => boolean;
/**
 * check is using in client side.
 */
export declare const isClient: () => boolean;
/**
 * go to next page
 */
export declare const getNextLocation: (query: {
    [s: string]: unknown;
} | ArrayLike<unknown>) => void;
/**
 * set default keyboard settings
 */
export declare const getKeyboardSettings: (firstPage: number, lastPage: number) => ISetting[];
/**
 * Copy specific text in browser.
 * @param {string} str Specific text which want to be copy.
 * @returns {boolean} copy result: success/fail
 */
export declare const copyStringToClipboard: (str: string) => boolean;
export type ExtraData = {
    name: string;
    filterFunction: (item: any) => string;
};
/**
 * Copy Leaderboard Data in browser.
 *
 * example:
 * ```typescript
 * const data: LeaderboardItem[] = [...]
 *
 * // will get basic copy property: "Rank, UserID, Name, Score, Region, EventoryKey"
 * copyLeaderboardDataToClipboard(data)
 *
 * // It can extra more column from data to Clipboard
 * // will get extra copy property: "Rank, UserID, Name, Score, Region, EventoryKey, Lang, Age"
 * copyLeaderboardDataToClipboard(data, [
 *   {
 *     name: 'Lang',
 *     filterFuntion: item => item.lang?.primary,
 *   },
 *   {
 *     name: 'Age',
 *     filterFuntion: item => item.age,
 *   },
 * ])
 * ```
 *
 * Try it on Playground:
 * https://17media.github.io/vmo-lib/output/index.html?page=2
 *
 * @param {LeaderboardItem[]} data Leaderboard data which will be copy.
 * @param {ExtraData[]} extraDataList Setting extraData to get more than basic columns
 * @returns {boolean} copy result: success/fail
 */
export declare const copyLeaderboardDataToClipboard: (data: LeaderboardItem[], extraDataList: ExtraData[]) => boolean;
export type UserInfo = Partial<{
    jwtAccessToken: string;
    accessToken: string;
    userID: string;
}>;
export declare const getUserInfo: () => {
    jwtAccessToken: string | undefined;
    accessToken: string | undefined;
    userID: string | undefined;
};
export declare const storeUserInfo: () => {
    jwtAccessToken: string | undefined;
    accessToken: string | undefined;
    userID: string | undefined;
};
export declare const sleep: (ms: number) => Promise<unknown>;
