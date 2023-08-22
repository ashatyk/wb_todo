import { IRequestParams } from '@mihanizm56/fetch-api';
import { getTodosEndpoint } from '@/api/endpoints';
import { ITodo } from '@/_redux/todo-slice';

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
