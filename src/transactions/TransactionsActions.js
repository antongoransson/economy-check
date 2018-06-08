import { ADD_TRANSACTION, UPDATE_TRANSACTION } from './TransactionsTypes';

export const addTransaction = (name: string, cost: number) => ({
  type: ADD_TRANSACTION,
  name,
  cost
});

export const updateTransaction = (name: string, cost: number) => ({
  type: UPDATE_TRANSACTION,
  name,
  cost
});
