var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');

/**
 * @class LogsManager
 * Represents the relationship between Auth0 and an Identity provider.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 */
var LogsManager = function (options) {
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
  var apiOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for performing CRUD operations on
   * {@link https://auth0.com/docs/api/v2#!/LogsManagers Auth0
   *  Logs}.
   *
   * @type {external:RestClient}
   */
  this.resource = new Auth0RestClient(options.baseUrl + '/logs/:id ', apiOptions, options.tokenProvider);
};

/**
 * Get all logs.
 *
 * @method    getAll
 * @memberOf  module:management.LogsManager.prototype
 *
 * @example
 * management.logs.getAll(function (err, logs) {
 *   console.log(logs.length);
 * });
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(LogsManager, 'getAll', 'resource.getAll');


/**
 * Get an Auth0 log.
 *
 * @method    get
 * @memberOf  module:management.LogsManager.prototype
 *
 * @example
 * management.logs.get({ id: EVENT_ID }, function (err, log) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(log);
 * });
 *
 * @param   {Object}    params          Log parameters.
 * @param   {String}    params.id       Log ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(LogsManager, 'get', 'resource.get');

module.exports = LogsManager;
