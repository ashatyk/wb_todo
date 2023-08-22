import { fork, take } from 'redux-saga/effects';
import { getTodoWorkerSaga } from './get-todo-worker';
import {getTodosSagaAction} from "../..";

export const TODO_GET_WATCHER_SAGA_NAME = 'TODO_GET_WATCHER_SAGA_NAME';

export function* getTodoWatcherSaga() {
  while (true) {
    yield take(getTodosSagaAction.type);
    yield fork(getTodoWorkerSaga);
  }
}
