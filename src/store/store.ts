import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createRootReducer } from './reducer';
import { createBrowserHistory } from 'history';
import { State } from "../core/model";
import { RouterState } from 'connected-react-router';

import { EffectActions } from "../store/actions";

export const history = createBrowserHistory()

const configureStore = (initialState={}) => {
 return createStore(
   createRootReducer(history),
   initialState,
   applyMiddleware(thunk)
 );
}

export default configureStore as (initialState?: {}) => 
  ReturnType<typeof configureStore> & 
  {
    dispatch: (actions: EffectActions) => ReturnType<EffectActions>
    // workaround for thunk-actions
  }
