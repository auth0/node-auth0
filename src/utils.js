const request = require('request');

/**
 * @module utils
 */
module.exports = {
  /**
   * Given a JSON string, convert it to its base64 representation.
   *
   * @method    jsonToBase64
   * @memberOf  module:utils
   */
  jsonToBase64(json) {
    const bytes = new Buffer(JSON.stringify(json));

    return bytes
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  },

  /**
   * Simple wrapper that, given a class, a property name and a method name,
   * creates a new method in the class that is a wrapper for the given
   * property method.
   *
   * @method    wrapPropertyMethod
   * @memberOf  module:utils
   */
  wrapPropertyMethod(Parent, name, propertyMethod) {
    const path = propertyMethod.split('.');
    const property = path.shift();
    const method = path.pop();

    Object.defineProperty(Parent.prototype, name, {
      enumerable: false,
      get() {
        return this[property][method].bind(this[property]);
      }
    });
  },

  /**
   * Perform a request with the given settings and return a promise that resolves
   * when the request is successful and rejects when there's an error.
   *
   * @method    getRequestPromise
   * @memberOf  module:utils
   */
  getRequestPromise(settings) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: settings.url,
          method: settings.method,
          body: settings.data,
          json: typeof settings.data === 'object',
          headers: settings.headers
        },
        (err, res, body) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(res.body);
        }
      );
    });
  }
};
