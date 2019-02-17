import { State, TradeStatus, TradeMessage } from "../core/model";
import { Reducer } from 'redux'
import { ReduxActions, ACTION_KEYS } from "./actions";

export const initalState: State = {
  trades: [],
  viewAs: 'seller',
  coinPrice : undefined,
  chats: {}
};

export const reducer : Reducer<State, ReduxActions> = (state: State = initalState, action: ReduxActions ) => {
  switch (action.type) {
    case (ACTION_KEYS.UPDATE_COIN_PRICE) : {
      const newState = {...state, coinPrice: action.payload}
      console.log('update coin price', newState)
      return newState;
    }
    case (ACTION_KEYS.MARK_TRADE_MESSAGES_AS_READ) : {
      return { ...state, trades: state.trades.map(trade =>
        trade.id === action.payload ? { ...trade, hasUnreadMessage: false } : trade)
      }
    }
    case (ACTION_KEYS.ADD_ITEM) : {
      return {...state, trades: [...state.trades, action.payload]};
    }
    case (ACTION_KEYS.DELETE_TRADE) : {
      return {...state, trades: [
        ...state.trades.filter(trade => trade.id !== action.payload)
      ]};
    }
    case (ACTION_KEYS.RELEASE_TRADE) : {
      return { ...state, trades: state.trades.map(
        trade => trade.id === action.payload ? { ...trade, isReleased: true } : trade
        )
      }
    }
    case (ACTION_KEYS.SWITCH_VIEW) : {
      return {...state, viewAs: state.viewAs === 'buyer' ? 'seller' : 'buyer' }
    }
    case (ACTION_KEYS.MARK_CHAT_AS_FETCHING) : {
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
    case (ACTION_KEYS.MARK_CHAT_AS_FETCHED) : {
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
    case (ACTION_KEYS.ADD_MESSAGE) : {
      console.log('!!!!!!!!!state.chats.payload', action.payload)
      console.log('!!!!!!!!!state.chats', state.chats)

     // const chat = state.chats[action.payload.tradeId]
      const chat2 : TradeMessage[] = []
      console.log('!!!!!!!!!state.chats1', state.chats[action.payload.tradeId])
      console.log('!!!!!!!!!state.chat2', state.chats[action.payload.tradeId])
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


import { combineReducers } from 'redux';
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'

 export const createRootReducer = (history: History) => combineReducers({
  reducer,
  router: connectRouter(history)
});
