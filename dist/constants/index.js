"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SENTRY_DSN_URL = exports.ONLINE_RIM_IMAGE = exports.DEFAULT_AVATAR_IMAGE = exports.AVATAR_BASE_URL = exports.AVATAR_ENDPOINT = exports.ASSETS_CND_ENDPOINT = exports.LANG_FILE_ENDPOINT = exports.IFRAME_ENDPOINT = exports.EVENTORY_OFFLINE_ENDPOINT = exports.EVENTORY_ENDPOINT = exports.GCP_CDN_HOST = exports.GCP_CDN_DOMAIN = exports.EVENT_SERVER_ENDPOINT_UAT = exports.EVENT_SERVER_ENDPOINT_STA = exports.EVENT_SERVER_ENDPOINT = exports.GOAPI_ENDPOINT_UAT = exports.GOAPI_ENDPOINT_STA = exports.GOAPI_ENDPOINT = exports.MAIN_HOST_UAT_CN = exports.MAIN_HOST_UAT = exports.MAIN_HOST_STA_CN = exports.MAIN_HOST_STA = exports.MAIN_HOST_CN = exports.MAIN_HOST = void 0;
exports.MAIN_HOST = 'https://vmo.17.media';
exports.MAIN_HOST_CN = 'https://gcscdn-event-cn.17.media';
exports.MAIN_HOST_STA = 'https://sta-vmo.17.media';
exports.MAIN_HOST_STA_CN = 'https://sta-cn-mov.17.media';
exports.MAIN_HOST_UAT = 'https://uat-vmo.17.media';
exports.MAIN_HOST_UAT_CN = 'https://uat-event-cn.17.media';
exports.GOAPI_ENDPOINT = 'https://wap-api.17app.co/api';
exports.GOAPI_ENDPOINT_STA = 'https://sta-wap-api.17app.co/api';
exports.GOAPI_ENDPOINT_UAT = 'https://uat-wap-api.17app.co/api';
exports.EVENT_SERVER_ENDPOINT = 'https://event-server.17app.co/api';
exports.EVENT_SERVER_ENDPOINT_STA = 'https://event-server-sta.17app.co/api';
exports.EVENT_SERVER_ENDPOINT_UAT = 'https://event-server-uat.17app.co/api';
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
/**
 * sentry production dns url.
 */
exports.SENTRY_DSN_URL = 'https://8526f3bd6d3a4abcac1b3fdcbc06b416@o998499.ingest.sentry.io/6547346';
//# sourceMappingURL=index.js.map