import client from '../core/client';
import { ActionsUnion } from './actions.helpers';
import { ThunkAction } from 'redux-thunk';
import { ReduxActions } from './actions';
import { RootState } from './root.reducer';

type AppThunkAction = ThunkAction<void, RootState, null, any>;
type AppThunkActionCreator = (...args: any[]) => AppThunkAction;

export const ThunkActions = (() => {

  const fetchTrades: AppThunkActionCreator = () => async (dispatch) => {
    try {
      const trades = await client.fetchTrades()
      return dispatch(ReduxActions.addTrades(trades))
    }
    catch(error) { return dispatch(ReduxActions.setError(error.message)) }
  }
  
  const fetchMessages: AppThunkActionCreator = (tradeId: string) => async (dispatch) => {
    dispatch(ReduxActions.markChatAsFetching(tradeId));
    try {
      const messages = await client.fetchMessages(tradeId)
      return dispatch(ReduxActions.addChat({tradeId, messages }))
    }
    catch(error) { return dispatch(ReduxActions.setError(error.message)) }
  }

  const getCoinPrice: AppThunkActionCreator = () => async (dispatch) => {
     try { 
      const price = await client.getCoinPrice()
      return dispatch(ReduxActions.updateCoinPrice(price))
     }
     catch(error) { return dispatch(ReduxActions.setError(error.message)) }
  }

  const pollCoinPrice: AppThunkActionCreator = () => (dispatch, getState) => {
    dispatch(getCoinPrice());
    return new Promise<any>((resolve) => window.setTimeout(() => {
      if(!getState().appState.error) {
        dispatch(pollCoinPrice())
      }
      resolve();
      }, 5000)
    )
  }

  return { fetchTrades, fetchMessages, getCoinPrice, pollCoinPrice }
})()

export type ThunkActions = ActionsUnion<typeof ThunkActions>
