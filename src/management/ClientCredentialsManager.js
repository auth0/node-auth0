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
var ClientCredentialsManager = function (options) {
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
    query: { repeatParams: false },
  };

  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/clients/:client_id/credentials/:credential_id',
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
 * var params = { client_id: CLIENT_ID };
 *
 * management.clientCredentials.create(params, data, function (err, credential) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // The credential created.
 *   console.log({credential});
 * });
 *
 *
 * @param   {string}    params.client_id   The client id.
 * @param   {Object}    data               Client Credential data object.
 * @param   {Function}  [cb]               Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientCredentialsManager, 'create', 'clientCredentials.create');

/**
 * Return a list of credentials for a given client.
 *
 * @method    create
 * @memberOf  module:management.ClientCredentialsManager.prototype
 *
 * @example
 * var params = { client_id: CLIENT_ID };
 *
 * management.clientCredentials.getAll(params, function (err, credentials) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // A list of credentials associated with that client.
 *   console.log({credentials});
 * });
 *
 * @param   {string}    params.client_id   The client id.
 * @param   {Function}  [cb]               Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientCredentialsManager, 'getAll', 'clientCredentials.getAll');

/**
 * Return a credential for a given client.
 *
 * @method    create
 * @memberOf  module:management.ClientCredentialsManager.prototype
 *
 * @example
 * var params = { client_id: CLIENT_ID, credential_id: CREDENTIAL_ID };
 *
 * management.clientCredentials.getById(data, function (err, credential) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // A specific credential associated with that credential.
 *   console.log({credential});
 * });
 *
 * @param   {string}    params.client_id      The client id.
 * @param   {String}    params.credential_id  The credential id.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientCredentialsManager, 'getByID', 'clientCredentials.get');

/**
 * Delete a credential for a given client..
 *
 * @method    delete
 * @memberOf  module:management.ClientCredentialsManager.prototype
 *
 * @example
 * var params = { client_id: CLIENT_ID, credential_id: CREDENTIAL_ID };
 *
 * management.clientCredentials.delete(params, data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {string}    params.client_id      The client id.
 * @param   {String}    params.credential_id  The credential id.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ClientCredentialsManager, 'delete', 'clientCredentials.delete');

module.exports = ClientCredentialsManager;
