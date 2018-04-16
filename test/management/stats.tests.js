var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var StatsManager = require(SRC_DIR + '/management/StatsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('StatsManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.stats = new StatsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['getActiveUsersCount', 'getDaily'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.stats[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(StatsManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = StatsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = StatsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getDaily', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/stats/daily')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.stats.getDaily({}, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.stats
        .getDaily()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/stats/daily')
        .reply(500);

      this.stats.getDaily().catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/stats/daily')
        .reply(200, data);

      this.stats.getDaily().then(function(blacklistedTokens) {
        expect(blacklistedTokens).to.be.an.instanceOf(Array);

        expect(blacklistedTokens.length).to.equal(data.length);

        expect(blacklistedTokens[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/stats/daily', function(done) {
      var request = this.request;

      this.stats.getDaily().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/stats/daily')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.stats.getDaily().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/stats/daily')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200);

      this.stats.getDaily({ include_fields: true, fields: 'test' }).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#getActiveUsersCount', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/stats/active-users')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.stats.getActiveUsersCount(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.stats
        .getActiveUsersCount()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/stats/active-users')
        .reply(500);

      this.stats.getActiveUsersCount().catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a GET request to /api/v2/stats/active-users', function(done) {
      var request = this.request;

      this.stats.getActiveUsersCount().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the token data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/stats/active-users')
        .reply(200);

      this.stats.getActiveUsersCount().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/stats/active-users')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.stats.getActiveUsersCount().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });
});
