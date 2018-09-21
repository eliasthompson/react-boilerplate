import { delay } from 'redux-saga';
import { put, takeEvery, takeLatest, fork } from 'redux-saga/effects';
import _ from 'lodash';

import { UPDATE_UI, SHOW_MODAL, HIDE_MODAL, storeUi } from '../actions/ui';

/**
 * This generator function calls the storeUi action with the data from every UI update.
 * @param {Object} action Redux action
 */
export function* updateUiSaga(action) {
  yield put(storeUi(_.get(action, 'data')));
}

/**
 * This generator function calls the storeUi action with the data from every UI update.
 * @param {Object} action Redux action
 */
export function* showModalSaga(action) {
  yield put(storeUi({ modalContent: _.get(action, 'data') }));
  yield put(storeUi({ modalVisible: true }));
}

/**
 * This generator function calls the storeUi action with the data from every UI update.
 * @param {Object} action Redux action
 */
export function* hideModalSaga() {
  yield put(storeUi({ modalVisible: false }));
  yield delay(200);
  yield put(storeUi({ modalContent: null }));
}

/** This generator function watchs for every UI update and sends them to updateUiSaga. */
export function* watchUi() {
  yield takeEvery(UPDATE_UI, updateUiSaga);
}

/** This generator function watchs for every UI update and sends them to updateUiSaga. */
export function* watchShowModal() {
  yield takeLatest(SHOW_MODAL, showModalSaga);
}

/** This generator function watchs for every UI update and sends them to updateUiSaga. */
export function* watchHideModal() {
  yield takeLatest(HIDE_MODAL, hideModalSaga);
}

export default [
  fork(watchUi),
  fork(watchShowModal),
  fork(watchHideModal),
];
