import { fork, take } from 'redux-saga/effects';
import { ETodosActions } from '@/pages/todos/todo-slice';
import { createTodo } from '../../actions';
import { createTodoWorkerSaga } from './worker';

export const TODO_CREATE_WATCHER_SAGA_NAME = 'TODO_CREATE_WATCHER_SAGA_NAME';

export function* createTodoWatcherSaga() {
  while (true) {
    const { payload }: ReturnType<typeof createTodo> = yield take(
      ETodosActions.CREATE_TODO,
    );
    yield fork(createTodoWorkerSaga, { title: payload });
  }
}
