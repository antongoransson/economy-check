import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import TransactionsContainer, { Transactions } from './Transactions';
import { addTransaction, updateTransaction } from './TransactionsActions';
import transactionsReducer from './TransactionsReducer';
import { ADD_TRANSACTION, UPDATE_TRANSACTION } from './TransactionsTypes';

describe('Transactions tests', () => {
  const initialState = {
    currentTransaction: { name: '', cost: 0, category: '' },
    allTransactions: []
  };
  const mockStore = configureStore([thunk]);
  const mockAddTransaction = jest.fn();
  const mockUpdateTransaction = jest.fn();
  let store, wrapper, sWrapper, defaultTransaction, newTransaction;

  beforeEach(() => {
    store = mockStore(initialState);
    defaultTransaction = { name: 'ab', cost: 10, category: ' Food' };
    newTransaction = { name: 'New', cost: 100, category: 'Cats' };
    wrapper = mount(
      <Provider store={store}>
        <Transactions
          currentTransaction={initialState.currentTransaction}
          allTransactions={[]}
          updateTransaction={() => mockUpdateTransaction()}
          addTransaction={() => mockAddTransaction()}
        />
      </Provider>
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
      wrapper
        .find('AutoComplete')
        .at(0)
        .props().value
    ).toEqual(initialState.currentTransaction.name);
    expect(
      wrapper
        .find('AutoComplete')
        .at(1)
        .props().value
    ).toEqual(initialState.currentTransaction.cost || '');
  });

  it('check autocomplete calls prop functions', () => {
    expect(mockUpdateTransaction.mock.calls.length).toBe(0);
    wrapper
      .find('AutoComplete')
      .at(0)
      .props()
      .onSearch();
    expect(mockUpdateTransaction.mock.calls.length).toBe(1);
    wrapper
      .find('AutoComplete')
      .at(1)
      .props()
      .onSearch();
    expect(mockUpdateTransaction.mock.calls.length).toBe(1);
  });

  it('check Button calls props addFunction', () => {
    expect(mockAddTransaction.mock.calls.length).toBe(0);
    wrapper
      .find('Button')
      .props()
      .onClick();
    expect(mockAddTransaction.mock.calls.length).toBe(1);
  });

  it('check action on dispatching ', () => {
    store.dispatch(addTransaction(defaultTransaction));
    store.dispatch(
      updateTransaction(
        defaultTransaction.name,
        defaultTransaction.cost,
        defaultTransaction.category
      )
    );
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: ADD_TRANSACTION,
      transaction: defaultTransaction
    });
    expect(action[1]).toEqual({
      type: UPDATE_TRANSACTION,
      ...defaultTransaction
    });
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

  it('should call actions from prop functions', () => {
    // test that the component events dispatch the expected actions
    sWrapper.props().updateTransaction();
    sWrapper.props().addTransaction();

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: UPDATE_TRANSACTION },
      { type: ADD_TRANSACTION }
    ]);
  });
});
