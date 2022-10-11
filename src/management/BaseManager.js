const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

class BaseManager {
  constructor(options) {
    if (options === null || typeof options !== 'object') {
      throw new ArgumentError('Must provide manager options');
    }

    if (options.baseUrl === null || options.baseUrl === undefined) {
      throw new ArgumentError('Must provide a base URL for the API');
    }

    if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
      throw new ArgumentError('The provided base URL is invalid');
    }

    this._options = options;
  }

  _getRestClient(path) {
    const options = this._options;
    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers: options.headers,
      proxy: options.proxy,
      query: { repeatParams: false },
      includeResponseHeaders: options.includeResponseHeaders,
    };

    const usersAuth0RestClient = new Auth0RestClient(
      `${options.baseUrl}${path}`,
      clientOptions,
      options.tokenProvider
    );
    return new RetryRestClient(usersAuth0RestClient, options.retry);
  }
}

module.exports = BaseManager;
