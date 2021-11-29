const { ArgumentError } = require('rest-facade');
const RestClient = require('rest-facade').Client;

/**
 * Abstracts the sign-in, sign-up and change-password processes for Database &
 * Active Directory authentication services.
 */
class DatabaseAuthenticator {
  /**
   * @param  {object}              options            Authenticator options.
   * @param  {string}              options.baseUrl    The auth0 account URL.
   * @param  {string}              [options.clientId] Default client ID.
   * @param  {OAuthAuthenticator}  oauth              OAuthAuthenticator instance.
   */
  constructor(options, oauth) {
    if (!options) {
      throw new ArgumentError('Missing authenticator options');
    }

    if (typeof options !== 'object') {
      throw new ArgumentError('The authenticator options must be an object');
    }

    /**
     * Options object for the Rest Client instance.
     *
     * @type {object}
     */
    const clientOptions = {
      errorFormatter: { message: 'message', name: 'error' },
      headers: options.headers,
    };

    this.oauth = oauth;
    this.dbConnections = new RestClient(`${options.baseUrl}/dbconnections/:type`, clientOptions);
    this.clientId = options.clientId;
  }

  /**
   * Sign in using a database or active directory service.
   *
   * @example <caption>
   *   Given the user credentials and the connection specified, it will do the
   *   authentication on the provider and return a JSON with the `access_token`
   *   and `id_token`. Find more information about the structure of the data
   *   object in the <a href="https://auth0.com/docs/auth-api#!#post--oauth-ro">
   *   API docs</a>.
   * </caption>
   *
   * var data = {
   *   username: '{USERNAME}',
   *   password: '{PASSWORD}',
   *   connection: 'Username-Password-Authentication' // Optional field.
   * };
   *
   * auth0.database.signIn(data, function (err, userData) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(userData);
   * });
   * @param   {object}    userData              User credentials object.
   * @param   {string}    userData.username     Username.
   * @param   {string}    userData.password     User password.
   * @param   {string}    userData.connection   Identity provider in use.
   * @param   {Function}  [cb]              Method callback.
   * @returns  {Promise|undefined}
   */
  signIn(userData, cb) {
    if (!userData || typeof userData !== 'object') {
      throw new ArgumentError('Missing user data object');
    }

    const data = {
      connection: 'Username-Password-Authentication',
      ...userData,
    };

    if (typeof data.username !== 'string' || data.username.trim().length === 0) {
      throw new ArgumentError('username field is required');
    }

    if (typeof data.password !== 'string' || data.password.trim().length === 0) {
      throw new ArgumentError('password field is required');
    }

    return this.oauth.signIn(data, cb);
  }

  /**
   * Sign up using a database or active directory service.
   *
   * @example <caption>
   *   Given the user credentials, the connection specified and (optionally) the
   *   client ID, it will create a new user. Find more information in the
   *   <a href="https://auth0.com/docs/auth-api#!#post--dbconnections-signup">
   *   API Docs</a>.
   * </caption>
   *
   * var data = {
   *   email: '{EMAIL}',
   *   password: '{PASSWORD}',
   *   connection: 'Username-Password-Authentication' // Optional field.
   * };
   *
   * auth0.database.signUp(data, function (err, userData) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(userData);
   * });
   * @param   {object}    userData              User credentials object.
   * @param   {string}    userData.email        User email address.
   * @param   {string}    userData.password     User password.
   * @param   {string}    userData.connection   Identity provider in use.
   * @param   {Function}  [cb]              Method callback.
   * @returns  {Promise|undefined}
   */
  signUp(userData, cb) {
    if (!userData || typeof userData !== 'object') {
      throw new ArgumentError('Missing user data object');
    }

    const data = {
      client_id: this.clientId,
      ...userData,
    };

    if (typeof data.email !== 'string' || data.email.trim().length === 0) {
      throw new ArgumentError('email field is required');
    }

    if (typeof data.password !== 'string' || data.password.trim().length === 0) {
      throw new ArgumentError('password field is required');
    }

    if (typeof data.connection !== 'string' || data.connection.trim().length === 0) {
      throw new ArgumentError('connection field is required');
    }

    const params = {
      type: 'signup',
    };

    if (cb && cb instanceof Function) {
      return this.dbConnections.create(params, data, cb);
    }

    return this.dbConnections.create(params, data);
  }

  /**
   * Change password using a database or active directory service.
   *
   * @example <caption>
   *   Given the user email, the connection specified and the new password to
   *   use, Auth0 will send a forgot password email. Once the user clicks on the
   *   confirm password change link, the new password specified in this POST will
   *   be set to this user. Find more information in the
   *   <a href="https://auth0.com/docs/auth-api#!#post--dbconnections-change_password>
   *   API Docs</a>.
   * </caption>
   *
   * var data = {
   *   email: '{EMAIL}',
   *   password: '{PASSWORD}',
   *   connection: 'Username-Password-Authentication'
   * };
   *
   * auth0.database.changePassword(data, function (err, message) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(message);
   * });
   * @param   {object}    userData              User credentials object.
   * @param   {string}    userData.email        User email address.
   * @param   {string}    userData.password     New password.
   * @param   {string}    userData.connection   Identity provider in use.
   * @param   {Function}  [cb]              Method callback.
   * @returns  {Promise|undefined}
   */
  changePassword(userData, cb) {
    if (!userData || typeof userData !== 'object') {
      throw new ArgumentError('Missing user data object');
    }

    const data = {
      client_id: this.clientId,
      ...userData,
    };

    if (typeof data.email !== 'string' || data.email.trim().length === 0) {
      throw new ArgumentError('email field is required');
    }

    if (typeof data.password !== 'string' || data.password.trim().length === 0) {
      throw new ArgumentError('password field is required');
    }

    if (typeof data.connection !== 'string' || data.connection.trim().length === 0) {
      throw new ArgumentError('connection field is required');
    }

    const params = {
      type: 'change_password',
    };

    if (cb && cb instanceof Function) {
      return this.dbConnections.create(params, data, cb);
    }

    return this.dbConnections.create(params, data);
  }

  /**
   * Request a change password email using a database or active directory service.
   *
   * @example <caption>
   *   Given the user email, the connection specified, Auth0 will send a change
   *   password email. once the user clicks on the confirm password change link,
   *   the new password specified in this POST will be set to this user. Find more
   *   information in the <a href="https://auth0.com/docs/auth-api#!#post--dbconnections-change_password>
   *   API Docs</a>.
   * </caption>
   *
   * var data = {
   *   email: '{EMAIL}',
   *   connection: 'Username-Password-Authentication',
   *   client_id: 'OS1VzKTVjizL0VCc9Hx2ae2aTPXWy6BD'
   * };
   *
   * auth0.database.requestChangePasswordEmail(data, function (err, message) {
   *   if (err) {
   *     // Handle error.
   *   }
   *
   *   console.log(message);
   * });
   * @param   {object}    userData              User credentials object.
   * @param   {string}    userData.email        User email address.
   * @param   {string}    userData.connection   Identity provider in use.
   * @param   {string}    userData.client_id    Client ID of the Application requesting the password change, to be included in the email template.
   * @param   {Function}  [cb]              Method callback.
   * @returns  {Promise|undefined}
   */
  requestChangePasswordEmail(userData, cb) {
    if (!userData || typeof userData !== 'object') {
      throw new ArgumentError('Missing user data object');
    }

    const data = {
      client_id: this.clientId,
      ...userData,
    };

    if (typeof data.email !== 'string' || data.email.trim().length === 0) {
      throw new ArgumentError('email field is required');
    }

    if (typeof data.connection !== 'string' || data.connection.trim().length === 0) {
      throw new ArgumentError('connection field is required');
    }

    const params = {
      type: 'change_password',
    };

    if (cb && cb instanceof Function) {
      return this.dbConnections.create(params, data, cb);
    }

    return this.dbConnections.create(params, data);
  }
}

module.exports = DatabaseAuthenticator;
