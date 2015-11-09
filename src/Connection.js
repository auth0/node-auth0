var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;
var utils = require('./utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class Connection
 * Represents the relationship between Auth0 and an Iidentity provider.
 * @constructor
 *
 * @param   {Object}   options
 */
var Connection = function (options) {
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
   * [Auth0 Connections]{@link https://auth0.com/docs/api/v2#!/Connections}.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/connections/:id ', apiOptions);
};

/**
 * Create a new connection.
 *
 * @method    create
 * @memberOf  Connection
 * @return    {Promise}
 */
utils.wrapPropertyMethod(Connection, 'create', 'resource.create');

/**
 * Get all connections.
 *
 * @method  getAll
 * @memberOf  Connection
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(Connection, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 connection.
 *
 * @method  get
 * @memberOf  Connection
 * @return  {Promise}
 */
utils.wrapPropertyMethod(Connection, 'get', 'resource.get');

/**
 * Update an existing connection.
 *
 * @method    update
 * @memberOf  Connection
 * @return    {Promise}
 */
utils.wrapPropertyMethod(Connection, 'update', 'resource.patch');

/**
 * Delete an existing connection.
 *
 * @method    delete
 * @memberOf  Connection
 * @return    {Promise}
 */
utils.wrapPropertyMethod(Connection, 'delete', 'resource.delete');


module.exports = Connection;
