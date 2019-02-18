import { createAction, ActionsUnion } from '../actions.helpers';
import { Trade, TradeMessage, } from '../../core/model';

export enum TRADES_ACTION_KEYS {
  ADD_ITEM = 'trades.add',
  DELETE_TRADE = 'trades.delete',
  RELEASE_TRADE = 'trades.release',
  MARK_TRADE_MESSAGES_AS_READ = 'trades.mark_messages_as_read',
  MARK_CHAT_AS_FETCHING = 'trades.mark_chat_as_fetching',
  MARK_CHAT_AS_FETCHED = 'trades.mark_chat_as_fetched',
  ADD_MESSAGE = 'trades.add_message',
  UPDATE_CHAT = 'trades.add_chat',
};

export const TradesActions = {
  addTrades: (trades: Trade[]) => createAction(TRADES_ACTION_KEYS.ADD_ITEM, trades),
  releaseTrade: (tradeId: string) => createAction(TRADES_ACTION_KEYS.RELEASE_TRADE, tradeId),
  markTradeMessagesAsRead: (tradeId: string) => createAction(TRADES_ACTION_KEYS.MARK_TRADE_MESSAGES_AS_READ, tradeId),
  deleteTrade: (tradeId: string) => createAction(TRADES_ACTION_KEYS.DELETE_TRADE, tradeId),
  markChatAsFetching: (tradeId: string) => createAction(TRADES_ACTION_KEYS.MARK_CHAT_AS_FETCHING, tradeId),
  markChatAsFetched: (tradeId: string) => createAction(TRADES_ACTION_KEYS.MARK_CHAT_AS_FETCHED, tradeId),
  addMessage: (message: {tradeId: string, message: TradeMessage }) => createAction(TRADES_ACTION_KEYS.ADD_MESSAGE, message),
  addChat: (chat: {tradeId: string, messages: TradeMessage[] }) => createAction(TRADES_ACTION_KEYS.UPDATE_CHAT, chat)
};

export type TradesActions = ActionsUnion<typeof TradesActions>
