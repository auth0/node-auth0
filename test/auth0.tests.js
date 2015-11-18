var expect = require('chai').expect;

var auth0 = require('../src');
var Auth0 = require('../src/Auth0');
var ArgumentError = require('../src/exceptions').ArgumentError;


describe('Auth0 module', function () {

    it('should raise an error when no options object is provided', function () {
      expect(auth0).to.throw(ArgumentError, 'Auth0 SDK options must be an object');
    });

    it('should raise an error when the token is not valid', function () {
      var client = auth0.bind(null, { token: '' });

      expect(client).to.throw(ArgumentError, 'An access token must be provided');
    });

    it('should return an instance of Auth0 when the token is valid', function () {
      var options = { token: 'abcdefg' };
      var client = auth0(options);

      expect(client).to.be.an('Object');
      expect(client).to.be.an.instanceOf(Auth0);
    });

});
