import { TradesState, TradeStatus, Chat, TradeMessage, Trade } from '../../core/model';
import { Reducer } from 'redux';
import { TradesActions, TRADES_ACTION_KEYS } from './trades.actions';

export const initalTradeState: TradesState = {
  trades: [],
  chats: {}
};

const updateChat = (state: TradesState, tradeId: string, newChat: Chat) => {
  const chat = state.chats[tradeId]
  return {...state,
    chats: { ...state.chats,
      [tradeId]: {
        ...chat,
        ...newChat
      }
    }
  };
}

const markTradeUnreadStatus = (trades: Trade[], tradeId: string, isUnread: boolean) => {
  return trades.map(trade =>
    trade.id === tradeId ? { ...trade, hasUnreadMessage: isUnread } : trade
  )
}

export const tradesReducer : Reducer<TradesState, TradesActions> = (state: TradesState = initalTradeState, action: TradesActions ) => {
  switch (action.type) {
    case (TRADES_ACTION_KEYS.MARK_TRADE_MESSAGES_AS_READ) : {
      return { ...state, trades: markTradeUnreadStatus(state.trades, action.payload, false) };
    }
    case (TRADES_ACTION_KEYS.ADD_ITEM) : {
      return {...state, trades: action.payload };
    }
    case (TRADES_ACTION_KEYS.DELETE_TRADE) : {
      return {...state, trades: [
        ...state.trades.filter(trade => trade.id !== action.payload)
      ]};
    }
    case (TRADES_ACTION_KEYS.RELEASE_TRADE) : {
      return { ...state, trades: state.trades.map(
        trade => trade.id === action.payload ? { ...trade, isReleased: true } : trade
        )
      };
    }
    case (TRADES_ACTION_KEYS.MARK_CHAT_AS_FETCHING) : {
      return updateChat(state, action.payload, { isFetching: true });
    }
    case (TRADES_ACTION_KEYS.MARK_CHAT_AS_FETCHED) : {
      return updateChat(state, action.payload, { isFetching: false });
    }
    case (TRADES_ACTION_KEYS.UPDATE_CHAT) : {
      const { tradeId, messages } = action.payload;
      return updateChat(state, tradeId, { messages });
    }
    case (TRADES_ACTION_KEYS.ADD_MESSAGE) : {
      const { tradeId, message } = action.payload;

      const chat = state.chats[tradeId];
      const messages = [...chat && chat.messages || [], message];

      return {
        ...updateChat(state, tradeId, { messages }),
        ...action.payload.message.sender === 'buyer' ? {
          trades: markTradeUnreadStatus(state.trades, tradeId, true)
        } : {}
      };
    }
    default: return state;
  }
};
