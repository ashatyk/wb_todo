import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import { deleteTodoRequest } from '@/api/requests/todos/delete';
import { getTodos, setTodosLoading } from '@/pages/todos/todo-slice';
import { ETodosLoadings, ITodo } from '../../_types';

interface IParams {
  id: ITodo['id'];
}

export function* deleteTodoWorkerSaga({ id }: IParams) {
  try {
    yield put(
      setTodosLoading({
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

    yield put(getTodos());
  } catch (error) {
    console.error(error);
  }
}
