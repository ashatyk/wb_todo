import { IRequestParams } from '@mihanizm56/fetch-api';
import { getTodosEndpoint } from '@/api/endpoints';
import { TodoType } from '@/_redux/todo-slice';
import { responseSchema } from './response-schema';

export interface IDeleteTaskParams {
  id: TodoType['id'];
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
