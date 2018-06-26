import React from 'react';
import { AutoComplete, Button, DatePicker, Select } from 'antd';
import { isEmpty, isFinite } from 'lodash/fp';
import moment from 'moment';
import type Moment from 'moment';
import type { transactionType } from './TransactionsTypes';

export type Props = {
  addTransaction: transactionType => void,
  currentTransaction: transactionType,
  updateTransaction: (field: string, value: string) => void
};
const MOCK_CATEGORIES = ['Food', 'Sport', 'Travel'];
const { Option } = Select;

const isValid: transactionType => boolean = (t: transactionType) =>
  Object.values(t).every(k => !isEmpty(k) && k !== 0);
const TransactionForm = ({
  currentTransaction,
  updateTransaction,
  addTransaction
}: Props) => (
  <div>
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
        const numVal = val.replace(',', '.');
        // Should be possible to write floats with either comma or dot
        if ((val && isFinite(Number(numVal))) || val === '')
          updateTransaction('cost', numVal);
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
  </div>
);

export default TransactionForm;
