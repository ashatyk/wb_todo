import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import { initLoadManagerActionSaga } from '@mihanizm56/redux-core-modules';
import { updateTodoRequest } from '@/api/requests/todos/update';
import { getTodosConfig } from '@/pages/todos/store-inject-config';
import { setTodosLoadingAction, ETodosLoadings, TodoType } from '../..';

type ParamsType = {
  todo: TodoType;
};

export function* updateTodoWorkerSaga({ todo }: ParamsType) {
  try {
    yield put(
      setTodosLoadingAction({
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
    yield put(
      initLoadManagerActionSaga({
        requestConfigList: [getTodosConfig],
      }),
    );
  } catch (error) {
    console.error(error);
  }
}
