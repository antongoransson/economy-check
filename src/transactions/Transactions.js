import React from 'react';
import { AutoComplete } from 'antd';
import { connect } from 'react-redux';
import { addTransaction, updateTransaction } from './TransactionsActions';

const Transactions = ({ currentTransaction }) => (
  <div>
    <h3>Handle transactions</h3>
    <AutoComplete
      onChange={val => updateTransaction(val, 10)}
      value={currentTransaction}
      autoFocus
      placeholder="Enter name of transaction"
    />
  </div>
);

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  updateTransaction: (name, cost) => dispatch(updateTransaction(name, cost)),
  addTransaction: (name, cost) => dispatch(addTransaction(name, cost))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
