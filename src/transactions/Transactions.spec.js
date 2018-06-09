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
    currentTransaction: { name: '', cost: 0 },
    allTransactions: []
  };
  const mockStore = configureStore([thunk]);
  const mockAddTransaction = jest.fn();
  const mockUpdateTransaction = jest.fn();
  let store, wrapper, sWrapper;

  beforeEach(() => {
    store = mockStore(initialState);
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
    ).toEqual(initialState.currentTransaction.cost);
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
    expect(mockUpdateTransaction.mock.calls.length).toBe(2);
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
    store.dispatch(addTransaction('New', 10));
    store.dispatch(updateTransaction('New', 10));
    const action = store.getActions();
    expect(action[0]).toEqual({ type: ADD_TRANSACTION, name: 'New', cost: 10 });
    expect(action[1]).toEqual({
      type: UPDATE_TRANSACTION,
      name: 'New',
      cost: 10
    });
  });

  it('reducer for ADD_INPUT', () => {
    const transaction = { name: 'ab', cost: 10 };
    let state = {
      currentTransaction: transaction,
      allTransactions: [transaction]
    };
    state = transactionsReducer(state, {
      type: ADD_TRANSACTION,
      name: 'New',
      cost: 100
    });
    expect(state).toEqual({
      currentTransaction: {},
      allTransactions: [transaction, { name: 'New', cost: 100 }]
    });
  });

  it('reducer for UPDATE_TRANSACTION', () => {
    const transaction = { name: 'ab', cost: 10 };
    let state = {
      currentTransaction: transaction,
      allTransactions: [transaction]
    };
    state = transactionsReducer(state, {
      type: UPDATE_TRANSACTION,
      name: 'abc',
      cost: 10
    });
    expect(state).toEqual({
      currentTransaction: { name: 'abc', cost: 10 },
      allTransactions: [transaction]
    });
  });

  it('reducer for default case', () => {
    const transaction = { name: 'ab', cost: 10 };
    let state = {
      currentTransaction: transaction,
      allTransactions: [transaction]
    };
    state = transactionsReducer(state, {
      type: 'NON_EXISTING_TYPE',
      name: 'abc',
      cost: 10
    });
    expect(state).toEqual({
      currentTransaction: transaction,
      allTransactions: [transaction]
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
