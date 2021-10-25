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
export declare const getType: (api: {
    sta: string;
    prod: string;
}) => string;
export declare function debounce<Params extends any[]>(func: (...args: Params) => any, timeout: number): (...args: Params) => void;
/**
 * Get browser languages or manually queryString. e.g. ?lang=ja
 */
export declare const getUserLangs: () => string[];
/**
 * languages defined from Eventory
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
