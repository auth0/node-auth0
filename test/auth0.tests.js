var expect = require('chai').expect;

var auth0 = require('../src');
var AuthenticationClient = require('../src/auth');
var ManagementClient = require('../src/management');
var ManagementTokenProvider = require('../src/management/ManagementTokenProvider')


describe('Auth0 module', function () {

    it('should expose the AuthenticationClient', function () {
      expect(auth0.AuthenticationClient)
        .to.equal(AuthenticationClient);
    });


    it('should expose the ManagementClient', function () {
      expect(auth0.ManagementClient)
        .to.equal(ManagementClient);
    });
});
