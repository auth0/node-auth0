var rest = require('rest-orm');
var User = require('./User');
//var Connection = require('./connection');
var util = require('util');
var utils = require('./utils');
var constants = require('./constants');

var BASE_URL_FORMAT = 'https://%s/api/v2';
var ArgumentError = require('./exceptions').ArgumentError;


/**
 * @class
 * Auth0 Module.
 * @constructor
 *
 * @param {Object} options            The client options.
 * @param {String} options.token      The API access token.
 * @param {String} [options.region]   The code for the region in use.
 * @param {String} [options.domain]   The API domain for the region in use.
 */
var Client = function (options){
  if (!options || typeof options !== 'object') {
    throw new ArgumentError('Missing client options');
  }

  if (typeof options !== 'object') {
    throw new ArgumentsError('The client options must be an object')
  }

  if (!options.token || options.token.length === 0){
    throw new ArgumentError('Missing token');
  }

  if (options.domain && options.region){
    throw new ArgumentError('Cannot provide both region and domain');
  }

  /**
   * Auth0 servers region. If not provided, defaults to US.
   *
   * @type {String}
   */
  this.region = (options.region || constants.DEFAULT_REGION).toLowerCase();

  /**
   * Auth0 domain being used (depends on the region).
   *
   * @type {String}
   */
  this.domain = options.domain || constants.DOMAINS_BY_REGION[this.region]

  if (!this.domain){
    var regions = Object.keys(constants.DOMAINS_BY_REGION);

    throw new ArgumentError(
      'The region is invalid, valid values are any of: "' +
      regions.join('","') + '"'
    );
  }

  /**
   * Access token provided by the user.
   *
   * @type {String}
   */
  this.accessToken = options.token;

  /**
   * URL of the API being consumed.
   *
   * @type {String}
   */
  this.baseUrl = util.format(BASE_URL_FORMAT, this.domain);

  /**
   * Authentication headers required by the API.
   *
   * @type {Object}
   */
  this.authHeaders = { Authorization: 'Bearer ' + this.accessToken };

  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  this.restClientOpts = {
    headers: this.authHeaders,
    query: { convertCase: 'snakeCase' }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Clients endpoint]{@link https://auth0.com/docs/api/v2#!/Clients}.
   *
   * @type {Object}
   */
  this.clients = new rest.Client(this.baseUrl + '/clients/:clientId', this.restClientOpts);
};

/**
 * Create an Auth0 client.
 *
 * @method
 * @return    {Promise}
 */
Client.prototype.createClient = function () {
  return this.clients.create.apply(this.clients, arguments);
};

/**
 * Get all Auth0 clients.
 *
 * @method
 * @return  {Promise}               Returns a promise if no callback is received.
 */
Client.prototype.getClients = function () {
  return this.clients.getAll.apply(this.clients, arguments);
};

/**
 * Get an Auth0 client.
 *
 * @method
 * @return  {Promise}
 */
Client.prototype.getClient = function () {
  return this.clients.get.apply(this.clients, arguments);
};

/**
 * Update an Auth0 client.
 *
 * @method
 * @return    {Promise}
 */
Client.prototype.updateClient = function () {
  return this.clients.update.apply(this.clients, arguments);
};

/**
 * Delete an Auth0 client.
 *
 * @method
k* @return    {Promise}
 */
Client.prototype.deleteClient = function () {
  return this.clients.delete.apply(this.clients, arguments);
};


utils.subEntity(Client, 'users', User);
//utils.subEntity(Client, 'connections', Connection);


module.exports = Client;
