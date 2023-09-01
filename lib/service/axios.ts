import axios from 'axios';
import {
  EVENT_SERVER_ENDPOINT,
  EVENT_SERVER_ENDPOINT_STA,
  EVENT_SERVER_ENDPOINT_UAT,
  GOAPI_ENDPOINT,
  GOAPI_ENDPOINT_STA,
  GOAPI_ENDPOINT_UAT,
} from '../constants';

import {
  getGoapiUrl,
  isProdVmo17Media,
  isStagVmo17Media,
  isUatVmo17Media,
} from '../utils';

import { Env } from '../enums';

export const getInstance = (env?: Env) =>
  axios.create({
    baseURL: getGoapiUrl(env),
  });

export const getInstanceCache = (env?: Env) => {
  if (process.env.LOCAL) {
    return axios.create({
      baseURL: 'http://localhost:5000',
    });
  }

  if (env === Env.PROD) return EVENT_SERVER_ENDPOINT;
  if (env === Env.STA) return EVENT_SERVER_ENDPOINT_STA;
  if (env === Env.UAT) return EVENT_SERVER_ENDPOINT_UAT;

  return axios.create({
    baseURL: isProdVmo17Media()
      ? EVENT_SERVER_ENDPOINT
      : isStagVmo17Media()
      ? EVENT_SERVER_ENDPOINT_STA
      : isUatVmo17Media()
      ? EVENT_SERVER_ENDPOINT_UAT
      : EVENT_SERVER_ENDPOINT_STA,
  });
};

export const getInstanceEventory = (env?: Env) => {
  if (env === Env.PROD) return axios.create({ baseURL: GOAPI_ENDPOINT });
  if (env === Env.STA) return axios.create({ baseURL: GOAPI_ENDPOINT_STA });
  if (env === Env.UAT) return axios.create({ baseURL: GOAPI_ENDPOINT_UAT });
  return axios.create({
    baseURL: isProdVmo17Media()
      ? GOAPI_ENDPOINT
      : isStagVmo17Media()
      ? GOAPI_ENDPOINT_STA
      : isUatVmo17Media()
      ? GOAPI_ENDPOINT_UAT
      : GOAPI_ENDPOINT_STA,
  });
};
/**
 * same with getInstanceEventory
 */
export const getInstanceVote = () => getInstanceEventory();
