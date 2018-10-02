const Promise = require('bluebird');
const { ArgumentError, Client: RestClient } = require('rest-facade');

class Auth0RestClient {
  constructor(resourceUrl, options, provider) {
    if (resourceUrl === null || resourceUrl === undefined) {
      throw new ArgumentError('Must provide a Resource Url');
    }

    if ('string' !== typeof resourceUrl || resourceUrl.length === 0) {
      throw new ArgumentError('The provided Resource Url is invalid');
    }

    if (options === null || typeof options !== 'object') {
      throw new ArgumentError('Must provide options');
    }

    this.options = options;
    this.provider = provider;
    this.restClient = new RestClient(resourceUrl, options);
  }

  wrappedProvider(method, args) {
    if (!this.provider) {
      return this.restClient[method].apply(this.restClient, args);
    }

    let callback;
    if (args && args[args.length - 1] instanceof Function) {
      callback = args[args.length - 1];
    }

    return this.provider
      .getAccessToken()
      .then(access_token => {
        this.options.headers.Authorization = `Bearer ${access_token}`;
        return this.restClient[method].apply(this.restClient, args);
      })
      .catch(err => {
        if (callback) {
          return callback(err);
        }
        return Promise.reject(err);
      });
  }

  getAll(...args /* [params], [callback] */) {
    return this.wrappedProvider('getAll', args);
  }

  get(...args /* [params], [callback] */) {
    return this.wrappedProvider('get', args);
  }

  create(...args /* [params], [callback] */) {
    return this.wrappedProvider('create', args);
  }

  patch(...args /* [params], [callback] */) {
    return this.wrappedProvider('patch', args);
  }

  update(...args /* [params], [callback] */) {
    return this.wrappedProvider('update', args);
  }

  delete(...args /* [params], [callback] */) {
    return this.wrappedProvider('delete', args);
  }
}

module.exports = Auth0RestClient;
