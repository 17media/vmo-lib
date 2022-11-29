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
    if (process.env.LOCAL) {
        return axios_1.default.create({
            baseURL: 'http://localhost:5000',
        });
    }
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
//# sourceMappingURL=axios.js.map