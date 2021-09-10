import axios from 'axios';

import { isPRO } from '../utils';

export const getInstance = () =>
  axios.create({
    baseURL:
      window.location.hostname === 'vmo.17.media'
        ? 'https://api.17app.co/api'
        : 'https://sta-api.17app.co/api',
  });

export const getInstanceCache = () => {
  if (process.env.LOCAL) {
    return axios.create({
      baseURL: 'http://localhost:5000',
    });
  }

  return axios.create({
    baseURL: isPRO()
      ? 'https://event-server.17app.co/api'
      : 'https://event-server-sta.17app.co/api',
  });
};

export const getInstanceEventory = () =>
  axios.create({
    baseURL:
      window.location.hostname === 'vmo.17.media'
        ? 'https://api-dsa.17app.co/api'
        : 'https://sta-api.17app.co/api',
  });

export const getInstanceVote = () =>
  axios.create({
    baseURL:
      window.location.hostname === 'vmo.17.media'
        ? 'https://api.17app.co/api'
        : 'https://sta-api.17app.co/api',
  });
