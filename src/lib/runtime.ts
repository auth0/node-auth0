import fetch, { RequestInit, RequestInfo, Response, Blob, FormData } from 'node-fetch';
import { RetryConfiguration, retry } from './retry';
import { FetchError, RequiredError } from './errors';
import { HTTPHeaders, RequestOpts, InitOverrideFunction, HTTPQuery } from './models';

export { Blob, FormData } from 'node-fetch';
export * from './models';

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

/**
 * @private
 * This is the base class for all generated API classes.
 */
export class BaseAPI {
  private middleware: Middleware[];
  private fetchApi: FetchAPI;
  private parseError: (response: Response) => Promise<Error> | Error;

  constructor(protected configuration: Configuration) {
    if (configuration.baseUrl === null || configuration.baseUrl === undefined) {
      throw new Error('Must provide a base URL for the API');
    }

    if ('string' !== typeof configuration.baseUrl || configuration.baseUrl.length === 0) {
      throw new Error('The provided base URL is invalid');
    }

    this.middleware = configuration.middleware || [];
    this.fetchApi = configuration.fetchApi || fetch;
    this.parseError = configuration.parseError;
  }

  protected async request(
    context: RequestOpts,
    initOverrides?: RequestInit | InitOverrideFunction
  ): Promise<Response> {
    const { url, init } = await this.createFetchParams(context, initOverrides);
    const response = await this.fetch(url, init);
    if (response && response.status >= 200 && response.status < 300) {
      return response;
    }

    const error = await this.parseError(response);
    throw error;
  }

  private async createFetchParams(
    context: RequestOpts,
    initOverrides?: RequestInit | InitOverrideFunction
  ) {
    let url = this.configuration.baseUrl + context.path;
    if (context.query !== undefined && Object.keys(context.query).length !== 0) {
      // only add the querystring to the URL if there are query parameters.
      // this is done to avoid urls ending with a "?" character which buggy webservers
      // do not handle correctly sometimes.
      url += `?${querystring(context.query)}`;
    }

    const headers = Object.assign({}, this.configuration.headers, context.headers);
    Object.keys(headers).forEach((key) => (headers[key] === undefined ? delete headers[key] : {}));

    const initOverrideFn =
      typeof initOverrides === 'function' ? initOverrides : async () => initOverrides;

    const initParams = {
      method: context.method,
      headers,
      body: context.body,
    };

    const overriddenInit: RequestInit = {
      ...initParams,
      ...(await initOverrideFn({
        init: initParams,
        context,
      })),
    };

    const init: RequestInit = {
      ...overriddenInit,
      body:
        isFormData(overriddenInit.body) ||
        overriddenInit.body instanceof URLSearchParams ||
        isBlob(overriddenInit.body)
          ? overriddenInit.body
          : JSON.stringify(overriddenInit.body),
    };
    return { url, init };
  }

  private fetch = async (url: URL | RequestInfo, init: RequestInit) => {
    let fetchParams = { url, init };
    for (const middleware of this.middleware) {
      if (middleware.pre) {
        fetchParams =
          (await middleware.pre({
            fetch: this.fetchApi,
            ...fetchParams,
          })) || fetchParams;
      }
    }
    let response: Response | undefined = undefined;
    try {
      response =
        this.configuration.retry?.enabled !== false
          ? await retry(() => this.fetchApi(fetchParams.url, fetchParams.init), {
              ...this.configuration.retry,
            })
          : await this.fetchApi(fetchParams.url, fetchParams.init);
    } catch (e) {
      for (const middleware of this.middleware) {
        if (middleware.onError) {
          response =
            (await middleware.onError({
              fetch: this.fetchApi,
              ...fetchParams,
              error: e,
              response: response ? response.clone() : undefined,
            })) || response;
        }
      }
      if (response === undefined) {
        if (e instanceof Error) {
          throw new FetchError(
            e,
            'The request failed and the interceptors did not return an alternative response'
          );
        } else {
          throw e;
        }
      }
    }
    for (const middleware of this.middleware) {
      if (middleware.post) {
        response =
          (await middleware.post({
            fetch: this.fetchApi,
            ...fetchParams,
            response: response.clone(),
          })) || response;
      }
    }
    return response;
  };
}

function isBlob(value: unknown): value is Blob {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

function isFormData(value: unknown): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

/**
 * @private
 */
export const COLLECTION_FORMATS = {
  csv: ',',
  ssv: ' ',
  tsv: '\t',
  pipes: '|',
};

/**
 * @private
 */
export type FetchAPI = typeof fetch;

/**
 * @private
 */
export type ModelPropertyNaming = 'camelCase' | 'snake_case' | 'PascalCase' | 'original';

/**
 * @private
 */
export interface FetchParams {
  url: URL | RequestInfo;
  init: RequestInit;
}

/**
 * @private
 */
function querystring(params: HTTPQuery): string {
  return Object.keys(params)
    .map((key) => querystringSingleKey(key, params[key]))
    .filter((part) => part.length > 0)
    .join('&');
}

function querystringSingleKey(
  key: string,
  value:
    | string
    | number
    | null
    | undefined
    | boolean
    | Array<string | number | null | boolean>
    | HTTPQuery
): string {
  if (value instanceof Array) {
    const multiValue = value
      .map((singleValue) => encodeURIComponent(String(singleValue)))
      .join(`&${encodeURIComponent(key)}=`);
    return `${encodeURIComponent(key)}=${multiValue}`;
  }
  return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
}

/**
 * @private
 */
export function canConsumeForm(consumes: Consume[]): boolean {
  for (const consume of consumes) {
    if ('multipart/form-data' === consume.contentType) {
      return true;
    }
  }
  return false;
}

/**
 * @private
 */
export interface Consume {
  contentType: string;
}

/**
 * @private
 */
export interface RequestContext {
  fetch: FetchAPI;
  url: URL | RequestInfo;
  init: RequestInit;
}

/**
 * @private
 */
export interface ResponseContext {
  fetch: FetchAPI;
  url: URL | RequestInfo;
  init: RequestInit;
  response: Response;
}

/**
 * @private
 */
export interface ErrorContext {
  fetch: FetchAPI;
  url: URL | RequestInfo;
  init: RequestInit;
  error: unknown;
  response?: Response;
}

/**
 * @private
 */
export interface Middleware {
  pre?(context: RequestContext): Promise<FetchParams | void>;
  post?(context: ResponseContext): Promise<Response | void>;
  onError?(context: ErrorContext): Promise<Response | void>;
}

/**
 * @private
 */
export function validateRequiredRequestParams<TRequestParams extends { [key: string]: any }>(
  requestParameters: TRequestParams,
  keys: Array<Extract<keyof TRequestParams, string>>
) {
  keys.forEach((key) => {
    if (requestParameters[key] === null || requestParameters[key] === undefined) {
      throw new RequiredError(
        key,
        `Required parameter requestParameters.${key} was null or undefined.`
      );
    }
  });
}

type QueryParamConfig = {
  isArray?: boolean;
  isCollectionFormatMulti?: boolean;
  collectionFormat?: keyof typeof COLLECTION_FORMATS;
};

/**
 * @private
 */
export function applyQueryParams<
  TRequestParams extends { [key: string]: any },
  Key extends Extract<keyof TRequestParams, string>
>(
  requestParameters: TRequestParams,
  keys: Array<{
    key: Key;
    config: QueryParamConfig;
  }>
) {
  return keys.reduce(
    (
      acc: { [key: string]: any },
      {
        key,
        config,
      }: {
        key: Key;
        config: QueryParamConfig;
      }
    ) => {
      let value;

      if (config.isArray) {
        if (config.isCollectionFormatMulti) {
          value = requestParameters[key];
        } else {
          value = requestParameters[key].join(
            COLLECTION_FORMATS[config.collectionFormat as keyof typeof COLLECTION_FORMATS]
          );
        }
      } else {
        if (requestParameters[key] !== undefined) {
          value = requestParameters[key];
        }
      }

      return value !== undefined ? { ...acc, [key]: value } : acc;
    },
    {}
  ) as Pick<TRequestParams, ReadonlyArray<Key>[number]>;
}
