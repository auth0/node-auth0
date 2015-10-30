var expect = require('chai').expect;
var Client = require('../../src/client');
var ArgumentError = require('../../src/exceptions').ArgumentError;
var domains = require('../../src/constants').DOMAINS_BY_REGION;


describe('Client', function () {

  describe('#constructor', function () {

    it('should error when no options are provided', function () {
      expect(Client).to.throw(ArgumentError, 'Missing client options');
    });

    it('should error when the first argument is not an object', function () {
      expect(Client.bind(null, 1)).to.throw(ArgumentError, 'Missing client options');
    });

    it('should not allow providing both domain and region', function () {
      var options = {
        token: 'token',
        domain: domains.eu,
        region: 'eu'
      };
      var client = Client.bind(null, options);

      expect(client).to.throw(ArgumentError, 'Cannot provide both region and domain');
    });

    it('should error when a wrong region is provided', function () {
      var options = {
        token: 'token',
        region: 'xy'
      };
      var client = Client.bind(null, options);

      expect(client).to.throw(ArgumentError);
    });

    it('should not error when a valid region is provided', function () {
      var options = {
        token: 'token',
        region: 'eu'
      };
      var client = Client.bind(null, options);

      expect(client).not.to.throw();
    });

    it('should take US as the default region when none is provided', function () {
      var client = new Client({ token: 'token' });

      expect(client.region).to.equal('us');
    });

    it('should allow regions to be in uppercase or mixed-case', function () {
      var options = {
        token: 'token',
        region: 'EU'
      };
      var client = Client.bind(null, options);

      expect(client).not.to.throw();
    });
  });
});
