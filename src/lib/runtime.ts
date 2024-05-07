import { retry } from './retry.js';
import { FetchError, RequiredError, TimeoutError } from './errors.js';
import {
  RequestOpts,
  InitOverrideFunction,
  HTTPQuery,
  Configuration,
  Middleware,
  FetchAPI,
} from './models.js';

export * from './models.js';

/**
 * @private
 * This is the base class for all generated API classes.
 */
export class BaseAPI {
  private middleware: Middleware[];
  private fetchApi: FetchAPI;
  private parseError: (response: Response) => Promise<Error> | Error;
  private timeoutDuration: number;

  constructor(protected configuration: Configuration) {
    if (configuration.baseUrl === null || configuration.baseUrl === undefined) {
      throw new Error('Must provide a base URL for the API');
    }

    if ('string' !== typeof configuration.baseUrl || configuration.baseUrl.length === 0) {
      throw new Error('The provided base URL is invalid');
    }

    this.middleware = configuration.middleware || [];
    this.fetchApi = configuration.fetch || fetch;
    this.parseError = configuration.parseError;
    this.timeoutDuration =
      typeof configuration.timeoutDuration === 'number' ? configuration.timeoutDuration : 10000;
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
      dispatcher: this.configuration.agent,
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
        overriddenInit.body instanceof FormData ||
        overriddenInit.body instanceof URLSearchParams ||
        overriddenInit.body instanceof Blob
          ? overriddenInit.body
          : JSON.stringify(overriddenInit.body),
    };
    return { url, init };
  }

  private fetchWithTimeout: FetchAPI = async (url, init) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, this.timeoutDuration);
    try {
      return await this.fetchApi(url, { signal: controller.signal as AbortSignal, ...init });
    } catch (e: any) {
      if (e.name === 'AbortError') {
        throw new TimeoutError();
      }
      throw e;
    } finally {
      clearTimeout(timeout);
    }
  };

  private fetch = async (url: URL | RequestInfo, init: RequestInit) => {
    let fetchParams = { url, init };
    for (const middleware of this.middleware) {
      if (middleware.pre) {
        fetchParams =
          (await middleware.pre({
            fetch: this.fetchWithTimeout,
            ...fetchParams,
          })) || fetchParams;
      }
    }
    let response: Response | undefined = undefined;
    let error: Error | undefined = undefined;
    try {
      response =
        this.configuration.retry?.enabled !== false
          ? await retry(() => this.fetchWithTimeout(fetchParams.url, fetchParams.init), {
              ...this.configuration.retry,
            })
          : await this.fetchWithTimeout(fetchParams.url, fetchParams.init);
    } catch (e: any) {
      error = e;
    }
    if (error || !(response as Response).ok) {
      for (const middleware of this.middleware) {
        if (middleware.onError) {
          response =
            (await middleware.onError({
              fetch: this.fetchWithTimeout,
              ...fetchParams,
              error,
              response: response ? response.clone() : undefined,
            })) || response;
        }
      }
      if (response === undefined) {
        throw new FetchError(
          error as Error,
          'The request failed and the interceptors did not return an alternative response'
        );
      }
    } else {
      for (const middleware of this.middleware) {
        if (middleware.post) {
          response =
            (await middleware.post({
              fetch: this.fetchApi,
              ...fetchParams,
              response: (response as Response).clone(),
            })) || response;
        }
      }
    }

    return response as Response;
  };
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
export type ModelPropertyNaming = 'camelCase' | 'snake_case' | 'PascalCase' | 'original';

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
export interface Consume {
  contentType: string;
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
          value = requestParameters[key].join(COLLECTION_FORMATS[config.collectionFormat!]);
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

/**
 * @private
 */
export async function parseFormParam(
  originalValue: number | boolean | string | Blob
): Promise<string | Blob> {
  let value = originalValue;
  value = typeof value == 'number' || typeof value == 'boolean' ? '' + value : value;
  return value as string | Blob;
}
