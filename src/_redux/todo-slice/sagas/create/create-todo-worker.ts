import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import {
  setNewTodoInputValueAction,
  setTodosLoadingAction,
  ETodosLoadings,
  ITodo,
  getTodosSagaAction
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

    yield put(getTodosSagaAction());
  } catch (error) {
    console.error(error);
  }
}
