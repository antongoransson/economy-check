import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';
// Note: this API requires redux@>=3.1.0
const store = createStore(makeRootReducer(), applyMiddleware(thunk));

export default store;
