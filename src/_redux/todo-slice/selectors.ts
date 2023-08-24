import { createSelector } from 'reselect';
import {
  ETodosLoadings,
  initialTodoSlice,
  ITodosSlice,
  ITodoStorageSlice,
  REDUCER_TODOS_NAME,
} from '.';

export const selectTodoSlice = (store: ITodoStorageSlice): ITodosSlice =>
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
export const selectCreateDisabled = createSelector(
  [selectTodoSlice],
  ({ loadings, newTodoInputValue }) =>
    loadings.CREATE_TODO || newTodoInputValue.trim().length === 0,
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
  ({ deleteTodoId }) => deleteTodoId,
);
