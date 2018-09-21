
/**
 * The Redux action type for updating the UI Redux slice.
 * @type {string}
 */
export const UPDATE_UI = 'UPDATE_UI';

/**
 * The Redux action type for displaying dynamic Modal content.
 * @type {string}
 */
export const SHOW_MODAL = 'SHOW_MODAL';

/**
 * The Redux action type for hiding Modal content.
 * @type {string}
 */
export const HIDE_MODAL = 'HIDE_MODAL';

/**
 * The Redux action type for storing the UI Redux slice.
 * @type {string}
 */
export const STORE_UI = 'STORE_UI';

/**
 * This function sends an action to Redux Saga to update the UI Redux slice.
 * @param {Object} data - an object with the key/value pair to update in the UI slice
 * @return {Object} returns Redux action
 */
export const updateUi = data => ({ type: UPDATE_UI, data });

/**
 * This function sends an action to Redux Saga to load in Modal content and display it.
 * @param {React.Component} data - a React elment
 * @return {Object} returns Redux action
 */
export const showModal = data => ({ type: SHOW_MODAL, data });

/**
 * This function sends an action to Redux Saga to hide the  Modal and destroy its content.
 * @param {React.Component} data - a React elment
 * @return {Object} returns Redux action
 */
export const hideModal = () => ({ type: HIDE_MODAL });

/**
 * This function sends an action to store the new data into the UI Redux slice.
 * @param {Object} data - an object with the key/value pair to update in the UI slice
 * @return {Object} returns Redux action
 */
export const storeUi = data => ({ type: STORE_UI, data });
