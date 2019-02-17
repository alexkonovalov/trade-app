import { Dispatch, Action } from "redux";
import { ThunkAction } from 'redux-thunk';
import client from "../core/client";
import { createAction, ActionsUnion, ActionCreatorsUnion } from "./actions.helpers";
import { State, Trade, TradeMessage } from "../core/model";

export enum ACTION_KEYS {
  ADD_ITEM = "add_item",
  DELETE_TRADE = 'delete_trade',
  RELEASE_TRADE = 'release_trade',
  MARK_TRADE_MESSAGES_AS_READ = 'mark_trade_messages_as_read',
  MARK_CHAT_AS_FETCHING = 'mark_chat_as_fetching',
  MARK_CHAT_AS_FETCHED = 'mark_chat_as_fetched',
  UPDATE_COIN_PRICE = "update_coin_price",
  ADD_MESSAGE = "add_message",
  SWITCH_VIEW = "switch_user"
};

export const ReduxActions = {
  addItem: (item: Trade) => createAction(ACTION_KEYS.ADD_ITEM, item),
  switchView: () => createAction(ACTION_KEYS.SWITCH_VIEW),
  releaseTrade: (tradeId: string) => createAction(ACTION_KEYS.RELEASE_TRADE, tradeId),
  markTradeMessagesAsRead: (tradeId: string) => createAction(ACTION_KEYS.MARK_TRADE_MESSAGES_AS_READ, tradeId),
  deleteTrade: (tradeId: string) => createAction(ACTION_KEYS.DELETE_TRADE, tradeId),
  updateCoinPrice: (price: number) => createAction(ACTION_KEYS.UPDATE_COIN_PRICE, price),
  markChatAsFetching: (tradeId: string) => createAction(ACTION_KEYS.MARK_CHAT_AS_FETCHING, tradeId),
  markChatAsFetched: (tradeId: string) => createAction(ACTION_KEYS.MARK_CHAT_AS_FETCHED, tradeId),
  addMessage: (message: {tradeId: string, message: TradeMessage }) => createAction(ACTION_KEYS.ADD_MESSAGE, message)
};

export const EffectActions = (() => {

  const fetchTrades = () => (dispatch: any) => client
    .fetchTrades()
    .then((items) => {
      items
        .map((item: Trade)=> { //todo map is wrong
          dispatch(ReduxActions.addItem(item));
          // dispatch(fetchMessages(item.id)) //todo bad
        }
      )
        //todo consider adding bulk add for perf improvements
  });


  const fetchMessages = (tradeId: string) => (dispatch: Dispatch<Action>) => {
    dispatch(ReduxActions.markChatAsFetching(tradeId));
    return client
      .fetchMessages(tradeId)
      .then((messages) => {
        messages
          .map((item: TradeMessage)=> {
            dispatch(ReduxActions.addMessage({tradeId, message: item}))
          //todo consider adding bulk add for perf improvements           
          }) 
    }).then(()=>{
      dispatch(ReduxActions.markChatAsFetched(tradeId))
    });
  }


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

  return { fetchTrades, fetchMessages, getCoinPrice, pollCoinPrice }
})()

export const Actions = {
  ...ReduxActions, ...EffectActions
};

export type ReduxActions = ActionsUnion<typeof ReduxActions>
export type Actions = ActionsUnion<typeof Actions>
export type EffectActions = ActionsUnion<typeof EffectActions>
export type ActionCreators = ActionCreatorsUnion<typeof Actions>