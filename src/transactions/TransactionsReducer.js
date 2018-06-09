import { ADD_TRANSACTION, UPDATE_TRANSACTION } from './TransactionsTypes';

const INITIAL_STATE = {
  currentTransaction: { name: '', cost: 0 },
  allTransactions: []
};

type transactionType = { name: string, cost: number };

type State = {
  currentTransaction: transactionType,
  allTransactions: transactionType[]
};

const transactions = (
  state: State = INITIAL_STATE,
  action: { type: string, name: string, cost: number }
) => {
  switch (action.type) {
    case ADD_TRANSACTION: {
      return {
        ...state,
        currentTransaction: {},
        allTransactions: [
          ...state.allTransactions,
          {
            name: action.name,
            cost: action.cost
          }
        ]
      };
    }
    case UPDATE_TRANSACTION:
      return {
        ...state,
        currentTransaction: { name: action.name, cost: action.cost }
      };
    default:
      return state;
  }
};

export default transactions;
