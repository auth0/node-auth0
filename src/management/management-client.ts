import { ManagementClientBase } from './__generated';
import {
  ManagementClientOptionsWithClientCredentials,
  ManagementClientOptionsWithToken,
} from './management-client.options';
import { tokenProviderFactory } from './management-client.utils';
import { TokenProviderMiddleware } from './token-provider.middleware';
import { ResponseError } from './../runtime/index';
import { Response } from 'node-fetch';

interface ManagementApiErrorResponse {
  errorCode: string;
  error: string;
  message: string;
  statusCode: number;
}

export class ManagementApiError extends Error {
  override name = 'ManagementApiError' as const;
  constructor(
    public errorCode: string,
    public error: string,
    public statusCode: number,
    msg?: string
  ) {
    super(msg);
  }
}

async function parseError(response: Response) {
  // Errors typically have a specific format:
  // {
  //    errorCode: 'invalid_body',
  //    error: 'Bad Request',
  //    message: 'Payload validation failed ...',
  //    statusCode: 400
  // }

  let data: ManagementApiErrorResponse;

  try {
    data = (await response.json()) as ManagementApiErrorResponse;
  } catch (_) {
    return new ResponseError(response, response.status, 'Response returned an error code');
  }

  if (data.errorCode && data.error && data.message) {
    return new ManagementApiError(
      data.errorCode,
      data.error,
      data.statusCode || response.status,
      data.message
    );
  } else {
    return new ResponseError(response, response.status, 'Response returned an error code');
  }
}

export class ManagementClient extends ManagementClientBase {
  constructor(
    options: ManagementClientOptionsWithToken | ManagementClientOptionsWithClientCredentials
  ) {
    super({
      ...options,
      baseUrl: `https://${options.domain}/api/v2`,
      middleware: [
        ...(options.middleware || []),
        new TokenProviderMiddleware(tokenProviderFactory(options)),
      ],
      parseError,
    });
  }
}
