import { put, takeEvery, fork } from 'redux-saga/effects';
import _ from 'lodash';

import { UPDATE_CONFIG, storeConfig } from '../actions/config';

/**
 * This generator function calls the storeConfig action with the data from every Config update.
 * @param {Object} action Redux action
 */
export function* updateConfigSaga(action) {
  yield put(storeConfig(_.get(action, 'data')));
}

/** This generator function watchs for every Config update and sends them to updateConfigSaga. */
export function* watchConfig() {
  yield takeEvery(UPDATE_CONFIG, updateConfigSaga);
}

export default [
  fork(watchConfig),
];
