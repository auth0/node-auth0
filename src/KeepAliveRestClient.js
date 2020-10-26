var RestClient = require('rest-facade').Client;
var keepAliveAgent = require('./utils').keepAliveAgent;

// Wraps the original rest-facade client, providing persistent connections when requested in the input options.
var KeepAliveRestClient = function(resourceUrl, options) {
  if (options.keepAlive) {
    options.request = Object.assign(options.request || {}, {
      customizer: this.useKeepAliveAgent
    });
  }
  return new RestClient(resourceUrl, options);
};

KeepAliveRestClient.prototype.useKeepAliveAgent = function(superAgentRequest) {
  superAgentRequest.agent(keepAliveAgent);
};

module.exports = KeepAliveRestClient;
