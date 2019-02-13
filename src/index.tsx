import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import ReactDOM from 'react-dom';
import { AnyAction } from 'redux'
/* import './index.scss'; */
import App from './App';
import { Actions } from "./store/actions";
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore, { history } from './store/store';
import { createAction } from './store/actions.helpers';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore()
// store.dispatch(Actions.fetchPersons())

store.dispatch(Actions.pollCoinPrice())

ReactDOM.render(
  <Provider store={store}><App history={history}/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
