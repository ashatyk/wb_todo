import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import {
  setTodosLoadingAction,
  ETodosLoadings,
  ITodo,
  getTodosSagaAction
} from '../..';
import { deleteTodoRequest } from '@/api/requests/todos/delete';

interface IParams {
  id: ITodo['id'];
}

export function* deleteTodoWorkerSaga({ id }: IParams) {
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

    yield put(getTodosSagaAction());
  } catch (error) {
    console.error(error);
  }
}
