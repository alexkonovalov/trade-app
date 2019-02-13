import { State} from "../core/model";
import { Reducer } from 'redux'
import { ReduxActions, ACTION_KEYS } from "./actions";

export const initalState: State = {
  items: [{
    id: 'trade1',
    category: 'alive'
  },{
    id: 'ciao',
    category: 'alive'
  },{
    id: 'trade2',
    category: 'alive'
  },{
    id: 'hontas',
    category: 'alive'
  }],
  viewAs: 'seller',
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

export const reducer : Reducer<State, ReduxActions> = /* (ss: State = initalState, aa) => ({
  items:[],
  chats:{}
})
 */


(state: State = initalState, action: ReduxActions ) => {
  switch (action.type) {
    case (ACTION_KEYS.ADD_ITEM) : {
      return {...state, items: [...state.items, action.payload]};
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
