import {
  InitLoadManagerRequestOptionsType,
  StoreInjectConfig,
} from '@mihanizm56/redux-core-modules';
import { MODULE_REDUCER_NAME as reducerUIName } from '@/_redux/ui-module';
import reducerUI from '@/_redux/ui-module/reducer';
import {
  ETodosActions, ETodosLoadings, getTodos,
  ITodo,
  REDUCER_TODOS_NAME, setDeleteTodoId,
  setTodos,
  setTodosLoading, setUpdateTodoId,
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
import { getTodosRequest } from '@/api/requests/todos/get';
import {batchActions} from "redux-batched-actions";

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
    saga: updateTodoWatcherSaga,
    name: TODO_UPDATE_WATCHER_SAGA_NAME,
  },
];

export const initLoadManagerRequestConfig = () => {
  const config: InitLoadManagerRequestOptionsType = {
    request: getTodosRequest,
    resetAction: getTodos,
    actionSuccess: setTodos,
    responseDataFormatter: (response: { todos: ITodo[] }) => response.todos,
  };

  return {
    ...config,
    loadingStartAction: () =>
      setTodosLoading({ [ETodosActions.GET_TODOS]: true }),
    loadingStopAction: () => batchActions([
      setTodosLoading({
        [ETodosLoadings.GET_TODOS]: false,
        [ETodosLoadings.CREATE_TODO]: false,
        [ETodosLoadings.DELETE_TODO]: false,
        [ETodosLoadings.UPDATE_TODO]: false,
      }),
      setUpdateTodoId(null),
      setDeleteTodoId(null)
    ])
  };
};

export const storeInjectConfig: StoreInjectConfig = {
  reducersToInject: reducers,
  sagasToInject: sagas,
  initialLoadManagerConfig: {
    requestConfigList: [initLoadManagerRequestConfig()],
  },
};
