import { request } from './helpers';

export default {
  login(data) {
    return request('login', 'post', data);
  },

  update(data) {
    return request('user', 'put', data);
  },
};
