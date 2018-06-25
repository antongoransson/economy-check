import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import transactionsReducer from './TransactionsReducer';
import * as types from './TransactionsTypes';

describe('Transactions tests', () => {
  const initialState = {
    currentTransaction: { name: '', cost: '', category: '' },
    allTransactions: [],
    selectedCategory: '',
    currentCategory: ''
  };
  const mockStore = configureStore([thunk]);
  let store, defaultTransaction, newTransaction, state;

  beforeEach(() => {
    store = mockStore(initialState);
    defaultTransaction = { name: 'ab', cost: '10', category: ' Food' };
    newTransaction = { name: 'New', cost: '100', category: 'Cats' };
    state = {
      currentTransaction: defaultTransaction,
      allTransactions: [defaultTransaction],
      selectedCategory: '',
      currentCategory: ''
    };
  });

  it('should have initial state', () => {
    expect(transactionsReducer(undefined, { type: 'UNDEFINED_TYPE' })).toEqual(
      initialState
    );
  });

  it('reducer for ADD_INPUT', () => {
    const newState = transactionsReducer(state, {
      type: types.ADD_TRANSACTION,
      transaction: newTransaction
    });
    expect(newState).toEqual({
      ...state,
      currentTransaction: {},
      allTransactions: [...state.allTransactions, newTransaction]
    });
  });

  it('reducer for UPDATE_TRANSACTION', () => {
    const newState = transactionsReducer(state, {
      type: types.UPDATE_TRANSACTION,
      field: 'name',
      value: `${defaultTransaction.name}abc`
    });
    expect(newState).toEqual({
      ...state,
      currentTransaction: {
        ...defaultTransaction,
        name: `${defaultTransaction.name}abc`
      }
    });
  });

  it('reducer default case should return state', () => {
    const newState = transactionsReducer(state, {
      type: 'UNDEFINED_TYPE',
      ...newTransaction
    });
    expect(newState).toEqual(state);
  });

  it('reducer SET_SELECTED_CATEGORY case should upate category', () => {
    const testCategory = 'Food';
    const newState = transactionsReducer(state, {
      type: types.SET_SELECTED_CATEGORY,
      category: testCategory
    });
    expect(newState).toEqual({
      ...state,
      selectedCategory: testCategory
    });
  });

  it('UPDATE_TRANSACTION without field should return state', () => {
    const testValue = 'Buss';
    const newState = transactionsReducer(state, {
      type: types.UPDATE_TRANSACTION,
      value: testValue
    });
    expect(newState).toEqual(state);
  });

  it('reducer UPDATE_CATEGORY should update current category', () => {
    const testValue = 'Fishing';
    const newState = transactionsReducer(state, {
      type: types.UPDATE_CATEGORY,
      value: testValue
    });
    expect(newState).toEqual({ ...state, currentCategory: testValue });
  });
});
