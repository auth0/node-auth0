var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;
var utils = require('./utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class EmailProvider
 * Auth0 Email Provider.
 * @constructor
 *
 * @param {Object} options            The client options.
 * @param {String} options.token      The API access token.
 * @param {String} [options.region]   The code for the region in use.
 * @param {String} [options.domain]   The API domain for the region in use.
 */
var EmailProvider = function (options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');h
  }

  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  clientOptions = {
    headers: { 'Authorization': 'Bearer ' + options.accessToken },
    query: { convertCase: 'snakeCase' }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Auth0 Clients endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/emails/provider', clientOptions);
};

/**
 * Configure the email provider.
 *
 * @method  configure
 * @memberOf  EmailProvider
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(EmailProvider, 'configure', 'resource.create');

/**
 * Get the email provider.
 *
 * @method  get
 * @memberOf  EmailProvider
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(EmailProvider, 'get', 'resource.get');


/**
 * Update the email provider.
 *
 * @method    update
 * @memberOf  EmailProvider
 * @return    {Promise}
 */
utils.wrapPropertyMethod(EmailProvider, 'update', 'resource.patch');

/**
 * Delete email provider.
 *
 * @method    delete
 * @memberOf  EmailProvider
 * @return    {Promise}
 */
utils.wrapPropertyMethod(EmailProvider, 'delete', 'resource.delete');


module.exports = EmailProvider;
