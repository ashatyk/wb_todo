import { Reducer } from 'redux';
import {
  ETodosActions,
  ETodosLoadings,
  ITodoSlice,
} from '@/pages/todos/todo-slice/_types';

export const initialTodoSlice: ITodoSlice = {
  loadings: {
    [ETodosLoadings.GET_TODOS]: false,
    [ETodosLoadings.CREATE_TODO]: false,
    [ETodosLoadings.UPDATE_TODO]: false,
    [ETodosLoadings.DELETE_TODO]: false,
  },
  todos: [],
  newTodoInputValue: '',
  updateTodoId: null,
  deleteTodoId: null,
};

export const todoReducer: Reducer<ITodoSlice> = (
  state: ITodoSlice = initialTodoSlice,
  { type, payload },
) => {
  switch (type) {
    case ETodosActions.SET_TODOS_LOADING:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          ...payload,
        },
      };
    case ETodosActions.SET_TODOS:
      return {
        ...state,
        todos: payload,
      };
    case ETodosActions.SET_NEW_TODO_INPUT_VALUE:
      return {
        ...state,
        newTodoInputValue: payload,
      };
    case ETodosActions.SET_UPDATE_TODO_ID:
      return {
        ...state,
        updateTodoId: payload,
      };
    case ETodosActions.SET_DELETE_TODO_ID:
      return {
        ...state,
        deleteTodoId: payload,
      };
    default:
      return state;
  }
};
