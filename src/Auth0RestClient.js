const RestClient = require('rest-facade').Client;
const { ArgumentError } = require('rest-facade');

const utils = require('./utils');
const { SanitizedError } = require('./errors');

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

    options.errorCustomizer = options.errorCustomizer || SanitizedError;
    options.errorFormatter = options.errorFormatter || { message: 'message', name: 'error' };

    this.options = options;
    this.provider = provider;
    this.restClient = new RestClient(resourceUrl, options);

    this.wrappedProvider = function (method, args) {
      if (!this.provider) {
        return this.restClient[method](...args);
      }

      let callback;
      if (args && args[args.length - 1] instanceof Function) {
        callback = args[args.length - 1];
      }

      return this.provider
        .getAccessToken()
        .then((access_token) => {
          this.restClient.options.headers['Authorization'] = `Bearer ${access_token}`;
          return this.restClient[method](...args);
        })
        .catch((err) => {
          if (callback) {
            return callback(err);
          }
          throw err;
        });
    };
  }

  getAll(...args) {
    return this.wrappedProvider('getAll', args);
  }

  get(params, callback) {
    if (typeof params === 'object' && params.id) {
      params.id = utils.maybeDecode(`${params.id}`);
    }
    return this.wrappedProvider('get', [...[params, callback].filter(Boolean)]);
  }

  create(...args) {
    return this.wrappedProvider('create', args);
  }

  patch(params, ...restOfArgs) {
    if (typeof params === 'object' && params.id) {
      params.id = utils.maybeDecode(`${params.id}`);
    }
    return this.wrappedProvider('patch', [params, ...restOfArgs]);
  }

  update(params, ...restOfArgs) {
    if (typeof params === 'object' && params.id) {
      params.id = utils.maybeDecode(`${params.id}`);
    }
    return this.wrappedProvider('update', [params, ...restOfArgs]);
  }

  delete(params, ...restOfArgs) {
    if (typeof params === 'object' && params.id) {
      params.id = utils.maybeDecode(`${params.id}`);
    }
    return this.wrappedProvider('delete', [params, ...restOfArgs]);
  }
}

module.exports = Auth0RestClient;
