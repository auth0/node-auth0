var expect = require('chai').expect;
var Client = require('../../src/Client');

var ArgumentError = require('../../src/exceptions').ArgumentError;
var domains = require('../../src/constants').DOMAINS_BY_REGION;


describe('Client', function () {

  describe('#constructor', function () {

    it('should error when no options are provided', function () {
      expect(Client).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should error when the first argument is not an object', function () {
      expect(Client.bind(null, 1)).to.throw(ArgumentError, 'Must provide client options');
    });
  });
});
