/**
 * Simple facade for consuming a REST API endpoint.
 *
 * @external RestClient
 * {@link https://github.com/ngonzalvez/rest-facade}
 */

module.exports = {
  ManagementClient: require('./management'),
  AuthenticationClient: require('./auth'),
};
