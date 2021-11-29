const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * The logStreams class provides a simple abstraction for performing CRUD operations
 * on Auth0 Log Streams.
 */
class LogStreamsManager {
  /**
   * @param {object} options            The client options.
   * @param {string} options.baseUrl    The URL of the API.
   * @param {object} [options.headers]  Headers to be included in all requests.
   * @param {object} [options.retry]    Retry Policy Config
   */
  constructor(options) {
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
     * @type {object}
     */
    const clientOptions = {
      headers: options.headers,
      query: { repeatParams: false },
    };

    /**
     * Provides an abstraction layer for performing CRUD operations on
     * {@link https://auth0.com/docs/api/management/v2#!/Log_Streams Auth0
     *  Log Streams}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/log-streams/:id `,
      clientOptions,
      options.tokenProvider
    );
    this.resource = new RetryRestClient(auth0RestClient, options.retry);
  }

  /**
   * Get all Log Streams.
   *
   * @example
   *
   * management.logStreams.getAll(function (err, logStreams) {
   *   console.log(logStreams.length);
   * });
   * @param   {Function}  [cb]                    Callback function.
   * @returns  {Promise|undefined}
   */
  getAll(...args) {
    return this.resource.getAll(...args);
  }

  /**
   * Get an Auth0 Log Streams.
   *
   * @example
   * management.logStreams.get({ id: LOG_STREAM_ID }, function (err, logStream) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(logStream);
   * });
   * @param   {object}    params          Log Stream parameters.
   * @param   {string}    params.id       Log Stream ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  get(...args) {
    return this.resource.get(...args);
  }

  /**
   * Create an Auth0 Log Stream.
   *
   * @example
   * management.logStreams.create(data, function (err, log) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(log);
   * });
   * @param   {object}    data          Log Stream data.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  create(...args) {
    return this.resource.create(...args);
  }

  /**
   * Update an Auth0 Log Streams.
   *
   * @example
   * var data = { name: 'New name' };
   * var params = { id: LOG_STREAM_ID };
   *
   * // Using auth0 instance.
   * management.updateLogStream(params, data, function (err, logStream) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(logStream.name);  // 'New name'
   * });
   *
   * // Using the logStreams manager directly.
   * management.logStreams.update(params, data, function (err, logStream) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(logStream.name);
   * });
   * @param   {object}    params          Log Stream parameters.
   * @param   {string}    params.id       Log Stream ID.
   * @param   {object}    data            Updated Log Stream data.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  update(...args) {
    return this.resource.patch(...args);
  }

  /**
   * Delete an Auth0 Log Streams.
   *
   * @example
   * management.logStreams.delete({ id: LOG_STREAM_ID }, function (err, log) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(log);
   * });
   * @param   {object}    params          Log Stream parameters.
   * @param   {string}    params.id       Log Stream ID.
   * @param   {Function}  [cb]            Callback function.
   * @returns  {Promise|undefined}
   */
  delete(...args) {
    return this.resource.delete(...args);
  }
}

module.exports = LogStreamsManager;
