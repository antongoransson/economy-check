import moment from 'moment';
import * as types from './TransactionsTypes';
import type { transactionType } from './TransactionsTypes';

type State = {
  allTransactions: transactionType[],
  currentCategory: string,
  currentTransaction: transactionType,
  selectedCategory: string
};
const INITIAL_STATE: State = {
  currentTransaction: {
    name: '',
    cost: '',
    category: '',
    date: moment().format('YYYY-MM-DD')
  },
  allTransactions: [],
  selectedCategory: '',
  currentCategory: ''
};

type Action = {
  type: string,
  field?: string,
  value?: number | string,
  transaction?: transactionType
};

const transactions = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case types.ADD_TRANSACTION: {
      return {
        ...state,
        currentTransaction: INITIAL_STATE.currentTransaction,
        allTransactions: [...state.allTransactions, action.transaction]
      };
    }
    case types.UPDATE_TRANSACTION: {
      const newState: State = { ...state };
      if (action.field)
        newState.currentTransaction = {
          ...state.currentTransaction,
          [action.field]: action.value
        };
      return newState;
    }
    case types.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.value };
    case types.UPDATE_CATEGORY:
      return { ...state, currentCategory: action.value };
    default:
      return state;
  }
};

export default transactions;
