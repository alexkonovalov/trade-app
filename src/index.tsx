import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Actions } from './store/actions';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/store';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
store.dispatch(Actions.pollCoinPrice());
store.dispatch(Actions.fetchTrades());

ReactDOM.render(
  <Provider store={store}><App history={history}/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
