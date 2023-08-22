import { fork, take } from 'redux-saga/effects';
import { updateTodoWorkerSaga } from './worker';
import {updateTodoSagaAction} from "@/pages/todos/todo-slice/actions";

export const TODO_UPDATE_WATCHER_SAGA_NAME = 'TODO_UPDATE_WATCHER_SAGA_NAME';

export function* updateTodoWatcherSaga() {
  while (true) {
    const { payload }: ReturnType<typeof updateTodoSagaAction> = yield take(
        updateTodoSagaAction.type,
    );
    yield fork(updateTodoWorkerSaga, { todo: payload });
  }
}
