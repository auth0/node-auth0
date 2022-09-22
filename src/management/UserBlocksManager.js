const { ArgumentError } = require('rest-facade');
const BaseManager = require('./BaseManager');

/**
 * Abstracts interaction with the user-blocks endpoint.
 */
class UserBlocksManager extends BaseManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    super(options);

    this.userBlocksById = this._getRestClient('/user-blocks/:id');

    this.userBlocksByIdentifier = this._getRestClient('/user-blocks');
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
