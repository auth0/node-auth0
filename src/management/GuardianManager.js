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

  /**
   * Provides an abstraction layer for retrieving Guardian tickets.
   *
   * @type {external:RestClient}
   */
  var guardianTicketsAuth0RestClient = new Auth0RestClient(
    options.baseUrl + '/guardian/enrollments/ticket',
    clientOptions,
    options.tokenProvider
  );
  this.tickets = new RetryRestClient(guardianTicketsAuth0RestClient, options.retry);

  /**
   * Provides an abstraction layer for retrieving Guardian factors.
   *
   * @type {external:RestClient}
   */
  var guardianFactorsAuth0RestClient = new Auth0RestClient(
    options.baseUrl + '/guardian/factors/:name',
    clientOptions,
    options.tokenProvider
  );
  this.factors = new RetryRestClient(guardianFactorsAuth0RestClient, options.retry);

  /**
   * Provides an abstraction layer for retrieving Guardian factors.
   *
   * @type {external:RestClient}
   */
  var guardianFactorsTemplatesAuth0RestClient = new Auth0RestClient(
    options.baseUrl + '/guardian/factors/:name/templates',
    clientOptions,
    options.tokenProvider
  );
  this.factorsTemplates = new RetryRestClient(
    guardianFactorsTemplatesAuth0RestClient,
    options.retry
  );

  /**
   * Provides an abstraction layer for retrieving Guardian factor providers.
   *
   * @type {external:RestClient}
   */
  var guardianFactorsProvidersAuth0RestClient = new Auth0RestClient(
    options.baseUrl + '/guardian/factors/:name/providers/:provider',
    clientOptions,
    options.tokenProvider
  );
  this.factorsProviders = new RetryRestClient(
    guardianFactorsProvidersAuth0RestClient,
    options.retry
  );
};

/**
 * Get a single Guardian enrollment.
 *
 * @method    getGuardianEnrollment
 * @memberOf  module:management.GuardianManager.prototype
 *
 * @example
 * management.guardian.getGuardianEnrollment({ id: ENROLLMENT_ID }, function (err, enrollment) {
 *   console.log(enrollment);
 * });
 *
 * @param   {Object}    data      The user data object.
 * @param   {String}    data.id   The user id.
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'getGuardianEnrollment', 'enrollments.get');

/**
 * Delete a Guardian enrollment.
 *
 * @method    deleteGuardianEnrollment
 * @memberOf  module:management.GuardianManager.prototype
 *
 * @example
 * management.guardian.deleteGuardianEnrollment({ id: ENROLLMENT_ID }, function (err, enrollments) {
 *   console.log(enrollments);
 * });
 *
 * @param   {Object}    data      The user data object.
 * @param   {String}    data.id   The user id.
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'deleteGuardianEnrollment', 'enrollments.delete');

/**
 * Create a Guardian enrollment ticket.
 *
 * @method    createEnrollmentTicket
 * @memberOf  module:management.GuardianManager.prototype
 *
 * @example
 * management.guardian.createEnrollmentTicket(function (err, ticket) {
 *   console.log(ticket);
 * });
 *
 * @param   {Function}  [cb]      Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'createEnrollmentTicket', 'tickets.create');

/**
 * Get a list of factors and statuses.
 *
 * @method    getFactors
 * @memberOf  module:management.GuardianManager.prototype
 *
 * management.guardian.getFactors(function (err, factors) {
 *   console.log(factors.length);
 * });
 *
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'getFactors', 'factors.getAll');

/**
 * Get Guardian factor provider configuration
 *
 * @method    getFactorProvider
 * @memberOf  module:management.GuardianManager.prototype
 *
 * management.guardian.getFactorProvider({ name: 'sms', provider: 'twilio'}, function (err, provider) {
 *   console.log(provider);
 * });
 *
 * @param   {Object}    params            Factor provider parameters.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'getFactorProvider', 'factorsProviders.get');

/**
 * Update Guardian's factor provider
 *
 * @method    updateFactorProvider
 * @memberOf  module:management.GuardianManager.prototype
 *
 * management.guardian.updateFactorProvider({ name: 'sms', provider: 'twilio' }, {
 *  messaging_service_sid: 'XXXXXXXXXXXXXX',
 *  auth_token: 'XXXXXXXXXXXXXX',
 *  sid: 'XXXXXXXXXXXXXX'
 * }, function(err, provider) {
 *  console.log(provider);
 * });
 *
 * @param   {Object}    params            Factor provider parameters.
 * @param   {Object}    data              Updated Factor provider data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'updateFactorProvider', 'factorsProviders.update');

/**
 * Get Guardian enrollment and verification factor templates
 *
 * @method    getFactorTemplates
 * @memberOf  module:management.GuardianManager.prototype
 *
 * management.guardian.getFactorTemplates({ name: 'sms' }, function (err, templates) {
 *   console.log(templates);
 * });
 *
 * @param   {Object}    params            Factor parameters.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'getFactorTemplates', 'factorsTemplates.get');

/**
 * Update Guardian enrollment and verification factor templates
 *
 * @method    updateFactorTemplates
 * @memberOf  module:management.GuardianManager.prototype
 *
 * management.guardian.updateFactorProvider({ name: 'sms' }, {
 *  enrollment_message: "{{code}} is your verification code for {{tenant.friendly_name}}. Please enter this code to verify your enrollment.",
 *  verification_message: "{{code}} is your verification code for {{tenant.friendly_name}}"
 * }, function(err, templates) {
 *  console.log(templates);
 * });
 *
 * @param   {Object}    params            Factor parameters.
 * @param   {Object}    data              Updated factor templates data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'updateFactorTemplates', 'factorsTemplates.update');

/**
 * Update Guardian Factor
 *
 * @method    updateFactor
 * @memberOf  module:management.GuardianManager.prototype
 *
 * management.guardian.updateFactor({ name: 'sms' }, {
 *  enabled: true
 * }, function(err, factor) {
 *  console.log(factor);
 * });
 *
 * @param   {Object}    params            Factor parameters.
 * @param   {Object}    data              Updated factor data.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'updateFactor', 'factors.update');

module.exports = GuardianManager;
