import * as types from './TransactionsTypes';
import type { transactionType } from './TransactionsTypes';

const INITIAL_STATE = {
  currentTransaction: { name: '', cost: '', category: '' },
  allTransactions: [],
  selectedCategory: '',
  currentCategory: ''
};

type State = {
  allTransactions: transactionType[],
  currentCategory: string,
  currentTransaction: transactionType,
  selectedCategory: string
};

type Action = {
  type: string,
  name?: string,
  cost?: string,
  category?: string,
  field?: string,
  value?: number | string,
  transaction?: transactionType
};

const transactions = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case types.ADD_TRANSACTION: {
      return {
        ...state,
        currentTransaction: {},
        allTransactions: [...state.allTransactions, action.transaction]
      };
    }
    case types.UPDATE_TRANSACTION: {
      const newState = { ...state };
      if (action.field)
        newState.currentTransaction = {
          ...state.currentTransaction,
          [action.field]: action.value
        };
      return newState;
    }
    case types.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.category };
    case types.UPDATE_CATEGORY:
      return { ...state, currentCategory: action.value };
    default:
      return state;
  }
};

export default transactions;
