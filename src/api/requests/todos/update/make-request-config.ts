import { IRequestParams } from '@mihanizm56/fetch-api';
import { getTodosEndpoint } from '@/api/endpoints';
import { TodoType } from '@/_redux/todo-slice';
import { responseSchema } from './response-schema';

export interface IUpdateTodoParams {
  todo: TodoType;
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
