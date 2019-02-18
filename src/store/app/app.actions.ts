import { createAction, ActionsUnion } from './../actions.helpers';

export enum APP_ACTION_KEYS {
  UPDATE_COIN_PRICE = 'app.update_coin_price',
  SWITCH_VIEW = 'app.switch_user',
  SET_ERROR = 'app.set_error'
};

export const AppActions = {
  switchView: () => createAction(APP_ACTION_KEYS.SWITCH_VIEW),
  setError: (error: string) => createAction(APP_ACTION_KEYS.SET_ERROR, error),
  updateCoinPrice: (price: number) => createAction(APP_ACTION_KEYS.UPDATE_COIN_PRICE, price),
};

export type AppActions = ActionsUnion<typeof AppActions>
