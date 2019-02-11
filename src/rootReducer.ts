import { combineReducers } from 'redux';
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'

const simplePReducer = (state = {}, action: any) => {
  switch (action.type) {
   case 'SIMPLE_ACTION':
    return {
     result: action.payload
    }
   default:
    return state
  }
 }

const createRootReducer = (history: History) => combineReducers({
  simplePReducer,
  router: connectRouter(history)
});


export default createRootReducer