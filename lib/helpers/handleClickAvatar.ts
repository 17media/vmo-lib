import { createProfileClickAction } from '17media-browser-spy';

import { globalThis, isAndroid, isIOS, isMobile } from '../utils';
import { trackingSource } from '../17appTrack';
import tunnelOpen from '../17liveMessageTunnel';

declare const java17WebObject: any;

const open = (userID: string, openID: string, streamID = 0) => {
  if (isMobile(globalThis.navigator.userAgent)) {
    if (isAndroid(globalThis.navigator.userAgent)) {
      if (streamID > 0) {
        globalThis.location.href = `http://17.media/share/live/${streamID}`;
        return;
      }
      console.log('inn: ', java17WebObject);

      if (java17WebObject) {
        const page = 'profile';
        java17WebObject.openProfile(userID, page);
        return;
      }
    }

    if (isIOS(globalThis.navigator.userAgent)) {
      if (streamID > 0) {
        globalThis.location.href = `media17://live/${streamID}`;
        return;
      }

      globalThis.location.href = `media17://u/${userID}`;
    }
  } else {
    console.log('in web: ', streamID);
    if (window.parent !== window) {
      // 17.live
      tunnelOpen(openID);
      return;
    }

    if (streamID > 0) {
      globalThis.open(`http://17.media/share/live/${streamID}`);
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
const handleClickAvatar = (userID: string, openID: string, streamID = 0) => {
  open(userID, openID, streamID);
  trackingSource?.track(
    createProfileClickAction(userID, streamID > 0, 'avatar'),
  );
};

export default handleClickAvatar;
