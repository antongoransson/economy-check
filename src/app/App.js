import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Transactions from 'src/transactions/Transactions';

const Overview = () => (
  <div>
    <h2>Overview</h2>
  </div>
);

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Overview</Link>
        </li>
        <li>
          <Link to="/handle-items">Handle transactions</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={Overview} />
      <Route path="/handle-items" component={Transactions} />
    </div>
  </Router>
);

export default App;
