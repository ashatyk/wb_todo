import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import { initLoadManagerActionSaga } from '@mihanizm56/redux-core-modules';
import { createTodoRequest } from '@/api/requests/todos/create';
import { getTodosConfig } from '@/store-inject-configs/get-todos';
import {
  setNewTodoInputValueAction,
  setTodosLoadingAction,
  ETodosLoadings,
  TodoType,
} from '../..';

type ParamsType = {
  title: TodoType['title'];
};

export function* createTodoWorkerSaga({ title }: ParamsType) {
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
        requestConfigList: [getTodosConfig],
      }),
    );
  } catch (error) {
    console.error(error);
  }
}
