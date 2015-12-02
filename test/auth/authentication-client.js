var expect = require('chai').expect;

var ManagementClient = require('../../src/management');


describe('ManagementClient', function () {

    it('should raise an error when no options object is provided', function () {
      expect(ManagementClient)
        .to.throw(ArgumentError, 'Management API SDK options must be an object');
    });


    it('should raise an error when the token is not valid', function () {
      var options = { token: '', domain: 'tenant.auth.com' };
      var client = ManagementClient.bind(null, options);

      expect(client)
        .to.throw(ArgumentError, 'An access token must be provided');
    });


    it('should raise an error when the domain is not valid', function () {
      var client = ManagementClient.bind(null, { token: 'token', domain: '' });

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
        }
      };

      before(function () {
        this.client = new ManagementClient({ token: 'token', domain: 'tenant.auth0.com' });
      });

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


    describe('instance methods', function () {
      var method;
      var methods = [
        'getConnections',
        'createConnection',
        'getConnection',
        'deleteConnection',
        'updateConnection',
        'getClients',
        'getClient',
        'createClient',
        'updateClient',
        'deleteClient',
        'createDevicePublicKey',
        'getDeviceCredentials',
        'deleteDeviceCredential',
        'getRules',
        'createRule',
        'getRule',
        'deleteRule',
        'updateRule',
        'getUsers',
        'getUser',
        'deleteAllUsers',
        'deleteUsers',
        'createUser',
        'updateUser',
        'getBlacklistedTokens',
        'blacklistToken',
        'getEmailProvider',
        'configureEmailProvider',
        'deleteEmailProvider',
        'updateEmailProvider',
        'getActiveUsersCount',
        'getDailyStats',
        'getTenantSettings',
        'updateTenantSettings'
      ];

      before(function () {
        this.client = new ManagementClient({ token: 'token', domain: 'auth0.com' });
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
