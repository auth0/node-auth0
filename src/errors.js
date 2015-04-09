var util = require('util');

var ApiError = function(statusCode, error, message){
  this.error = error;
  this.message = message;
  this.statusCode = statusCode;
};

util.inherits(ApiError, Error);

var ArgumentError = function(message){
  this.message = message;
};

util.inherits(ApiError, Error);
util.inherits(ArgumentError, Error);

module.exports = {
  ApiError: ApiError,
  ArgumentError: ArgumentError
};