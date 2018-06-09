import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Button, AutoComplete } from 'antd';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import TransactionsContainer, { Transactions } from './Transactions';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Tranasactions tests', () => {
  const initialState = {
    currentTransaction: { name: 'Mat', cost: 10 },
    allTransactions: []
  };
  const mockStore = configureStore([thunk]);
  const mockAddTransaction = jest.fn();
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Transactions
          currentTransaction={initialState.currentTransaction}
          allTransactions={[]}
          updateTransaction={() => {}}
          addTransaction={() => mockAddTransaction()}
        />
      </Provider>
    );
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

  it('+++ check Button calls props addFunction', () => {
    expect(mockAddTransaction.mock.calls.length).toBe(0);
    wrapper.find('Button').simulate('click');
    expect(mockAddTransaction.mock.calls.length).toBe(1);
  });
});
