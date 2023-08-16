import { ResponseError } from '../lib/index.js';

export interface ManagementApiErrorResponse {
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

export async function parseError(response: Response) {
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
