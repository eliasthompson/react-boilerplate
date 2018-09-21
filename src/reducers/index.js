import { combineReducers } from 'redux';

import ui from './ui';
import userData from './userData';
// import slice from './slice';

export default combineReducers({
  ui,
  userData,
  // slice,
});
