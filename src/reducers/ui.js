import { STORE_UI } from '../actions/ui';

/**
 * The initial state of the Config Redux slice.
 * @type {Object}
 * @property {string} lang language code
 */
export const initialState = {
  modalContent: null,
  modalVisible: false,
  userMenuOpen: false,
};

/**
 * The Config reducer.
 * @param {Object} [state=initialState] - Config Redux slice
 * @param {Object} action - Redux action
 * @return {Object} returns new slice
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_UI:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
