const { ArgumentError } = require('rest-facade');
const { wrapPropertyMethod } = require('../utils');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class EmailTemplatesManager
 * This class provides a simple abstraction for performing CRUD operations
 * on Auth0's Email Templates. {@see https://auth0.com/docs/api/management/v2#!/Email_Templates/get_email_templates_by_templateName}
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
class EmailTemplatesManager {
  constructor(options) {
    if (!options || 'object' !== typeof options) {
      throw new ArgumentError('Must provide manager options');
    }

    if (!options.baseUrl || 'string' !== typeof options.baseUrl) {
      throw new ArgumentError('Must provide a valid string as base URL for the API');
    }

    const { headers, baseUrl, tokenProvider, retry } = options;

    /**
     * Options object for the Rest Client instance.
     *
     * @type {Object}
     */
    const clientOptions = {
      headers,
      query: { repeatParams: false }
    };

    /**
     * Provides an abstraction layer for performing CRUD operations on
     * {@link https://auth0.com/docs/api/management/v2#!/Email_Templates/get_email_templates_by_templateName Auth0's Email Templates}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${baseUrl}/email-templates/:name`,
      clientOptions,
      tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, retry);
  }
}
/**
 * Create a new Email Template.
 *
 * @method    create
 * @memberOf  module:management.EmailTemplatesManager.prototype
 *
 * @example
 * management.emailTemplates.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Email Template created.
 * });
 *
 * @param   {Object}    data     Email Template data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(EmailTemplatesManager, 'create', 'resource.create');

/**
 * Get an Auth0 Email Template.
 *
 * @method    get
 * @memberOf  module:management.EmailTemplatesManager.prototype
 *
 * @example
 * management.emailTemplates.get({ name: EMAIL_TEMPLATE_NAME }, function (err, emailTemplate) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(emailTemplate);
 * });
 *
 * @param   {Object}    params          Email Template parameters.
 * @param   {String}    params.name     Template Name
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(EmailTemplatesManager, 'get', 'resource.get');

/**
 * Update an existing Email Template.
 *
 * @method    update
 * @memberOf  module:management.EmailTemplatesManager.prototype
 *
 * @example
 * const data = { from: 'new@email.com' };
 * const params = { name: EMAIL_TEMPLATE_NAME };
 *
 * management.emailTemplates.update(params, data, function (err, emailTemplate) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(emailTemplate.from);  // 'new@email.com'
 * });
 *
 * @param   {Object}    params          Email Template parameters.
 * @param   {String}    params.name     Template Name
 * @param   {Object}    data            Updated Email Template data.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
wrapPropertyMethod(EmailTemplatesManager, 'update', 'resource.patch');

module.exports = EmailTemplatesManager;
