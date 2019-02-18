import { AppState } from '../../core/model';
import { Reducer } from 'redux';
import { AppActions, APP_ACTION_KEYS } from './app.actions';

export const appInitialState: AppState = {
  error: undefined,
  viewAs: 'seller',
  coinPrice : undefined
};

export const appReducer : Reducer<AppState, AppActions> = (state: AppState = appInitialState, action: AppActions ) => {
  switch (action.type) {
    case (APP_ACTION_KEYS.UPDATE_COIN_PRICE) : {
      const newState = {...state, coinPrice: action.payload}
      return newState;
    }
    case (APP_ACTION_KEYS.SWITCH_VIEW) : {
      return {...state, viewAs: state.viewAs === 'buyer' ? 'seller' : 'buyer' }
    }
    case (APP_ACTION_KEYS.SET_ERROR) : {
      return {...state, error: action.payload };
    }
    default: return state;
  }
};