import { getPortalEuEndpoint } from '../shared-urls';

export const getTodosEndpoint = (): string => `${getPortalEuEndpoint()}/todos`;
