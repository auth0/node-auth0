var ArgumentError = require('rest-facade').ArgumentError;
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * @class
 * Abstracts interaction with the tickets endpoint.
 * @constructor
 * @memberOf module:management
 * 
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var TicketsManager = function (options){
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

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/v2#!/Tickets Tickets endpoint}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(options.baseUrl + '/tickets/:type', clientOptions, options.tokenProvider);
  this.ticket = new RetryRestClient(auth0RestClient, options.retry);
};


/**
 * Create a new password change ticket.
 *
 * @method    changePassword
 * @memberOf  module:management.TicketsManager.prototype
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
 *
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}
 */
TicketsManager.prototype.changePassword = function (data, cb) {
  var params = { type: 'password-change' };

  if (cb && cb instanceof Function) {
    return this.ticket.create(params, data, cb);
  }

  // Return a promise.
  return this.ticket.create(params, data);
};


/**
 * Create an email verification ticket.
 *
 * @method    verifyEmail
 * @memberOf  module:management.TicketsManager.prototype
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
 *
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}
 */
TicketsManager.prototype.verifyEmail = function (data, cb) {
  var params = { type: 'email-verification' };

  if (cb && cb instanceof Function) {
    return this.ticket.create(params, data, cb);
  }

  // Return a promise.
  return this.ticket.create(params, data);
};


module.exports = TicketsManager;

