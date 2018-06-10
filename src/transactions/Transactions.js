import React from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Button, List, Select } from 'antd';
import type { Dispatch } from 'redux';
import { isEmpty, isFinite } from 'lodash/fp';
import {
  addTransaction as addT,
  updateTransaction as updateT,
  setSelectedCategory as setSelectedCat
} from './TransactionsActions';

type transaction = { name: string, cost: number, category: string };
type Props = {
  allTransactions: transaction[],
  currentTransaction: transaction,
  updateTransaction: (field: string, value: number | string) => void,
  addTransaction: transaction => void,
  selectedCategory: string,
  setSelectedCategory: string => void
};

const MOCK_CATEGORIES = ['Food', 'Sport', 'Travel'];
const { Option } = Select;

const isValid = (t: transaction) =>
  Object.values(t).every(k => (!isEmpty(k) || isFinite(k)) && k !== 0);

export const Transactions = ({
  currentTransaction,
  updateTransaction,
  addTransaction,
  allTransactions,
  selectedCategory,
  setSelectedCategory
}: Props) => (
  <div>
    <h3>Handle transactions</h3>
    <AutoComplete
      onSearch={val => updateTransaction('name', val)}
      value={currentTransaction.name}
      autoFocus
      placeholder="Name"
    />
    <AutoComplete
      onSearch={val => {
        if (val && isFinite(Number(val.replace(',', '.'))))
          updateTransaction('cost', val);
      }}
      value={currentTransaction.cost || ''}
      placeholder="Cost"
    />
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select category"
      optionFilterProp="children"
      onChange={val => 
        updateTransaction('category', val)
      }
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
      onSearch={val => console.log(val)}
      value="currentCategory"
      autoFocus
      placeholder="Name"
    />
    <Button
      type="primary"
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
        disabled={isEmpty(selectedCategory)}
        onClick={() => console.log('Open popover')}
      >
        Edit
      </Button>{' '}
      <Button
        type="primary"
        disabled={isEmpty(selectedCategory)}
        onClick={() => console.log('Remove cat')}
      >
        Delete
      </Button>
    </div>
    <List
      dataSource={allTransactions}
      renderItem={item => (
        <List.Item>{`${item.name}       ${item.cost}`}</List.Item>
      )}
    />
  </div>
);

const mapStateToProps = state => ({
  ...state.transactions
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  updateTransaction: (field, value) => dispatch(updateT(field, value)),
  addTransaction: t => dispatch(addT(t)),
  setSelectedCategory: cat => dispatch(setSelectedCat(cat))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
