var expect = require('chai').expect;
var nock = require('nock');
var BlacklistedTokensManager = require('../src/BlacklistedTokensManager');
var API_URL = 'https://tenant.auth0.com';

var ArgumentError = require('../src/exceptions').ArgumentError;


describe('BlacklistedTokensManager', function () {

  before(function () {
    this.token = 'TOKEN';
    this.blacklistedTokens = new BlacklistedTokensManager({
      headers: {
        authorization: 'Bearer ' + this.token
      },
      baseUrl: API_URL
    });
  });


  describe('instance', function () {
    var methods = ['add', 'getAll'];

    methods.forEach(function (method) {
      it('should have a ' + method + ' method', function () {
        expect(this.blacklistedTokens[method])
          .to.exist
          .to.be.an.instanceOf(Function);
      })
    });
  });


  describe('#constructor', function () {
    it('should error when no options are provided', function () {
      expect(BlacklistedTokensManager)
        .to.throw(ArgumentError, 'Must provide client options');
    });


    it('should throw an error when no base URL is provided', function () {
      var client = BlacklistedTokensManager.bind(null, {});

      expect(client)
        .to.throw(ArgumentError, 'Must provide a base URL for the API');
    });


    it('should throw an error when the base URL is invalid', function () {
      var client = BlacklistedTokensManager.bind(null, { baseUrl: '' });

      expect(client)
        .to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

});
