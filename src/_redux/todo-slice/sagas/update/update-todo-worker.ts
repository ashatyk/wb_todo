import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import {
  getTodosSagaAction,
  setTodosLoadingAction,
  ETodosLoadings,
  ITodo
} from "../..";

interface IParams {
  todo: ITodo;
}

export function* updateTodoWorkerSaga({ todo }: IParams) {
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
    yield put(getTodosSagaAction());
  } catch (error) {
    console.error(error);
  }
}