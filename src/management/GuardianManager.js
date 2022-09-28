const BaseManager = require('./BaseManager');

/**
 * Abstracts interaction with the Guardian endpoint.
 */
class GuardianManager extends BaseManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    super(options);

    /**
     * Provides an abstraction layer for retrieving Guardian enrollments.
     *
     * @type {external:RestClient}
     */
    this.enrollments = this._getRestClient('/guardian/enrollments/:id');

    /**
     * Provides an abstraction layer for retrieving Guardian tickets.
     *
     * @type {external:RestClient}
     */
    this.tickets = this._getRestClient('/guardian/enrollments/ticket');

    /**
     * Provides an abstraction layer for retrieving Guardian factors.
     *
     * @type {external:RestClient}
     */
    this.factors = this._getRestClient('/guardian/factors/:name');

    /**
     * Provides an abstraction layer for configuring Factor settings
     *
     * @type {external:RestClient}
     */
    this.factorSettings = this._getRestClient('/guardian/factors/:name/settings');

    /**
     * Provides an abstraction layer for retrieving Guardian factor templates.
     *
     * @type {external:RestClient}
     */
    this.factorsTemplates = this._getRestClient('/guardian/factors/:name/templates');

    /**
     * Provides an abstraction layer for retrieving Guardian factor providers.
     *
     * @type {external:RestClient}
     */
    this.factorsProviders = this._getRestClient('/guardian/factors/:name/providers/:provider');

    /**
     * Provides an abstraction layer for retrieving Guardian policies.
     *
     * @type {external:RestClient}
     */
    this.policies = this._getRestClient('/guardian/policies');

    /**
     * Provides an abstraction layer for retrieving Guardian phone factor selected provider.
     *
     * @type {external:RestClient}
     */
    this.factorsPhoneSelectedProvider = this._getRestClient(
      '/guardian/factors/sms/selected-provider'
    );

    /**
     * Provides an abstraction layer for retrieving Guardian phone factor message types.
     *
     * @type {external:RestClient}
     */
    this.factorsPhoneMessageTypes = this._getRestClient('/guardian/factors/phone/message-types');
  }

  /**
   * Get a single Guardian enrollment.
   *
   * @example
   * management.guardian.getGuardianEnrollment({ id: ENROLLMENT_ID }, function (err, enrollment) {
   *   console.log(enrollment);
   * });
   * @param   {object}    data      The user data object.
   * @param   {string}    data.id   The user id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  getGuardianEnrollment(...args) {
    return this.enrollments.get(...args);
  }

  /**
   * Delete a Guardian enrollment.
   *
   * @example
   * management.guardian.deleteGuardianEnrollment({ id: ENROLLMENT_ID }, function (err, enrollments) {
   *   console.log(enrollments);
   * });
   * @param   {object}    data      The user data object.
   * @param   {string}    data.id   The user id.
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  deleteGuardianEnrollment(...args) {
    return this.enrollments.delete(...args);
  }

  /**
   * Create a Guardian enrollment ticket.
   *
   * @example
   * management.guardian.createEnrollmentTicket(function (err, ticket) {
   *   console.log(ticket);
   * });
   * @param   {Function}  [cb]      Callback function.
   * @returns  {Promise|undefined}
   */
  createEnrollmentTicket(...args) {
    return this.tickets.create(...args);
  }

  /**
   * Get a list of factors and statuses.
   *
   * @example
   * management.guardian.getFactors(function (err, factors) {
   *   console.log(factors.length);
   * });
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getFactors(...args) {
    return this.factors.getAll(...args);
  }

  /**
   * Get Guardian factor configuration
   *
   * @example
   * management.guardian.getFactorSettings({ name: 'webauthn-roaming' }, function (err, settings) {
   *   console.log(settings);
   * });
   * @param   {object}    params            Factor  parameters.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getFactorSettings(...args) {
    return this.factorSettings.get(...args);
  }

  /**
   * Update Guardian factor configuration
   *
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
  updateFactorSettings(...args) {
    return this.factorSettings.update(...args);
  }

  /**
   * Get Guardian factor provider configuration
   *
   * @example
   * management.guardian.getFactorProvider({ name: 'sms', provider: 'twilio'}, function (err, provider) {
   *   console.log(provider);
   * });
   * @param   {object}    params            Factor provider parameters.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getFactorProvider(...args) {
    return this.factorsProviders.get(...args);
  }

  /**
   * Update Guardian's factor provider
   *
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
  updateFactorProvider(...args) {
    return this.factorsProviders.update(...args);
  }

  /**
   * Get Guardian enrollment and verification factor templates
   *
   * @example
   * management.guardian.getFactorTemplates({ name: 'sms' }, function (err, templates) {
   *   console.log(templates);
   * });
   * @param   {object}    params            Factor parameters.
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getFactorTemplates(...args) {
    return this.factorsTemplates.get(...args);
  }

  /**
   * Update Guardian enrollment and verification factor templates
   *
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
  updateFactorTemplates(...args) {
    return this.factorsTemplates.update(...args);
  }

  /**
   * Update Guardian Factor
   *
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
  updateFactor(...args) {
    return this.factors.update(...args);
  }

  /**
   * Get enabled Guardian policies
   *
   * @example
   * management.guardian.getPolicies(function (err, policies) {
   *   console.log(policies);
   * });
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getPolicies(...args) {
    return this.policies.get(...args);
  }

  /**
   * Update enabled Guardian policies
   *
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
  updatePolicies(...args) {
    return this.policies.update(...args);
  }

  /**
   * Get the Guardian phone factor's selected provider
   *
   * @example
   * management.guardian.getPhoneFactorSelectedProvider(function (err, selectedProvider) {
   *   console.log(selectedProvider);
   * });
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getPhoneFactorSelectedProvider(...args) {
    return this.factorsPhoneSelectedProvider.get(...args);
  }

  /**
   * Update the Guardian phone factor's selected provider
   *
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
  updatePhoneFactorSelectedProvider(...args) {
    return this.factorsPhoneSelectedProvider.update(...args);
  }

  /**
   * Get the Guardian phone factor's message types
   *
   * @example
   * management.guardian.getPhoneFactorMessageTypes(function (err, messageTypes) {
   *   console.log(messageTypes);
   * });
   * @param   {Function}  [cb]              Callback function.
   * @returns  {Promise|undefined}
   */
  getPhoneFactorMessageTypes(...args) {
    return this.factorsPhoneMessageTypes.get(...args);
  }

  /**
   * Update the Guardian phone factor's message types
   *
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
  updatePhoneFactorMessageTypes(...args) {
    return this.factorsPhoneMessageTypes.update(...args);
  }
}

module.exports = GuardianManager;
