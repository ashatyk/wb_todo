import { Reducer } from 'redux';
import {
  ETodosLoadings,
  ITodoSlice,
} from '@/pages/todos/todo-slice/_types';
import {
  setDeleteTodoIdAction,
  setNewTodoInputValueAction,
  setTodosAction,
  setTodosLoadingAction,
  setUpdateTodoIdAction
} from "@/pages/todos/todo-slice/actions";

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
    case setTodosLoadingAction.type:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          ...payload,
        },
      };
    case setTodosAction.type:
      return {
        ...state,
        todos: payload,
      };
    case setNewTodoInputValueAction.type:
      return {
        ...state,
        newTodoInputValue: payload,
      };
    case setUpdateTodoIdAction.type:
      return {
        ...state,
        updateTodoId: payload,
      };
    case setDeleteTodoIdAction.type:
      return {
        ...state,
        deleteTodoId: payload,
      };
    default:
      return state;
  }
};
