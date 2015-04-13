var Users = require('./users');
var util = require('util');
var utils = require('./utils');

var DEFAULT_REGION = 'us';
var BASE_URL_FORMAT = 'https://%s/api/v2';
var ArgumentError = require('./errors').ArgumentError;

var REGIONS_TO_DOMAINS = {
  us: 'login.auth0.com',
  eu: 'login.eu.auth0.com'
};

function Client(options){
  if (!options.token){
    throw new ArgumentError('Missing token');
  }

  if (options.domain && options.region){
    throw new ArgumentError('Cannot provide both region and domain');
  }

  var domain = options.domain ||
    REGIONS_TO_DOMAINS[options.region || DEFAULT_REGION];

  if (!domain){
    throw new ArgumentError('The region is invalid, valid values are any of: "' +
      Object.keys(REGIONS_TO_DOMAINS).join('","') + '"');
  }

  this.accessToken = options.token;
  this.baseUrl = util.format(BASE_URL_FORMAT, domain);
}

utils.subEntity(Client, 'users', Users);

module.exports = Client;