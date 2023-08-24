import { fork, take } from 'redux-saga/effects';
import { updateTodoSagaAction } from '../..';
import { updateTodoWorkerSaga } from './update-todo-worker';

export const TODO_UPDATE_WATCHER_SAGA_NAME = 'TODO_UPDATE_WATCHER_SAGA_NAME';

export function* updateTodoWatcherSaga() {
  while (true) {
    const { payload }: ReturnType<typeof updateTodoSagaAction> = yield take(
      updateTodoSagaAction.type,
    );
    yield fork(updateTodoWorkerSaga, { todo: payload });
  }
}
