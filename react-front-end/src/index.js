import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import DataProvider from './providers/DataProvider';

import * as serviceWorker from './serviceWorker';

import axios from 'axios';

const path = require('path')

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
