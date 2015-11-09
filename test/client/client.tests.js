var expect = require('chai').expect;
var ClientsManager = require('../../src/ClientsManager');

var ArgumentError = require('../../src/exceptions').ArgumentError;
var domains = require('../../src/constants').DOMAINS_BY_REGION;


describe('ClientsManager', function () {

  describe('#constructor', function () {

    it('should error when no options are provided', function () {
      expect(ClientsManager).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should error when the first argument is not an object', function () {
      expect(ClientsManager.bind(null, 1)).to.throw(ArgumentError, 'Must provide client options');
    });
  });
});
