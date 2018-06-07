import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

const root: ?Element = document.getElementById('root');

if (root != null) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
  registerServiceWorker();
}
