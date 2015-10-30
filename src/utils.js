var APIError = require('./exceptions').APIError;

var utils = module.exports = {};

utils.subEntity = function(Parent, name, Constructor){
  var underlyingFieldName = '__' + name;
  Object.defineProperty(Parent.prototype, name, {
    enumerable: true,
    get: function(){
      if (!this[underlyingFieldName]){
        this[underlyingFieldName] = new Constructor(this);
      }

      return this[underlyingFieldName];
    }
  });
};

utils.responseHandler = function(onError, onSuccess){
  return function(err, resp){
    if (err) {
      var error = err;
      if (err.response && err.response.body){
        var body = err.response.body;
        error = new APIError(body.statusCode, body.error, body.message);
      }

      return onError(error);
    }

    onSuccess(resp);
  };
};

utils.successCallback = function(cb, res){
  return function(x){
    if (cb){
      return cb(null, x);
    } else {
      return res(x);
    }
  };
};
