var RestClient = require('rest-facade').Client;
var Promise = require('bluebird');
var ArgumentError = require('rest-facade').ArgumentError;

var Auth0RestClient = function (resourceUrl, options, provider) {
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

  this.wrappedProvider = function (method, args) {
    if (!this.provider) {
      return this.restClient[method].apply(this.restClient, args);
    }

    var callback;
    if(args && args[args.length -1] instanceof Function){
      callback = args[args.length -1];
    }

    var self = this;
    return this.provider.getAccessToken()
      .then(function (access_token) {
        self.options.headers['Authorization'] = 'Bearer ' + access_token;
        return self.restClient[method].apply(self.restClient, args);
      }).catch(function(err){
        if(callback){
          return callback(err);
        }
        return Promise.reject(err);
      });
  }
};

Auth0RestClient.prototype.getAll = function ( /* [params], [callback] */ ) {
  return this.wrappedProvider('getAll', arguments);
};


Auth0RestClient.prototype.get = function ( /* [params], [callback] */ ) {
  return this.wrappedProvider('get', arguments);
}

Auth0RestClient.prototype.create = function ( /* [params], [callback] */ ) {
  return this.wrappedProvider('create', arguments);
}

Auth0RestClient.prototype.patch = function ( /* [params], [callback] */ ) {
  return this.wrappedProvider('patch', arguments);
}

Auth0RestClient.prototype.update = function ( /* [params], [callback] */ ) {
  return this.wrappedProvider('update', arguments);
}

Auth0RestClient.prototype.delete = function ( /* [params], [callback] */ ) {
  return this.wrappedProvider('delete', arguments);
}

module.exports = Auth0RestClient;
