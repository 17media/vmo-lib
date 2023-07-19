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

export const getInstance = () =>
  axios.create({
    baseURL: getGoapiUrl(),
  });

export const getInstanceCache = () => {
  if (process.env.LOCAL) {
    return axios.create({
      baseURL: 'http://localhost:5000',
    });
  }

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

export const getInstanceEventory = () =>
  axios.create({
    baseURL: isProdVmo17Media()
      ? GOAPI_ENDPOINT
      : isStagVmo17Media()
      ? GOAPI_ENDPOINT_STA
      : isUatVmo17Media()
      ? GOAPI_ENDPOINT_UAT
      : GOAPI_ENDPOINT_STA,
  });
/**
 * same with getInstanceEventory
 */
export const getInstanceVote = () => getInstanceEventory();
