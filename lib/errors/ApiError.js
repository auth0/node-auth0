function ApiError (message, statusCode) {
  var err = Error.call(this, message);
  err.name = 'ApiError';
  err.statusCode = statusCode;
  return err;
}

ApiError.prototype = Object.create(Error.prototype, { 
  constructor: { value: ApiError } 
});

module.exports = ApiError;
