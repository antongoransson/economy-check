import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import transactionsReducer from './TransactionsReducer';
import { ADD_TRANSACTION, UPDATE_TRANSACTION } from './TransactionsTypes';

describe('Transactions tests', () => {
  const initialState = {
    currentTransaction: { name: '', cost: 0, category: '' },
    allTransactions: [],
    selectedCategory: ''
  };
  const mockStore = configureStore([thunk]);
  let store, defaultTransaction, newTransaction;

  beforeEach(() => {
    store = mockStore(initialState);
    defaultTransaction = { name: 'ab', cost: 10, category: ' Food' };
    newTransaction = { name: 'New', cost: 100, category: 'Cats' };
  });

  it('reducer for ADD_INPUT', () => {
    let state = {
      currentTransaction: defaultTransaction,
      allTransactions: [defaultTransaction]
    };
    state = transactionsReducer(state, {
      type: ADD_TRANSACTION,
      transaction: newTransaction
    });
    expect(state).toEqual({
      currentTransaction: {},
      allTransactions: [defaultTransaction, newTransaction]
    });
  });

  it('reducer for UPDATE_TRANSACTION', () => {
    let state = {
      currentTransaction: defaultTransaction,
      allTransactions: [defaultTransaction]
    };
    state = transactionsReducer(state, {
      type: UPDATE_TRANSACTION,
      ...newTransaction
    });
    expect(state).toEqual({
      currentTransaction: newTransaction,
      allTransactions: [defaultTransaction]
    });
  });

  it('reducer for default case', () => {
    let state = {
      currentTransaction: defaultTransaction,
      allTransactions: [defaultTransaction]
    };
    state = transactionsReducer(state, {
      type: 'NON_EXISTING_TYPE',
      ...newTransaction
    });
    expect(state).toEqual({
      currentTransaction: defaultTransaction,
      allTransactions: [defaultTransaction]
    });
  });
});
