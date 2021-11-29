const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * This class provides a simple abstraction for performing CRUD operations
 * on Auth0's Email Templates. {@link https://auth0.com/docs/api/management/v2#!/Email_Templates/get_email_templates_by_templateName}
 */
class EmailTemplatesManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
    if (!options || 'object' !== typeof options) {
      throw new ArgumentError('Must provide manager options');
    }

    if (!options.baseUrl || 'string' !== typeof options.baseUrl) {
      throw new ArgumentError('Must provide a valid string as base URL for the API');
    }

    /**
     * Options object for the Rest Client instance.
     *
     * @type {object}
     */
    const clientOptions = {
      headers: options.headers,
      query: { repeatParams: false },
    };

    /**
     * Provides an abstraction layer for performing CRUD operations on
     * {@link https://auth0.com/docs/api/management/v2#!/Email_Templates/get_email_templates_by_templateName Auth0's Email Templates}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/email-templates/:name`,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);
  }

  /**
   * Create a new Email Template.
   *
   * @example
   * management.emailTemplates.create(data, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   // Email Template created.
   * });
   * @param   {object}    data     Email Template data object.
   * @param   {Function}  [cb]     Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.resource.create(...args);
  }

  /**
   * Get an Auth0 Email Template.
   *
   * @example
   * management.emailTemplates.get({ name: EMAIL_TEMPLATE_NAME }, function (err, emailTemplate) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(emailTemplate);
   * });
   * @param   {object}    params          Email Template parameters.
   * @param   {string}    params.name     Template Name
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.resource.get(...args);
  }

  /**
   * Update an existing Email Template.
   *
   * @example
   * var data = { from: 'new@email.com' };
   * var params = { name: EMAIL_TEMPLATE_NAME };
   *
   * management.emailTemplates.update(params, data, function (err, emailTemplate) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(emailTemplate.from);  // 'new@email.com'
   * });
   * @param   {object}    params          Email Template parameters.
   * @param   {string}    params.name     Template Name
   * @param   {object}    data            Updated Email Template data.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  update(...args) {
    return this.resource.patch(...args);
  }
}

module.exports = EmailTemplatesManager;
