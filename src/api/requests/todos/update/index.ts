import { IResponse, PureRestRequest } from '@mihanizm56/fetch-api';
import { IUpdateTodoParams, makeRequestConfig } from './make-request-config';
import { IResponseSchema } from './response-schema';

export const updateTodoRequest = (
  params: IUpdateTodoParams,
): Promise<IResponse<IResponseSchema>> =>
  new PureRestRequest().putRequest(makeRequestConfig(params));
