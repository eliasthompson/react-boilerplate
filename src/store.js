import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import reducers from './reducers';
import sagas from './sagas';

/**
 * The Redux Saga middleware.
 * @type {Object}
 */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistReducer({
    key: 'config',
    version: 1,
    whitelist: ['config'],
    storage,
  }, reducers),
  /* istanbul ignore next */ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(sagas);

/**
 * The Redux persistor.
 * @type {Object}
 */
export const persistor = persistStore(store);

/**
 * The Redux store.
 * @type {Object}
 */
export default store;
