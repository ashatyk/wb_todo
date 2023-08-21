import { IRequestParams } from '@mihanizm56/fetch-api';
import { ITodo } from '@/pages/todos/todo-slice';
import { getTodosEndpoint } from '@/api/endpoints';
import { responseSchema } from './response-schema';

export interface ICreateTaskParams {
  title: ITodo['title'];
}

export const makeRequestConfig = ({
  title,
}: ICreateTaskParams): IRequestParams => ({
  endpoint: getTodosEndpoint(),
  responseSchema,
  body: {
    title,
  },
});
