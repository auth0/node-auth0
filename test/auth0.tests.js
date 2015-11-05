var expect = require('chai').expect;
var auth0 = require('../src');
var Auth0 = require('../src/Auth0');

var ArgumentError = require('../src/exceptions').ArgumentError;
var domains = require('../src/constants').DOMAINS_BY_REGION;

describe('Auth0 module', function () {

    it('should return an instance of Auth0 when the token is valid', function () {
      var options = { token: 'abcdefg' };
      var client = null;

      try {
        client = auth0(options);

        expect(client).to.be.an('Object');
        expect(client).to.be.an.instanceOf(Auth0);
      } catch (err) {
        done(err);
      }
    });

    it('should not allow providing both domain and region', function () {
      var options = {
        token: 'token',
        domain: domains.eu,
        region: 'eu'
      };
      var client = auth0.bind(null, options);

      expect(client).to.throw(ArgumentError, 'Cannot provide both region and domain');
    });

    it('should error when a wrong region is provided', function () {
      var options = {
        token: 'token',
        region: 'xy'
      };
      var client = auth0.bind(null, options);

      expect(client).to.throw(ArgumentError);
    });

    it('should not error when a valid region is provided', function () {
      var options = {
        token: 'token',
        region: 'eu'
      };
      var client = auth0.bind(null, options);

      expect(client).not.to.throw();
    });

    it('should take US as the default region when none is provided', function () {
      var client = new auth0({ token: 'token' });

      expect(client.region).to.equal('us');
    });

    it('should allow regions to be in uppercase or mixed-case', function () {
      var options = {
        token: 'token',
        region: 'EU'
      };
      var client = auth0.bind(null, options);

      expect(client).not.to.throw();
    });
});
