import { IRequestParams } from '@mihanizm56/fetch-api';
import { getTodosEndpoint } from '@/api/endpoints';
import { ITodo } from '@/_redux/todo-slice';
import { responseSchema } from './response-schema';

export interface IDeleteTaskParams {
  id: ITodo['id'];
}

export const makeRequestConfig = ({
  id,
}: IDeleteTaskParams): IRequestParams => ({
  endpoint: getTodosEndpoint(),
  responseSchema,
  body: {
    id,
  },
});
