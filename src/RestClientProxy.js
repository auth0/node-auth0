var RestClient = require('rest-facade').Client;

var RestClientProxy = function(url, options) {
  options = options || {};
  if (RestClientProxy.getProxy()) {
    options.proxy = RestClientProxy.getProxy();
  }
  return new RestClient(url, options);
};

RestClientProxy.getProxy = function() {
  return RestClientProxy.proxy;
}

RestClientProxy.setProxy = function(proxy) {
  RestClientProxy.proxy = proxy;
}

module.exports = RestClientProxy;