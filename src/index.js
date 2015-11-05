var Auth0 = require('./Auth0');

var exports = module.exports = function (options) {
  return new Auth0(options);
};

