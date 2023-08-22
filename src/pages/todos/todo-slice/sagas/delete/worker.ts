import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import { deleteTodoRequest } from '@/api/requests/todos/delete';
import { setTodosLoading } from '@/pages/todos/todo-slice';
import { ETodosLoadings, ITodo } from '../../_types';
import {initLoadManagerActionSaga} from "@mihanizm56/redux-core-modules";
import {initLoadManagerRequestConfig} from "@/pages/todos/store-inject-config";

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

    yield put(
        initLoadManagerActionSaga({
          requestConfigList: [initLoadManagerRequestConfig()],
        }),
    );

  } catch (error) {
    console.error(error);
  }
}
