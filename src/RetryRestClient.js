var retry = require('retry');
var ArgumentError = require('rest-facade').ArgumentError;

var DEFAULT_OPTIONS = {
  maxRetries: 3,
  enabled: true,
  randomize: true
};

/**
 * @class RetryRestClient
 * Wrapper Rest Client that adds Retry functionality when requests are failing due to rate limiting (status code 429).
 * @constructor
 * @memberOf module:management
 * @param {Object}  restClient                   RestClient.
 * @param {Object}  [options]                    Options for the RetryRestClient.
 * @param {Object}  [options.enabled:true]       Enabled or Disable Retry Policy functionality.
 * @param {Number}  [options.maxRetries=10]      The maximum amount of times to retry the operation. Default is 10.
 * @param {*}       [options.*]                  Any options that are available in https://github.com/tim-kos/node-retry#retryoperationoptions
 */
var RetryRestClient = function(restClient, options) {
  if (restClient === null || typeof restClient !== 'object') {
    throw new ArgumentError('Must provide RestClient');
  }

  var params = Object.assign({}, DEFAULT_OPTIONS, options);

  if (typeof params.enabled !== 'boolean') {
    throw new ArgumentError('Must provide enabled boolean value');
  }

  if (typeof params.maxRetries !== 'number' || params.maxRetries <= 0) {
    throw new ArgumentError('Must provide maxRetries as a positive number');
  }

  this.restClient = restClient;
  this.enabled = params.enabled;
  this.retryOptions = Object.assign({ retries: params.maxRetries }, params);
};

RetryRestClient.prototype.getAll = function(/* [params], [callback] */) {
  return this.invoke('getAll', arguments);
};

RetryRestClient.prototype.get = function(/* [params], [callback] */) {
  return this.invoke('get', arguments);
};

RetryRestClient.prototype.create = function(/* [params], [callback] */) {
  return this.invoke('create', arguments);
};

RetryRestClient.prototype.patch = function(/* [params], [callback] */) {
  return this.invoke('patch', arguments);
};

RetryRestClient.prototype.update = function(/* [params], [callback] */) {
  return this.invoke('update', arguments);
};

RetryRestClient.prototype.delete = function(/* [params], [callback] */) {
  return this.invoke('delete', arguments);
};

RetryRestClient.prototype.invoke = function(method, args) {
  var cb;
  args = Array.prototype.slice.call(args); // convert array-like object to array.
  if (args && args[args.length - 1] instanceof Function) {
    cb = args[args.length - 1];
    args.pop(); // Remove the callback
  }

  var promise = this.handleRetry(method, args);

  if (cb instanceof Function) {
    promise.then(cb.bind(null, null)).catch(cb);
    return;
  }

  return promise;
};

RetryRestClient.prototype.handleRetry = function(method, args) {
  if (!this.enabled) {
    return this.restClient[method].apply(this.restClient, args);
  }

  var self = this;
  return new Promise(function(resolve, reject) {
    var operation = retry.operation(self.retryOptions);

    operation.attempt(function() {
      self.restClient[method]
        .apply(self.restClient, args)
        .then(function(body) {
          resolve(body);
        })
        .catch(function(err) {
          if (err && err.statusCode === 429 && operation.retry(err)) {
            return;
          }
          reject(err);
        });
    });
  });
};

module.exports = RetryRestClient;
