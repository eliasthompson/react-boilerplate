import { UPDATE_CONFIG } from '../actions/config';
import config from '../../config.json';

/**
 * The initial state of the Config Redux slice.
 * @type {Object}
 * @property {string} lang language code
 */
export const initialState = {
  lang: config.defaultLang,
};

/**
 * The Config reducer.
 * @param {Object} [state=initialState] - Config Redux slice
 * @param {Object} action - Redux action
 * @return {Object} returns new slice
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CONFIG:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
