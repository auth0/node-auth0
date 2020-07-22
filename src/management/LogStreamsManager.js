var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * @class LogStreamsManager
 * The logStreams class provides a simple abstraction for performing CRUD operations
 * on Auth0 Log Streams.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var LogStreamsManager = function(options) {
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
  var clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for performing CRUD operations on
   * {@link https://auth0.com/docs/api/management/v2#!/Log_Streams Auth0
   *  Log Streams}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/log-streams/:id ',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};

/**
 * Get all Log Streams.
 *
 * @method    getAll
 * @memberOf  module:management.LogStreamsManager.prototype
 *
 * @example
 *
 * management.logStreams.getAll(function (err, logStreams) {
 *   console.log(logStreams.length);
 * });
 *
 * @param   {Function}  [cb]                    Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(LogStreamsManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 Log Streams.
 *
 * @method    get
 * @memberOf  module:management.LogStreamsManager.prototype
 *
 * @example
 * management.logStreams.get({ id: LOG_STREAM_ID }, function (err, logStream) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(logStream);
 * });
 *
 * @param   {Object}    params          Log Stream parameters.
 * @param   {String}    params.id       Log Stream ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(LogStreamsManager, 'get', 'resource.get');

/**
 * Get an Auth0 Log Streams.
 *
 * @method    create
 * @memberOf  module:management.LogStreamsManager.prototype
 *
 * @example
 * management.logStreams.create({ id: LOG_STREAM_ID }, function (err, log) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(log);
 * });
 *
 * @param   {Object}    params                              Log Stream parameters.
 * @param   {String}    params.name                         Log Stream Name.
 * @param   {String}    params.type                         Log Stream Type values: http.
 * @param   {Object}    params.sink                         Log Stream sink parameters.
 * @param   {String}    params.sink.httpEndpoint            Log Stream sink HTTP endpoint.
 * @param   {String}    params.sink.httpContentType         Log Stream sink HTTP Content Type.
 * @param   {String}    params.sink.httpContentFormat       Log Stream sink HTTP Content Format values: (JSONLINES|JSONARRAY)
 * @param   {String}    params.sink.httpAuthorizationHeader Log Stream sink HTTP Authorization header
 * @param   {Function}  [cb]                                Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(LogStreamsManager, 'create', 'resource.create');

/**
 * Update an Auth0 Log Streams.
 *
 * @method    update
 * @memberOf  module:management.LogStreamsManager.prototype
 *
 * @example
 * management.logStreams.update({ id: LOG_STREAM_ID }, function (err, logStream) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(logStream);
 * });
 *
 * @param   {Object}    params                              Log Stream parameters.
 * @param   {String}    params.name                         Log Stream Name.
 * @param   {String}    params.status                       Log Stream Status values: (active|paused).
 * @param   {Object}    params.sink                         Log Stream sink parameters.
 * @param   {String}    params.sink.httpEndpoint            Log Stream sink HTTP endpoint.
 * @param   {String}    params.sink.httpContentType         Log Stream sink HTTP Content Type.
 * @param   {String}    params.sink.httpContentFormat       Log Stream sink HTTP Content Format values: (JSONLINES|JSONARRAY)
 * @param   {String}    params.sink.httpAuthorizationHeader Log Stream sink HTTP Authorization header
 * @param   {Function}  [cb]                                Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(LogStreamsManager, 'update', 'resource.patch');

/**
 * Delete an Auth0 Log Streams.
 *
 * @method    delete
 * @memberOf  module:management.LogStreamsManager.prototype
 *
 * @example
 * management.logStreams.delete({ id: LOG_STREAM_ID }, function (err, log) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(log);
 * });
 *
 * @param   {Object}    params          Log Stream parameters.
 * @param   {String}    params.id       Log Stream ID.
 * @param   {Function}  [cb]            Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(LogStreamsManager, 'delete', 'resource.delete');

module.exports = LogStreamsManager;
