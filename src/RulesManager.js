var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;
var utils = require('./utils');

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
 * @param   {Object}   options
 */
var RulesManager = function (options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');
  }

  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  apiOptions = {
    headers: { 'Authorization': 'Bearer ' + options.accessToken },
    query: { convertCase: 'snakeCase' }
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
 * @return    {Promise}
 */
utils.wrapPropertyMethod(RulesManager, 'create', 'resource.create');

/**
 * Get all rules.
 *
 * @method  getAll
 * @memberOf  RulesManager
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(RulesManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 rule.
 *
 * @method  get
 * @memberOf  RulesManager
 * @return  {Promise}
 */
utils.wrapPropertyMethod(RulesManager, 'get', 'resource.get');

/**
 * Update an existing rule.
 *
 * @method    update
 * @memberOf  RulesManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(RulesManager, 'update', 'resource.patch');

/**
 * Delete an existing rule.
 *
 * @method    delete
 * @memberOf  RulesManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(RulesManager, 'delete', 'resource.delete');


module.exports = RulesManager;
