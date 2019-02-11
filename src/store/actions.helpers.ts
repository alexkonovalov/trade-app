export interface Action<T extends string> {
  type: T
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

type FunctionType = (...args: any[]) => any
type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType }

export type ActionCreatorsUnion<A extends ActionCreatorsMapObject> = A[keyof A]
export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<ActionCreatorsUnion<A>>

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction(type: string, payload?: any) {
  return payload === undefined ? { type } : { type, payload };
};
