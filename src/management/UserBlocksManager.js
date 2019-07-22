var ArgumentError = require('rest-facade').ArgumentError;
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class
 * Abstracts interaction with the user-blocks endpoint.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var UserBlocksManager = function(options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide manager options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  var clientOptions = {
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers,
    query: { repeatParams: false }
  };

  var userBlocksByIdResource = new Auth0RestClient(
    options.baseUrl + '/user-blocks/:id',
    clientOptions,
    options.tokenProvider
  );
  this.userBlocksById = new RetryRestClient(userBlocksByIdResource, options.retry);

  var userBlocksByIdentifierResource = new Auth0RestClient(
    options.baseUrl + '/user-blocks',
    clientOptions,
    options.tokenProvider
  );
  this.userBlocksByIdentifier = new RetryRestClient(userBlocksByIdentifierResource, options.retry);
};

/**
 * Get user blocks by id.
 *
 * @method    get
 * @memberOf  module:management.UserBlocksManager.prototype
 *
 * @example
 * management.userBlocks.get({ id: USER_ID }, function (err, blocks) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(blocks);
 * });
 *
 *
 * @param   {Object}    params      The user data object..
 * @param   {String}    params.id   The user id.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
UserBlocksManager.prototype.get = function(params) {
  if (typeof params !== 'object' || typeof params.id !== 'string') {
    throw new ArgumentError('You must provide an user id for the get method');
  }

  return this.userBlocksById.get.apply(this.userBlocksById, arguments);
};

/**
 * Unblock an user by its id.
 *
 * @method    delete
 * @memberOf  module:management.UserBlocksManager.prototype
 *
 * @example
 * management.userBlocks.delete({ id: USER_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // User unblocked.
 * });
 *
 *
 * @param   {Object}    params      The user data object..
 * @param   {String}    params.id   The user id.
 * @param   {Function}  [cb]        Callback function
 *
 * @return  {Promise|undefined}
 */
UserBlocksManager.prototype.delete = function(params) {
  if (typeof params !== 'object' || typeof params.id !== 'string') {
    throw new ArgumentError('You must provide an user id for the delete method');
  }

  return this.userBlocksById.delete.apply(this.userBlocksById, arguments);
};

/**
 * Get user blocks by identifier.
 *
 * @method    getByIdentifier
 * @memberOf  module:management.UserBlocksManager.prototype
 *
 * @example
 * management.userBlocks.getByIdentifier({ identifier: USER_ID }, function (err, blocks) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(blocks);
 * });
 *
 *
 * @param   {Object}    params              The user data object..
 * @param   {String}    params.identifier   The user identifier, any of: username, phone_number, email.
 * @param   {Function}  [cb]                Callback function
 *
 * @return  {Promise|undefined}
 */
UserBlocksManager.prototype.getByIdentifier = function(params) {
  if (typeof params !== 'object' || typeof params.identifier !== 'string') {
    throw new ArgumentError('You must provide an user identifier for the getByIdentifier method');
  }

  return this.userBlocksByIdentifier.get.apply(this.userBlocksByIdentifier, arguments);
};

/**
 * Unblock an user by identifier.
 *
 * @method    deleteByIdentifier
 * @memberOf  module:management.UserBlocksManager.prototype
 *
 * @example
 * management.userBlocks.deleteByIdentifier({ identifier: USER_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // User unblocked.
 * });
 *
 *
 * @param   {Object}    params              The user data object..
 * @param   {String}    params.identifier   The user identifier, any of: username, phone_number, email.
 * @param   {Function}  [cb]                Callback function
 *
 * @return  {Promise|undefined}
 */
UserBlocksManager.prototype.deleteByIdentifier = function(params) {
  if (typeof params !== 'object' || typeof params.identifier !== 'string') {
    throw new ArgumentError(
      'You must provide an user identifier for the deleteByIdentifier method'
    );
  }

  return this.userBlocksByIdentifier.delete.apply(this.userBlocksByIdentifier, arguments);
};

module.exports = UserBlocksManager;
