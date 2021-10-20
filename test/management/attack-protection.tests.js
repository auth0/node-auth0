var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var AttackProtectionManager = require(SRC_DIR + '/management/AttackProtectionManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('AttackProtectionManager', function() {
  var bruteForcePath = '/attack-protection/brute-force-protection';
  var suspiciousIpPath = '/attack-protection/suspicious-ip-throttling';

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

  describe('Brute Force Protection', function() {
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
          .get(bruteForcePath)
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
          .get(bruteForcePath)
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

      it('should perform a GET request to /api/v2' + bruteForcePath, function(done) {
        var request = this.request;

        this.attackProtection.getBruteForceConfig().then(function() {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the token in the Authorization header', function(done) {
        nock.cleanAll();

        var request = nock(API_URL)
          .get(bruteForcePath)
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
          .patch(bruteForcePath)
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
          .patch(bruteForcePath)
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
          .patch(bruteForcePath)
          .matchHeader('Authorization', 'Bearer ' + this.token)
          .reply(200);

        this.attackProtection.updateBruteForceConfig({}, data).then(function() {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });
  });

  describe('Suspicious IP Throttling', function() {
    describe('#getSuspiciousIpThrottlingConfig', function() {
      var data = {
        enabled: true,
        shields: ['admin_notification', 'block'],
        allowlist: ['1.1.1.0'],
        stage: {
          'pre-login': {
            max_attempts: 1,
            rate: 864000
          },
          'pre-user-registration': {
            max_attempts: 1,
            rate: 864000
          }
        }
      };

      beforeEach(function() {
        this.request = nock(API_URL)
          .get(suspiciousIpPath)
          .reply(200, data);
      });

      it('should accept a callback', function(done) {
        this.attackProtection.getSuspiciousIpThrottlingConfig({}, function() {
          done();
        });
      });

      it('should return a promise if no callback is given', function(done) {
        this.attackProtection
          .getSuspiciousIpThrottlingConfig()
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function(done) {
        nock.cleanAll();

        var request = nock(API_URL)
          .get(suspiciousIpPath)
          .reply(500);

        this.attackProtection.getSuspiciousIpThrottlingConfig().catch(function(err) {
          expect(err).to.exist;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function(done) {
        this.attackProtection
          .getSuspiciousIpThrottlingConfig()
          .then(function(suspiciousIpThrottlingConfig) {
            expect(suspiciousIpThrottlingConfig).to.deep.equal(data);

            done();
          });
      });

      it('should perform a GET request to /api/v2/attack-protection/brute-force-protection', function(done) {
        var request = this.request;

        this.attackProtection.getSuspiciousIpThrottlingConfig().then(function() {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the token in the Authorization header', function(done) {
        nock.cleanAll();

        var request = nock(API_URL)
          .get(suspiciousIpPath)
          .matchHeader('Authorization', 'Bearer ' + this.token)
          .reply(200);

        this.attackProtection.getSuspiciousIpThrottlingConfig().then(function() {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#updateSuspiciousIpThrottlingConfig', function() {
      var data = {
        enabled: true,
        shields: ['admin_notification', 'block'],
        allowlist: ['1.1.1.0'],
        stage: {
          'pre-login': {
            max_attempts: 1,
            rate: 864000
          },
          'pre-user-registration': {
            max_attempts: 1,
            rate: 864000
          }
        }
      };

      beforeEach(function() {
        this.request = nock(API_URL)
          .patch(suspiciousIpPath)
          .reply(200, data);
      });

      it('should accept a callback', function(done) {
        this.attackProtection.updateSuspiciousIpThrottlingConfig({}, data, function() {
          done();
        });
      });

      it('should return a promise if no callback is given', function(done) {
        this.attackProtection
          .updateSuspiciousIpThrottlingConfig({}, data)
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function(done) {
        nock.cleanAll();

        var request = nock(API_URL)
          .patch(suspiciousIpPath)
          .reply(500);

        this.attackProtection.updateSuspiciousIpThrottlingConfig({}, data).catch(function(err) {
          expect(err).to.exist.to.be.an.instanceOf(Error);

          done();
        });
      });

      it('should perform a PATCH request to /api/v2' + suspiciousIpPath, function(done) {
        var request = this.request;

        this.attackProtection.updateSuspiciousIpThrottlingConfig({}, {}).then(function() {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass the data in the body of the request', function(done) {
        var request = this.request;

        this.attackProtection.updateSuspiciousIpThrottlingConfig({}, data).then(function() {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function(done) {
        this.attackProtection
          .updateSuspiciousIpThrottlingConfig({}, data)
          .then(function(suspiciousIpThrottlingConfig) {
            expect(suspiciousIpThrottlingConfig).to.deep.equal(data);

            done();
          });
      });

      it('should include the token in the Authorization header', function(done) {
        nock.cleanAll();

        var request = nock(API_URL)
          .patch(suspiciousIpPath)
          .matchHeader('Authorization', 'Bearer ' + this.token)
          .reply(200);

        this.attackProtection.updateSuspiciousIpThrottlingConfig({}, data).then(function() {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });
  });
});
