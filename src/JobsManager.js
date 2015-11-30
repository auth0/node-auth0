var request = require('superagent');
var extend = require('util')._extend;
var Promise = require('bluebird');

var RestClient = require('rest-facade').Client;
var ArgumentError = require('./exceptions').ArgumentError;


/**
 * @class
 * Abstract the creation as well as the retrieval of async jobs.
 * @constructor
 *
 * @param {Object}    options       Manager options.
 */
var JobsManager = function (options){
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  var clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  this.options = options;

  /**
   * Provides an abstraction layer for consuming the
   * [Jobs endpoint]{@link https://auth0.com/docs/api/v2#!/Jobs}.
   *
   * @type {external:RestClient}
   */
  this.jobs = new RestClient(options.baseUrl + '/jobs/:id', clientOptions);
};


/**
 * Get a job by its ID.
 *
 * @method
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}
 */
JobsManager.prototype.get = function (params, cb) {
  if (!params.id || typeof params.id !== 'string') {
    throw new ArgumentError('The id parameter must be a valid job id');
  }

  if (cb && cb instanceof Function) {
    return this.jobs.get(params, cb);
  }

  // Return a promise.
  return this.jobs.get(params);
};


/**
 * Given a path to a file and a connection id, create a new job that imports the
 * users contained in the file and associate them with the given connection.
 *
 * @method
 * @param   {Object}    data                Users import data.
 * @param   {String}    data.connectionId   The connection id of the connection
 *                                          to which users will be inserted.
 * @param   {String}    data.users          Path to file containing the users.
 * @param   {Function}  [cb]                Callback function.
 * @return  {Promise}
 */
JobsManager.prototype.importUsers = function (data, cb) {
  var options = this.options;
  var headers = extend({}, options.headers);

  headers['Content-Type'] = 'multipart/form-data';

  var promise = new Promise(function (resolve, reject) {
    var req = request
      .post(options.baseUrl + '/jobs/users-imports')
      .field('connection_id', data.connection_id)
      .attach('users', data.users)

    for (var name in headers) {
      req.set(name, headers[name]);
    }

    req.end(function (err, res) {
      if (err) reject(err);

      resolve(res);
    });
  });

  // Don't return a promise if a callback was given.
  if (cb && cb instanceof Function) {
    promise
      .then(cb.bind(null, null))
      .catch(cb);

    return;
  }

  return promise;
};


/**
 * Send a verification email to a user.
 *
 * @method
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}
 */
JobsManager.prototype.verifyEmail = function (data, cb) {
  if (!data.user_id || typeof data.user_id !== 'string') {
    throw new ArgumentError('Must specify a user ID');
  }

  if (cb && cb instanceof Function) {
    return this.jobs.create({ id: 'verification-email' }, data, cb);
  }

  // Return a promise.
  return this.jobs.create({ id: 'verification-email' }, data);
};


module.exports = JobsManager;
