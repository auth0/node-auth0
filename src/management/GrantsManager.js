var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');
/**
 * @class GrantsManager
 * Auth0 Grants Manager.
 *
 * See {@link https://auth0.com/docs/api/v2#!/Grants Grants}
 *
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var GrantsManager = function(options) {
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
   * {@link https://auth0.com/docs/api/v2#!/Grants Auth0 Grants endpoint}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/grants/:id',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};

/**
 * Get all Auth0 Grants.
 *
 * @method    getAll
 * @memberOf  module:management.GrantsManager.prototype
 *
 * @example
 * var params = {
 *   per_page: 10,
 *   page: 0,
 *   include_totals: true,
 *   user_id: 'USER_ID',
 *   client_id: 'CLIENT_ID',
 *   audience: 'AUDIENCE'
 * };
 *
 * management.getGrants(params, function (err, grants) {
 *   console.log(grants.length);
 * });
 *
 * @param   {Object}    params                Grants parameters.
 * @param   {Number}    params.per_page       Number of results per page.
 * @param   {Number}    params.page           Page number, zero indexed.
 * @param   {Boolean}   params.include_totals true if a query summary must be included in the result, false otherwise. Default false;
 * @param   {String}    params.user_id        The user_id of the grants to retrieve.
 * @param   {String}    params.client_id      The client_id of the grants to retrieve.
 * @param   {String}    params.audience       The audience of the grants to retrieve.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(GrantsManager, 'getAll', 'resource.getAll');

/**
 * Delete an Auth0 grant.
 *
 * @method    delete
 * @memberOf  module:management.GrantsManager.prototype
 *
 * @example
 * var params = {
 *    id: 'GRANT_ID',
 *    user_id: 'USER_ID'
 * };
 *
 * management.deleteGrant(params, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Grant deleted.
 * });
 *
 * @param   {Object}    params         Grant parameters.
 * @param   {String}    params.id      Grant ID.
 * @param   {String}    params.user_id The user_id of the grants to delete.
 * @param   {Function}  [cb]           Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(GrantsManager, 'delete', 'resource.delete');

module.exports = GrantsManager;
