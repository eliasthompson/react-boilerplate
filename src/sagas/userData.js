import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { call, put, takeEvery, fork, select } from 'redux-saga/effects';

import api from '../lib/api';
import { UPDATE_USER_DATA, storeUserData } from '../actions/userData';

/**
 * This generator function calls the storeUserData action with the data from every User Data update.
 * @param {Object} action Redux action
 */
export function* updateUserDataSaga(action) {
  const token = yield select(state => state.userData.token);

  if (token) {
    try {
      const { id } = yield call(jwt.decode, token);
      yield call(api.user.update, { id, settings: _.get(action, 'data.settings') });
    } catch (e) {
      // Do nothing.
    }
  }

  yield put(storeUserData(_.get(action, 'data')));
}

/** This generator function watchs for every User Data update and sends them to updateUserDataSaga. */
export function* watchUserData() {
  yield takeEvery(UPDATE_USER_DATA, updateUserDataSaga);
}

export default [
  fork(watchUserData),
];
