import axios from 'axios';

import { isProdVmo17Media } from '../utils';

export const getInstance = () =>
  axios.create({
    baseURL: isProdVmo17Media()
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
    baseURL: isProdVmo17Media()
      ? 'https://event-server.17app.co/api'
      : 'https://event-server-sta.17app.co/api',
  });
};

export const getInstanceEventory = () =>
  axios.create({
    baseURL: isProdVmo17Media()
      ? 'https://api-dsa.17app.co/api'
      : 'https://sta-api.17app.co/api',
  });

export const getInstanceVote = () =>
  axios.create({
    baseURL: isProdVmo17Media()
      ? 'https://api.17app.co/api'
      : 'https://sta-api.17app.co/api',
  });
