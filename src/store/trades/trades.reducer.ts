import { TradesState } from '../../core/model';
import { Reducer } from 'redux'
import { TradesActions, TRADES_ACTION_KEYS } from './trades.actions';

export const initalTradeState: TradesState = {
  trades: [],
  chats: {}
};

export const tradesReducer : Reducer<TradesState, TradesActions> = (state: TradesState = initalTradeState, action: TradesActions ) => {
  switch (action.type) {
    case (TRADES_ACTION_KEYS.MARK_TRADE_MESSAGES_AS_READ) : {
      return { ...state, trades: state.trades.map(trade =>
        trade.id === action.payload ? { ...trade, hasUnreadMessage: false } : trade)
      }
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
      }
    }
    case (TRADES_ACTION_KEYS.MARK_CHAT_AS_FETCHING) : {
      const chat = state.chats[action.payload]

      return {...state,
        chats: { ...state.chats,
          [action.payload]: {
            ...chat,
            isFetching: true
          }
        }
      };
    }
    case (TRADES_ACTION_KEYS.MARK_CHAT_AS_FETCHED) : {
      const chat = state.chats[action.payload]

      return {...state,
        chats: { ...state.chats,
          [action.payload]: {
            ...chat,
            isFetching: false
          }
        }
      };
    }
    case (TRADES_ACTION_KEYS.UPDATE_CHAT) : {
      const { tradeId, messages } = action.payload
      return { ...state,
        chats: { ...state.chats,
          [tradeId] : {...state.chats[tradeId], messages }
        }
      }
    }
    case (TRADES_ACTION_KEYS.ADD_MESSAGE) : {
      const chat = state.chats[action.payload.tradeId]

      return {...state,
        chats: { ...state.chats,
          [action.payload.tradeId]:{
            ...chat,
            messages: [ ...chat && chat.messages || [], action.payload.message ]
          }
        },
        ...action.payload.message.sender === 'buyer' ? {
          trades: state.trades.map(trade =>
            trade.id === action.payload.tradeId ? { ...trade, hasUnreadMessage: true } : trade
          )
        } : {}
      };
    }
    default: return state;
  }
};
