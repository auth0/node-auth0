var util = require('util');

var ApiError = function(statusCode, error, message){
  this.error = error;
  this.message = message;
  this.statusCode = statusCode;
};

util.inherits(ApiError, Error);

module.exports = ApiError;
