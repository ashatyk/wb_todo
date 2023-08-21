import {
  InitLoadManagerRequestOptionsType,
  StoreInjectConfig,
} from '@mihanizm56/redux-core-modules';
import { MODULE_REDUCER_NAME as reducerUIName } from '@/_redux/ui-module';
import reducerUI from '@/_redux/ui-module/reducer';
import {
  ETodosActions,
  ITodo,
  REDUCER_TODOS_NAME,
  setTodos,
  setTodosLoading,
  todoReducer,
} from '@/pages/todos/todo-slice';
import {
  createTodoWatcherSaga,
  deleteTodoWatcherSaga,
  TODO_CREATE_WATCHER_SAGA_NAME,
  TODO_DELETE_WATCHER_SAGA_NAME,
  TODO_UPDATE_WATCHER_SAGA_NAME,
  updateTodoWatcherSaga,
} from '@/pages/todos/todo-slice/sagas';
import {
  getTodoWatcherSaga,
  TODO_GET_WATCHER_SAGA_NAME,
} from '@/pages/todos/todo-slice/sagas/get';
import { getTodosRequest } from '@/api/requests/todos/get';

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
    saga: createTodoWatcherSaga,
    name: TODO_CREATE_WATCHER_SAGA_NAME,
  },
  {
    saga: deleteTodoWatcherSaga,
    name: TODO_DELETE_WATCHER_SAGA_NAME,
  },
  {
    saga: getTodoWatcherSaga,
    name: TODO_GET_WATCHER_SAGA_NAME,
  },
  {
    saga: updateTodoWatcherSaga,
    name: TODO_UPDATE_WATCHER_SAGA_NAME,
  },
];

export const requestConfig = () => {
  const config: InitLoadManagerRequestOptionsType = {
    request: getTodosRequest,
    actionSuccess: setTodos,
    responseDataFormatter: (response: { todos: ITodo[] }) => response.todos,
  };

  return {
    ...config,
    loadingStartAction: () =>
      setTodosLoading({ [ETodosActions.GET_TODOS]: true }),
    loadingStopAction: () =>
      setTodosLoading({ [ETodosActions.GET_TODOS]: true }),
  };
};

export const storeInjectConfig: StoreInjectConfig = {
  reducersToInject: reducers,
  sagasToInject: sagas,
  initialLoadManagerConfig: {
    requestConfigList: [requestConfig()],
  },
};
