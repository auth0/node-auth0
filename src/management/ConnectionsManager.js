var RestClient = require('rest-facade').Client;
var ArgumentError = require('../exceptions').ArgumentError;
var utils = require('../utils');


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
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 */
var ConnectionsManager = function (options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');
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
 *
 * @param   {Object}    data     Connection data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ConnectionsManager, 'create', 'resource.create');


/**
 * Get all connections.
 *
 * @method  getAll
 * @memberOf  ConnectionsManager
 *
 * @param   {Function}  [cb]    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ConnectionsManager, 'getAll', 'resource.getAll');


/**
 * Get an Auth0 connection.
 *
 * @method  get
 * @memberOf  ConnectionsManager
 *
 * @param   {Object}    params          Connection parameters.
 * @param   {String}    params.id       Connection ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ConnectionsManager, 'get', 'resource.get');


/**
 * Update an existing connection.
 *
 * @method    update
 * @memberOf  ConnectionsManager
 *
 * @param   {Object}    params        Conneciton parameters.
 * @param   {String}    params.id     Connection ID.
 * @param   {Object}    data          Updated connection data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return    {Promise|undefined}
 */
utils.wrapPropertyMethod(ConnectionsManager, 'update', 'resource.patch');


/**
 * Delete an existing connection.
 *
 * @method    delete
 * @memberOf  ConnectionsManager
 *
 * @param   {Object}    params          Connection parameters.
 * @param   {String}    params.id       Connection ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(ConnectionsManager, 'delete', 'resource.delete');


module.exports = ConnectionsManager;
