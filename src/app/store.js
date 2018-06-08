import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import makeRootReducer from './reducers';
// Note: this API requires redux@>=3.1.0
/* eslint-disable no-underscore-dangle */

const store = createStore(
  makeRootReducer(),
  composeWithDevTools(applyMiddleware(thunk))
);
/* eslint-disable no-underscore-dangle */

export default store;
