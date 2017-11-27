var request = require('request');
var extend = require('util')._extend;
var Promise = require('bluebird');
var fs = require('fs');

var ArgumentError = require('rest-facade').ArgumentError;
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */


/**
 * @class
 * Abstract the creation as well as the retrieval of async jobs.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
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
    errorFormatter: { message: 'message', name: 'error' },
    headers: options.headers,
    query: { repeatParams: false }
  };

  this.options = options;

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/v2#!/Jobs Jobs endpoint}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(options.baseUrl + '/jobs/:id', clientOptions, options.tokenProvider);
  this.jobs = new RetryRestClient(auth0RestClient, options.retry);
};


/**
 * Get a job by its ID.
 *
 * @method   get
 * @memberOf module:management.JobsManager.prototype
 *
 * @example
 * var params = {
 *   id: '{JOB_ID}'
 * };
 *
 * management.jobs.get(params, function (err, job) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Retrieved job.
 *   console.log(job);
 * });
 *
 * @param   {Object}    params        Job parameters.
 * @param   {String}    params.id     Job ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
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
 * @method   importUsers
 * @memberOf module:management.JobsManager.prototype
 *
 * @example
 * var params = {
 *   connection_id: '{CONNECTION_ID}',
 *   users: '{PATH_TO_USERS_FILE}'
 * };
 *
 * management.jobs.get(params, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    data                Users import data.
 * @param   {String}    data.connectionId   Connection for the users insertion.
 * @param   {String}    data.users          Path to the users data file.
 * @param   {Function}  [cb]                Callback function.
 *
 * @return  {Promise|undefined}
 */
JobsManager.prototype.importUsers = function (data, cb) {
  var options = this.options;
  var headers = extend({}, options.headers);

  headers['Content-Type'] = 'multipart/form-data';

  var url = options.baseUrl + '/jobs/users-imports';
  var method = 'POST';

  var promise = new Promise(function (resolve, reject) {
    request({
      url: url,
      method: method,
      headers: headers,
      formData: {
        users: {
          value: fs.createReadStream(data.users),
          options: {
            filename: data.users
          }
        },
        connection_id: data.connection_id
      }
    }, function (err, res) {


      // `superagent` uses the error parameter in callback on http errors.
      // the following code is intended to keep that behaviour (https://github.com/visionmedia/superagent/blob/master/lib/node/response.js#L170)
      var type = res.statusCode / 100 | 0;
      var isErrorResponse = (4 === type || 5 === type);
      if (isErrorResponse) {
        var error = new Error('cannot ' + method  + url + ' (' + res.statusCode + ')');
        error.status = res.statusCode;
        error.method = method;
        error.text = res.text;
        reject(error);
      }

      if (err) {
        reject(err);
      }

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
 * @method    verifyEmail
 * @memberOf module:management.JobsManager.prototype
 *
 * @example
 * var params = {
 * 	user_id: '{USER_ID}'
 * };
 *
 * management.jobs.verifyEmail(function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    data          User data object.
 * @param   {String}    data.user_id  ID of the user to be verified.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
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
