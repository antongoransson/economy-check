import * as types from './TransactionsTypes';
import type { transactionType } from './TransactionsTypes';

export const addTransaction = (transaction: transactionType) => ({
  type: types.ADD_TRANSACTION,
  transaction
});

export const updateTransaction = (field: string, value: string) => ({
  type: types.UPDATE_TRANSACTION,
  field,
  value
});

export const setSelectedCategory = (value: string) => ({
  type: types.SET_SELECTED_CATEGORY,
  value
});

export const updateCategory = (value: string) => ({
  type: types.UPDATE_CATEGORY,
  value
});
