const retry = require('retry');
const { ArgumentError } = require('rest-facade');

const DEFAULT_OPTIONS = {
  maxRetries: 3,
  enabled: true,
  randomize: true,
};

/**
 * Wrapper Rest Client that adds Retry functionality when requests are failing due to rate limiting (status code 429).
 */
class RetryRestClient {
  /**
   * @param {object}  restClient                   RestClient.
   * @param {object}  [options]                    Options for the RetryRestClient. It includes all properties from https://github.com/tim-kos/node-retry#retryoperationoptions
   * @param {object}  [options.enabled=true]       Enabled or Disable Retry Policy functionality.
   * @param {number}  [options.maxRetries=3]       The maximum amount of times to retry the operation.
   */
  constructor(restClient, options) {
    if (restClient === null || typeof restClient !== 'object') {
      throw new ArgumentError('Must provide RestClient');
    }

    const params = Object.assign({}, DEFAULT_OPTIONS, options);

    if (typeof params.enabled !== 'boolean') {
      throw new ArgumentError('Must provide enabled boolean value');
    }

    if (typeof params.maxRetries !== 'number' || params.maxRetries <= 0) {
      throw new ArgumentError('Must provide maxRetries as a positive number');
    }

    this.restClient = restClient;
    this.enabled = params.enabled;
    this.retryOptions = Object.assign({ retries: params.maxRetries }, params);
  }

  getAll(...args) {
    return this.invoke('getAll', args);
  }

  get(...args) {
    return this.invoke('get', args);
  }

  create(...args) {
    return this.invoke('create', args);
  }

  patch(...args) {
    return this.invoke('patch', args);
  }

  update(...args) {
    return this.invoke('update', args);
  }

  delete(...args) {
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
      return this.restClient[method](...args);
    }

    return new Promise((resolve, reject) => {
      const operation = retry.operation(this.retryOptions);

      operation.attempt(() => {
        this.restClient[method](...args)
          .then((body) => {
            resolve(body);
          })
          .catch((err) => {
            if (err && err.statusCode === 429 && operation.retry(err)) {
              return;
            }
            reject(err);
          });
      });
    });
  }
}

module.exports = RetryRestClient;
