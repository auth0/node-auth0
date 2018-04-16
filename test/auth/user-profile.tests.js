var expect = require('chai').expect;
var extend = require('util')._extend;
var nock = require('nock');

// Constants.
var SRC_DIR = '../../src';
var DOMAIN = 'tenant.auth0.com';
var API_URL = 'https://' + DOMAIN;
var CLIENT_ID = 'TEST_CLIENT_ID';

var ArgumentError = require('rest-facade').ArgumentError;
var Authenticator = require(SRC_DIR + '/auth/OAuthAuthenticator');

var validOptions = {
  domain: DOMAIN,
  clientId: CLIENT_ID
};

describe('UserProfile', function() {});
