/**
 * The Redux action type for logging in.
 * @type {string}
 */
export const LOGIN_USER = 'LOGIN_USER';

/**
 * This function sends an action to Redux Saga to login.
 * @param {Object} data - an object with the username and password to login with
 * @return {Object} returns Redux action
 */
export const loginUser = data => ({ type: LOGIN_USER, data });
