export const MAIN_HOST = 'https://vmo.17.media';

/**
 * GCP bucket
 */
export const GCP_CDN_DOMAIN = 'webcdn.17app.co';
export const GCP_CDN_HOST = `https://${GCP_CDN_DOMAIN}`;

/**
 * Eventory Api
 *
 * usage: `https://api.17app.co/api/v1/leaderboards/eventory?containerID={containerID}`
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
 */
export const AVATAR_BASE_URL = `${AVATAR_ENDPOINT}/THUMBNAIL_`;

/**
 * svg image
 */
export const DEFAULT_AVATAR_IMAGE = `https://${GCP_CDN_DOMAIN}/17live/ig-default.svg`;

/**
 * png image
 */
export const ONLINE_RIM_IMAGE = `https://${GCP_CDN_DOMAIN}/campaign/assets/igOfficialCircle.png`;
