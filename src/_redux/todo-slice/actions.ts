import { IReduxAction } from '@mihanizm56/redux-core-modules';
import { TodoType, TodosSliceType } from './types';

const SET_TODOS = 'SET_TODOS';

export const setTodosAction: IReduxAction<
  TodosSliceType['todos'],
  typeof SET_TODOS
> = (payload) => ({
  type: SET_TODOS,
  payload,
});
setTodosAction.type = SET_TODOS;

const CREATE_TODO = 'CREATE_TODO';
export const createTodoSagaAction: IReduxAction<
  TodoType['title'],
  typeof CREATE_TODO
> = (payload) => ({
  type: CREATE_TODO,
  payload,
});
createTodoSagaAction.type = CREATE_TODO;

const UPDATE_TODO = 'UPDATE_TODO';

export const updateTodoSagaAction: IReduxAction<TodoType, typeof UPDATE_TODO> =
  (payload) => ({
    type: UPDATE_TODO,
    payload,
  });
updateTodoSagaAction.type = UPDATE_TODO;

const DELETE_TODO = 'DELETE_TODO';

export const deleteTodoSagaAction: IReduxAction<
  TodoType['id'],
  typeof DELETE_TODO
> = (payload) => ({
  type: DELETE_TODO,
  payload,
});
deleteTodoSagaAction.type = DELETE_TODO;

const SET_UPDATE_TODO_ID = 'SET_UPDATE_TODO_ID';

export const setUpdateTodoIdAction: IReduxAction<
  TodoType['id'],
  typeof SET_UPDATE_TODO_ID
> = (payload) => ({
  type: SET_UPDATE_TODO_ID,
  payload,
});
setUpdateTodoIdAction.type = SET_UPDATE_TODO_ID;

const SET_DELETE_TODO_ID = 'SET_DELETE_TODO_ID';

export const setDeleteTodoIdAction: IReduxAction<
  TodoType['id'],
  typeof SET_DELETE_TODO_ID
> = (payload) => ({
  type: SET_DELETE_TODO_ID,
  payload,
});
setDeleteTodoIdAction.type = SET_DELETE_TODO_ID;

const SET_NEW_TODO_INPUT_VALUE = 'SET_NEW_TODO_INPUT_VALUE';

export const setNewTodoInputValueAction: IReduxAction<
  TodosSliceType['newTodoInputValue'],
  typeof SET_NEW_TODO_INPUT_VALUE
> = (payload) => ({
  type: SET_NEW_TODO_INPUT_VALUE,
  payload,
});
setNewTodoInputValueAction.type = SET_NEW_TODO_INPUT_VALUE;

const SET_TODOS_LOADING = 'SET_TODOS_LOADING';

export const setTodosLoadingAction: IReduxAction<
  Partial<TodosSliceType['loadings']>,
  typeof SET_TODOS_LOADING
> = (payload) => ({
  type: SET_TODOS_LOADING,
  payload,
});
setTodosLoadingAction.type = SET_TODOS_LOADING;

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

export type TodosActionsType = Partial<typeof todosActions>;
