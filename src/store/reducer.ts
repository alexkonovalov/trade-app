import { State, TradeStatus } from "../core/model";
import { Reducer } from 'redux'
import { ReduxActions, ACTION_KEYS } from "./actions";

const sampleTrade = {
  id: 'trade1',
  status: 'unpaid' as TradeStatus,
  price: 300,
  isReleased: true,
  paymentMethod: 'PayPal 1',
  hasUnreadMessage: false,
  buyer: {
    name: 'Harshampur Maharaji',
    rating: { positive: 33, negative: -50 },
    imgSrc: 'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'
  }
}
const sampleTrade2 = {
  id: 'trade2',
  status: 'unpaid' as TradeStatus,
  price: 300,
  isReleased: false,
  paymentMethod: 'PayPal 2',
  hasUnreadMessage: false,
  buyer: {
    name: 'Harshampur Maharaji',
    rating: { positive: 33, negative: -50 },
    imgSrc: 'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'
  }
}

const sampleTrade3 = {
  id: 'trade3',
  status: 'paid' as TradeStatus,
  price: 300,
  isReleased: false,
  paymentMethod: 'PayPal 3',
  hasUnreadMessage: false,
  buyer: {
    name: 'Harshampur Maharaji',
    rating: { positive: 33, negative: -50 },
    imgSrc: 'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'
  }
}

const sampleTrade4 = {
  id: 'trade4',
  status: 'unpaid' as TradeStatus,
  price: 300,
  isReleased: false,
  paymentMethod: 'PayPal 4',
  hasUnreadMessage: true,
  buyer: {
    name: 'Harshampur Maharaji',
    rating: { positive: 33, negative: -50 },
    imgSrc: 'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'
  }
}

export const initalState: State = {
  trades: [sampleTrade, sampleTrade2, sampleTrade4, sampleTrade3],
  viewAs: 'seller',
  coinPrice : undefined,
  chats: {
    trade1: [
      {sender: 'buyer', content: 'tere yo'},
      {sender: 'seller', content: 'tere 1'},
      {sender: 'seller', content: 'tere 2'},
      {sender: 'buyer', content: 'tere yo yo'}
    ],
    trade3: [
      {sender: 'buyer', content: 'tere yo'},
      {sender: 'seller', content: 'tere 1'},
      {sender: 'seller', content: 'tere 2'},
      {sender: 'buyer', content: 'tere yo yo'}
    ],
    trade4: [
      {sender: 'buyer', content: 'tere yo'},
      {sender: 'seller', content: 'tere 1'},
      {sender: 'seller', content: 'tere 2'},
      {sender: 'buyer', content: 'tere yo yo'}
    ],
    trade2: [
      {sender: 'buyer', content: 'tere yosss'},
      {sender: 'buyer', content: 'tere 1sss'},
      {sender: 'seller', content: 'tere 2ss'},
      {sender: 'buyer', content: 'tere yo yoss'}
    ]}
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
    case (ACTION_KEYS.ADD_MESSAGE) : {
      return {...state,
        chats: { ...state.chats,
          [action.payload.tradeId]:[
            ...state.chats[action.payload.tradeId],
            action.payload.message
          ]
        },
        ...action.payload.message.sender === 'buyer' ? {
          trades: state.trades.map(
            trade => trade.id === action.payload.tradeId ? { ...trade, hasUnreadMessage: true } : trade
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
