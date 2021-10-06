"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.getType = exports.isProdVmo17Media = exports.getRandomInteger = exports.isBrowser = exports.addLeadingZeros = exports.qs = exports.globalThis = void 0;
exports.globalThis = (1, eval)('this'); // eslint-disable-line no-eval
const qs = (search = exports.globalThis.location
    ? exports.globalThis.location.search.slice(1)
    : '') => search
    .split('&')
    .filter(Boolean)
    .reduce((o, keyValue) => {
    const [key, value] = keyValue.split('=');
    if (value === undefined)
        o[key] = true;
    else
        o[key] = decodeURIComponent(value);
    return o;
}, {});
exports.qs = qs;
const addLeadingZeros = (value) => String(value).length < 2 ? `0${String(value)}` : value;
exports.addLeadingZeros = addLeadingZeros;
/**
 *
 * check is using in client side.
 */
const isBrowser = () => typeof window !== 'undefined';
exports.isBrowser = isBrowser;
/**
 * random integer number between min to max.
 */
const getRandomInteger = (min, max) => {
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.getRandomInteger = getRandomInteger;
const isProdVmo17Media = () => window.location.hostname === 'vmo.17.media';
exports.isProdVmo17Media = isProdVmo17Media;
const getType = (api) => exports.isProdVmo17Media() ? api.prod : api.sta;
exports.getType = getType;
function debounce(func, timeout) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
}
exports.debounce = debounce;
//# sourceMappingURL=utils.js.map