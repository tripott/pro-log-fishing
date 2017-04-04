import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux'
import store from './store'
import 'tachyons/css/tachyons.css'
import 'font-awesome/css/font-awesome.css'

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
      ,document.getElementById('root'));
