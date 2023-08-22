import { fork, take } from 'redux-saga/effects';
import { getTodoWorkerSaga } from './worker';
import {getTodosSagaAction} from "@/pages/todos/todo-slice/actions";

export const TODO_GET_WATCHER_SAGA_NAME = 'TODO_GET_WATCHER_SAGA_NAME';

export function* getTodoWatcherSaga() {
  while (true) {
    yield take(getTodosSagaAction.type);
    yield fork(getTodoWorkerSaga);
  }
}
