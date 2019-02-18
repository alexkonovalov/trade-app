import { appReducer } from './app/app.reducer';
import { tradesReducer } from './trades/trades.reducer';

import { combineReducers } from 'redux';
import { History } from 'history'
import { connectRouter } from 'connected-react-router'

 export const createRootReducer = (history: History) => combineReducers({
  tradeState: tradesReducer,
  appState: appReducer,
  router: connectRouter(history)
});
