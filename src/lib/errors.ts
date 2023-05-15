/**
 * Error thrown when the API returns an error response that can't be parsed to a more specific Error instance.
 */
export class ResponseError extends Error {
  override name = 'ResponseError' as const;
  constructor(
    public statusCode: number,
    public body: string,
    public headers: Headers,
    msg?: string
  ) {
    super(msg);
  }
}

/**
 * Error thrown when the request is aborted due to a timeout.
 */
export class TimeoutError extends Error {
  override name = 'TimeoutError' as const;
  constructor() {
    super('The request was timed out.');
  }
}

/**
 * Error thrown when there is a network error.
 */
export class FetchError extends Error {
  override name = 'FetchError' as const;
  constructor(public cause: Error, msg?: string) {
    super(msg);
  }
}

/**
 * Error thrown when a required argument was not provided.
 */
export class RequiredError extends Error {
  override name = 'RequiredError' as const;
  constructor(public field: string, msg?: string) {
    super(msg);
  }
}
