import { State } from "../core/model";
import { Reducer } from 'redux'
import { ReduxActions, ACTION_KEYS } from "./actions";

export const initalState: State = {
  items: [/* {
    id: 'tere',
    category: 'dead'
  },{
    id: 'ciao',
    category: 'alive'
  },{
    id: 'poko',
    category: 'alive'
  },{
    id: 'hontas',
    category: 'alive'
  } */]
};

export const reducer : Reducer<State, ReduxActions> = (state: State = initalState, action: ReduxActions ) => {
  switch (action.type) {
    case (ACTION_KEYS.ADD_ITEM) : {
      return {...state, items: [...state.items, action.payload]};
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
