var RestClient = require('rest-facade').Client;
var ArgumentError = require('../exceptions').ArgumentError;
var utils = require('../utils');


/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */


/**
 * @class RulesManager
 * The rule class provides a simple abstraction for performing CRUD operations
 * on Auth0 RulesManagers.
 * @constructor
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 */
var RulesManager = function (options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide manager options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  var apiOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for performing CRUD operations on
   * [Auth0 RulesManagers]{@link https://auth0.com/docs/api/v2#!/RulesManagers}.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/rules/:id ', apiOptions);
};


/**
 * Create a new rule.
 *
 * @method    create
 * @memberOf  RulesManager
 *
 * @param   {Object}    data     Rule data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(RulesManager, 'create', 'resource.create');


/**
 * Get all rules.
 *
 * @method  getAll
 * @memberOf  RulesManager
 *
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(RulesManager, 'getAll', 'resource.getAll');


/**
 * Get an Auth0 rule.
 *
 * @method  get
 * @memberOf  RulesManager
 *
 * @param   {Object}    params        Rule parameters.
 * @param   {String}    params.id     Rule ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(RulesManager, 'get', 'resource.get');


/**
 * Update an existing rule.
 *
 * @method    update
 * @memberOf  RulesManager
 *
 * @param   {Object}    params        Rule parameters.
 * @param   {String}    params.id     Rule ID.
 * @param   {Object}    data          Updated rule data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(RulesManager, 'update', 'resource.patch');


/**
 * Delete an existing rule.
 *
 * @method    delete
 * @memberOf  RulesManager
 *
 * @param   {Object}    params        Rule parameters.
 * @param   {String}    params.id     Rule ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(RulesManager, 'delete', 'resource.delete');


module.exports = RulesManager;
