
/**
 * The Redux action type for updating the Config Redux slice.
 * @type {string}
 */
export const UPDATE_CONFIG = 'UPDATE_CONFIG';


/**
 * The Redux action type for storing the Config Redux slice.
 * @type {string}
 */
export const STORE_CONFIG = 'STORE_CONFIG';

/**
 * This function sends an action to Redux Saga to update the Config Redux slice.
 * @param {Object} data - an object with the key/value pair to update in the Config slice
 * @return {Object} returns Redux action
 */
export const updateConfig = data => ({ type: UPDATE_CONFIG, data });

/**
 * This function sends an action to store the new data into the Config Redux slice.
 * @param {Object} data - an object with the key/value pair to update in the Config slice
 * @return {Object} returns Redux action
 */
export const storeConfig = data => ({ type: STORE_CONFIG, data });
