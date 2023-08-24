import { Reducer } from 'redux';
import {
  setDeleteTodoIdAction,
  setNewTodoInputValueAction,
  setTodosAction,
  setTodosLoadingAction,
  setUpdateTodoIdAction,
  TodosActionsType,
} from './actions';
import { ETodosLoadings, TodosSliceType } from './types';

export const initialTodoSlice: TodosSliceType = {
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

export const todoReducer: Reducer<
  TodosSliceType,
  ReturnType<TodosActionsType[keyof TodosActionsType]>
> = (state: TodosSliceType = initialTodoSlice, { type, payload }) => {
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
