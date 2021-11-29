const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Abstracts interaction with the tickets endpoint.
 */
class TicketsManager {
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

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/Tickets Tickets endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/tickets/:type`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);
  }

  /**
   * Create a new password change ticket.
   *
   * @example
   * var params = {
   *   result_url: '{REDIRECT_URL}',  // Redirect after using the ticket.
   *   user_id: '{USER_ID}',  // Optional.
   *   email: '{USER_EMAIL}',  // Optional.
   *   new_password: '{PASSWORD}'
   * };
   *
   * management.tickets.changePassword(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}  data
   * @param   {string}  [data.result_url] URL the user will be redirected to once ticket is used.
   * @param   {string}  [data.user_id] user_id for whom the ticket should be created. (Conflicts with: connection_id, email)
   * @param   {string}  [data.client_id] ID of the client.
   * @param   {string}  [data.organization_id] ID of the organization.
   * @param   {string}  [data.connection_id] ID of the connection.
   * @param   {Integer} [data.ttl_sec] Number of seconds for which the ticket is valid before expiration.
   * @param   {string}  [data.email] Email of the user. (Requires: connection_id)
   * @param   {boolean} [data.mark_email_as_verified] Whether to set the email_verified attribute to true (true) or whether it should not be updated (false).
   * @param   {boolean} [data.includeEmailInRedirect] Whether to include the email address as part of the returnUrl in the reset_email (true), or not (false).
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise}
   */
  changePassword(data, cb) {
    const params = { type: 'password-change' };

    if (cb && cb instanceof Function) {
      return this.resource.create(params, data, cb);
    }

    // Return a promise.
    return this.resource.create(params, data);
  }

  /**
   * Create an email verification ticket.
   *
   * @example
   * var data = {
   *   user_id: '{USER_ID}',
   *   result_url: '{REDIRECT_URL}' // Optional redirect after the ticket is used.
   * };
   *
   * management.tickets.verifyEmail(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}  data
   * @param   {string}  [data.result_url] URL the user will be redirected to once ticket is used.
   * @param   {string}  data.user_id user_id for whom the ticket should be created.
   * @param   {Integer} [data.ttl_sec] Number of seconds for which the ticket is valid before expiration.
   * @param   {boolean} [data.includeEmailInRedirect] Whether to include the email address as part of the result_url (true), or not (false).
   * @param   {object}  [data.identity] Used to verify secondary, federated, and passwordless-email identities.
   * @param   {string}  data.identity.user_id user_id of the identity.
   * @param   {string}  data.identity.provider provider of the identity.
   * @param   {string}  [data.client_id] client ID.
   * @param   {string}  [data.organization_id] organization ID.
   * @param   {Function}  [cb]  Callback function.
   * @returns  {Promise}
   */
  verifyEmail(data, cb) {
    const params = { type: 'email-verification' };

    if (cb && cb instanceof Function) {
      return this.resource.create(params, data, cb);
    }

    // Return a promise.
    return this.resource.create(params, data);
  }
}

module.exports = TicketsManager;
