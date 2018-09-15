import { all } from 'redux-saga/effects';

import config from './config';
// import slice from './slice';

/** This generator function combines and exposes all sagas to Redux. */
export default function* rootSaga() {
  yield all([
    ...config,
    // ...slice,
  ]);
}
