import { IRequestParams } from '@mihanizm56/fetch-api';
import { getTodosEndpoint } from '@/api/endpoints';
import { ITodo } from '@/pages/todos/todo-slice';

export interface IDeleteTaskParams {
  id: ITodo['id'];
}

export const makeRequestConfig = ({
  id,
}: IDeleteTaskParams): IRequestParams => ({
  endpoint: getTodosEndpoint(),
  body: {
    id,
  },
});
