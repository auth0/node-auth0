/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

module.exports = {
  ManagementClient: require('./management'),
  AuthenticationClient: require('./auth'),
  OAuthAuthenticator: require('./auth/OAuthAuthenticator'),
  DatabaseAuthenticator: require('./auth/DatabaseAuthenticator'),
  PasswordlessAuthenticator: require('./auth/PasswordlessAuthenticator'),
  TokensManager: require('./auth/TokensManager'),
  UsersManager: require('./auth/UsersManager')
};
