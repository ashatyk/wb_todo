import { IResponse, PureRestRequest } from '@mihanizm56/fetch-api';
import { IDeleteTaskParams, makeRequestConfig } from './make-request-config';
import { IResponseSchema } from './response-schema';

export const deleteTodoRequest = (
  params: IDeleteTaskParams,
): Promise<IResponse<IResponseSchema>> =>
  new PureRestRequest().deleteRequest(makeRequestConfig(params));
