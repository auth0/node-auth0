var expect = require('chai').expect;

var ArgumentError = require('../../src/exceptions').ArgumentError;

var AuthenticationClient = require('../../src/auth');
var OAuthAuthenticator = require('../../src/auth/OAuthAuthenticator');
var DatabaseAuthenticator = require('../../src/auth/DatabaseAuthenticator');
var PasswordlessAuthenticator = require('../../src/auth/PasswordlessAuthenticator');
var UsersManager = require('../../src/auth/UsersManager');
var TokensManager = require('../../src/auth/TokensManager');

var ensureProperty = require('../utils').ensureProperty;


describe('AuthenticationClient', function () {

  describe('#constructor', function () {
    it('should raise an error when no options object is provided', function () {
      expect(AuthenticationClient)
        .to.throw(ArgumentError, 'Authentication Client SDK options must be an object');
    });


    it('should raise an error when the domain is not valid', function () {
      var client = AuthenticationClient.bind(null, { token: 'token', domain: '' });

      expect(client)
        .to.throw(ArgumentError, 'Must provide a domain');
    });
  });


  describe('instance properties', function () {
    var properties = {
      'OAuthAuthenticator': {
        name: 'oauth',
        cls: OAuthAuthenticator
      },
      'DatabaseAuthenticator': {
        name: 'database',
        cls: DatabaseAuthenticator
      },
      'PasswordlessAuthenticator': {
        name: 'passwordless',
        cls: PasswordlessAuthenticator
      },
      'UsersManager': {
        name: 'users',
        cls: UsersManager
      },
      'TokensManager': {
        name: 'tokens',
        cls: TokensManager
      }
    };
    var options = {
      clientId: 'CLIENT_ID',
      domain: 'tenant.auth0.com'
    };
    var client = new AuthenticationClient(options);

    // Tests common to all properties.
    for (var name in properties) {
      var property = properties[name];

      it('should expose an instance of ' + name, ensureProperty(client, property.name, property.cls));
    }
  });


  describe('instance methods', function () {
    var method;
    var methods = [];
    var client = new AuthenticationClient({ token: 'token', domain: 'auth0.com' });

    methods.forEach(function (method) {
      ensureMethod(client, method);
    });
  });
});
