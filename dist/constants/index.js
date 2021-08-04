"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONLINE_RIM_IMAGE = exports.DEFAULT_AVATAR_IMAGE = exports.AVATAR_BASE_URL = exports.AVATAR_ENDPOINT = exports.ASSETS_CND_ENDPOINT = exports.LANG_FILE_ENDPOINT = exports.IFRAME_ENDPOINT = exports.EVENTORY_OFFLINE_ENDPOINT = exports.EVENTORY_ENDPOINT = exports.GCP_CDN_HOST = exports.GCP_CDN_DOMAIN = exports.MAIN_HOST = void 0;
exports.MAIN_HOST = 'https://vmo.17.media';
/**
 * GCP bucket
 */
exports.GCP_CDN_DOMAIN = 'webcdn.17app.co';
exports.GCP_CDN_HOST = `https://${exports.GCP_CDN_DOMAIN}`;
/**
 * Eventory Api
 *
 * usage: `https://api.17app.co/api/v1/leaderboards/eventory?containerID={containerID}`
 *
 * use query `containerID={containerID}` to compose to complete leaderboard API url.
 */
exports.EVENTORY_ENDPOINT = 'https://api.17app.co/api/v1/leaderboards/eventory';
/**
 * same as const `EVENTORY_ENDPOINT`.
 */
exports.EVENTORY_OFFLINE_ENDPOINT = 'https://dsa-api.17app.co/api/v1/leaderboards/eventory';
/**
 * iframe domain
 *
 * e.g. https://event.17.live/12027-tw-anniversary6-frontend/method-03?lang=zh_TW
 */
exports.IFRAME_ENDPOINT = 'https://event.17.live';
/**
 * e.g. https://webcdn.17app.co/campaign/projects/12027-tw-anniversary6-frontend/translations.json
 */
exports.LANG_FILE_ENDPOINT = `https://${exports.GCP_CDN_DOMAIN}/campaign/projects`;
exports.ASSETS_CND_ENDPOINT = 'https://storage.googleapis.com/media17-prod-web-assets/campaign';
/**
 * Avatar CDN
 */
exports.AVATAR_ENDPOINT = 'https://assets-17app.akamaized.net';
/**
 * usage: ``AVATAR_BASE_URL${userID}``
 *
 * use `userID` to compose to streamer's avatar image url.
 */
exports.AVATAR_BASE_URL = `${exports.AVATAR_ENDPOINT}/THUMBNAIL_`;
/**
 * if streamer does not have avatar image, use this image instead.
 */
exports.DEFAULT_AVATAR_IMAGE = `https://${exports.GCP_CDN_DOMAIN}/17live/ig-default.svg`;
/**
 * if streamer is streaming, use this image wrap around streamer's avatar.
 */
exports.ONLINE_RIM_IMAGE = `https://${exports.GCP_CDN_DOMAIN}/campaign/assets/igOfficialCircle.png`;
//# sourceMappingURL=index.js.map