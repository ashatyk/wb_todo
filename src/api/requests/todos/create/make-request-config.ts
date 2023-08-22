import { IRequestParams } from '@mihanizm56/fetch-api';
import { getTodosEndpoint } from '@/api/endpoints';
import { responseSchema } from './response-schema';
import { ITodo } from '@/_redux/todo-slice';

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
