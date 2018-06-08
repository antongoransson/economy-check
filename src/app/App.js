import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Overview = () => (
  <div>
    <h2>Overview</h2>
  </div>
);

const HandleItems = () => (
  <div>
    <h3>Handle items</h3>
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
          <Link to="/handle-items">Handle Items</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={Overview} />
      <Route path="/handle-items" component={HandleItems} />
    </div>
  </Router>
);

export default App;
