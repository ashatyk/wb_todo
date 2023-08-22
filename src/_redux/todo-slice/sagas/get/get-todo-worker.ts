import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import {
  ETodosLoadings,
  ITodo,
  setDeleteTodoIdAction,
  setTodosAction,
  setTodosLoadingAction,
  setUpdateTodoIdAction
} from "../..";
import { getTodosRequest } from '@/api/requests/todos/get';

export function* getTodoWorkerSaga() {
  try {
    yield put(
      setTodosLoadingAction({
        [ETodosLoadings.GET_TODOS]: true,
      }),
    );

    const {
      error: getTasksError,
      data: { todos },
      errorText: getTasksErrorText,
    }: IResponse<{ todos: ITodo[] }> = yield call(getTodosRequest);

    if (getTasksError) throw new Error(getTasksErrorText);

    yield put(setTodosAction(todos));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(
      setTodosLoadingAction({
        [ETodosLoadings.GET_TODOS]: false,
        [ETodosLoadings.CREATE_TODO]: false,
        [ETodosLoadings.DELETE_TODO]: false,
        [ETodosLoadings.UPDATE_TODO]: false,
      }),
    );
    yield put(setUpdateTodoIdAction(null));
    yield put(setDeleteTodoIdAction(null));
  }
}
