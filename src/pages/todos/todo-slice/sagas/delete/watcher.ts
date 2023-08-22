import { fork, take } from 'redux-saga/effects';
import { deleteTodoWorkerSaga } from './worker';
import {deleteTodoSagaAction} from "@/pages/todos/todo-slice/actions";

export const TODO_DELETE_WATCHER_SAGA_NAME = 'TODO_DELETE_WATCHER_SAGA_NAME';

export function* deleteTodoWatcherSaga() {
  while (true) {
    const { payload }: ReturnType<typeof deleteTodoSagaAction> = yield take(
        deleteTodoSagaAction.type
    );
    yield fork(deleteTodoWorkerSaga, { id: payload });
  }
}
