import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createRootReducer } from './root.reducer';
import { createBrowserHistory } from 'history';
import { ThunkActions } from './thunks';

export const history = createBrowserHistory()

const configureStore = (initialState={}) => {
 return createStore(
   createRootReducer(history),
   initialState,
   applyMiddleware(thunk)
 );
};

export default configureStore as (initialState?: {}) => 
  ReturnType<typeof configureStore> & 
  {
    dispatch: (actions: ThunkActions) => ReturnType<ThunkActions>
    // workaround for thunk-actions
  }
