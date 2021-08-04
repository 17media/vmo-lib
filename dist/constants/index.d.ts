export declare const MAIN_HOST = "https://vmo.17.media";
/**
 * GCP bucket
 */
export declare const GCP_CDN_DOMAIN = "webcdn.17app.co";
export declare const GCP_CDN_HOST: string;
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
export declare const LANG_FILE_ENDPOINT: string;
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
export declare const AVATAR_BASE_URL: string;
/**
 * if streamer does not have avatar image, use this image instead.
 */
export declare const DEFAULT_AVATAR_IMAGE: string;
/**
 * if streamer is streaming, use this image wrap around streamer's avatar.
 */
export declare const ONLINE_RIM_IMAGE: string;
