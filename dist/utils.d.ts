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
