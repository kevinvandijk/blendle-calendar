import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';

import reducer from './reducer';
import Main from './components/Main';
import './styles.scss';

const engine = createEngine('blendle-calendar');
const storageMiddleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(storageMiddleware)(createStore);
/* eslint-disable no-underscore-dangle */
const store = createStoreWithMiddleware(
  storage.reducer(reducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

const load = storage.createLoader(engine);
load(store).then(() => {
  ReactDOM.render(
    <Provider store={ store }>
      <Main />
    </Provider>,
    document.getElementById('root')
  );
});
