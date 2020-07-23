var util = require('util');

/**
 * @module errors
 */
var errors = (module.exports = {});

/**
 * Given a response request error, sanitize sensitive data.
 *
 * @method    sanitizeErrorRequestData
 * @memberOf  module:errors
 */
errors.sanitizeErrorRequestData = function(error) {
  if (
    !error.response ||
    !error.response.request ||
    (!error.response.request._data && !error.response.request._header)
  ) {
    return error;
  }

  sanitizeErrors(error.response.request._header);
  sanitizeErrors(error.response.request._data);

  return error;
};

var sanitizeErrors = function(collection) {
  if (!collection) {
    return;
  }

  Object.keys(collection).forEach(function(key) {
    if (key.toLowerCase().match('password|secret|authorization')) {
      collection[key] = '[REDACTED]';
    }
  });
};

/**
 * Given an Api Error, modify the original error and sanitize
 * sensitive information using sanitizeErrorRequestData
 *
 * @method    SanitizedError
 * @memberOf  module:errors
 */
var SanitizedError = function(name, message, status, requestInfo, originalError) {
  this.name = name || this.constructor.name || this.constructor.prototype.name || '';
  this.message = message || '';
  this.statusCode = status || (originalError && originalError.code);
  this.requestInfo = Object.assign({}, requestInfo);
  this.originalError = errors.sanitizeErrorRequestData(originalError);

  Error.captureStackTrace(this, this.constructor);
};

util.inherits(SanitizedError, Error);

errors.SanitizedError = SanitizedError;
