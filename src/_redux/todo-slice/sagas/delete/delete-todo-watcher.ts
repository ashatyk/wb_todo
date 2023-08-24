import { fork, take } from 'redux-saga/effects';
import { deleteTodoSagaAction } from '../..';
import { deleteTodoWorkerSaga } from './delete-todo-worker';

export const TODO_DELETE_WATCHER_SAGA_NAME = 'TODO_DELETE_WATCHER_SAGA_NAME';

export function* deleteTodoWatcherSaga() {
  while (true) {
    const { payload }: ReturnType<typeof deleteTodoSagaAction> = yield take(
      deleteTodoSagaAction.type,
    );
    yield fork(deleteTodoWorkerSaga, { id: payload });
  }
}
