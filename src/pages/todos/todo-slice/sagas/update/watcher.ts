import { fork, take } from 'redux-saga/effects';
import { ETodosActions, updateTodo } from '@/pages/todos/todo-slice';
import { updateTodoWorkerSaga } from './worker';

export const TODO_UPDATE_WATCHER_SAGA_NAME = 'TODO_UPDATE_WATCHER_SAGA_NAME';

export function* updateTodoWatcherSaga() {
  while (true) {
    const { payload }: ReturnType<typeof updateTodo> = yield take(
      ETodosActions.UPDATE_TODO,
    );
    yield fork(updateTodoWorkerSaga, { todo: payload });
  }
}
