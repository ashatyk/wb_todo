import { REDUCER_TODOS_NAME } from './constants';

export const enum ETodosLoadings {
  GET_TODOS = 'GET_TODOS',
  CREATE_TODO = 'CREATE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
}
export type TodoType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
};
export type TodosSliceType = {
  loadings: Record<ETodosLoadings, boolean>;
  todos: Array<TodoType>;
  newTodoInputValue: string;
  updateTodoId: string | null;
  deleteTodoId: string | null;
};
export type TodoStorageSliceType = {
  [REDUCER_TODOS_NAME]: TodosSliceType;
};
