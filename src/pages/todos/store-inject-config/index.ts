import {StoreInjectConfig} from '@mihanizm56/redux-core-modules';
import { MODULE_REDUCER_NAME as reducerUIName } from '@/_redux/ui-module';
import reducerUI from '@/_redux/ui-module/reducer';
import { getTodosRequest } from '@/api/requests/todos/get';
import {ETodosActions, ITodo, REDUCER_TODOS_NAME, setTodosAction, setTodosLoadingAction, todoReducer} from '@/_redux/todo-slice';
import { createTodoWatcherSaga, TODO_CREATE_WATCHER_SAGA_NAME } from '@/_redux/todo-slice/sagas/create';
import { deleteTodoWatcherSaga, TODO_DELETE_WATCHER_SAGA_NAME } from '@/_redux/todo-slice/sagas/delete';
import { getTodoWatcherSaga, TODO_GET_WATCHER_SAGA_NAME } from '@/_redux/todo-slice/sagas/get';
import {TODO_UPDATE_WATCHER_SAGA_NAME, updateTodoWatcherSaga } from '@/_redux/todo-slice/sagas/update';

export const storeInjectConfig: StoreInjectConfig = {
  reducersToInject: [
    {
      name: reducerUIName,
      reducer: reducerUI,
    },
    {
      name: REDUCER_TODOS_NAME,
      reducer: todoReducer,
    },
  ],
  sagasToInject: [
    {
      name: TODO_CREATE_WATCHER_SAGA_NAME,
      saga: createTodoWatcherSaga,
    },
    {
      name: TODO_DELETE_WATCHER_SAGA_NAME,
      saga: deleteTodoWatcherSaga,
    },
    {
      name: TODO_GET_WATCHER_SAGA_NAME,
      saga: getTodoWatcherSaga,
    },
    {
      name: TODO_UPDATE_WATCHER_SAGA_NAME,
      saga: updateTodoWatcherSaga,
    },
  ],
  initialLoadManagerConfig: {
    requestConfigList: [{
      request: getTodosRequest,
      actionSuccess: setTodosAction,
      responseDataFormatter: (response: { todos: ITodo[] }) => response.todos,
      loadingStartAction: () => setTodosLoadingAction({ [ETodosActions.GET_TODOS]: true }),
      loadingStopAction: () => setTodosLoadingAction({ [ETodosActions.GET_TODOS]: true }),
    }],
  },
};
