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
import { initLoadManagerActionSaga } from '@mihanizm56/redux-core-modules';
import {initLoadManagerRequestConfig} from "@/pages/todos/store-inject-config";

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

    yield put(
        initLoadManagerActionSaga({
          requestConfigList: [initLoadManagerRequestConfig()],
        }),
    );

    yield put(getTodos());
  } catch (error) {
    console.error(error);
  }
}
