import { Dispatch, Action } from "redux";
import { ThunkAction } from 'redux-thunk';
import client from "../core/client";
import { createAction, ActionsUnion, ActionCreatorsUnion } from "./actions.helpers";
import { State, Trade, TradeMessage } from "../core/model";

export enum ACTION_KEYS {
  ADD_ITEM = "add_item",
  DELETE_TRADE = 'delete_trade',
  ARCHIVE_TRADE = 'archive_trade',
  MARK_TRADE_MESSAGES_AS_READ = 'mark_trade_messages_as_read',
  MARK_TRADE_MESSAGES_AS_UNREAD = 'mark_trade_messages_as_unread',
  UPDATE_COIN_PRICE = "update_coin_price",
  ADD_MESSAGE = "add_message",
  SWITCH_VIEW = "switch_user"
};

export const ReduxActions = {
  addItem: (item: Trade) => createAction(ACTION_KEYS.ADD_ITEM, item),
  switchView: () => createAction(ACTION_KEYS.SWITCH_VIEW),
  archiveTrade: () => createAction(ACTION_KEYS.ARCHIVE_TRADE),
  markTradeMessagesAsRead: (tradeId: string) => createAction(ACTION_KEYS.MARK_TRADE_MESSAGES_AS_READ, tradeId),
  markTradeMessagesAsUnread: (tradeId: string) => createAction(ACTION_KEYS.MARK_TRADE_MESSAGES_AS_UNREAD, tradeId),
  deleteTrade: (tradeId: string) => createAction(ACTION_KEYS.DELETE_TRADE, tradeId),
  updateCoinPrice: (price: number) => createAction(ACTION_KEYS.UPDATE_COIN_PRICE, price),
  addMessage: (message: {tradeId: string, message: TradeMessage }) => createAction(ACTION_KEYS.ADD_MESSAGE, message)
};

export const EffectActions = (() => {

  const fetchTrades = () => (dispatch: Dispatch<Action>) =>
    client
      .fetchTrades()
      .then((items) => {
        items
          .map((item: Trade)=> dispatch(ReduxActions.addItem(item))) 
          //todo consider adding bulk add for perf improvements
    });

  const getCoinPrice = () => (dispatch: Dispatch<Action>) =>
    client
      .getCoinPrice()
      .then((price) => {
        console.log(price)
      dispatch(ReduxActions.updateCoinPrice(price)) 
  })

  const pollCoinPrice = () => (dispatch : any) => { //todo fix any
    dispatch(getCoinPrice());
    window.setTimeout(() => {
      dispatch(pollCoinPrice())
    }, 5000)
  }

  return { fetchTrades, getCoinPrice, pollCoinPrice }
})()

export const Actions = {
  ...ReduxActions, ...EffectActions
};

export type ReduxActions = ActionsUnion<typeof ReduxActions>
export type Actions = ActionsUnion<typeof Actions>
export type EffectActions = ActionsUnion<typeof EffectActions>
export type ActionCreators = ActionCreatorsUnion<typeof Actions>