import { all } from 'redux-saga/effects';

import ui from './ui';
import user from './user';
import userData from './userData';
// import slice from './slice';

/** This generator function combines and exposes all sagas to Redux. */
export default function* rootSaga() {
  yield all([
    ...ui,
    ...user,
    ...userData,
    // ...slice,
  ]);
}
