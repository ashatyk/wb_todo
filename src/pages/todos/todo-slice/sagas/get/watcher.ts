import { fork, take } from 'redux-saga/effects';
import { ETodosActions } from '@/pages/todos/todo-slice';
import { getTodoWorkerSaga } from './worker';

export const TODO_GET_WATCHER_SAGA_NAME = 'TODO_GET_WATCHER_SAGA_NAME';

export function* getTodoWatcherSaga() {
  while (true) {
    yield take(ETodosActions.GET_TODOS);
    yield fork(getTodoWorkerSaga);
  }
}
