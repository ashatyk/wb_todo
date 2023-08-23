import {IReduxAction} from '@mihanizm56/redux-core-modules';
import {
  ETodosActions,
  ITodo,
  ITodosSlice,
} from '@/_redux/todo-slice/types';

export const setTodosAction: IReduxAction<ITodosSlice['todos'],ETodosActions.SET_TODOS> = (payload) => ({
  type: ETodosActions.SET_TODOS,
  payload,
});
setTodosAction.type = ETodosActions.SET_TODOS

export const createTodoSagaAction: IReduxAction<ITodo['title'],ETodosActions.CREATE_TODO> = (payload) => ({
  type: ETodosActions.CREATE_TODO,
  payload,
});
createTodoSagaAction.type = ETodosActions.CREATE_TODO

export const updateTodoSagaAction: IReduxAction<ITodo,ETodosActions.UPDATE_TODO> = (payload) => ({
  type: ETodosActions.UPDATE_TODO,
  payload,
});
updateTodoSagaAction.type = ETodosActions.UPDATE_TODO

export const deleteTodoSagaAction: IReduxAction<ITodo['id'],ETodosActions.DELETE_TODO> = (payload) => ({
  type: ETodosActions.DELETE_TODO,
  payload,
});
deleteTodoSagaAction.type = ETodosActions.DELETE_TODO

export const setUpdateTodoIdAction: IReduxAction<ITodo['id'],ETodosActions.SET_UPDATE_TODO_ID> = (payload) => ({
  type: ETodosActions.SET_UPDATE_TODO_ID,
  payload,
});
setUpdateTodoIdAction.type = ETodosActions.SET_UPDATE_TODO_ID

export const setDeleteTodoIdAction: IReduxAction<ITodo['id'],ETodosActions.SET_DELETE_TODO_ID> = (payload) => ({
  type: ETodosActions.SET_DELETE_TODO_ID,
  payload,
});
setDeleteTodoIdAction.type = ETodosActions.SET_DELETE_TODO_ID

export const setNewTodoInputValueAction: IReduxAction<ITodosSlice['newTodoInputValue'],ETodosActions.SET_NEW_TODO_INPUT_VALUE> = (
  payload,
) => ({
  type: ETodosActions.SET_NEW_TODO_INPUT_VALUE,
  payload,
});
setNewTodoInputValueAction.type = ETodosActions.SET_NEW_TODO_INPUT_VALUE
export const setTodosLoadingAction: IReduxAction<Partial<ITodosSlice['loadings']>,ETodosActions.SET_TODOS_LOADING> = (
  payload,
) => ({
  type: ETodosActions.SET_TODOS_LOADING,
  payload,
});
setTodosLoadingAction.type = ETodosActions.SET_TODOS_LOADING


const todosActions = {
  setTodosAction,
  createTodoSagaAction,
  updateTodoSagaAction,
  deleteTodoSagaAction,
  setTodosLoadingAction,
  setUpdateTodoIdAction,
  setDeleteTodoIdAction,
  setNewTodoInputValueAction,
};

export type TTodosActions = Partial<typeof todosActions>;
