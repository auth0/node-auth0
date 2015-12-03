var expect = require('chai').expect;

var ArgumentError = require('../../src/exceptions').ArgumentError;

var AuthenticationClient = require('../../src/auth');
var OAuthAuthenticator = require('../../src/auth/OAuthAuthenticator');
var DatabaseAuthenticator = require('../../src/auth/DatabaseAuthenticator');
var PasswordlessAuthenticator = require('../../src/auth/PasswordlessAuthenticator');
var UsersManager = require('../../src/auth/UsersManager');
var TokensManager = require('../../src/auth/TokensManager');


describe('AuthenticationClient', function () {

    it('should raise an error when no options object is provided', function () {
      expect(AuthenticationClient)
        .to.throw(ArgumentError, 'Authentication Client SDK options must be an object');
    });


    it('should raise an error when the token is not valid', function () {
      var options = { token: '', domain: 'tenant.auth.com' };
      var client = AuthenticationClient.bind(null, options);

      expect(client)
        .to.throw(ArgumentError, 'An access token must be provided');
    });


    it('should raise an error when the domain is not valid', function () {
      var client = AuthenticationClient.bind(null, { token: 'token', domain: '' });

      expect(client)
        .to.throw(ArgumentError, 'Must provide a domain');
    });


    describe('instance properties', function () {
      var property;
      var properties = {
        'OAuthAuthenticator': {
          property: 'oauth',
          cls: OAuthAuthenticator
        },
        'DatabaseAuthenticator': {
          property: 'database',
          cls: DatabaseAuthenticator
        },
        'PasswordlessAuthenticator': {
          property: 'passwordless',
          cls: PasswordlessAuthenticator
        },
        'UsersManager': {
          property: 'users',
          cls: UsersManager
        },
        'TokensManager': {
          property: 'tokens',
          cls: TokensManager
        }
      };

      before(function () {
        var options = { token: 'token', domain: 'tenant.auth0.com' };
        this.client = new AuthenticationClient(options);

        // Tests common to all properties.
        for (var name in properties) {
          property = properties[name];

          it('should expose an instance of ' + name, function () {
            expect(this.client[property.property])
              .to.exist
              .to.be.an.instanceOf(property.cls);
          });
        }
      });
    });


    describe('instance methods', function () {
      var method;
      var methods = [];

      before(function () {
        this.client = new AuthenticationClient({ token: 'token', domain: 'auth0.com' });
      });

      for (var i = 0, l = methods.length; i < l; i++) {
        method = methods[i];

        it('should have a ' + method + ' method', function () {
          expect(this.client[method])
            .to.exist
            .to.be.an.instanceOf(Function);
        });
      }
    });
});
