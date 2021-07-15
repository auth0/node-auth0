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
 * @class ClientCredentialsManager
 * The client credentials class provides a simple abstraction for performing CRUD operations
 * on Auth0 ClientCredentials.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var ClientCredentialsManager = function(options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide manager options');
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
    headers: options.headers,
    query: { repeatParams: false }
  };

  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/clients/:id/credentials/:credential_id',
    clientOptions,
    options.tokenProvider
  );
  this.clientCredentials = new RetryRestClient(auth0RestClient, options.retry);
};

/**
 * Create a new client credentials.
 *
 * @method    create
 * @memberOf  module:management.ClientCredentialsManager.prototype
 *
 * @example
 * management.clientCredentials.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client Credential created.
 * });
 *
 * @param   {Object}    data     Client Credential data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientCredentialsManager, 'create', 'clientCredentials.create');

/**
 * Create a new client credentials.
 *
 * @method    create
 * @memberOf  module:management.ClientCredentialsManager.prototype
 *
 * @example
 * management.clientCredentials.getAll(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client Credential created.
 * });
 *
 * @param   {Object}    [params]          ClientCredentials parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientCredentialsManager, 'getAll', 'clientCredentials.getAll');

/**
 * Create a new client credentials.
 *
 * @method    create
 * @memberOf  module:management.ClientCredentialsManager.prototype
 *
 * @example
 * management.clientCredentials.getById(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client Credential created.
 * });
 *
 * @param   {Object}    params        ClientCredential parameters.
 * @param   {String}    params.id     ClientCredential ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientCredentialsManager, 'getByID', 'clientCredentials.get');

/**
 * Delete an existing client credentials.
 *
 * @method    delete
 * @memberOf  module:management.ClientCredentialsManager.prototype
 *
 * @example
 * management.clientCredentials.delete(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Client Credential created.
 * });
 *
 * @param   {Object}    params        ClientCredential parameters.
 * @param   {String}    params.id     ClientCredential ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientCredentialsManager, 'delete', 'clientCredentials.delete');

module.exports = ClientCredentialsManager;
