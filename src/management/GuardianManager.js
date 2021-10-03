const { ArgumentError } = require('rest-facade');
const utils = require('../utils');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 *
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class
 * Abstracts interaction with the Guardian endpoint.
 * @class
 * @memberof module:management
 * @param {object} options            The client options.
 * @param {string} options.baseUrl    The URL of the API.
 * @param {object} [options.headers]  Headers to be included in all requests.
 * @param {object} [options.retry]    Retry Policy Config
 */
const GuardianManager = function (options) {
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
   * Provides an abstraction layer for retrieving Guardian enrollments.
   *
   * @type {external:RestClient}
   */
  const guardianEnrollmentsAuth0RestClient = new Auth0RestClient(
    `${options.baseUrl}/guardian/enrollments/:id`,
    clientOptions,
    options.tokenProvider
  );
  this.enrollments = new RetryRestClient(guardianEnrollmentsAuth0RestClient, options.retry);

  /**
   * Provides an abstraction layer for retrieving Guardian tickets.
   *
   * @type {external:RestClient}
   */
  const guardianTicketsAuth0RestClient = new Auth0RestClient(
    `${options.baseUrl}/guardian/enrollments/ticket`,
    clientOptions,
    options.tokenProvider
  );
  this.tickets = new RetryRestClient(guardianTicketsAuth0RestClient, options.retry);

  /**
   * Provides an abstraction layer for retrieving Guardian factors.
   *
   * @type {external:RestClient}
   */
  const guardianFactorsAuth0RestClient = new Auth0RestClient(
    `${options.baseUrl}/guardian/factors/:name`,
    clientOptions,
    options.tokenProvider
  );
  this.factors = new RetryRestClient(guardianFactorsAuth0RestClient, options.retry);

  /**
   * Provides an abstraction layer for configuring Factor settings
   *
   * @type {external:RestClient}
   */
  const guardianFactorSettingsAuth0RestClient = new Auth0RestClient(
    `${options.baseUrl}/guardian/factors/:name/settings`,
    clientOptions,
    options.tokenProvider
  );
  this.factorSettings = new RetryRestClient(guardianFactorSettingsAuth0RestClient, options.retry);

  /**
   * Provides an abstraction layer for retrieving Guardian factor templates.
   *
   * @type {external:RestClient}
   */
  const guardianFactorsTemplatesAuth0RestClient = new Auth0RestClient(
    `${options.baseUrl}/guardian/factors/:name/templates`,
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
  const guardianFactorsProvidersAuth0RestClient = new Auth0RestClient(
    `${options.baseUrl}/guardian/factors/:name/providers/:provider`,
    clientOptions,
    options.tokenProvider
  );
  this.factorsProviders = new RetryRestClient(
    guardianFactorsProvidersAuth0RestClient,
    options.retry
  );

  /**
   * Provides an abstraction layer for retrieving Guardian policies.
   *
   * @type {external:RestClient}
   */
  const guardianPoliciesAuth0RestClient = new Auth0RestClient(
    `${options.baseUrl}/guardian/policies`,
    clientOptions,
    options.tokenProvider
  );
  this.policies = new RetryRestClient(guardianPoliciesAuth0RestClient, options.retry);

  /**
   * Provides an abstraction layer for retrieving Guardian phone factor selected provider.
   *
   * @type {external:RestClient}
   */
  const guardianFactorsPhoneSelectedProviderAuth0RestClient = new Auth0RestClient(
    `${options.baseUrl}/guardian/factors/sms/selected-provider`,
    clientOptions,
    options.tokenProvider
  );
  this.factorsPhoneSelectedProvider = new RetryRestClient(
    guardianFactorsPhoneSelectedProviderAuth0RestClient,
    options.retry
  );

  /**
   * Provides an abstraction layer for retrieving Guardian phone factor message types.
   *
   * @type {external:RestClient}
   */
  const guardianFactorsPhoneMessageTypesAuth0RestClient = new Auth0RestClient(
    `${options.baseUrl}/guardian/factors/phone/message-types`,
    clientOptions,
    options.tokenProvider
  );
  this.factorsPhoneMessageTypes = new RetryRestClient(
    guardianFactorsPhoneMessageTypesAuth0RestClient,
    options.retry
  );
};

/**
 * Get a single Guardian enrollment.
 *
 * @function    getGuardianEnrollment
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.getGuardianEnrollment({ id: ENROLLMENT_ID }, function (err, enrollment) {
 *   console.log(enrollment);
 * });
 * @param   {object}    data      The user data object.
 * @param   {string}    data.id   The user id.
 * @param   {Function}  [cb]      Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'getGuardianEnrollment', 'enrollments.get');

/**
 * Delete a Guardian enrollment.
 *
 * @function    deleteGuardianEnrollment
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.deleteGuardianEnrollment({ id: ENROLLMENT_ID }, function (err, enrollments) {
 *   console.log(enrollments);
 * });
 * @param   {object}    data      The user data object.
 * @param   {string}    data.id   The user id.
 * @param   {Function}  [cb]      Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'deleteGuardianEnrollment', 'enrollments.delete');

/**
 * Create a Guardian enrollment ticket.
 *
 * @function    createEnrollmentTicket
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.createEnrollmentTicket(function (err, ticket) {
 *   console.log(ticket);
 * });
 * @param   {Function}  [cb]      Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'createEnrollmentTicket', 'tickets.create');

/**
 * Get a list of factors and statuses.
 *
 * @function    getFactors
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.getFactors(function (err, factors) {
 *   console.log(factors.length);
 * });
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'getFactors', 'factors.getAll');

/**
 * Get Guardian factor configuration
 *
 * @function    getFactorSettings
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.getFactorSettings({ name: 'webauthn-roaming' }, function (err, settings) {
 *   console.log(settings);
 * });
 * @param   {object}    params            Factor  parameters.
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'getFactorSettings', 'factorSettings.get');

/**
 * Update Guardian factor configuration
 *
 * @function    updateFactorSettings
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.updateFactorSettings(
 *  { name: 'webauthn-roaming' },
 *  { userVerification: 'discouraged', overrideRelyingParty: false },
 *  function (err, settings) {
 *   console.log(settings);
 * });
 * @param   {object}    params            Factor  parameters.
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'updateFactorSettings', 'factorSettings.update');

/**
 * Get Guardian factor provider configuration
 *
 * @function    getFactorProvider
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.getFactorProvider({ name: 'sms', provider: 'twilio'}, function (err, provider) {
 *   console.log(provider);
 * });
 * @param   {object}    params            Factor provider parameters.
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'getFactorProvider', 'factorsProviders.get');

/**
 * Update Guardian's factor provider
 *
 * @function    updateFactorProvider
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.updateFactorProvider({ name: 'sms', provider: 'twilio' }, {
 *   messaging_service_sid: 'XXXXXXXXXXXXXX',
 *   auth_token: 'XXXXXXXXXXXXXX',
 *   sid: 'XXXXXXXXXXXXXX'
 * }, function (err, provider) {
 *   console.log(provider);
 * });
 * @param   {object}    params            Factor provider parameters.
 * @param   {object}    data              Updated Factor provider data.
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'updateFactorProvider', 'factorsProviders.update');

/**
 * Get Guardian enrollment and verification factor templates
 *
 * @function    getFactorTemplates
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.getFactorTemplates({ name: 'sms' }, function (err, templates) {
 *   console.log(templates);
 * });
 * @param   {object}    params            Factor parameters.
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'getFactorTemplates', 'factorsTemplates.get');

/**
 * Update Guardian enrollment and verification factor templates
 *
 * @function    updateFactorTemplates
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.updateFactorProvider({ name: 'sms' }, {
 *   enrollment_message: "{{code}} is your verification code for {{tenant.friendly_name}}. Please enter this code to verify your enrollment.",
 *   verification_message: "{{code}} is your verification code for {{tenant.friendly_name}}"
 * }, function (err, templates) {
 *   console.log(templates);
 * });
 * @param   {object}    params            Factor parameters.
 * @param   {object}    data              Updated factor templates data.
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'updateFactorTemplates', 'factorsTemplates.update');

/**
 * Update Guardian Factor
 *
 * @function    updateFactor
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.updateFactor({ name: 'sms' }, {
 *   enabled: true
 * }, function (err, factor) {
 *   console.log(factor);
 * });
 * @param   {object}    params            Factor parameters.
 * @param   {object}    data              Updated factor data.
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'updateFactor', 'factors.update');

/**
 * Get enabled Guardian policies
 *
 * @function    getPolicies
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.getPolicies(function (err, policies) {
 *   console.log(policies);
 * });
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'getPolicies', 'policies.get');

/**
 * Update enabled Guardian policies
 *
 * @function    updatePolicies
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.updatePolicies({}, [
 *   'all-applications'
 * ], function (err, policies) {
 *   console.log(policies);
 * });
 * @param   {object}    params            Parameters.
 * @param   {string[]}  data              Policies to enable. Empty array disables all policies.
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(GuardianManager, 'updatePolicies', 'policies.update');

/**
 * Get the Guardian phone factor's selected provider
 *
 * @function    getPhoneFactorSelectedProvider
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.getPhoneFactorSelectedProvider(function (err, selectedProvider) {
 *   console.log(selectedProvider);
 * });
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  GuardianManager,
  'getPhoneFactorSelectedProvider',
  'factorsPhoneSelectedProvider.get'
);

/**
 * Update the Guardian phone factor's selected provider
 *
 * @function    updatePhoneFactorSelectedProvider
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.updatePhoneFactorSelectedProvider({}, {
 *   provider: 'twilio'
 * }, function (err, factor) {
 *   console.log(factor);
 * });
 * @param   {object}    params            Parameters.
 * @param   {object}    data              Updated selected provider data.
 * @param   {string}    data.provider     Name of the selected provider
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  GuardianManager,
  'updatePhoneFactorSelectedProvider',
  'factorsPhoneSelectedProvider.update'
);

/**
 * Get the Guardian phone factor's message types
 *
 * @function    getPhoneFactorMessageTypes
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.getPhoneFactorMessageTypes(function (err, messageTypes) {
 *   console.log(messageTypes);
 * });
 * @param   {Function}  [cb]              Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  GuardianManager,
  'getPhoneFactorMessageTypes',
  'factorsPhoneMessageTypes.get'
);

/**
 * Update the Guardian phone factor's message types
 *
 * @function    updatePhoneFactorMessageTypes
 * @memberof  module:management.GuardianManager.prototype
 * @example
 * management.guardian.updatePhoneFactorMessageTypes({}, {
 *   message_types: ['sms', 'voice']
 * }, function (err, factor) {
 *   console.log(factor);
 * });
 * @param   {object}    params                Parameters.
 * @param   {object}    data                  Updated selected provider data.
 * @param   {string[]}  data.message_types    Message types (only `"sms"` and `"voice"` are supported).
 * @param   {Function}  [cb]                  Callback function.
 * @returns  {Promise|undefined}
 */
utils.wrapPropertyMethod(
  GuardianManager,
  'updatePhoneFactorMessageTypes',
  'factorsPhoneMessageTypes.update'
);

module.exports = GuardianManager;
