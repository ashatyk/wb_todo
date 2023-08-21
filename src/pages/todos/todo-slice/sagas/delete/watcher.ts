import { fork, take } from 'redux-saga/effects';
import { deleteTodo, ETodosActions } from '@/pages/todos/todo-slice';
import { deleteTodoWorkerSaga } from './worker';

export const TODO_DELETE_WATCHER_SAGA_NAME = 'TODO_DELETE_WATCHER_SAGA_NAME';

export function* deleteTodoWatcherSaga() {
  while (true) {
    const { payload }: ReturnType<typeof deleteTodo> = yield take(
      ETodosActions.DELETE_TODO,
    );
    yield fork(deleteTodoWorkerSaga, { id: payload });
  }
}
