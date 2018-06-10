import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import TransactionsContainer, { Transactions } from './Transactions';
import {
  addTransaction,
  setSelectedCategory,
  updateTransaction
} from './TransactionsActions';
import * as types from './TransactionsTypes';

describe('Transactions tests', () => {
  const initialState = {
    currentTransaction: { name: '', cost: '', category: '' },
    allTransactions: [],
    selectedCategory: ''
  };
  const mockStore = configureStore([thunk]);
  let store, wrapper, sWrapper, defaultTransaction, newTransaction;
  let mockAddTransaction, mockUpdateTransaction, mockSetSelectedCategory;
  beforeEach(() => {
    mockAddTransaction = jest.fn();
    mockUpdateTransaction = jest.fn();
    mockSetSelectedCategory = jest.fn();
    store = mockStore(initialState);
    defaultTransaction = { name: 'ab', cost: '10', category: ' Food' };
    newTransaction = { name: 'New', cost: '100', category: 'Cats' };
    wrapper = mount(
      <Transactions
        currentTransaction={initialState.currentTransaction}
        allTransactions={[]}
        selectedCategory=""
        updateTransaction={() => mockUpdateTransaction()}
        addTransaction={() => mockAddTransaction()}
        setSelectedCategory={() => mockSetSelectedCategory()}
      />
    );
    sWrapper = shallow(<TransactionsContainer store={store} />);
  });

  it('renders correctly', () => {
    expect(wrapper.find(Transactions).length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(wrapper.find(Transactions).prop('currentTransaction')).toEqual(
      initialState.currentTransaction
    );
  });

  it('check autocomplete values matchers with redux state', () => {
    expect(
      wrapper.find('AutoComplete[id="autoCompleteName"]').props().value
    ).toEqual(initialState.currentTransaction.name);
    expect(
      wrapper.find('AutoComplete[id="autoCompleteCost"]').props().value
    ).toEqual(initialState.currentTransaction.cost || '');
  });

  it('check autocomplete calls prop functions', () => {
    expect(mockUpdateTransaction.mock.calls.length).toBe(0);
    wrapper
      .find('AutoComplete[id="autoCompleteName"]')
      .props()
      .onSearch();
    expect(mockUpdateTransaction.mock.calls.length).toBe(1);

    wrapper
      .find('AutoComplete[id="autoCompleteCost"]')
      .props()
      .onSearch('a');
    expect(mockUpdateTransaction.mock.calls.length).toBe(1);

    wrapper
      .find('AutoComplete[id="autoCompleteCost"]')
      .props()
      .onSearch('123');
    expect(mockUpdateTransaction.mock.calls.length).toBe(2);
  });

  it('check addTransactionButton calls props addFunction ', () => {
    expect(mockAddTransaction.mock.calls.length).toBe(0);
    wrapper
      .find('Button[id="addTransactionButton"]')
      .props()
      .onClick();
    expect(mockAddTransaction.mock.calls.length).toBe(1);
  });

  it('check select propely calls props addFunction ', () => {
    expect(mockUpdateTransaction.mock.calls.length).toBe(0);
    wrapper
      .find('Select[id="transactionCategorySelect"]')
      .at(0)
      .props()
      .onChange();
    expect(mockUpdateTransaction.mock.calls.length).toBe(1);
  });

  it('check addTransactionButton is correctly disabled', () => {
    expect(
      wrapper.find('Button[id="addTransactionButton"]').props().disabled
    ).toBe(true);
    const validTransaction = { name: 'Buss', cost: '10', category: 'Food' };
    wrapper.setProps({ currentTransaction: validTransaction });

    expect(
      wrapper.find('Button[id="addTransactionButton"]').props().disabled
    ).toBe(false);
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
      category: testCategory
    });
  });

  it('should call actions from prop functions', () => {
    // test that the component events dispatch the expected actions
    sWrapper.props().updateTransaction();
    sWrapper.props().addTransaction();
    sWrapper.props().setSelectedCategory();
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: types.UPDATE_TRANSACTION },
      { type: types.ADD_TRANSACTION },
      { type: types.SET_SELECTED_CATEGORY }
    ]);
  });
});
