import { isClient, isAndroid, isIOS, isMobile } from '../utils';
import tunnelOpen from '../17liveMessageTunnel';
const open = (userID, openID, streamID = 0) => {
<<<<<<< Updated upstream
    if (utils_1.isMobile(window.navigator.userAgent)) {
        if (utils_1.isAndroid(window.navigator.userAgent)) {
=======
    if (isMobile(window.navigator.userAgent)) {
        if (isAndroid(window.navigator.userAgent)) {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        if (utils_1.isIOS(window.navigator.userAgent)) {
=======
        if (isIOS(window.navigator.userAgent)) {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            _17liveMessageTunnel_1.default(openID);
=======
            tunnelOpen(openID);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    if (!utils_1.isClient()) {
=======
    if (!isClient()) {
>>>>>>> Stashed changes
        console.warn('can only use in client side.');
        return;
    }
    open(userID, openID, streamID);
};
export default handleClickAvatar;
//# sourceMappingURL=handleClickAvatar.js.map