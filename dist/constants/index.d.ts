export declare const MAIN_HOST = "https://vmo.17.media";
export declare const MAIN_HOST_CN = "https://gcscdn-event-cn.17.media";
export declare const MAIN_HOST_STA = "https://sta-vmo.17.media";
export declare const MAIN_HOST_STA_CN = "https://sta-cn-mov.17.media";
export declare const MAIN_HOST_UAT = "https://uat-vmo.17.media";
export declare const MAIN_HOST_UAT_CN = "https://uat-event-cn.17.media";
export declare const GOAPI_ENDPOINT = "https://wap-api.17app.co/api";
export declare const GOAPI_ENDPOINT_STA = "https://sta-wap-api.17app.co/api";
export declare const GOAPI_ENDPOINT_UAT = "https://uat-wap-api.17app.co/api";
export declare const EVENT_SERVER_ENDPOINT = "https://event-server.17app.co/api";
export declare const EVENT_SERVER_ENDPOINT_STA = "https://event-server-sta.17app.co/api";
export declare const EVENT_SERVER_ENDPOINT_UAT = "https://event-server-uat.17app.co/api";
/**
 * GCP bucket
 */
export declare const GCP_CDN_DOMAIN = "webcdn.17app.co";
export declare const GCP_CDN_HOST = "https://webcdn.17app.co";
/**
 * Eventory Api
 *
 * usage: `https://api.17app.co/api/v1/leaderboards/eventory?containerID={containerID}`
 *
 * use query `containerID={containerID}` to compose to complete leaderboard API url.
 */
export declare const EVENTORY_ENDPOINT = "https://api.17app.co/api/v1/leaderboards/eventory";
/**
 * same as const `EVENTORY_ENDPOINT`.
 */
export declare const EVENTORY_OFFLINE_ENDPOINT = "https://dsa-api.17app.co/api/v1/leaderboards/eventory";
/**
 * iframe domain
 *
 * e.g. https://event.17.live/12027-tw-anniversary6-frontend/method-03?lang=zh_TW
 */
export declare const IFRAME_ENDPOINT = "https://event.17.live";
/**
 * e.g. https://webcdn.17app.co/campaign/projects/12027-tw-anniversary6-frontend/translations.json
 */
export declare const LANG_FILE_ENDPOINT = "https://webcdn.17app.co/campaign/projects";
export declare const ASSETS_CND_ENDPOINT = "https://storage.googleapis.com/media17-prod-web-assets/campaign";
/**
 * Avatar CDN
 */
export declare const AVATAR_ENDPOINT = "https://assets-17app.akamaized.net";
/**
 * usage: ``AVATAR_BASE_URL${userID}``
 *
 * use `userID` to compose to streamer's avatar image url.
 */
export declare const AVATAR_BASE_URL = "https://assets-17app.akamaized.net/THUMBNAIL_";
/**
 * if streamer does not have avatar image, use this image instead.
 */
export declare const DEFAULT_AVATAR_IMAGE = "https://webcdn.17app.co/17live/ig-default.svg";
/**
 * if streamer is streaming, use this image wrap around streamer's avatar.
 */
export declare const ONLINE_RIM_IMAGE = "https://webcdn.17app.co/campaign/assets/igOfficialCircle.png";
/**
 * sentry production dns url.
 */
export declare const SENTRY_DSN_URL = "https://8526f3bd6d3a4abcac1b3fdcbc06b416@o998499.ingest.sentry.io/6547346";
