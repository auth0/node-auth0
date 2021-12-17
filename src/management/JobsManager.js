const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const { ArgumentError } = require('rest-facade');
const Auth0RestClient = require('../Auth0RestClient');
const RetryRestClient = require('../RetryRestClient');

/**
 * Abstract the creation as well as the retrieval of async jobs.
 */
class JobsManager {
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

    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers: options.headers,
      query: { repeatParams: false },
    };

    this.options = options;

    /**
     * Provides an abstraction layer for consuming the
     * {@link https://auth0.com/docs/api/v2#!/Jobs Jobs endpoint}.
     *
     * @type {external:RestClient}
     */
    const auth0RestClient = new Auth0RestClient(
      `${options.baseUrl}/jobs/:id`,
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
    const jobErrorsRestClient = new Auth0RestClient(
      `${options.baseUrl}/jobs/:id/errors`,
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
      `${options.baseUrl}/jobs/users-exports`,
      clientOptions,
      options.tokenProvider
    );
    this.usersExports = new RetryRestClient(usersExportsRestClient, options.retry);
  }

  /**
   * Get a job by its ID.
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
   * @param   {object}    params        Job parameters.
   * @param   {string}    params.id     Job ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
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

  _importUsers(data, cb) {
    const { options } = this;
    const url = `${options.baseUrl}/jobs/users-imports`;
    const userData = data.users_json
      ? Buffer.from(data.users_json)
      : fs.createReadStream(data.users);
    const userFilename = data.users_json ? 'users.json' : data.users;

    const form = new FormData();
    form.append('users', userData, userFilename);
    form.append('connection_id', data.connection_id);
    form.append('upsert', data.upsert === true ? 'true' : 'false');
    form.append('send_completion_email', data.send_completion_email === false ? 'false' : 'true');

    const headers = { ...options.headers, ...form.getHeaders() };
    headers['Content-Type'] = 'multipart/form-data';

    const promise = options.tokenProvider.getAccessToken().then(async (access_token) => {
      try {
        return await axios.post(url, form, {
          headers: { ...headers, Authorization: `Bearer ${access_token}` },
        });
      } catch (err) {
        if (!err.response) {
          throw err;
        }

        const res = err.response;
        // `superagent` uses the error parameter in callback on http errors.
        // the following code is intended to keep that behaviour (https://github.com/visionmedia/superagent/blob/master/lib/node/response.js#L170)
        const error = new Error(`${'cannot POST' + ' '}${url} (${res.status})`);
        error.status = res.status;
        error.method = 'POST';
        error.text = res.data.message || res.statusText || error.message;
        throw error;
      }
    });

    // Don't return a promise if a callback was given.
    if (cb && cb instanceof Function) {
      promise.then(cb.bind(null, null)).catch(cb);

      return;
    }

    return promise;
  }

  /**
   * Given a path to a file and a connection id, create a new job that imports the
   * users contained in the file or JSON string and associate them with the given
   * connection.
   *
   * @deprecated since version 2.26. It will be deleted in version 3.0.
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
   * @param   {object}    data                          Users import data.
   * @param   {string}    data.connection_id            connection_id of the connection to which users will be imported.
   * @param   {string}    [data.users]                  Path to the users data file. Either users or users_json is mandatory.
   * @param   {string}    [data.users_json]             JSON data for the users.
   * @param   {boolean}   [data.upsert]                 Whether to update users if they already exist (true) or to ignore them (false).
   * @param   {boolean}   [data.send_completion_email]  Whether to send a completion email to all tenant owners when the job is finished (true) or not (false).
   * @param   {Function}  [cb]                          Callback function.
   * @returns  {Promise|undefined}
   */
  importUsers(data, cb) {
    console.warn(
      '"importUsers" has been deprecated as it was inconsistent with the API. Please, use "importUsersJob" which returns the response data directly.'
    );
    return this._importUsers(data, cb);
  }

  /**
   * Given a path to a file and a connection id, create a new job that imports the
   * users contained in the file or JSON string and associate them with the given
   * connection.
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
   * @param   {object}    data                          Users import data.
   * @param   {string}    data.connection_id            connection_id of the connection to which users will be imported.
   * @param   {string}    [data.users]                  Path to the users data file. Either users or users_json is mandatory.
   * @param   {string}    [data.users_json]             JSON data for the users.
   * @param   {boolean}   [data.upsert]                 Whether to update users if they already exist (true) or to ignore them (false).
   * @param   {boolean}   [data.send_completion_email]  Whether to send a completion email to all tenant owners when the job is finished (true) or not (false).
   * @param   {Function}  [cb]                          Callback function.
   * @returns  {Promise|undefined}
   */
  importUsersJob(data, cb) {
    const promise = this._importUsers(data).then((response) => response.data);

    // Don't return a promise if a callback was given.
    if (cb && cb instanceof Function) {
      promise.then(cb.bind(null, null)).catch(cb);

      return;
    }

    return promise;
  }

  /**
   * Export all users to a file using a long running job.
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
   * @param   {object}    data                  Users export data.
   * @param   {string}    [data.connection_id]  The connection id of the connection from which users will be exported
   * @param   {string}    [data.format]         The format of the file. Valid values are: "json" and "csv".
   * @param   {number}    [data.limit]          Limit the number of records.
   * @param   {object[]}  [data.fields]         A list of fields to be included in the CSV. If omitted, a set of predefined fields will be exported.
   * @param   {Function}  [cb]                  Callback function.
   * @returns  {Promise|undefined}
   */
  exportUsers(data, cb) {
    if (cb && cb instanceof Function) {
      return this.usersExports.create(data, cb);
    }

    return this.usersExports.create(data);
  }

  /**
   * Given a job ID, retrieve the failed/errored items
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
   * @param   {object}    params        Job parameters.
   * @param   {string}    params.id     Job ID.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
   */
  errors(params, cb) {
    if (!params.id || typeof params.id !== 'string') {
      throw new ArgumentError('The id parameter must be a valid job id');
    }

    if (cb && cb instanceof Function) {
      return this.jobErrors.get(params, cb);
    }

    // Return a promise.
    return this.jobErrors.get(params);
  }

  /**
   * Send a verification email to a user.
   *
   * @example
   * var params = {
   * 	user_id: '{USER_ID}'
   * };
   *
   * management.jobs.verifyEmail(params, function (err) {
   *   if (err) {
   *     // Handle error.
   *   }
   * });
   * @param   {object}    data          User data object.
   * @param   {string}    data.user_id  ID of the user to be verified.
   * @param   {string}    [data.organization_id] Organization ID
   * @param   {string}    [data.client_id] client_id of the client (application). If no value provided, the global Client ID will be used.
   * @param   {object}    [data.identity] Used to verify secondary, federated, and passwordless-email identities.
   * @param   {string}    data.identity.user_id user_id of the identity.
   * @param   {string}    data.identity.provider provider of the identity.
   * @param   {Function}  [cb]          Callback function.
   * @returns  {Promise|undefined}
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
