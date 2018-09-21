import axios from 'axios';
import _ from 'lodash';

import jwt from '../jwt';
import config from '../../../config.json';

export const request = (url, method, data) => {
  const baseURL = config.apiUrl || '/';
  const headers = { 'Content-Type': 'application/json' };
  if (jwt.token) headers.Authorization = `Bearer ${jwt.token}`;

  return axios({ url, headers, method, data, baseURL })
    .then(res => res.data.data)
    .catch((e) => {
      if (e.response.data.status === 'error') throw _.castArray(e.response.data.data);
      throw _.castArray(e.response.statusText);
    });
};

export default { request };
