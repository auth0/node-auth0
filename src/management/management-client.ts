import { ManagementClientBase } from './__generated';
import {
  ManagementClientOptionsWithClientCredentials,
  ManagementClientOptionsWithToken,
} from './management-client.options';
import { TokenProviderMiddleware } from './token-provider-middleware';
import { ResponseError } from '../lib';
import { Response, Headers } from '../lib/fetch';
import { TelemetryMiddleware } from '../lib/middleware/telemetry-middleware';

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
    public body: string,
    public headers: Headers,
    public msg: string
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

  const body = await response.text();
  let data: ManagementApiErrorResponse;

  try {
    data = JSON.parse(body) as ManagementApiErrorResponse;
    return new ManagementApiError(
      data.errorCode,
      data.error,
      data.statusCode || response.status,
      body,
      response.headers,
      data.message
    );
  } catch (_) {
    return new ResponseError(
      response.status,
      body,
      response.headers,
      'Response returned an error code'
    );
  }
}

export class ManagementClient extends ManagementClientBase {
  constructor(options: ManagementClientOptionsWithToken);
  constructor(options: ManagementClientOptionsWithClientCredentials);
  constructor(
    options: ManagementClientOptionsWithToken | ManagementClientOptionsWithClientCredentials
  ) {
    super({
      ...options,
      baseUrl: `https://${options.domain}/api/v2`,
      middleware: [
        ...(options.middleware || []),
        new TokenProviderMiddleware(options),
        ...(options.telemetry !== false ? [new TelemetryMiddleware(options)] : []),
      ],
      parseError,
    });
  }
}
