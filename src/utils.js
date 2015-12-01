/**
 * @module utils
 */
var utils = module.exports = {};


/**
 * Given a JSON string, convert it to its base64 representation.
 *
 * @method
 * @memberOf utils
 */
utils.jsonToBase64 = function (json) {
  var bytes = new Buffer(JSON.stringify(json));

  return bytes
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};


/**
 * Simple wrapper that, given a class, a property name and a method name,
 * creates a new method in the class that is a wrapper for the given
 * property method.
 *
 * @method
 * @memberOf utils
 */
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

