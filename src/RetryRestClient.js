
var Promise = require('bluebird');
var retry = require('retry');
var ArgumentError = require('rest-facade').ArgumentError;
var assign = Object.assign || require('object.assign');

var DEFAULT_OPTIONS = { maxRetries: 10, enabled: true };

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
var RetryRestClient = function(restClient, options){
  if (restClient === null || typeof restClient !== 'object') {
    throw new ArgumentError('Must provide RestClient');
  }

  var params = assign({}, DEFAULT_OPTIONS, options);

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

RetryRestClient.prototype.getAll = function ( /* [params], [callback] */ ) {
  return this.invoke('getAll', arguments);  
};

RetryRestClient.prototype.get = function ( /* [params], [callback] */ ) {
  return this.invoke('get', arguments); 
}

RetryRestClient.prototype.create = function ( /* [params], [callback] */ ) {
  return this.invoke('create', arguments); 
}

RetryRestClient.prototype.patch = function ( /* [params], [callback] */ ) {
  return this.invoke('patch', arguments); 
}

RetryRestClient.prototype.update = function ( /* [params], [callback] */ ) {
  return this.invoke('update', arguments); 
}

RetryRestClient.prototype.delete = function ( /* [params], [callback] */ ) {
  return this.invoke('delete', arguments); 
}

RetryRestClient.prototype.invoke = function(method, args){
  var cb;
  args = Array.prototype.slice.call(args); // convert array-like object to array.
  if(args && args[args.length -1] instanceof Function){
    cb = args[args.length -1];
    args.pop(); // Remove the callback
  }

  var promise = this.handleRetry(method, args);

  if (cb instanceof Function) {
    promise
      .then(cb.bind(null, null))
      .catch(cb);
    return;
  }

  return promise;
}

RetryRestClient.prototype.handleRetry = function(method, args){
  if(!this.enabled){
    return this.restClient[method].apply(this.restClient, args);
  }

  var retryOptions = {
    retries: this.maxRetries,
    factor: 1,
    minTimeout: 1, // retry immediate, use custom logic to control this.
    randomize: false
  };

  var self = this;
  var promise = new Promise(function (resolve, reject) {
    var operation = retry.operation(retryOptions);

    operation.attempt(function(){
      self.restClient[method].apply(self.restClient, args)
        .then(function(body) { 
          resolve(body);
        })
        .catch(function(err) {
          self.invokeRetry(err, operation, reject);
        });
    });
  });

  return promise;
};

RetryRestClient.prototype.invokeRetry = function(err, operation , reject){
  var ratelimits = this.extractRatelimits(err);
  if(ratelimits){
    var delay = ratelimits.reset * 1000 - new Date().getTime();
    if(delay > 0){
      this.retryWithDelay(delay, operation, err, reject);
    }else{
      this.retryWithImmediate(operation, err, reject);
    }   
  }else{
    reject(err);
  }  
}

RetryRestClient.prototype.extractRatelimits = function(err){
  if(err && err.statusCode === 429 && err.originalError && err.originalError.response){
    var headers = err.originalError.response.header;
    if(headers && headers['x-ratelimit-limit']){     
      return {
        limit: headers['x-ratelimit-limit'],
        remaining: headers['x-ratelimit-remaining'],
        reset: headers['x-ratelimit-reset']
      }
    }
  }

  return;
}

RetryRestClient.prototype.retryWithImmediate = function(operation, err, reject){
  if(operation.retry(err)){
    return;
  }  
  reject(err);
}

RetryRestClient.prototype.retryWithDelay = function(delay, operation, err, reject){
  setTimeout(() => {
    if(operation.retry(err)){
      return;
    }
    reject(err);
  }, delay);
}



module.exports = RetryRestClient;
