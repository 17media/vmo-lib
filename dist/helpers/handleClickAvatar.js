"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _17media_browser_spy_1 = require("17media-browser-spy");
const utils_1 = require("../utils");
const _17appTrack_1 = require("../17appTrack");
const _17liveMessageTunnel_1 = __importDefault(require("../17liveMessageTunnel"));
const open = (userID, openID, streamID = 0) => {
    if (utils_1.isMobile(window.navigator.userAgent)) {
        if (utils_1.isAndroid(window.navigator.userAgent)) {
            if (streamID > 0) {
                window.location.href = `http://17.media/share/live/${streamID}`;
                return;
            }
            if (java17WebObject) {
                const page = 'profile';
                java17WebObject.openProfile(userID, page);
                return;
            }
        }
        if (utils_1.isIOS(window.navigator.userAgent)) {
            if (streamID > 0) {
                window.location.href = `media17://live/${streamID}`;
                return;
            }
            window.location.href = `media17://u/${userID}`;
        }
    }
    else {
        if (window.parent !== window) {
            // 17.live
            _17liveMessageTunnel_1.default(openID);
            return;
        }
        if (streamID > 0) {
            window.open(`http://17.media/share/live/${streamID}`);
        }
    }
};
/**
 * 給 userID 跟 openID 來做 deeplink web/ios/android 網址轉換(若正在開播則多傳 streamID, 沒有則無) <br />
 * @param userID 17 live 上的 account userID
 * @param openID 17 live 上的 account openID
 * @param streamID 17 live 上的 account onLiveInfo streamID
 * @returns 取得 followers 資料以及 errMsg 判斷是否有問題
 */
const handleClickAvatar = (userID, openID, streamID = 0) => {
    if (!utils_1.isClient()) {
        console.warn('can only use in client side.');
        return;
    }
    open(userID, openID, streamID);
    _17appTrack_1.trackingSource === null || _17appTrack_1.trackingSource === void 0 ? void 0 : _17appTrack_1.trackingSource.track(_17media_browser_spy_1.createProfileClickAction(userID, streamID > 0, 'avatar'));
};
exports.default = handleClickAvatar;
//# sourceMappingURL=handleClickAvatar.js.map