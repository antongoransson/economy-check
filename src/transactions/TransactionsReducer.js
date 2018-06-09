import { ADD_TRANSACTION, UPDATE_TRANSACTION } from './TransactionsTypes';
import type { transactionType } from './TransactionsTypes';

const INITIAL_STATE = {
  currentTransaction: { name: '', cost: 0, category: '' },
  allTransactions: []
};

type State = {
  currentTransaction: transactionType,
  allTransactions: transactionType[]
};

const transactions = (
  state: State = INITIAL_STATE,
  action: {
    type: string,
    name?: string,
    cost?: number,
    category?: string,
    transaction?: transactionType
  }
) => {
  switch (action.type) {
    case ADD_TRANSACTION: {
      return {
        ...state,
        currentTransaction: {},
        allTransactions: [...state.allTransactions, action.transaction]
      };
    }
    case UPDATE_TRANSACTION:
      return {
        ...state,
        currentTransaction: {
          name: action.name,
          cost: action.cost,
          category: action.category
        }
      };
    default:
      return state;
  }
};

export default transactions;
