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
    var methods = ['getBruteForceConfig', 'updateBruteForceConfig'];

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

  describe('#getBruteForceConfig', function() {
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
        .reply(200, data);
    });

    it('should accept a callback', function(done) {
      this.attackProtection.getBruteForceConfig({}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.attackProtection
        .getBruteForceConfig()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/attack-protection/brute-force-protection')
        .reply(500);

      this.attackProtection.getBruteForceConfig().catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      this.attackProtection.getBruteForceConfig().then(function(bruteForceConfig) {
        expect(bruteForceConfig).to.deep.equal(data);

        done();
      });
    });

    it('should perform a GET request to /api/v2/attack-protection/brute-force-protection', function(done) {
      var request = this.request;

      this.attackProtection.getBruteForceConfig().then(function() {
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

      this.attackProtection.getBruteForceConfig().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateBruteForceConfig', function() {
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
      this.attackProtection.updateBruteForceConfig({}, data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.attackProtection
        .updateBruteForceConfig({}, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/attack-protection/brute-force-protection')
        .reply(500);

      this.attackProtection.updateBruteForceConfig({}, data).catch(function(err) {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/attack-protection/brute-force-protection', function(done) {
      var request = this.request;

      this.attackProtection.updateBruteForceConfig({}, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      var request = this.request;

      this.attackProtection.updateBruteForceConfig({}, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      this.attackProtection.updateBruteForceConfig({}, data).then(function(bruteForceConfig) {
        expect(bruteForceConfig).to.deep.equal(data);

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/attack-protection/brute-force-protection')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.attackProtection.updateBruteForceConfig({}, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
