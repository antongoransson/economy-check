import * as types from './TransactionsTypes';
import type { transactionType } from './TransactionsTypes';

export const addTransaction = (t: transactionType) => ({
  type: types.ADD_TRANSACTION,
  transaction: t
});

export const updateTransaction = (field: string, value: string) => ({
  type: types.UPDATE_TRANSACTION,
  field,
  value
});

export const setSelectedCategory = (category: string) => ({
  type: types.SET_SELECTED_CATEGORY,
  category
});

export const updateCategory = (value: string) => ({
  type: types.UPDATE_CATEGORY,
  value
});
