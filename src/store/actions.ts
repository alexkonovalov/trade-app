import { Dispatch, Action } from "redux";
import { ThunkAction } from 'redux-thunk';
import itemsClient from "../core/client";
import { createAction, ActionsUnion, ActionCreatorsUnion } from "./actions.helpers";
import { State, Item } from "../core/model";

export enum ACTION_KEYS {
  ADD_ITEM = "add_item"
};

export const ReduxActions = {
  addItem : (item: Item) => createAction(ACTION_KEYS.ADD_ITEM, item),
};

export const EffectActions = {
  fetchPersons: () => (dispatch: Dispatch<Action>) =>
      itemsClient
        .fetchItems()
        .then((items) => {

          items
            .map((item: Item)=> dispatch(ReduxActions.addItem(item))) 
            //todo consider adding bulk add for perf improvements
      })
};



export const Actions = {
  ...ReduxActions, ...EffectActions
};

export type ReduxActions = ActionsUnion<typeof ReduxActions>
export type Actions = ActionsUnion<typeof Actions>
export type EffectActions = ActionsUnion<typeof EffectActions>
export type ActionCreators = ActionCreatorsUnion<typeof Actions>