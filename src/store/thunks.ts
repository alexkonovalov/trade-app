import client from '../core/client';
import { ActionsUnion, ThunkActionFunc } from './actions.helpers';
import { ReduxActions } from './actions'
import { TradesState } from '../core/model';

export const ThunkActions = (() => {

  const fetchTrades: ThunkActionFunc<TradesState> = () => async (dispatch) => {
    try {
      const trades = await client.fetchTrades()
      return dispatch(ReduxActions.addTrades(trades))
    }
    catch(error) { return dispatch(ReduxActions.setError(error.message)) }
  }
  
  const fetchMessages: ThunkActionFunc<TradesState> = (tradeId: string) => async (dispatch) => {
    dispatch(ReduxActions.markChatAsFetching(tradeId));
    try {
      const messages = await client.fetchMessages(tradeId)
      return dispatch(ReduxActions.addChat({tradeId, messages }))
    }
    catch(error) { return dispatch(ReduxActions.setError(error.message)) }
  }

  const getCoinPrice: ThunkActionFunc<TradesState> = () => async (dispatch) => {
     try { 
      const price = await client.getCoinPrice()
      return dispatch(ReduxActions.updateCoinPrice(price))
     }
     catch(error) { return dispatch(ReduxActions.setError(error.message)) }
  }

  const pollCoinPrice: ThunkActionFunc<TradesState> = () => (dispatch) => {
    dispatch(getCoinPrice());
    return new Promise<ThunkActionFunc<TradesState>>((resolve) => window.setTimeout(() => {
        dispatch(pollCoinPrice())
        resolve();
      }, 5000)
    )
  }

  return { fetchTrades, fetchMessages, getCoinPrice, pollCoinPrice }
})()

export type ThunkActions = ActionsUnion<typeof ThunkActions>
