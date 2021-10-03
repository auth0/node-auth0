var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var AttackProtectionManager = require(SRC_DIR + '/management/AttackProtectionManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('AttackProtectionManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.attackProtection = new AttackProtectionManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['getBruteforceConfig', 'updateBruteforceConfig'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.attackProtection[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(AttackProtectionManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = AttackProtectionManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = AttackProtectionManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getBruteforceConfig', function() {
    var data = {
      enabled: true,
      shields: ['user_notification', 'block'],
      mode: 'count_per_identifier_and_ip',
      allowlist: ['1.1.2.2'],
      max_attempts: 100
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/attack-protection/brute-force-protection')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.attackProtection.getBruteforceConfig({}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.attackProtection
        .getBruteforceConfig()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/attack-protection/brute-force-protection')
        .reply(500);

      this.attackProtection.getBruteforceConfig().catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      this.attackProtection.getBruteforceConfig().then(function(bruteforceConfig) {
        expect(bruteforceConfig.max_attempts).to.equal(data.max_attempts);

        done();
      });
    });

    it('should perform a GET request to /api/v2/attack-protection/brute-force-protection', function(done) {
      var request = this.request;

      this.attackProtection.getBruteforceConfig().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/attack-protection/brute-force-protection')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.attackProtection.getBruteforceConfig().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateBruteforceConfig', function() {
    var data = {
      enabled: true,
      shields: ['user_notification', 'block'],
      mode: 'count_per_identifier_and_ip',
      allowlist: ['1.1.2.2'],
      max_attempts: 100
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .patch('/attack-protection/brute-force-protection')
        .reply(200, data);
    });

    it('should accept a callback', function(done) {
      this.attackProtection.updateBruteforceConfig({}, data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.attackProtection
        .updateBruteforceConfig({}, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/attack-protection/brute-force-protection')
        .reply(500);

      this.attackProtection.updateBruteforceConfig({}, data).catch(function(err) {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/attack-protection/brute-force-protection', function(done) {
      var request = this.request;

      this.attackProtection.updateBruteforceConfig({}, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      var request = this.request;

      this.attackProtection.updateBruteforceConfig({}, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      this.attackProtection.updateBruteforceConfig({}, data).then(function(bruteforceConfig) {
        expect(bruteforceConfig.max_attempts).to.equal(data.max_attempts);

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/attack-protection/brute-force-protection')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.attackProtection.updateBruteforceConfig({}, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
