import { IResponse, PureRestRequest } from '@mihanizm56/fetch-api';
import { makeRequestConfig } from './make-request-config';
import { IResponseSchema } from './response-schema';

export const getTodosRequest = (): Promise<IResponse<IResponseSchema>> =>
  new PureRestRequest().getRequest(makeRequestConfig());
