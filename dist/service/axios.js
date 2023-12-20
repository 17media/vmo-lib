<<<<<<< Updated upstream
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstanceVote = exports.getInstanceEventory = exports.getInstanceCache = exports.getInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils");
const getInstance = () => axios_1.default.create({
    baseURL: utils_1.isProdVmo17Media()
        ? 'https://api.17app.co/api'
        : 'https://sta-api.17app.co/api',
});
exports.getInstance = getInstance;
const getInstanceCache = () => {
=======
import axios from 'axios';
import { EVENT_SERVER_ENDPOINT, EVENT_SERVER_ENDPOINT_STA, EVENT_SERVER_ENDPOINT_UAT, GOAPI_ENDPOINT, GOAPI_ENDPOINT_STA, GOAPI_ENDPOINT_UAT, } from '../constants';
import { getGoapiUrl, isProdVmo17Media, isStagVmo17Media, isUatVmo17Media, } from '../utils';
import { Env } from '../enums';
export const getInstance = (env) => axios.create({
    baseURL: getGoapiUrl(env),
});
export const getInstanceCache = (env) => {
>>>>>>> Stashed changes
    if (process.env.LOCAL) {
        return axios.create({
            baseURL: 'http://localhost:5000',
        });
    }
<<<<<<< Updated upstream
    return axios_1.default.create({
        baseURL: utils_1.isProdVmo17Media()
            ? 'https://event-server.17app.co/api'
            : 'https://event-server-sta.17app.co/api',
    });
};
exports.getInstanceCache = getInstanceCache;
const getInstanceEventory = () => axios_1.default.create({
    baseURL: utils_1.isProdVmo17Media()
        ? 'https://api-dsa.17app.co/api'
        : 'https://sta-api.17app.co/api',
});
exports.getInstanceEventory = getInstanceEventory;
const getInstanceVote = () => axios_1.default.create({
    baseURL: utils_1.isProdVmo17Media()
        ? 'https://api.17app.co/api'
        : 'https://sta-api.17app.co/api',
});
exports.getInstanceVote = getInstanceVote;
=======
    if (env === Env.PROD)
        return EVENT_SERVER_ENDPOINT;
    if (env === Env.STA)
        return EVENT_SERVER_ENDPOINT_STA;
    if (env === Env.UAT)
        return EVENT_SERVER_ENDPOINT_UAT;
    return axios.create({
        baseURL: isProdVmo17Media()
            ? EVENT_SERVER_ENDPOINT
            : isStagVmo17Media()
                ? EVENT_SERVER_ENDPOINT_STA
                : isUatVmo17Media()
                    ? EVENT_SERVER_ENDPOINT_UAT
                    : EVENT_SERVER_ENDPOINT_STA,
    });
};
export const getInstanceEventory = (env) => {
    if (env === Env.PROD)
        return axios.create({ baseURL: GOAPI_ENDPOINT });
    if (env === Env.STA)
        return axios.create({ baseURL: GOAPI_ENDPOINT_STA });
    if (env === Env.UAT)
        return axios.create({ baseURL: GOAPI_ENDPOINT_UAT });
    return axios.create({
        baseURL: isProdVmo17Media()
            ? GOAPI_ENDPOINT
            : isStagVmo17Media()
                ? GOAPI_ENDPOINT_STA
                : isUatVmo17Media()
                    ? GOAPI_ENDPOINT_UAT
                    : GOAPI_ENDPOINT_STA,
    });
};
/**
 * same with getInstanceEventory
 */
export const getInstanceVote = () => getInstanceEventory();
>>>>>>> Stashed changes
//# sourceMappingURL=axios.js.map