import { ADD_TRANSACTION, UPDATE_TRANSACTION } from './TransactionsTypes';
import type { transactionType } from './TransactionsTypes';

export const addTransaction = (t: transactionType) => ({
  type: ADD_TRANSACTION,
  transaction: t
});

export const updateTransaction = (
  name: string,
  cost: number,
  category: string
) => ({
  type: UPDATE_TRANSACTION,
  name,
  cost,
  category
});
