<<<<<<< Updated upstream
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Sentry = __importStar(require("@sentry/react"));
const tracing_1 = require("@sentry/tracing");
const constants_1 = require("../constants");
=======
import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { SENTRY_DSN_URL } from '../constants';
>>>>>>> Stashed changes
/**
 * 包相關設定檔案統一管理, 只需單純 useSentry.
 */
const useSentry = () => {
<<<<<<< Updated upstream
    react_1.useEffect(() => {
=======
    useEffect(() => {
>>>>>>> Stashed changes
        Sentry.init({
            dsn: SENTRY_DSN_URL,
            integrations: [new BrowserTracing()],
            tracesSampleRate: 1.0,
        });
        Sentry.configureScope(scope => {
            scope.setTag('product', 'eventory/custom');
        });
    }, []);
};
export default useSentry;
//# sourceMappingURL=useSentry.js.map