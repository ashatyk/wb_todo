import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import { initLoadManagerActionSaga } from '@mihanizm56/redux-core-modules';
import { createTodoRequest } from '@/api/requests/todos/create';
import { initLoadManagerRequestConfig } from '@/pages/todos/store-inject-config';
import {
  setNewTodoInputValueAction,
  setTodosLoadingAction,
  ETodosLoadings,
  ITodo,
} from '../..';

interface IParams {
  title: ITodo['title'];
}

export function* createTodoWorkerSaga({ title }: IParams) {
  try {
    yield put(
      setTodosLoadingAction({
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

    yield put(setNewTodoInputValueAction(''));
    yield put(
      initLoadManagerActionSaga({
        requestConfigList: [initLoadManagerRequestConfig],
      }),
    );
  } catch (error) {
    console.error(error);
  }
}
