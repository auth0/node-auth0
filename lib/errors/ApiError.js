function ApiError (body, statusCode) {
  var message = body.detail || body.error_description || body;
  var code = body.error;

  var err = Error.call(this, message);

  err.name = 'ApiError';
  err.statusCode = statusCode;
  err.code = code;

  return err;
}

ApiError.prototype = Object.create(Error.prototype, {
  constructor: { value: ApiError }
});

module.exports = ApiError;
