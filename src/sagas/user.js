import { call, put, takeLatest, fork } from 'redux-saga/effects';
import _ from 'lodash';

import api from '../lib/api';
import { hideModal } from '../actions/ui';
import { LOGIN_USER } from '../actions/user';
import { updateUserData } from '../actions/userData';

/**
 * This generator function calls the login user api and handles the response.
 * @param {Object} action Redux action
 */
export function* loginUserSaga(action) {
  try {
    const { token, settings } = yield call(api.user.login, _.get(action, 'data'));
    yield put(updateUserData({ token, settings }));
    yield put(hideModal());
  } catch (e) {
    yield console.error(e); // eslint-disable-line no-console
  }
}

/** This generator function watchs for a user login and sends it to updateUiSaga. */
export function* watchLoginUser() {
  yield takeLatest(LOGIN_USER, loginUserSaga);
}

export default [
  fork(watchLoginUser),
];
