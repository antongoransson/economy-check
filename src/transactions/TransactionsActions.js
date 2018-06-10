import * as types from './TransactionsTypes';
import type { transactionType } from './TransactionsTypes';

export const addTransaction = (t: transactionType) => ({
  type: types.ADD_TRANSACTION,
  transaction: t
});

export const updateTransaction = (
  name: string,
  cost: number,
  category: string
) => ({
  type: types.UPDATE_TRANSACTION,
  name,
  cost,
  category
});

export const setSelectedCategory = (category: string) => ({
  type: types.SET_SELECTED_CATEGORY,
  category
});
