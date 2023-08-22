import { IRequestParams } from '@mihanizm56/fetch-api';
import { getTodosEndpoint } from '@/api/endpoints';
import { ITodo } from '@/_redux/todo-slice';
import { responseSchema } from './response-schema';

export interface IUpdateTodoParams {
  todo: ITodo;
}

export const makeRequestConfig = ({
  todo,
}: IUpdateTodoParams): IRequestParams => ({
  endpoint: getTodosEndpoint(),
  responseSchema,
  body: {
    todo,
  },
});
