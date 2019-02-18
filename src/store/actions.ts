import { AppActions } from './app/app.actions';
import { TradesActions } from './trades/trades.actions';
import { ThunkActions } from './thunks';

export const ReduxActions = {...AppActions, ...TradesActions }
export const Actions = {
  ...ReduxActions, ...ThunkActions
};