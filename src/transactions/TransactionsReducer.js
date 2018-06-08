import { ADD_TRANSACTION, UPDATE_TRANSACTION } from './TransactionsTypes';

const INITIAL_STATE = {
  currentTransaction: {},
  allTransactions: []
};
const transactions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        allTransactions: [...state.allTransactions].concat([
          { name: action.name, cost: action.cost }
        ])
      };
    case UPDATE_TRANSACTION:
      return {
        ...state,
        currenTransaction: { name: action.name, cost: action.cost }
      };
    default:
      return state;
  }
};

export default transactions;
