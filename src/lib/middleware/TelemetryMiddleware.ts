import { generateClientInfo, jsonToBase64 } from '../../utils';
import { Middleware, ClientOptions, FetchParams, RequestContext } from '../runtime';

/**
 * @private
 */
export class TelemetryMiddleware implements Middleware {
  clientInfo: { name: string; [key: string]: unknown };

  constructor(options: ClientOptions) {
    this.clientInfo = options.clientInfo || generateClientInfo();
  }

  async pre?(context: RequestContext): Promise<FetchParams | void> {
    if ('string' === typeof this.clientInfo.name && this.clientInfo.name.length > 0) {
      context.init.headers = {
        ...context.init.headers,
        'Auth0-Client': jsonToBase64(this.clientInfo),
      };
    }

    return {
      url: context.url,
      init: context.init,
    };
  }
}
