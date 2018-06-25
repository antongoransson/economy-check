import React from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Button, List, Select } from 'antd';
import { isEmpty, isFinite } from 'lodash/fp';
import {
  addTransaction as addT,
  updateTransaction as updateT,
  updateCategory as updateCat,
  setSelectedCategory as setSelectedCat
} from './TransactionsActions';

type transaction = { name: string, cost: string, category: string };
type Props = {
  allTransactions: transaction[],
  currentTransaction: transaction,
  currentCategory: string,
  updateTransaction: (field: string, value: string) => void,
  addTransaction: transaction => void,
  selectedCategory: string,
  setSelectedCategory: string => void,
  updateCategory: string => void
};

const MOCK_CATEGORIES = ['Food', 'Sport', 'Travel'];
const { Option } = Select;

const isValid = (t: transaction) =>
  Object.values(t).every(k => !isEmpty(k) && k !== 0);

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
    <AutoComplete
      id="autoCompleteName"
      onSearch={val => updateTransaction('name', val)}
      value={currentTransaction.name}
      autoFocus
      placeholder="Name"
    />
    <AutoComplete
      id="autoCompleteCost"
      onSearch={val => {
        // Should be possible to write floats with either comma or dot
        if ((val && isFinite(Number(val.replace(',', '.')))) || val === '')
          updateTransaction('cost', val);
      }}
      value={currentTransaction.cost || ''}
      placeholder="Cost"
    />
    <Select
      id="transactionCategorySelect"
      showSearch
      style={{ width: 200 }}
      placeholder="Select category"
      optionFilterProp="children"
      onChange={val => updateTransaction('category', val)}
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
      id="addTransactionButton"
      disabled={!isValid(currentTransaction)}
      onClick={() => addTransaction(currentTransaction)}
    >
      Add Transaction
    </Button>
    <h3>Handle categories</h3>
    <AutoComplete
      id="autoCompleteCategory"
      onSearch={val => updateCategory(val)}
      value={currentCategory}
      autoFocus
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
    </div>
    <List
      dataSource={allTransactions}
      renderItem={item => (
        <List.Item>{`${item.name}       ${item.cost}`}</List.Item>
      )}
    /> */}
  </div>
);

const mapStateToProps = state => ({
  ...state.transactions
});

const mapDispatchToProps = {
  addTransaction: addT,
  setSelectedCategory: setSelectedCat,
  updateCategory: updateCat,
  updateTransaction: updateT
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
