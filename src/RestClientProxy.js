var RestClient = require('rest-facade').Client;

var RestClientProxy = function(restClient, options) {
  options = options || {};
  if (RestClientProxy.getProxy()) {
    options.proxy = RestClientProxy.getProxy();
  }
  return new RestClient(restClient, options);
};

RestClientProxy.getProxy = function() {
  return RestClientProxy.proxy;
}

RestClientProxy.setProxy = function(proxy) {
  RestClientProxy.proxy = proxy;
}

module.exports = RestClientProxy;