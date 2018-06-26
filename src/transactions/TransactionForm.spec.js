import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import { DatePicker } from 'antd';
import TransactionForm from './TransactionForm';
import {
  addTransaction,
  setSelectedCategory,
  updateTransaction
} from './TransactionsActions';
import * as types from './TransactionsTypes';

describe('Transactions tests', () => {
  const currentTransaction = {
    name: '',
    cost: '',
    category: '',
    date: moment().format('YYYY-MM-DD')
  };
  let wrapper,
    mockAddTransaction,
    mockUpdateTransaction,
    initialState,
    defaultTransaction,
    newTransaction;
  beforeEach(() => {
    mockAddTransaction = jest.fn();
    mockUpdateTransaction = jest.fn();
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
      <TransactionForm
        currentTransaction={currentTransaction}
        addTransaction={() => mockAddTransaction()}
        updateTransaction={() => mockUpdateTransaction()}
      />
    );
    // sWrapper = shallow(<TransactionsContainer store={store} />);
  });

  it('renders correctly', () => {
    expect(wrapper.find(TransactionForm).length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(wrapper.find(TransactionForm).prop('currentTransaction')).toEqual(
      currentTransaction
    );
  });

  it('check autocomplete values matchers with redux state', () => {
    expect(
      wrapper.find('AutoComplete[id="autoCompleteName"]').props().value
    ).toEqual(currentTransaction.name);
    expect(
      wrapper.find('AutoComplete[id="autoCompleteCost"]').props().value
    ).toEqual(currentTransaction.cost || '');
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

    wrapper
      .find(DatePicker)
      .props()
      .onChange(moment());
    expect(mockUpdateTransaction.mock.calls.length).toBe(3);
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
      .at(1) // I think this has something to do with antd select, should be removed
      .props()
      .onChange();
    expect(mockUpdateTransaction.mock.calls.length).toBe(1);
  });

  it('check addTransactionButton is correctly disabled', () => {
    expect(
      wrapper.find('Button[id="addTransactionButton"]').props().disabled
    ).toBe(true);
    const validTransaction: types.transactionType = {
      name: 'Buss',
      cost: '10',
      category: 'Food',
      date: '2017-08-12'
    };
    wrapper.setProps({ currentTransaction: validTransaction });

    expect(
      wrapper.find('Button[id="addTransactionButton"]').props().disabled
    ).toBe(false);
  });
});
