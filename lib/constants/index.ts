export const MAIN_HOST = 'https://vmo.17.media';
export const MAIN_HOST_CN = 'https://gcscdn-event-cn.17.media';
export const MAIN_HOST_STA = 'https://sta-vmo.17.media';
export const MAIN_HOST_STA_CN = 'https://sta-cn-mov.17.media';
export const MAIN_HOST_UAT = 'https://uat-vmo.17.media';
export const MAIN_HOST_UAT_CN = 'https://uat-event-cn.17.media';

export const GOAPI_ENDPOINT = 'https://api-dsa.17app.co/api';
export const GOAPI_ENDPOINT_STA = 'https://sta-api.17app.co/api';
export const GOAPI_ENDPOINT_UAT = 'https://uat-api.17app.co/api';

export const EVENT_SERVER_ENDPOINT = 'https://event-server.17app.co/api';
export const EVENT_SERVER_ENDPOINT_STA =
  'https://event-server-sta.17app.co/api';
export const EVENT_SERVER_ENDPOINT_UAT =
  'https://event-server-uat.17app.co/api';

/**
 * GCP bucket
 */
export const GCP_CDN_DOMAIN = 'webcdn.17app.co';
export const GCP_CDN_HOST = `https://${GCP_CDN_DOMAIN}`;

/**
 * Eventory Api
 *
 * usage: `https://api.17app.co/api/v1/leaderboards/eventory?containerID={containerID}`
 *
 * use query `containerID={containerID}` to compose to complete leaderboard API url.
 */
export const EVENTORY_ENDPOINT =
  'https://api.17app.co/api/v1/leaderboards/eventory';

/**
 * same as const `EVENTORY_ENDPOINT`.
 */
export const EVENTORY_OFFLINE_ENDPOINT =
  'https://dsa-api.17app.co/api/v1/leaderboards/eventory';

/**
 * iframe domain
 *
 * e.g. https://event.17.live/12027-tw-anniversary6-frontend/method-03?lang=zh_TW
 */
export const IFRAME_ENDPOINT = 'https://event.17.live';

/**
 * e.g. https://webcdn.17app.co/campaign/projects/12027-tw-anniversary6-frontend/translations.json
 */
export const LANG_FILE_ENDPOINT = `https://${GCP_CDN_DOMAIN}/campaign/projects`;

export const ASSETS_CND_ENDPOINT =
  'https://storage.googleapis.com/media17-prod-web-assets/campaign';

/**
 * Avatar CDN
 */
export const AVATAR_ENDPOINT = 'https://assets-17app.akamaized.net';

/**
 * usage: ``AVATAR_BASE_URL${userID}``
 *
 * use `userID` to compose to streamer's avatar image url.
 */
export const AVATAR_BASE_URL = `${AVATAR_ENDPOINT}/THUMBNAIL_`;

/**
 * if streamer does not have avatar image, use this image instead.
 */
export const DEFAULT_AVATAR_IMAGE = `https://${GCP_CDN_DOMAIN}/17live/ig-default.svg`;

/**
 * if streamer is streaming, use this image wrap around streamer's avatar.
 */
export const ONLINE_RIM_IMAGE = `https://${GCP_CDN_DOMAIN}/campaign/assets/igOfficialCircle.png`;

/**
 * sentry production dns url.
 */
export const SENTRY_DSN_URL =
  'https://8526f3bd6d3a4abcac1b3fdcbc06b416@o998499.ingest.sentry.io/6547346';
