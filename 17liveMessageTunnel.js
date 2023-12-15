"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hosts = ['https://17.live', 'https://sta.17.live'];
// to store recognized host in sessionStorage
const KEY_17LIVE_HOST = '17live/17LIVE_HOST';
// global method to send message
const sendMessage = (data) => {
    const host = sessionStorage.getItem(KEY_17LIVE_HOST);
    if (host)
        window.parent.postMessage(data, host);
};
/**
 * setup message tunnel and start receiving messages
 */
if (typeof window !== 'undefined') {
    window.addEventListener('message', ({ origin, data: { type, payload } }) => {
        // get, check, and set host origin
        if (origin && sessionStorage.getItem(KEY_17LIVE_HOST) !== origin) {
            const host = hosts.find(h => h === origin);
            if (!host) {
                return false;
            }
            sessionStorage.setItem(KEY_17LIVE_HOST, host);
        }
    }, false);
}
/**
 * Actions
 */
const open = (openID) => sendMessage({
    type: '17live/Event/EVENT_SEND_AVATAR_LINK',
    payload: openID,
});
exports.default = open;
//# sourceMappingURL=17liveMessageTunnel.js.map