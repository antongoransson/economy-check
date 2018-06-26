import React from 'react';
import { connect } from 'react-redux';
import { AutoComplete, List } from 'antd';
import * as actions from './TransactionsActions';
import type { transactionType } from './TransactionsTypes';
import TransactionForm from './TransactionForm';

type Props = {
  addTransaction: transactionType => void,
  allTransactions: transactionType[],
  currentTransaction: transactionType,
  currentCategory: string,
  selectedCategory: string,
  setSelectedCategory: string => void,
  updateCategory: string => void,
  updateTransaction: (field: string, value: string) => void
};

export const renderItem = (item: transactionType) => (
  <List.Item>{`${item.name}${item.cost}${item.category}${
    item.date
  }`}</List.Item>
);

export const Transactions = ({
  addTransaction,
  allTransactions,
  currentTransaction,
  currentCategory,
  selectedCategory,
  setSelectedCategory,
  updateCategory,
  updateTransaction
}: Props) => (
  <div>
    <h3>Handle transactions</h3>
    <TransactionForm
      addTransaction={addTransaction}
      currentTransaction={currentTransaction}
      updateTransaction={updateTransaction}
    />
    <h3>Handle categories</h3>
    <AutoComplete
      id="autoCompleteCategory"
      onSearch={(val: string) => updateCategory(val)}
      value={currentCategory}
      placeholder="Name"
    />
    {/* <Button
      type="primary"
      id="addCategoryButton"
      disabled={!isValid(currentTransaction)}
      onClick={() => addTransaction(currentTransaction)}
    >
      Add Category
    </Button>
    <div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select category"
        optionFilterProp="children"
        onChange={val => setSelectedCategory(val)}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {MOCK_CATEGORIES.map(c => (
          <Option key={c} value={c.toLowerCase()}>
            {c}
          </Option>
        ))}
      </Select>
      <Button
        type="primary"
        id="editCategoryButton"
        disabled={isEmpty(selectedCategory)}
        onClick={() => console.log('Open popover')}
      >
        Edit
      </Button>{' '}
      <Button
        type="primary"
        id="deleteCategoryButton"
        disabled={isEmpty(selectedCategory)}
        onClick={() => console.log('Delete cat')}
      >
        Delete
      </Button>
      </div> */}
    <h3>Transactions</h3>
    <List dataSource={allTransactions} renderItem={renderItem} />
  </div>
);

const mapStateToProps = state => ({
  ...state.transactions
});

const mapDispatchToProps = {
  addTransaction: actions.addTransaction,
  setSelectedCategory: actions.setSelectedCategory,
  updateCategory: actions.updateCategory,
  updateTransaction: actions.updateTransaction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
