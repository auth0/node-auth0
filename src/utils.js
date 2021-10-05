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
  containsUnsafeChars,
  maybeDecode,
  sanitizeArguments,
};
