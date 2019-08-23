var ArgumentError = require('rest-facade').ArgumentError;
var HooksService = require('@auth0/hooks-api-core').Service;
var utils = require('../utils');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class
 * Abstracts interaction with the stats endpoint.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var HooksManager = function(options) {
  this.resource = new HooksService();
};

/**
 * Create a new hook.
 *
 * @method    create
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * management.hooks.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Rule created.
 * });
 *
 * @param   {Object}    data     Hook data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(HooksManager, 'create', 'resource.createHook');

/**
 * Get a hook by id.
 *
 * @method    get
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * management.hooks.get(id, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Rule created.
 * });
 *
 * @param   {string}    id     Hook data object.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(HooksManager, 'get', 'resource.getHookById');

/**
 * Delete an existing hook.
 *
 * @method    delete
 * @memberOf  module:management.HooksManager.prototype
 *
 * @example
 * management.hooks.delete(id, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Hook deleted.
 * });
 *
 * @param   {String}    id        Hook ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(HooksManager, 'delete', 'resource.deleteHookById');

module.exports = HooksManager;
