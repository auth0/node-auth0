import fetch, { RequestInit, RequestInfo, Response } from 'node-fetch';
import { RetryConfiguration } from './retry';

/**
 * @private
 */
export type FetchAPI = typeof fetch;

export interface ClientOptions extends Omit<Configuration, 'baseUrl' | 'parseError'> {
  telemetry?: boolean;
  clientInfo?: { name: string; [key: string]: unknown };
}

export interface Configuration {
  baseUrl: string; // override base path
  fetchApi?: FetchAPI; // override for fetch implementation
  middleware?: Middleware[]; // middleware to apply before/after fetch requests
  headers?: HTTPHeaders; //header params we want to use on every request
  retry?: RetryConfiguration;
  parseError: (response: Response) => Promise<Error>;
}

export interface RequestOpts {
  path: string;
  method: HTTPMethod;
  headers?: HTTPHeaders;
  query?: HTTPQuery;
  body?: HTTPBody;
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

export type HTTPHeaders = { [key: string]: string };

export type HTTPQuery = {
  [key: string]:
    | string
    | number
    | null
    | boolean
    | Array<string | number | null | boolean>
    | HTTPQuery;
};

export type HTTPBody = any | FormData | URLSearchParams;

export type HTTPRequestInit = {
  headers?: HTTPHeaders;
  method: HTTPMethod;
  credentials?: RequestCredentials;
  body?: HTTPBody;
};

export type InitOverrideFunction = (requestContext: {
  init: HTTPRequestInit;
  context: RequestOpts;
}) => Promise<RequestInit>;
export type InitOverride = RequestInit | InitOverrideFunction;

export interface ApiResponse<T> {
  data: T;
  headers: Headers;
  status: number;
  statusText: string;
}

export class JSONApiResponse<T> implements ApiResponse<T> {
  constructor(
    public data: T,
    public headers: Headers,
    readonly status: number,
    readonly statusText: string
  ) {}

  static async fromResponse<T = unknown>(raw: Response) {
    const value = (await raw.json()) as T;
    return new JSONApiResponse<T>(value, raw.headers, raw.status, raw.statusText);
  }
}

export class VoidApiResponse implements ApiResponse<undefined> {
  public data: undefined;
  constructor(public headers: Headers, readonly status: number, readonly statusText: string) {}

  static async fromResponse(raw: Response) {
    return new VoidApiResponse(raw.headers, raw.status, raw.statusText);
  }
}

export class BlobApiResponse implements ApiResponse<Blob> {
  constructor(
    public data: Blob,
    public headers: Headers,
    readonly status: number,
    readonly statusText: string
  ) {}

  static async fromResponse(raw: Response) {
    const value = await raw.blob();
    return new BlobApiResponse(value, raw.headers, raw.status, raw.statusText);
  }
}

export class TextApiResponse implements ApiResponse<string> {
  constructor(
    public data: string,
    public headers: Headers,
    readonly status: number,
    readonly statusText: string
  ) {}

  static async fromResponse(raw: Response) {
    const value = await raw.text();
    return new TextApiResponse(value, raw.headers, raw.status, raw.statusText);
  }
}

export interface FetchParams {
  url: URL | RequestInfo;
  init: RequestInit;
}

export interface RequestContext {
  fetch: FetchAPI;
  url: URL | RequestInfo;
  init: RequestInit;
}

export interface ResponseContext {
  fetch: FetchAPI;
  url: URL | RequestInfo;
  init: RequestInit;
  response: Response;
}

export interface ErrorContext {
  fetch: FetchAPI;
  url: URL | RequestInfo;
  init: RequestInit;
  error: unknown;
  response?: Response;
}

export interface Middleware {
  pre?(context: RequestContext): Promise<FetchParams | void>;
  post?(context: ResponseContext): Promise<Response | void>;
  onError?(context: ErrorContext): Promise<Response | void>;
}
