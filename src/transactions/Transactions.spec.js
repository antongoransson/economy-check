import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moment from 'moment';
import TransactionsContainer, { Transactions } from './Transactions';
import TransactionForm from './TransactionForm';
import {
  addTransaction,
  setSelectedCategory,
  updateTransaction
} from './TransactionsActions';
import * as types from './TransactionsTypes';

describe('Transactions tests', () => {
  const initialState = {
    allTransactions: [],
    currentCategory: '',
    currentTransaction: {
      name: '',
      cost: '',
      category: '',
      date: moment().format('YYYY-MM-DD')
    },
    selectedCategory: ''
  };
  const mockStore = configureStore([thunk]);
  let store, wrapper, sWrapper, defaultTransaction, newTransaction;
  let mockAddTransaction,
    mockUpdateTransaction,
    mockSetSelectedCategory,
    mockUpdateCategory;
  beforeEach(() => {
    mockAddTransaction = jest.fn();
    mockUpdateTransaction = jest.fn();
    mockSetSelectedCategory = jest.fn();
    mockUpdateCategory = jest.fn();
    store = mockStore(initialState);
    defaultTransaction = {
      name: 'ab',
      cost: '10',
      category: ' Food',
      date: '2017-07-12'
    };
    newTransaction = {
      name: 'New',
      cost: '100',
      category: 'Cats',
      date: '2017-07-13'
    };
    wrapper = mount(
      <Transactions
        currentTransaction={initialState.currentTransaction}
        currentCategory={initialState.currentCategory}
        allTransactions={[]}
        selectedCategory=""
        addTransaction={() => mockAddTransaction()}
        setSelectedCategory={() => mockSetSelectedCategory()}
        updateTransaction={() => mockUpdateTransaction()}
        updateCategory={() => mockUpdateCategory()}
      />
    );
    sWrapper = shallow(<TransactionsContainer store={store} />);
  });

  it('renders correctly', () => {
    expect(wrapper.find(Transactions).length).toEqual(1);
    expect(wrapper.find(TransactionForm).length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(wrapper.find(Transactions).prop('currentTransaction')).toEqual(
      initialState.currentTransaction
    );
  });

  it('check autocomplete values matchers with redux state', () => {
    expect(
      wrapper.find('AutoComplete[id="autoCompleteCategory"]').props().value
    ).toEqual(initialState.currentTransaction.cost || '');
  });

  it('check autocomplete calls prop functions', () => {
    wrapper
      .find('AutoComplete[id="autoCompleteCategory"]')
      .props()
      .onSearch('123');
    expect(mockUpdateCategory.mock.calls.length).toBe(1);
  });

  it('check action on dispatching ', () => {
    const testCategory = 'Food';
    store.dispatch(addTransaction(defaultTransaction));
    store.dispatch(updateTransaction('name', defaultTransaction.name));
    store.dispatch(setSelectedCategory(testCategory));
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: types.ADD_TRANSACTION,
      transaction: defaultTransaction
    });
    expect(action[1]).toEqual({
      type: types.UPDATE_TRANSACTION,
      field: 'name',
      value: defaultTransaction.name
    });
    expect(action[2]).toEqual({
      type: types.SET_SELECTED_CATEGORY,
      value: testCategory
    });
  });

  it('check transaction list contains allTransactions', () => {
    expect(wrapper.find('List').prop('dataSource')).toEqual(
      initialState.allTransactions
    );
  });

  it('should call actions from prop functions', () => {
    // test that the component events dispatch the expected actions
    sWrapper.props().updateTransaction();
    sWrapper.props().addTransaction();
    sWrapper.props().setSelectedCategory();
    sWrapper.props().updateCategory();
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: types.UPDATE_TRANSACTION },
      { type: types.ADD_TRANSACTION },
      { type: types.SET_SELECTED_CATEGORY },
      { type: types.UPDATE_CATEGORY }
    ]);
  });
});
