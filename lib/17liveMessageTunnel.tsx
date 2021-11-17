const hosts = ['https://17.live', 'https://sta.17.live'];

// to store recognized host in sessionStorage
const KEY_17LIVE_HOST = '17live/17LIVE_HOST';

// global method to send message
const sendMessage = (data: any) => {
  const host = sessionStorage.getItem(KEY_17LIVE_HOST);
  if (host) window.parent.postMessage(data, host);
};

/**
 * setup message tunnel and start receiving messages
 */
if (typeof window !== 'undefined') {
  window.addEventListener(
    'message',
    ({ origin, data: { type, payload } }) => {
      // get, check, and set host origin
      if (origin && sessionStorage.getItem(KEY_17LIVE_HOST) !== origin) {
        const host = hosts.find(h => h === origin);

        if (!host) {
          return false;
        }

        sessionStorage.setItem(KEY_17LIVE_HOST, host);
      }

      // receive auth info
      if (type === '17live/Event/EVENT_AUTH_INFO') {
        const { userID, accessToken } = payload;

        sessionStorage.setItem('userID', userID);
        sessionStorage.setItem('accessToken', accessToken);
      }
    },
    false,
  );
}
/**
 * Actions
 */
const open = (openID: string) =>
  sendMessage({
    type: '17live/Event/EVENT_SEND_AVATAR_LINK',
    payload: openID,
  });

export default open;
