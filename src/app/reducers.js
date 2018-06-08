import { combineReducers } from 'redux';
import transactions from 'src/transactions/TransactionsReducer';
// Import all reducers here

export const makeRootReducer = (asyncReducers?: {}) =>
  combineReducers({
    // Add sync reducers here
    transactions,
    ...asyncReducers
  });

export default makeRootReducer;
