import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistReducer({
    key: 'userData',
    version: 1,
    whitelist: ['userData'],
    storage,
  }, reducers),
  /* istanbul ignore next */ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
export default store;
