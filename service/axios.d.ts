import { Env } from '../enums';
export declare const getInstance: (env?: Env) => import("axios").AxiosInstance;
export declare const getInstanceCache: (env?: Env) => "https://event-server.17app.co/api" | "https://event-server-sta.17app.co/api" | "https://event-server-uat.17app.co/api" | import("axios").AxiosInstance;
export declare const getInstanceEventory: (env?: Env) => import("axios").AxiosInstance;
/**
 * same with getInstanceEventory
 */
export declare const getInstanceVote: () => import("axios").AxiosInstance;
