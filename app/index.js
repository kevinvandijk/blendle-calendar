import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import reducer from './reducer';
import Main from './components/Main';
import './styles.scss';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={ store }>
    <Main />
  </Provider>,
  document.getElementById('root')
);
