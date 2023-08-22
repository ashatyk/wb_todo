import { IResponse, PureRestRequest } from '@mihanizm56/fetch-api';
import { ICreateTaskParams, makeRequestConfig } from './make-request-config';
import { IResponseSchema } from './response-schema';

export const createTodoRequest = (
  params: ICreateTaskParams,
): Promise<IResponse<IResponseSchema>> =>
  new PureRestRequest().postRequest(makeRequestConfig(params));
