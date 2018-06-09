import React from 'react';
import { AutoComplete, Button, List } from 'antd';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import {
  addTransaction as addT,
  updateTransaction as updateT
} from './TransactionsActions';

type Props = {
  allTransactions: { name: string, cost: number }[],
  currentTransaction: { name: string, cost: number },
  updateTransaction: (name: string, cost: number) => void,
  addTransaction: (name: string, cost: number) => void
};

export const Transactions = ({
  currentTransaction,
  updateTransaction,
  addTransaction,
  allTransactions
}: Props) => (
  <div>
    <h3>Handle transactions</h3>
    <AutoComplete
      onSearch={val => updateTransaction(val, currentTransaction.cost)}
      value={currentTransaction.name}
      autoFocus
      placeholder="Enter name of transaction"
    />
    <AutoComplete
      onSearch={val => updateTransaction(currentTransaction.name, val)}
      value={currentTransaction.cost}
      placeholder="Enter cost of transaction"
    />
    <Button
      type="primary"
      onClick={() =>
        addTransaction(currentTransaction.name, currentTransaction.cost)
      }
    >
      Add transaction
    </Button>
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
  updateTransaction: (name, cost) => dispatch(updateT(name, cost)),
  addTransaction: (name, cost) => dispatch(addT(name, cost))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
