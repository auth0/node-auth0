const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Abstracts interaction with the user-blocks endpoint.
 */
class UserBlocksManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    if (options === null || typeof options !== 'object') {
      throw new ArgumentError('Must provide manager options');
    }

    if (options.baseUrl === null || options.baseUrl === undefined) {
      throw new ArgumentError('Must provide a base URL for the API');
    }

    if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
      throw new ArgumentError('The provided base URL is invalid');
    }

    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers: options.headers,
      query: { repeatParams: false },
    };

    const userBlocksByIdResource = new Auth0RestClient(
      `${options.baseUrl}/user-blocks/:id`,
      clientOptions,
      options.tokenProvider
    );
    this.userBlocksById = new RetryRestClient(userBlocksByIdResource, options.retry);

    const userBlocksByIdentifierResource = new Auth0RestClient(
      `${options.baseUrl}/user-blocks`,
      clientOptions,
      options.tokenProvider
    );
    this.userBlocksByIdentifier = new RetryRestClient(
      userBlocksByIdentifierResource,
      options.retry
    );
  }

  /**
   * Get user blocks by id.
   *
   * @example
   * management.userBlocks.get({ id: USER_ID }, function (err, blocks) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(blocks);
   * });
   * @param   {object}    params      The user data object..
   * @param   {string}    params.id   The user id.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  get(params, ...restOfArgs) {
    if (typeof params !== 'object' || typeof params.id !== 'string') {
      throw new ArgumentError('You must provide an user id for the get method');
    }

    return this.userBlocksById.get(params, ...restOfArgs);
  }

  /**
   * Unblock an user by its id.
   *
   * @example
   * management.userBlocks.delete({ id: USER_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User unblocked.
   * });
   * @param   {object}    params      The user data object..
   * @param   {string}    params.id   The user id.
   * @param   {Function}  [cb]        Callback function
   * @returns  {Promise|undefined}
   */
  delete(params, ...restOfArgs) {
    if (typeof params !== 'object' || typeof params.id !== 'string') {
      throw new ArgumentError('You must provide an user id for the delete method');
    }

    return this.userBlocksById.delete(params, ...restOfArgs);
  }

  /**
   * Get user blocks by identifier.
   *
   * @example
   * management.userBlocks.getByIdentifier({ identifier: USER_ID }, function (err, blocks) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(blocks);
   * });
   * @param   {object}    params              The user data object..
   * @param   {string}    params.identifier   The user identifier, any of: username, phone_number, email.
   * @param   {Function}  [cb]                Callback function
   * @returns  {Promise|undefined}
   */
  getByIdentifier(params, ...restOfArgs) {
    if (typeof params !== 'object' || typeof params.identifier !== 'string') {
      throw new ArgumentError('You must provide an user identifier for the getByIdentifier method');
    }

    return this.userBlocksByIdentifier.get(params, ...restOfArgs);
  }

  /**
   * Unblock an user by identifier.
   *
   * @example
   * management.userBlocks.deleteByIdentifier({ identifier: USER_ID }, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // User unblocked.
   * });
   * @param   {object}    params              The user data object..
   * @param   {string}    params.identifier   The user identifier, any of: username, phone_number, email.
   * @param   {Function}  [cb]                Callback function
   * @returns  {Promise|undefined}
   */
  deleteByIdentifier(params, ...restOfArgs) {
    if (typeof params !== 'object' || typeof params.identifier !== 'string') {
      throw new ArgumentError(
        'You must provide an user identifier for the deleteByIdentifier method'
      );
    }

    return this.userBlocksByIdentifier.delete(params, ...restOfArgs);
  }
}

module.exports = UserBlocksManager;
