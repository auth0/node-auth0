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
 * Abstracts interaction with the Guardian endpoint.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var GuardianManager = function(options) {
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
   * Provides an abstraction layer for retrieving Guardian enrollments.
   *
   * @type {external:RestClient}
   */
  var guardianEnrollmentsAuth0RestClient = new Auth0RestClient(
    options.baseUrl + '/guardian/enrollments/:id',
    clientOptions,
    options.tokenProvider
  );
  this.enrollments = new RetryRestClient(guardianEnrollmentsAuth0RestClient, options.retry);
};

/**
 * Get a single Guardian enrollment.
 *
 * @method    getGuardianEnrollment
 * @memberOf  module:management.GuardianManager.prototype
 *
 * @example
 * management.users.getGuardianEnrollment({ id: ENROLLMENT_ID }, function (err, enrollment) {
 *   console.log(enrollment);
 * });
 *
 * @param   {Object}    data      The user data object.
 * @param   {String}    data.id   The user id.
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
GuardianManager.prototype.getGuardianEnrollment = function(params, cb) {
  return this.enrollments.get(params, cb);
};

/**
 * Delete a Guardian enrollment.
 *
 * @method    deleteGuardianEnrollment
 * @memberOf  module:management.GuardianManager.prototype
 *
 * @example
 * management.users.deleteGuardianEnrollment({ id: ENROLLMENT_ID }, function (err, enrollments) {
 *   console.log(enrollments);
 * });
 *
 * @param   {Object}    data      The user data object.
 * @param   {String}    data.id   The user id.
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
GuardianManager.prototype.deleteGuardianEnrollment = function(params, cb) {
  return this.enrollments.delete(params, cb);
};

module.exports = GuardianManager;
