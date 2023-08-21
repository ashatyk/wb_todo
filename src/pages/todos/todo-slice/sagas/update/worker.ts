import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import {
  ETodosLoadings,
  getTodos,
  ITodo,
  setTodosLoading,
} from '@/pages/todos/todo-slice';
import { updateTodoRequest } from '@/api/requests/todos/update';

type IParams = {
  todo: ITodo;
};

export function* updateTodoWorkerSaga({ todo }: IParams) {
  try {
    yield put(
      setTodosLoading({
        [ETodosLoadings.UPDATE_TODO]: true,
      }),
    );

    const { error, errorText }: IResponse<never> = yield call(
      updateTodoRequest,
      {
        todo,
      },
    );

    if (error) throw new Error(errorText);
    yield put(getTodos());
  } catch (error) {
    console.error(error);
  }
}
