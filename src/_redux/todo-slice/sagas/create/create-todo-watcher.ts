import { fork, take } from 'redux-saga/effects';
import { createTodoSagaAction } from '../../actions';
import { createTodoWorkerSaga } from './create-todo-worker';

export const TODO_CREATE_WATCHER_SAGA_NAME = 'TODO_CREATE_WATCHER_SAGA_NAME';

export function* createTodoWatcherSaga() {
  while (true) {
    const { payload }: ReturnType<typeof createTodoSagaAction> = yield take(
      createTodoSagaAction.type,
    );
    yield fork(createTodoWorkerSaga, { title: payload });
  }
}
