import { STORE_USER_DATA } from '../actions/userData';
import config from '../../config.json';
import jwt from '../lib/jwt';

/**
 * The initial state of the User Data Redux slice.
 * @type {Object}
 * @property {string} lang language code
 */
export const initialState = {
  token: jwt.token || '',
  settings: {
    lang: config.defaultLang,
  },
};

/**
 * The User Data reducer.
 * @param {Object} [state=initialState] - User Data Redux slice
 * @param {Object} action - Redux action
 * @return {Object} returns new slice
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
