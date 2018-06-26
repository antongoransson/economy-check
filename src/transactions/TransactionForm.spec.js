import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import { DatePicker } from 'antd';
import TransactionForm from './TransactionForm';
import type { Props } from './TransactionForm';
import * as types from './TransactionsTypes';

const setup = propOverrides => {
  const currentTransaction: types.transactionType = {
    name: '',
    cost: '',
    category: '',
    date: moment().format('YYYY-MM-DD')
  };
  const mockAddTransaction = jest.fn();
  const mockUpdateTransaction = jest.fn();
  const props: Props = Object.assign(
    {
      currentTransaction,
      addTransaction: mockAddTransaction,
      updateTransaction: mockUpdateTransaction
    },
    propOverrides
  );
  const wrapper = mount(<TransactionForm {...props} />);
  return { wrapper, mockAddTransaction, mockUpdateTransaction };
};
describe('Transactions tests', () => {
  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper.find(TransactionForm).length).toEqual(1);
  });

  it('check props matches with given prop', () => {
    const currentTransaction = {
      name: 'ab',
      cost: '10',
      category: ' Food',
      date: '2017-07-12'
    };
    const { wrapper } = setup({ currentTransaction });
    expect(wrapper.find(TransactionForm).prop('currentTransaction')).toEqual(
      currentTransaction
    );
  });

  it('check autocomplete values matchers with prop values', () => {
    const currentTransaction = {
      name: 'ab',
      cost: '10',
      category: ' Food',
      date: '2017-07-12'
    };
    const { wrapper } = setup({ currentTransaction });
    expect(
      wrapper.find('AutoComplete[id="autoCompleteName"]').props().value
    ).toEqual(currentTransaction.name);
    expect(
      wrapper.find('AutoComplete[id="autoCompleteCost"]').props().value
    ).toEqual(currentTransaction.cost);
  });

  it('check autocomplete calls prop functions', () => {
    const { wrapper, mockUpdateTransaction } = setup();
    expect(mockUpdateTransaction.mock.calls.length).toBe(0);
    wrapper
      .find('AutoComplete[id="autoCompleteName"]')
      .props()
      .onSearch('Abc');
    expect(mockUpdateTransaction.mock.calls.length).toBe(1);
    expect(mockUpdateTransaction).toHaveBeenLastCalledWith('name', 'Abc');

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
    expect(mockUpdateTransaction).toHaveBeenLastCalledWith('cost', '123');

    wrapper
      .find(DatePicker)
      .props()
      .onChange(moment());
    expect(mockUpdateTransaction.mock.calls.length).toBe(3);
    expect(mockUpdateTransaction).toHaveBeenCalledWith(
      'date',
      moment().format('YYYY-MM-DD')
    );
  });

  it('check addTransactionButton calls props addFunction ', () => {
    const { wrapper, mockAddTransaction } = setup();
    expect(mockAddTransaction.mock.calls.length).toBe(0);
    wrapper
      .find('Button[id="addTransactionButton"]')
      .props()
      .onClick();
    expect(mockAddTransaction.mock.calls.length).toBe(1);
  });

  it('check select propely calls props addFunction ', () => {
    const { wrapper, mockUpdateTransaction } = setup();
    expect(mockUpdateTransaction.mock.calls.length).toBe(0);
    wrapper
      .find('Select[id="transactionCategorySelect"]')
      .at(1) // I think this has something to do with antd select, should be removed
      .props()
      .onChange('Sport');
    expect(mockUpdateTransaction.mock.calls.length).toBe(1);
    expect(mockUpdateTransaction).toHaveBeenCalledWith('category', 'Sport');
  });

  it('check addTransactionButton is correctly disabled', () => {
    const { wrapper } = setup();
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
