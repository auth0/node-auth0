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

utils.wrapPropertyMethod = function (Parent, name, propertyMethod) {
  var path = propertyMethod.split('.');
  var method = path.pop();
  var property = null;


  Object.defineProperty(Parent.prototype, name, {
    enumerable: false,
    get: function () {
      property = this;

      while(path.length > 0) {
        property = property[path.shift()];
      }

      return property[method].bind(property);
    }
  });
}

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
