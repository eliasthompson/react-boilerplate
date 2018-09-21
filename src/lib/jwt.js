import jwt from 'jsonwebtoken';

const { token } = (() => {
  try {
    if (window.localStorage) return JSON.parse(JSON.parse(window.localStorage.getItem('persist:userData')).userData) || {};
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }

  return {};
})();

export default {
  token,
  data: jwt.decode(token) || {},
};
