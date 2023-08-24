import { batchActions } from 'redux-batched-actions';
import { getTodosRequest } from '@/api/requests/todos/get';
import {
  ETodosLoadings,
  setDeleteTodoIdAction,
  setTodosAction,
  setTodosLoadingAction,
  setUpdateTodoIdAction,
  TodoType,
} from '@/_redux/todo-slice';

export const getTodosConfig = {
  request: getTodosRequest,
  actionSuccess: setTodosAction,
  responseDataFormatter: (response: { todos: TodoType[] }) => response.todos,
  loadingStartAction: () =>
    setTodosLoadingAction({ [ETodosLoadings.GET_TODOS]: true }),
  loadingStopAction: () =>
    batchActions([
      setTodosLoadingAction({
        [ETodosLoadings.GET_TODOS]: false,
        [ETodosLoadings.CREATE_TODO]: false,
        [ETodosLoadings.DELETE_TODO]: false,
        [ETodosLoadings.UPDATE_TODO]: false,
      }),
      setUpdateTodoIdAction(null),
      setDeleteTodoIdAction(null),
    ]),
};
