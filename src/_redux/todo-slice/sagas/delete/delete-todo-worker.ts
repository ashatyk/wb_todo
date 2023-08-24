import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import { initLoadManagerActionSaga } from '@mihanizm56/redux-core-modules';
import { deleteTodoRequest } from '@/api/requests/todos/delete';
import { getTodosConfig } from '@/pages/todos/store-inject-config';
import { setTodosLoadingAction, ETodosLoadings, TodoType } from '../..';

type ParamsType = {
  id: TodoType['id'];
};

export function* deleteTodoWorkerSaga({ id }: ParamsType) {
  try {
    yield put(
      setTodosLoadingAction({
        [ETodosLoadings.DELETE_TODO]: true,
      }),
    );

    const { error, errorText }: IResponse<never> = yield call(
      deleteTodoRequest,
      {
        id,
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
