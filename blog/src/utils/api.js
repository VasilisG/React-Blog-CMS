import axios from 'axios';
import { getCookie } from './cookies';
import { API_ENDPOINT, BLOG_COOKIE_NAME } from '../config/env';

const API = axios.create({
  baseURL: `${API_ENDPOINT}`,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
});

API.interceptors.request.use(
  config => {
    if(!config.url.includes('login') && !config.url.includes('logout')) {
      const token = getCookie(BLOG_COOKIE_NAME);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete API.defaults.headers.common.Authorization;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

export default API;