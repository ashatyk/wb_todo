import { createSelector } from 'reselect';
import {
  ETodosLoadings,
  initialTodoSlice,
  TodosSliceType,
  TodoStorageSliceType,
  REDUCER_TODOS_NAME,
} from '.';

export const todoSelector = (store: TodoStorageSliceType): TodosSliceType =>
  store[REDUCER_TODOS_NAME] || initialTodoSlice;

export const todosLoadingsSelector = createSelector(
  [todoSelector],
  ({ loadings }) => loadings,
);

export const todosLoadingSelector = createSelector(
  [todosLoadingsSelector, (loadings, key: ETodosLoadings) => key],
  (loadings, key) => loadings[key],
);

export const todosSelector = createSelector(
  [todoSelector],
  ({ todos }) => todos,
);

export const newTodoInputValueSelector = createSelector(
  [todoSelector],
  ({ newTodoInputValue }) => newTodoInputValue,
);
export const isCreateTodoDisabledSelector = createSelector(
  [todoSelector],
  ({ loadings, newTodoInputValue }) =>
    loadings.CREATE_TODO || newTodoInputValue.trim().length === 0,
);

export const isUpdateTodoModalOpenSelector = createSelector(
  [todoSelector],
  ({ updateTodoId }) => Boolean(updateTodoId),
);

export const updateTodoSelector = createSelector(
  [todoSelector],
  ({ todos, updateTodoId }) => todos.find((todo) => todo.id === updateTodoId),
);

export const isDeleteTodoModalOpenSelector = createSelector(
  [todoSelector],
  ({ deleteTodoId }) => Boolean(deleteTodoId),
);

export const deleteTodoIdSelector = createSelector(
  [todoSelector],
  ({ deleteTodoId }) => deleteTodoId,
);
