var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;
var utils = require('./utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class ConnectionsManager
 * Represents the relationship between Auth0 and an Iidentity provider.
 * @constructor
 *
 * @param   {Object}   options
 */
var ConnectionsManager = function (options) {
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
   * [Auth0 Connections]{@link https://auth0.com/docs/api/v2#!/ConnectionsManagers}.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/connections/:id ', apiOptions);
};

/**
 * Create a new connection.
 *
 * @method    create
 * @memberOf  ConnectionsManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(ConnectionsManager, 'create', 'resource.create');

/**
 * Get all connections.
 *
 * @method  getAll
 * @memberOf  ConnectionsManager
 * @return  {Promise}               Returns a promise if no callback is received.
 */
utils.wrapPropertyMethod(ConnectionsManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 connection.
 *
 * @method  get
 * @memberOf  ConnectionsManager
 * @return  {Promise}
 */
utils.wrapPropertyMethod(ConnectionsManager, 'get', 'resource.get');

/**
 * Update an existing connection.
 *
 * @method    update
 * @memberOf  ConnectionsManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(ConnectionsManager, 'update', 'resource.patch');

/**
 * Delete an existing connection.
 *
 * @method    delete
 * @memberOf  ConnectionsManager
 * @return    {Promise}
 */
utils.wrapPropertyMethod(ConnectionsManager, 'delete', 'resource.delete');


module.exports = ConnectionsManager;
