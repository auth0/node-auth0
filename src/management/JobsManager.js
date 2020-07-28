var axios = require('axios');
var extend = require('util')._extend;
var FormData = require('form-data');
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
var JobsManager = function(options) {
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
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/jobs/:id',
    clientOptions,
    options.tokenProvider
  );
  this.jobs = new RetryRestClient(auth0RestClient, options.retry);

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/v2#!/Jobs/:id/errors Errors endpoint}.
   *
   * @type {external:RestClient}
   */
  var jobErrorsRestClient = new Auth0RestClient(
    options.baseUrl + '/jobs/:id/errors',
    clientOptions,
    options.tokenProvider
  );
  this.jobErrors = new RetryRestClient(jobErrorsRestClient, options.retry);

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/v2#!/Jobs/post_users_exports Create job to export users endpoint}
   *
   * @type {external:RestClient}
   */
  const usersExportsRestClient = new Auth0RestClient(
    options.baseUrl + '/jobs/users-exports',
    clientOptions,
    options.tokenProvider
  );
  this.usersExports = new RetryRestClient(usersExportsRestClient, options.retry);
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
JobsManager.prototype.get = function(params, cb) {
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
 * users contained in the file or JSON string and associate them with the given
 * connection.
 * @deprecated since version 2.26. It will be deleted in version 3.0.
 *
 * @method   importUsers
 * @memberOf module:management.JobsManager.prototype
 *
 * @example
 * var params = {
 *   connection_id: '{CONNECTION_ID}',
 *   users: '{PATH_TO_USERS_FILE}' // or users_json: '{USERS_JSON_STRING}'
 * };
 *
 * management.jobs.importUsers(params, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    data                          Users import data.
 * @param   {String}    data.connection_id            connection_id of the connection to which users will be imported.
 * @param   {String}    [data.users]                  Path to the users data file. Either users or users_json is mandatory.
 * @param   {String}    [data.users_json]             JSON data for the users.
 * @param   {Boolean}   [data.upsert]                 Whether to update users if they already exist (true) or to ignore them (false).
 * @param   {Boolean}   [data.send_completion_email]  Whether to send a completion email to all tenant owners when the job is finished (true) or not (false).
 * @param   {Function}  [cb]                          Callback function.
 *
 * @return  {Promise|undefined}
 */
JobsManager.prototype.importUsers = function(data, cb) {
  console.warn(
    '"importUsers" has been deprecated as it was inconsistent with the API. Please, use "importUsersJob" which returns the response data directly.'
  );

  var options = this.options;
  var url = options.baseUrl + '/jobs/users-imports';
  var userData = data.users_json ? Buffer.from(data.users_json) : fs.createReadStream(data.users);
  var userFilename = data.users_json ? 'users.json' : data.users;

  var form = new FormData();
  form.append('users', userData, userFilename);
  form.append('connection_id', data.connection_id);
  form.append('upsert', data.upsert === true ? 'true' : 'false');
  form.append('send_completion_email', data.send_completion_email === false ? 'false' : 'true');

  var headers = { ...options.headers, ...form.getHeaders() };
  headers['Content-Type'] = 'multipart/form-data';

  var promise = options.tokenProvider.getAccessToken().then(function(access_token) {
    return axios
      .post(url, form, { headers: { ...headers, Authorization: `Bearer ${access_token}` } })
      .catch(function(err) {
        if (!err.response) {
          return Promise.reject(err);
        }

        var res = err.response;
        // `superagent` uses the error parameter in callback on http errors.
        // the following code is intended to keep that behaviour (https://github.com/visionmedia/superagent/blob/master/lib/node/response.js#L170)
        var error = new Error('cannot POST' + ' ' + url + ' (' + res.status + ')');
        error.status = res.status;
        error.method = 'POST';
        error.text = res.data.message || res.statusText || error.message;
        return Promise.reject(error);
      });
  });

  // Don't return a promise if a callback was given.
  if (cb && cb instanceof Function) {
    promise.then(cb.bind(null, null)).catch(cb);

    return;
  }

  return promise;
};

/**
 * Given a path to a file and a connection id, create a new job that imports the
 * users contained in the file or JSON string and associate them with the given
 * connection.
 *
 * @method   importUsersJob
 * @memberOf module:management.JobsManager.prototype
 *
 * @example
 * var params = {
 *   connection_id: '{CONNECTION_ID}',
 *   users: '{PATH_TO_USERS_FILE}' // or users_json: '{USERS_JSON_STRING}'
 * };
 *
 * management.jobs.importUsers(params, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 * });
 *
 * @param   {Object}    data                          Users import data.
 * @param   {String}    data.connection_id            connection_id of the connection to which users will be imported.
 * @param   {String}    [data.users]                  Path to the users data file. Either users or users_json is mandatory.
 * @param   {String}    [data.users_json]             JSON data for the users.
 * @param   {Boolean}   [data.upsert]                 Whether to update users if they already exist (true) or to ignore them (false).
 * @param   {Boolean}   [data.send_completion_email]  Whether to send a completion email to all tenant owners when the job is finished (true) or not (false).
 * @param   {Function}  [cb]                          Callback function.
 *
 * @return  {Promise|undefined}
 */
JobsManager.prototype.importUsersJob = function(data, cb) {
  var promise = this.importUsers(data).then(response => response.data);

  // Don't return a promise if a callback was given.
  if (cb && cb instanceof Function) {
    promise.then(cb.bind(null, null)).catch(cb);

    return;
  }

  return promise;
};

/**
 * Export all users to a file using a long running job.
 *
 * @method   exportUsers
 * @memberOf module:management.JobsManager.prototype
 *
 * @example
 * var data = {
 *   connection_id: 'con_0000000000000001',
 *   format: 'csv',
 *   limit: 5,
 *   fields: [
 *     {
 *       "name": "user_id"
 *     },
 *     {
 *       "name": "name"
 *     },
 *     {
 *       "name": "email"
 *     },
 *     {
 *       "name": "identities[0].connection",
 *       "export_as": "provider"
 *     },
 *     {
 *       "name": "user_metadata.some_field"
 *     }
 *   ]
 * }
 *
 * management.jobs.exportUsers(data, function (err, results) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Retrieved job.
 *   console.log(results);
 * });
 *
 * @param   {Object}    data                  Users export data.
 * @param   {String}    [data.connection_id]  The connection id of the connection from which users will be exported
 * @param   {String}    [data.format]         The format of the file. Valid values are: "json" and "csv".
 * @param   {Number}    [data.limit]          Limit the number of records.
 * @param   {Object[]}  [data.fields]         A list of fields to be included in the CSV. If omitted, a set of predefined fields will be exported.
 * @param   {Function}  [cb]                  Callback function.
 *
 * @return  {Promise|undefined}
 */
JobsManager.prototype.exportUsers = function(data, cb) {
  if (cb && cb instanceof Function) {
    return this.usersExports.create(data, cb);
  }

  return this.usersExports.create(data);
};

/**
 * Given a job ID, retrieve the failed/errored items
 *
 * @method   errors
 * @memberOf module:management.JobsManager.prototype
 *
 * @example
 * var params = {
 *   id: '{JOB_ID}'
 * };
 *
 * management.jobs.errors(params, function (err, job) {
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
JobsManager.prototype.errors = function(params, cb) {
  if (!params.id || typeof params.id !== 'string') {
    throw new ArgumentError('The id parameter must be a valid job id');
  }

  if (cb && cb instanceof Function) {
    return this.jobErrors.get(params, cb);
  }

  // Return a promise.
  return this.jobErrors.get(params);
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
JobsManager.prototype.verifyEmail = function(data, cb) {
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
