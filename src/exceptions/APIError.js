var util = require('util');

var APIError = function(statusCode, error, message){
  this.error = error;
  this.message = message;
  this.statusCode = statusCode;
};

util.inherits(APIError, Error);

module.exports = APIError;
