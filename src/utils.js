const pkg = require('../package.json');

/**
 * Given a JSON string, convert it to its base64 representation.
 *
 * @param {object} json Json data
 * @returns {string}
 */
const jsonToBase64 = (json) => {
  const bytes = Buffer.from(JSON.stringify(json));

  return bytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/**
 * Return an object with information about the current client.
 *
 * @function    generateClientInfo
 * @returns {object}   Object containing client information.
 */
const generateClientInfo = () => ({
  name: 'node-auth0',
  version: pkg.version,
  env: {
    node: process.version.replace('v', ''),
  },
});

/**
 * Simple wrapper that, given a class, a property name and a method name,
 * creates a new method in the class that is a wrapper for the given
 * property method.
 */

const wrapPropertyMethod = (Parent, name, propertyMethod) => {
  const path = propertyMethod.split('.');
  if (path.length > 2) {
    throw new Error('wrapPropertyMethod() only supports one level of nesting for propertyMethod');
  }
  const property = path.shift();
  const method = path.pop();

  Object.defineProperty(Parent.prototype, name, {
    enumerable: false,
    get() {
      return this[property][method].bind(this[property]);
    },
  });
};

const containsUnsafeChars = (s) => {
  const safeChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$-_.+!*'(),%";
  return !!s.split('').find((c) => !safeChars.includes(c));
};

const maybeDecode = (url) => {
  if (containsUnsafeChars(url)) {
    return encodeURIComponent(url);
  }
  return url;
};

const sanitizeArguments = function (optionsCandidate, cbCandidate) {
  if (optionsCandidate instanceof Function) {
    return {
      cb: optionsCandidate,
      options: undefined,
    };
  }
  return {
    cb: cbCandidate,
    options: optionsCandidate,
  };
};

module.exports = {
  jsonToBase64,
  generateClientInfo,
  wrapPropertyMethod,
  containsUnsafeChars,
  maybeDecode,
  sanitizeArguments,
};
