import { call, put } from 'redux-saga/effects';
import { IResponse } from '@mihanizm56/fetch-api';
import {
  setTodosLoadingAction,
  ETodosLoadings,
  ITodo
} from "../..";
import { updateTodoRequest } from '@/api/requests/todos/update';
import {initLoadManagerActionSaga} from "@mihanizm56/redux-core-modules";
import {initLoadManagerRequestConfig} from "@/pages/todos/store-inject-config";

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
    yield put(
        initLoadManagerActionSaga({
          requestConfigList: [initLoadManagerRequestConfig],
        }),
    );
  } catch (error) {
    console.error(error);
  }
}
