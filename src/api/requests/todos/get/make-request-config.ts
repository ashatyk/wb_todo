import { IRequestParams } from '@mihanizm56/fetch-api';
import { getTodosEndpoint } from '@/api/endpoints/todos';
import { responseSchema } from './response-schema';

export const makeRequestConfig = (): IRequestParams => ({
  endpoint: getTodosEndpoint(),
  responseSchema,
});
