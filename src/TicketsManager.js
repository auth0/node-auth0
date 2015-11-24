var RestClient = require('rest-facade').Client;


/**
 * @class
 * Abstracts interaction with the tickets endpoint.
 * @constructor
 */
var TicketsManager = function (options){
  var clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Tickets endpoint]{@link https://auth0.com/docs/api/v2#!/Tickets}.
   *
   * @type {external:RestClient}
   */
  this.ticket = new RestClient(options.baseUrl + '/tickets/:type', clientOptions);
};


/**
 * Create a new password change ticket.
 *
 * @method
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}
 */
TicketsManager.prototype.changePassword = function (data, cb) {
  var params = { type: 'password-change' };

  if (cb && cb instanceof Function) {
    return this.ticket.create(params, data, cb);
  }

  // Return a promise.
  return this.ticket.create(params, data);
};


/**
 * Create an email verification ticket.
 *
 * @method
 * @param   {Function}  [cb]  Callback function.
 * @return  {Promise}
 */
TicketsManager.prototype.verifyEmail = function (data, cb) {
  var params = { type: 'email-verification' };

  if (cb && cb instanceof Function) {
    return this.ticket.create(params, data, cb);
  }

  // Return a promise.
  return this.ticket.create(params, data);
};


module.exports = TicketsManager;

