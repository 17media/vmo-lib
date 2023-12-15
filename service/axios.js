"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstanceVote = exports.getInstanceEventory = exports.getInstanceCache = exports.getInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const getInstance = (env) => axios_1.default.create({
    baseURL: (0, utils_1.getGoapiUrl)(env),
});
exports.getInstance = getInstance;
const getInstanceCache = (env) => {
    if (process.env.LOCAL) {
        return axios_1.default.create({
            baseURL: 'http://localhost:5000',
        });
    }
    if (env === enums_1.Env.PROD)
        return constants_1.EVENT_SERVER_ENDPOINT;
    if (env === enums_1.Env.STA)
        return constants_1.EVENT_SERVER_ENDPOINT_STA;
    if (env === enums_1.Env.UAT)
        return constants_1.EVENT_SERVER_ENDPOINT_UAT;
    return axios_1.default.create({
        baseURL: (0, utils_1.isProdVmo17Media)()
            ? constants_1.EVENT_SERVER_ENDPOINT
            : (0, utils_1.isStagVmo17Media)()
                ? constants_1.EVENT_SERVER_ENDPOINT_STA
                : (0, utils_1.isUatVmo17Media)()
                    ? constants_1.EVENT_SERVER_ENDPOINT_UAT
                    : constants_1.EVENT_SERVER_ENDPOINT_STA,
    });
};
exports.getInstanceCache = getInstanceCache;
const getInstanceEventory = (env) => {
    if (env === enums_1.Env.PROD)
        return axios_1.default.create({ baseURL: constants_1.GOAPI_ENDPOINT });
    if (env === enums_1.Env.STA)
        return axios_1.default.create({ baseURL: constants_1.GOAPI_ENDPOINT_STA });
    if (env === enums_1.Env.UAT)
        return axios_1.default.create({ baseURL: constants_1.GOAPI_ENDPOINT_UAT });
    return axios_1.default.create({
        baseURL: (0, utils_1.isProdVmo17Media)()
            ? constants_1.GOAPI_ENDPOINT
            : (0, utils_1.isStagVmo17Media)()
                ? constants_1.GOAPI_ENDPOINT_STA
                : (0, utils_1.isUatVmo17Media)()
                    ? constants_1.GOAPI_ENDPOINT_UAT
                    : constants_1.GOAPI_ENDPOINT_STA,
    });
};
exports.getInstanceEventory = getInstanceEventory;
/**
 * same with getInstanceEventory
 */
const getInstanceVote = () => (0, exports.getInstanceEventory)();
exports.getInstanceVote = getInstanceVote;
//# sourceMappingURL=axios.js.map