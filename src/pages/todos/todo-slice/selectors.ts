import { createSelector } from 'reselect';
import {
  ETodosLoadings,
  ITodoSlice,
  ITodoStorageSlice,
} from '@/pages/todos/todo-slice/_types';
import { REDUCER_TODOS_NAME } from '@/pages/todos/todo-slice/_constants';
import { initialTodoSlice } from '@/pages/todos/todo-slice/reducer';

export const selectTodoSlice = (store: ITodoStorageSlice): ITodoSlice =>
  store[REDUCER_TODOS_NAME] || initialTodoSlice;

export const selectTodosLoadings = createSelector(
  [selectTodoSlice],
  ({ loadings }) => loadings,
);

export const selectTodosLoading = createSelector(
  [selectTodosLoadings, (loadings, key: ETodosLoadings) => key],
  (loadings, key) => loadings[key],
);

export const selectTodos = createSelector(
  [selectTodoSlice],
  ({ todos }) => todos,
);

export const selectNewTodoInputValue = createSelector(
  [selectTodoSlice],
  ({ newTodoInputValue }) => newTodoInputValue,
);

export const selectUpdateTodoModalOpen = createSelector(
  [selectTodoSlice],
  ({ updateTodoId }) => Boolean(updateTodoId),
);

export const selectUpdateTodo = createSelector(
  [selectTodoSlice],
  ({ todos, updateTodoId }) => todos.find((todo) => todo.id === updateTodoId),
);

export const selectDeleteTodoModalOpen = createSelector(
  [selectTodoSlice],
  ({ deleteTodoId }) => Boolean(deleteTodoId),
);

export const selectDeleteTodoId = createSelector(
  [selectTodoSlice],
  ({ deleteTodoId, loadings }) => deleteTodoId,
);
