"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLeadingZeros = exports.qs = exports.globalThis = void 0;
exports.globalThis = (1, eval)("this"); // eslint-disable-line no-eval
const qs = (search = exports.globalThis.location
    ? exports.globalThis.location.search.slice(1)
    : "") => search
    .split("&")
    .filter(Boolean)
    .reduce((o, keyValue) => {
    const [key, value] = keyValue.split("=");
    if (value === undefined)
        o[key] = true;
    else
        o[key] = decodeURIComponent(value);
    return o;
}, {});
exports.qs = qs;
const addLeadingZeros = (value) => String(value).length < 2 ? `0${String(value)}` : value;
exports.addLeadingZeros = addLeadingZeros;
//# sourceMappingURL=utils.js.map