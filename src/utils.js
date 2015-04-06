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