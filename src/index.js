import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './app/store';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

const Index = render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') || document.createElement('div')
);
registerServiceWorker();

export default Index;
