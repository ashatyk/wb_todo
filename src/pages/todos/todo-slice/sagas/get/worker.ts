import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import {
  ETodosLoadings,
  ITodo,
  setDeleteTodoId,
  setTodos,
  setTodosLoading,
  setUpdateTodoId,
} from '@/pages/todos/todo-slice';
import { getTodosRequest } from '@/api/requests/todos/get';

export function* getTodoWorkerSaga() {
  try {
    yield put(
      setTodosLoading({
        [ETodosLoadings.GET_TODOS]: true,
      }),
    );

    const {
      error: getTasksError,
      data: { todos },
      errorText: getTasksErrorText,
    }: IResponse<{ todos: ITodo[] }> = yield call(getTodosRequest);

    if (getTasksError) throw new Error(getTasksErrorText);

    yield put(setTodos(todos));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(
      setTodosLoading({
        [ETodosLoadings.GET_TODOS]: false,
        [ETodosLoadings.CREATE_TODO]: false,
        [ETodosLoadings.DELETE_TODO]: false,
        [ETodosLoadings.UPDATE_TODO]: false,
      }),
    );
    yield put(setUpdateTodoId(null));
    yield put(setDeleteTodoId(null));
  }
}
