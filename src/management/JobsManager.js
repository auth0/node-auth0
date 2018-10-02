const request = require('request');
const { createReadStream } = require('fs');

const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

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
class JobsManager {
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

    const { headers, baseUrl, tokenProvider, retry } = options;

    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers,
      query: { repeatParams: false }
    };

    this.options = options;

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/Jobs Jobs endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${baseUrl}/jobs/:id`,
      clientOptions,
      tokenProvider
    );
    this.jobs = new RetryRestClient(auth0RestClient, retry);
  }

  /**
   * Get a job by its ID.
   *
   * @method   get
   * @memberOf module:management.JobsManager.prototype
   *
   * @example
   * const params = {
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
  get(params, cb) {
    if (!params.id || typeof params.id !== 'string') {
      throw new ArgumentError('The id parameter must be a valid job id');
    }

    if (cb && cb instanceof Function) {
      return this.jobs.get(params, cb);
    }

    // Return a promise.
    return this.jobs.get(params);
  }

  /**
   * Given a path to a file and a connection id, create a new job that imports the
   * users contained in the file or JSON string and associate them with the given
   * connection.
   *
   * @method   importUsers
   * @memberOf module:management.JobsManager.prototype
   *
   * @example
   * const params = {
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
   * @param   {String}    data.users_json     JSON data for the users.
   * @param   {Function}  [cb]                Callback function.
   *
   * @return  {Promise|undefined}
   */
  importUsers(data, cb) {
    const { headers, baseUrl, tokenProvider } = this.options;
    const { users_json, users, connection_id } = data;
    const headers = Object.assign({}, headers);

    headers['Content-Type'] = 'multipart/form-data';

    const url = `${baseUrl}/jobs/users-imports`;
    const method = 'POST';

    const promise = tokenProvider.getAccessToken().then(access_token => {
      return new Promise((resolve, reject) => {
        request(
          {
            url,
            method,
            headers: Object.assign({ Authorization: `Bearer ${access_token}` }, headers),
            formData: {
              users: {
                value: users_json ? Buffer.from(users_json) : createReadStream(users),
                options: {
                  filename: users_json ? 'users.json' : users
                }
              },
              connection_id
            }
          },
          (err, res) => {
            if (err) {
              reject(err);
              return;
            }
            // `superagent` uses the error parameter in callback on http errors.
            // the following code is intended to keep that behaviour (https://github.com/visionmedia/superagent/blob/master/lib/node/response.js#L170)
            const type = (res.statusCode / 100) | 0;
            const isErrorResponse = 4 === type || 5 === type;
            if (isErrorResponse) {
              const error = new Error(`cannot ${method} ${url} (${res.statusCode})`);
              error.status = res.statusCode;
              error.method = method;
              error.text = res.text;
              reject(error);
            }
            resolve(res);
          }
        );
      });
    });

    // Don't return a promise if a callback was given.
    if (cb && cb instanceof Function) {
      promise.then(cb.bind(null, null)).catch(cb);

      return;
    }

    return promise;
  }

  /**
   * Send a verification email to a user.
   *
   * @method    verifyEmail
   * @memberOf module:management.JobsManager.prototype
   *
   * @example
   * const params = {
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
  verifyEmail(data, cb) {
    if (!data.user_id || typeof data.user_id !== 'string') {
      throw new ArgumentError('Must specify a user ID');
    }

    if (cb && cb instanceof Function) {
      return this.jobs.create({ id: 'verification-email' }, data, cb);
    }

    // Return a promise.
    return this.jobs.create({ id: 'verification-email' }, data);
  }
}

module.exports = JobsManager;
