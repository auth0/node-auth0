var Promise = require('bluebird');
var request = require('request');
var pkg = require('../package.json');

/**
 * @module utils
 */
var utils = (module.exports = {});

/**
 * Given a JSON string, convert it to its base64 representation.
 *
 * @method    jsonToBase64
 * @memberOf  module:utils
 */
utils.jsonToBase64 = function(json) {
  var bytes = Buffer.from(JSON.stringify(json));

  return bytes
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

/**
 * Return an object with information about the current client.
 *
 * @method    generateClientInfo
 * @memberOf  module:utils
 *
 * @return {Object}   Object containing client information.
 */
utils.generateClientInfo = function() {
  return {
    name: 'node-auth0',
    version: pkg.version,
    env: {
      node: process.version.replace('v', '')
    }
  };
};

/**
 * Simple wrapper that, given a class, a property name and a method name,
 * creates a new method in the class that is a wrapper for the given
 * property method.
 *
 * @method    wrapPropertyMethod
 * @memberOf  module:utils
 */
utils.wrapPropertyMethod = function(Parent, name, propertyMethod) {
  var path = propertyMethod.split('.');
  var property = path.shift();
  var method = path.pop();

  Object.defineProperty(Parent.prototype, name, {
    enumerable: false,
    get: function() {
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
utils.getRequestPromise = function(settings) {
  return new Promise(function(resolve, reject) {
    request(
      {
        url: settings.url,
        method: settings.method,
        body: settings.data,
        json: typeof settings.data === 'object',
        headers: settings.headers
      },
      function(err, res, body) {
        if (err) {
          reject(err);
          return;
        }

        resolve(res.body);
      }
    );
  });
};

utils.containsUnsafeChars = s => {
  const safeChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$-_.+!*'(),%";
  return !!s.split('').find(c => !safeChars.includes(c));
};

utils.maybeDecode = url => {
  if (utils.containsUnsafeChars(url)) {
    return encodeURIComponent(url);
  }
  return url;
};

utils.sanitizeArguments = function(optionsCandidate, cbCandidate) {
  if (optionsCandidate instanceof Function) {
    return {
      cb: optionsCandidate,
      options: undefined
    };
  }
  return {
    cb: cbCandidate,
    options: optionsCandidate
  };
};
