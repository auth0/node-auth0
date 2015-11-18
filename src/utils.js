var ApiError = require('./exceptions').ApiError;

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
}

utils.responseHandler = function(onError, onSuccess){
  return function(err, resp){
    if (err) {
      var error = err;
      if (err.response && err.response.body){
        var body = err.response.body;
        error = new ApiError(body.statusCode, body.error, body.message);
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
