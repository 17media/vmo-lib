import { createProfileClickAction } from '17media-browser-spy';

import { globalThis, isAndroid, isIOS, isMobile } from '../utils';
import { trackingSource } from '../17appTrack';
import * as tunnel from '../17liveMessageTunnel';

declare const java17WebObject: any;

const open = (userID: string, openID: string, streamID = 0) => {
  if (isMobile) {
    if (isAndroid) {
      if (streamID > 0) {
        globalThis.location.href = `http://17.media/share/live/${streamID}`;
        return;
      }

      if (java17WebObject) {
        const page = 'profile';
        java17WebObject.openProfile(userID, page);
        return;
      }
    }

    if (isIOS) {
      if (streamID > 0) {
        globalThis.location.href = `media17://live/${streamID}`;
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

    if (streamID > 0) {
      window.open(`http://17.media/share/live/${streamID}`);
    }
  }
};

const handleClickAvatar = (userID: string, openID: string, streamID = 0) => {
  open(userID, openID, streamID);
  trackingSource?.track(
    createProfileClickAction(userID, streamID > 0, 'avatar'),
  );
};

export default handleClickAvatar;
