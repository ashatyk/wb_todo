import { Action, BaseAction } from '@mihanizm56/redux-core-modules';
import {
  ETodosActions,
  ITodo,
  ITodoSlice,
} from '@/pages/todos/todo-slice/_types';

export const getTodos: BaseAction = () => ({
  type: ETodosActions.GET_TODOS,
});

export const setTodos: Action<ITodoSlice['todos']> = (payload) => ({
  type: ETodosActions.SET_TODOS,
  payload,
});
export const createTodo: Action<ITodo['title']> = (payload) => ({
  type: ETodosActions.CREATE_TODO,
  payload,
});
export const updateTodo: Action<ITodo> = (payload) => ({
  type: ETodosActions.UPDATE_TODO,
  payload,
});
export const deleteTodo: Action<ITodo['id']> = (payload) => ({
  type: ETodosActions.DELETE_TODO,
  payload,
});

export const setUpdateTodoId: Action<ITodo['id']> = (payload) => ({
  type: ETodosActions.SET_UPDATE_TODO_ID,
  payload,
});

export const setDeleteTodoId: Action<ITodo['id']> = (payload) => ({
  type: ETodosActions.SET_DELETE_TODO_ID,
  payload,
});

export const setNewTodoInputValue: Action<ITodoSlice['newTodoInputValue']> = (
  payload,
) => ({
  type: ETodosActions.SET_NEW_TODO_INPUT_VALUE,
  payload,
});

export const setTodosLoading: Action<Partial<ITodoSlice['loadings']>> = (
  payload,
) => ({
  type: ETodosActions.SET_TODOS_LOADING,
  payload,
});

export const TodosActions = {
  getTodos,
  setTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  setTodosLoading,
  setNewTodoInputValue,
  setUpdateTodoId,
  setDeleteTodoId,
};

export type TTodosActionProps = Partial<typeof TodosActions>;
