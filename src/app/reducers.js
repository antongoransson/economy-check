import { combineReducers } from 'redux';
// Import all reducers here

export const makeRootReducer = (asyncReducers?: {}) =>
  combineReducers({
    // Add sync reducers here
    ...asyncReducers
  });

export default makeRootReducer;
