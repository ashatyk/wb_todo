import { IRequestParams } from '@mihanizm56/fetch-api';
import { getTodosEndpoint } from '@/api/endpoints';
import { ITodo } from '@/pages/todos/todo-slice';

export interface IUpdateTodoParams {
  todo: ITodo;
}

export const makeRequestConfig = ({
  todo,
}: IUpdateTodoParams): IRequestParams => ({
  endpoint: getTodosEndpoint(),
  body: {
    todo,
  },
});
