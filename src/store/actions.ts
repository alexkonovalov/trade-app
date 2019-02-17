import client from "../core/client";
import { createAction, ActionsUnion, ActionCreatorsUnion, ThunkDispatchFunc, ThunkActionFunc } from "./actions.helpers";
import { State, Trade, TradeMessage, } from "../core/model";

export enum ACTION_KEYS {
  ADD_ITEM = "add_item",
  DELETE_TRADE = 'delete_trade',
  RELEASE_TRADE = 'release_trade',
  MARK_TRADE_MESSAGES_AS_READ = 'mark_trade_messages_as_read',
  MARK_CHAT_AS_FETCHING = 'mark_chat_as_fetching',
  MARK_CHAT_AS_FETCHED = 'mark_chat_as_fetched',
  UPDATE_COIN_PRICE = "update_coin_price",
  ADD_MESSAGE = "add_message",
  UPDATE_CHAT = "add_chat",
  SWITCH_VIEW = "switch_user",
  SET_ERROR = 'set_error'
};

export const ReduxActions = {
  addTrades: (trades: Trade[]) => createAction(ACTION_KEYS.ADD_ITEM, trades),
  switchView: () => createAction(ACTION_KEYS.SWITCH_VIEW),
  releaseTrade: (tradeId: string) => createAction(ACTION_KEYS.RELEASE_TRADE, tradeId),
  markTradeMessagesAsRead: (tradeId: string) => createAction(ACTION_KEYS.MARK_TRADE_MESSAGES_AS_READ, tradeId),
  setError: (error: string) => createAction(ACTION_KEYS.SET_ERROR, error),
  deleteTrade: (tradeId: string) => createAction(ACTION_KEYS.DELETE_TRADE, tradeId),
  updateCoinPrice: (price: number) => createAction(ACTION_KEYS.UPDATE_COIN_PRICE, price),
  markChatAsFetching: (tradeId: string) => createAction(ACTION_KEYS.MARK_CHAT_AS_FETCHING, tradeId),
  markChatAsFetched: (tradeId: string) => createAction(ACTION_KEYS.MARK_CHAT_AS_FETCHED, tradeId),
  addMessage: (message: {tradeId: string, message: TradeMessage }) => createAction(ACTION_KEYS.ADD_MESSAGE, message),
  addChat: (chat: {tradeId: string, messages: TradeMessage[] }) => createAction(ACTION_KEYS.UPDATE_CHAT, chat)
};

export const EffectActions = (() => {

  const fetchTrades: ThunkActionFunc<State> = () => async (dispatch) => {
    try {
      const trades = await client.fetchTrades()
      return dispatch(ReduxActions.addTrades(trades))
    }
    catch(error) { return dispatch(ReduxActions.setError(error.message)) }
  }
  
  const fetchMessages: ThunkActionFunc<State> = (tradeId: string) => async (dispatch) => {
    dispatch(ReduxActions.markChatAsFetching(tradeId));
    try {
      const messages = await client.fetchMessages(tradeId)
      return dispatch(ReduxActions.addChat({tradeId, messages }))
    }
    catch(error) { return dispatch(ReduxActions.setError(error.message)) }
  }

  const getCoinPrice: ThunkActionFunc<State> = () => async (dispatch) => {
     try { 
      const price = await client.getCoinPrice()
      return dispatch(ReduxActions.updateCoinPrice(price))
     }
     catch(error) { return dispatch(ReduxActions.setError(error.message)) }
  }

  const pollCoinPrice: ThunkActionFunc<State> = () => (dispatch) => {
    dispatch(getCoinPrice());
    return new Promise<ThunkActionFunc<State>>((resolve) => window.setTimeout(() => {
        dispatch(pollCoinPrice())
        resolve();
      }, 5000)
    )
  }

  return { fetchTrades, fetchMessages, getCoinPrice, pollCoinPrice }
})()

export const Actions = {
  ...ReduxActions, ...EffectActions
};

export type ReduxActions = ActionsUnion<typeof ReduxActions>
export type Actions = ActionsUnion<typeof Actions>
export type EffectActions = ActionsUnion<typeof EffectActions>
export type ActionCreators = ActionCreatorsUnion<typeof Actions>