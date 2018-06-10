import * as types from './TransactionsTypes';
import type { transactionType } from './TransactionsTypes';

const INITIAL_STATE = {
  currentTransaction: { name: '', cost: 0, category: '' },
  allTransactions: [],
  selectedCategory: ''
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
    case types.ADD_TRANSACTION: {
      return {
        ...state,
        currentTransaction: {},
        allTransactions: [...state.allTransactions, action.transaction]
      };
    }
    case types.UPDATE_TRANSACTION:
      return {
        ...state,
        currentTransaction: {
          name: action.name,
          cost: action.cost,
          category: action.category
        }
      };
    case types.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.category };
    default:
      return state;
  }
};

export default transactions;
