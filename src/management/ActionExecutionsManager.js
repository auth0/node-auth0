var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class ActionExecutionsManager
 * Auth0 ActionExecution Provider.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var ActionExecutionsManager = function(options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 ActionExecutions endpoint]{@link https://auth0.com/docs/api/v2#!/actionExecutions}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/actions/executions/:execution_id',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};

/**
 * Get an execution by ID.
 *
 * @method    get
 * @memberOf  module:management.ActionExecutionsManager.prototype
 *
 * @example
 * management.actionExecutions.get({ execution_id: EXECUTION_ID }, function (err, action) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(ActionExecution);
 * });
 *
 * @param   {Object}    params                  Action Execution parameters.
 * @param   {String}    params.execution_id     Action Execution ID.
 * @param   {Function}  [cb]                    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ActionExecutionsManager, 'get', 'resource.get');

module.exports = ActionExecutionsManager;
