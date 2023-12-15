"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
/**
 * 包相關設定檔案統一管理, 只需單純 useSentry.
 */
const useSentry = () => {
    (0, react_1.useEffect)(() => {
        Sentry.init({
            dsn: constants_1.SENTRY_DSN_URL,
            integrations: [new tracing_1.BrowserTracing()],
            tracesSampleRate: 1.0,
        });
        Sentry.configureScope(scope => {
            scope.setTag('product', 'eventory/custom');
        });
    }, []);
};
exports.default = useSentry;
//# sourceMappingURL=useSentry.js.map