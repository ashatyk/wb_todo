import {
  InitLoadManagerRequestOptionsType,
  StoreInjectConfig,
} from '@mihanizm56/redux-core-modules';
import { MODULE_REDUCER_NAME as reducerUIName } from '@/_redux/ui-module';
import reducerUI from '@/_redux/ui-module/reducer';
import { getTodosRequest } from '@/api/requests/todos/get';
import {ETodosActions, ITodo, REDUCER_TODOS_NAME, setTodosAction, setTodosLoadingAction, todoReducer} from '@/_redux/todo-slice';
import { createTodoWatcherSaga, TODO_CREATE_WATCHER_SAGA_NAME } from '@/_redux/todo-slice/sagas/create';
import { deleteTodoWatcherSaga, TODO_DELETE_WATCHER_SAGA_NAME } from '@/_redux/todo-slice/sagas/delete';
import { getTodoWatcherSaga, TODO_GET_WATCHER_SAGA_NAME } from '@/_redux/todo-slice/sagas/get';
import {TODO_UPDATE_WATCHER_SAGA_NAME, updateTodoWatcherSaga } from '@/_redux/todo-slice/sagas/update';

const reducers = [
  {
    name: reducerUIName,
    reducer: reducerUI,
  },
  {
    name: REDUCER_TODOS_NAME,
    reducer: todoReducer,
  },
];

const sagas = [
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
];

export const requestConfig = () => {
  const config: InitLoadManagerRequestOptionsType = {
    request: getTodosRequest,
    actionSuccess: setTodosAction,
    responseDataFormatter: (response: { todos: ITodo[] }) => response.todos,
  };

  return {
    ...config,
    loadingStartAction: () =>
      setTodosLoadingAction({ [ETodosActions.GET_TODOS]: true }),
    loadingStopAction: () =>
      setTodosLoadingAction({ [ETodosActions.GET_TODOS]: true }),
  };
};

export const storeInjectConfig: StoreInjectConfig = {
  reducersToInject: reducers,
  sagasToInject: sagas,
  initialLoadManagerConfig: {
    requestConfigList: [requestConfig()],
  },
};
