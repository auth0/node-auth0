import { generateClientInfo } from '../../utils.js';
import { Middleware, ClientOptions, FetchParams, RequestContext } from '../runtime.js';
import { base64url } from 'jose';

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
        'Auth0-Client': base64url.encode(JSON.stringify(this.clientInfo)),
      };
    }

    return {
      url: context.url,
      init: context.init,
    };
  }
}
