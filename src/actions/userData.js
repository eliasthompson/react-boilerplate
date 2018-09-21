/**
 * The Redux action type for updating the User Data Redux slice.
 * @type {string}
 */
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

/**
 * The Redux action type for storing the User Data Redux slice.
 * @type {string}
 */
export const STORE_USER_DATA = 'STORE_USER_DATA';

/**
 * This function sends an action to Redux Saga to update the User Data Redux slice.
 * @param {Object} data - an object with the key/value pair to update in the User Data slice
 * @return {Object} returns Redux action
 */
export const updateUserData = data => ({ type: UPDATE_USER_DATA, data });

/**
 * This function sends an action to store the new data into the User Data Redux slice.
 * @param {Object} data - an object with the key/value pair to update in the User Data slice
 * @return {Object} returns Redux action
 */
export const storeUserData = data => ({ type: STORE_USER_DATA, data });
