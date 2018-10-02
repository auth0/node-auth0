const Promise = require('bluebird');
const retry = require('retry');
const { ArgumentError } = require('rest-facade');
const { assign } = Object;

const DEFAULT_OPTIONS = { maxRetries: 10, enabled: true };

/**
 * @class RetryRestClient
 * Wrapper Rest Client that adds Retry functionality when requests are failing due to rate limiting (status code 429).
 * @constructor
 * @memberOf module:management
 * @param {Object}  restClient                   RestClient.
 * @param {Object}  [options]                    Options for the RetryRestClient.
 * @param {Object}  [options.enabled:true]       Enabled or Disable Retry Policy functionality.
 * @param {Number}  [options.maxRetries=10]      The maximum amount of times to retry the operation. Default is 10.
 */
class RetryRestClient {
  constructor(restClient, options) {
    if (restClient === null || typeof restClient !== 'object') {
      throw new ArgumentError('Must provide RestClient');
    }

    const params = assign({}, DEFAULT_OPTIONS, options);

    if (typeof params.enabled !== 'boolean') {
      throw new ArgumentError('Must provide enabled boolean value');
    }

    if (typeof params.maxRetries !== 'number' || params.maxRetries <= 0) {
      throw new ArgumentError('Must provide maxRetries as a positive number');
    }

    this.restClient = restClient;
    this.maxRetries = params.maxRetries;
    this.enabled = params.enabled;
  }

  getAll(...args /* [params], [callback] */) {
    return this.invoke('getAll', args);
  }

  get(...args /* [params], [callback] */) {
    return this.invoke('get', args);
  }

  create(...args /* [params], [callback] */) {
    return this.invoke('create', args);
  }

  patch(...args /* [params], [callback] */) {
    return this.invoke('patch', args);
  }

  update(...args /* [params], [callback] */) {
    return this.invoke('update', args);
  }

  delete(...args /* [params], [callback] */) {
    return this.invoke('delete', args);
  }

  invoke(method, args) {
    let cb;

    if (args && args[args.length - 1] instanceof Function) {
      cb = args[args.length - 1];
      args.pop(); // Remove the callback
    }

    const promise = this.handleRetry(method, args);

    if (cb instanceof Function) {
      promise.then(cb.bind(null, null)).catch(cb);
      return;
    }

    return promise;
  }

  handleRetry(method, args) {
    if (!this.enabled) {
      return this.restClient[method].apply(this.restClient, args);
    }

    const retryOptions = {
      retries: this.maxRetries,
      factor: 1,
      minTimeout: 1, // retry immediate, use custom logic to control this.
      randomize: false
    };

    const promise = new Promise((resolve, reject) => {
      const operation = retry.operation(retryOptions);
      operation.attempt(() => {
        this.restClient[method]
          .apply(this.restClient, args)
          .then(body => {
            resolve(body);
          })
          .catch(err => {
            this.invokeRetry(err, operation, reject);
          });
      });
    });

    return promise;
  }

  invokeRetry(err, operation, reject) {
    const ratelimits = this.extractRatelimits(err);
    if (ratelimits) {
      const delay = ratelimits.reset * 1000 - new Date().getTime();
      if (delay > 0) {
        this.retryWithDelay(delay, operation, err, reject);
      } else {
        this.retryWithImmediate(operation, err, reject);
      }
    } else {
      reject(err);
    }
  }

  extractRatelimits(err) {
    if (err && err.statusCode === 429 && err.originalError && err.originalError.response) {
      const headers = err.originalError.response.header;
      if (headers && headers['x-ratelimit-limit']) {
        return {
          limit: headers['x-ratelimit-limit'],
          remaining: headers['x-ratelimit-remaining'],
          reset: headers['x-ratelimit-reset']
        };
      }
    }

    return;
  }

  retryWithImmediate(operation, err, reject) {
    if (operation.retry(err)) {
      return;
    }
    reject(err);
  }

  retryWithDelay(delay, operation, err, reject) {
    setTimeout(() => {
      if (operation.retry(err)) {
        return;
      }
      reject(err);
    }, delay);
  }
}

module.exports = RetryRestClient;
