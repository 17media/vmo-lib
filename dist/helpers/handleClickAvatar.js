import { isClient, isAndroid, isIOS, isMobile } from '../utils';
import tunnelOpen from '../17liveMessageTunnel';
const open = (userID, openID, streamID = 0) => {
    if (isMobile(window.navigator.userAgent)) {
        if (isAndroid(window.navigator.userAgent)) {
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
        if (isIOS(window.navigator.userAgent)) {
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
            tunnelOpen(openID);
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
    if (!isClient()) {
        console.warn('can only use in client side.');
        return;
    }
    open(userID, openID, streamID);
};
export default handleClickAvatar;
//# sourceMappingURL=handleClickAvatar.js.map