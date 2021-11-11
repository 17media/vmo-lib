import { createProfileClickAction } from '17media-browser-spy';

import { globalThis, isAndroid, isIOS, isMobile } from '../utils';
import { trackingSource } from '../17appTrack';
import * as tunnel from '../17liveMessageTunnel';

declare const java17WebObject: any;

const open = (userID: string, openID: string, roomID = 0) => {
  if (isMobile) {
    if (isAndroid) {
      if (roomID > 0) {
        globalThis.location.href = `http://17.media/share/live/${roomID}`;
        return;
      }

      if (java17WebObject) {
        const page = 'profile';
        java17WebObject.openProfile(userID, page);
        return;
      }
    }

    if (isIOS) {
      if (roomID > 0) {
        globalThis.location.href = `media17://live/${roomID}`;
        return;
      }

      globalThis.location.href = `media17://u/${userID}`;
    }
  } else {
    if (window.parent !== window) {
      // 17.live
      tunnel.open(openID);
      return;
    }

    if (roomID > 0) {
      window.open(`http://17.media/share/live/${roomID}`);
    }
  }
};

const handleClickAvatar = (userID: string, openID: string, roomID = 0) => {
  open(userID, openID, roomID);
  trackingSource?.track(createProfileClickAction(userID, roomID > 0, 'avatar'));
};

export default handleClickAvatar;
