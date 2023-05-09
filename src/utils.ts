import pkg from '../package.json' assert { type: 'json' };
/**
 * Given a JSON string, convert it to its base64 representation.
 *
 * @param {object} json Json data
 * @returns {string}
 */
export const jsonToBase64 = (json: unknown) => {
  const bytes = Buffer.from(JSON.stringify(json));

  return bytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/**
 * Return an object with information about the current client.
 *
 * @function    generateClientInfo
 * @returns {object}   Object containing client information.
 */
export const generateClientInfo = () => ({
  name: 'node-auth0',
  version: pkg.version,
  env: {
    node: process.version.replace('v', ''),
  },
});

export const containsUnsafeChars = (s: string) => {
  const safeChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$-_.+!*'(),%";
  return !!s.split('').find((c) => !safeChars.includes(c));
};

export const maybeDecode = (url: string) => {
  if (containsUnsafeChars(url)) {
    return encodeURIComponent(url);
  }
  return url;
};

export const sanitizeArguments = function (
  // eslint-disable-next-line @typescript-eslint/ban-types
  optionsCandidate: Function | unknown,
  // eslint-disable-next-line @typescript-eslint/ban-types
  cbCandidate: Function | undefined
) {
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
