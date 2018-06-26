import React from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Button, DatePicker, List, Select } from 'antd';
import { isEmpty, isFinite } from 'lodash/fp';
import moment from 'moment';
import type Moment from 'moment';
import * as actions from './TransactionsActions';
import type { transactionType } from './TransactionsTypes';

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

const MOCK_CATEGORIES = ['Food', 'Sport', 'Travel'];
const { Option } = Select;

const isValid: transactionType => boolean = (t: transactionType) =>
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
      onSearch={(val: string) => updateTransaction('name', val)}
      value={currentTransaction.name}
      autoFocus
      placeholder="Name"
    />
    <AutoComplete
      id="autoCompleteCost"
      onSearch={(val: string) => {
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
      onChange={(val: string) => updateTransaction('category', val)}
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
    <DatePicker
      allowClear={false}
      onChange={(date: Moment) =>
        updateTransaction('date', moment(date).format('YYYY-MM-DD'))
      }
      value={moment(currentTransaction.date)}
    />
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
    <List
      dataSource={allTransactions}
      renderItem={item => (
        <List.Item>{`${item.name}       ${item.cost}       ${
          item.category
        }       ${item.date}`}</List.Item>
      )}
    />
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
