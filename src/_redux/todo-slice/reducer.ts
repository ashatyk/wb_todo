import { Reducer } from 'redux';
import {
  ETodosLoadings,
  ITodosSlice,
  setDeleteTodoIdAction,
  setNewTodoInputValueAction,
  setTodosAction,
  setTodosLoadingAction,
  setUpdateTodoIdAction,
  TTodosActions,
} from '.';

export const initialTodoSlice: ITodosSlice = {
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

export const todoReducer: Reducer<ITodosSlice,ReturnType<TTodosActions[keyof TTodosActions]>> = (
  state: ITodosSlice = initialTodoSlice,
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
