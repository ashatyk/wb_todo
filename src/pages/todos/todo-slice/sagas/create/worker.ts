import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import {
  ETodosLoadings,
  getTodos,
  ITodo,
  setNewTodoInputValue,
  setTodosLoading,
} from '@/pages/todos/todo-slice';
import { createTodoRequest } from '@/api/requests/todos/create';

interface IParams {
  title: ITodo['title'];
}

export function* createTodoWorkerSaga({ title }: IParams) {
  try {
    yield put(
      setTodosLoading({
        [ETodosLoadings.CREATE_TODO]: true,
      }),
    );

    const { error, errorText }: IResponse<never> = yield call(
      createTodoRequest,
      {
        title,
      },
    );

    if (error) {
      throw new Error(errorText);
    }

    yield put(setNewTodoInputValue(''));

    yield put(getTodos());
  } catch (error) {
    console.error(error);
  }
}
