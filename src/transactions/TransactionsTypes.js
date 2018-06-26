export const ADD_TRANSACTION = 'addTransaction';
export const UPDATE_TRANSACTION = 'updateTransaction';
export const SET_SELECTED_CATEGORY = 'setSelectedCategory';
export const UPDATE_CATEGORY = 'updateCategory';

export type transactionType = {
  name: string,
  cost: string,
  category: string,
  date: string
};
