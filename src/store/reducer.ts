import { State, TradeStatus } from "../core/model";
import { Reducer } from 'redux'
import { ReduxActions, ACTION_KEYS } from "./actions";

const sampleTrade = {
  id: 'trade1',
  status: 'unpaid' as TradeStatus,
  price: 300,
  paymentMethod: 'PayPal',
  hasUnreadMessage: true,
  buyer: {
    name: 'Harshampur Maharaji',
    rating: { positive: 33, negative: -50 },
    imgSrc: 'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'
  }
}

export const initalState: State = {
  trades: [sampleTrade, {...sampleTrade, id: 'trade2'}],
  viewAs: 'seller',
  coinPrice : undefined,
  chats: {
    trade1: [
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
    case (ACTION_KEYS.ADD_ITEM) : {
      return {...state, trades: [...state.trades, action.payload]};
    }
    case (ACTION_KEYS.SWITCH_VIEW) : {
      return {...state, viewAs: state.viewAs === 'buyer' ? 'seller' : 'buyer' }
    }
    case (ACTION_KEYS.ADD_MESSAGE) : {
      return {...state, chats: { ...state.chats,
          [action.payload.tradeId]:[
            ...state.chats[action.payload.tradeId],
            action.payload.message
          ]
        }
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
