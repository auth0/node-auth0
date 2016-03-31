var Promise = require('bluebird');
var request = require('superagent');


/**
 * @module utils
 */
var utils = module.exports = {};


/**
 * Given a JSON string, convert it to its base64 representation.
 *
 * @method    jsonToBase64
 * @memberOf  module:utils
 */
utils.jsonToBase64 = function (json) {
  var bytes = new Buffer(JSON.stringify(json));

  return bytes
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};


/**
 * Simple wrapper that, given a class, a property name and a method name,
 * creates a new method in the class that is a wrapper for the given
 * property method.
 *
 * @method    wrapPropertyMethod
 * @memberOf  module:utils
 */
utils.wrapPropertyMethod = function (Parent, name, propertyMethod) {
  var path = propertyMethod.split('.');
  var property = path.shift();
  var method = path.pop();

  Object.defineProperty(Parent.prototype, name, {
    enumerable: false,
    get: function () {
      return this[property][method].bind(this[property]);
    }
  });
};


/**
 * Perform a request with the given settings and return a promise that resolves
 * when the request is successfull and rejects when there's an error.
 *
 * @method    getRequestPromise
 * @memberOf  module:utils
 */
utils.getRequestPromise = function (settings) {
  return new Promise(function (resolve, reject) {
    var method = settings.method.toLowerCase();
    var req = request[method](settings.url);

    for (var name in settings.headers) {
      req = req.set(name, settings.headers[name]);
    }

    if (typeof settings.data === 'object') {
      req = req.send(settings.data);
    }

    req.end(function (err, res) {
      if (err) {
        reject(err);
        return;
      }

      if (res.header['content-type']
      && res.header['content-type'].substr(0, 5) === 'text/') {
        return resolve(res.text);
      }

      resolve(res.body);
    });
  });
};
