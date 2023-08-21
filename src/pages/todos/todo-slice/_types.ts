import { REDUCER_TODOS_NAME } from '@/pages/todos/todo-slice/_constants';

export enum ETodosActions {
  GET_TODOS = 'GET_TODOS',
  SET_TODOS = 'SET_TODOS',
  CREATE_TODO = 'CREATE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  SET_TODOS_LOADING = 'SET_TODOS_LOADING',
  SET_UPDATE_TODO_ID = 'SET_UPDATE_TODO_ID',
  SET_DELETE_TODO_ID = 'SET_DELETE_TODO_ID',
  SET_NEW_TODO_INPUT_VALUE = 'SET_NEW_TODO_INPUT_VALUE',
}
export const enum ETodosLoadings {
  GET_TODOS = 'GET_TODOS',
  CREATE_TODO = 'CREATE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
}
export interface ITodo {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
}
export interface ITodoSlice {
  loadings: Record<ETodosLoadings, boolean>;
  todos: Array<ITodo>;
  newTodoInputValue: string;
  updateTodoId: string | null;
  deleteTodoId: string | null;
}

export interface ITodoStorageSlice {
  [REDUCER_TODOS_NAME]: ITodoSlice;
}
