var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenants.auth0.com';

var TenantManager = require(SRC_DIR + '/management/TenantManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('TenantManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.tenant = new TenantManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['updateSettings', 'getSettings'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.tenant[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(TenantManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var manager = TenantManager.bind(null, {});

      expect(manager).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var manager = TenantManager.bind(null, { baseUrl: '' });

      expect(manager).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getSettings', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/tenants/settings')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.tenant.getSettings(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.tenant
        .getSettings()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/tenants/settings')
        .reply(500);

      this.tenant.getSettings().catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/tenants/settings')
        .reply(200, data);

      this.tenant.getSettings().then(function(blacklistedTokens) {
        expect(blacklistedTokens).to.be.an.instanceOf(Array);

        expect(blacklistedTokens.length).to.equal(data.length);

        expect(blacklistedTokens[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/tenants/settings', function(done) {
      var request = this.request;

      this.tenant.getSettings().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/tenants/settings')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.tenant.getSettings().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/tenants/settings')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200);

      this.tenant.getSettings({ include_fields: true, fields: 'test' }).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#updateSettings', function() {
    var data = {
      friendly_name: 'Test name'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .patch('/tenants/settings')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.tenant.updateSettings(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.tenant
        .updateSettings(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/tenants/settings')
        .reply(500);

      this.tenant.updateSettings(data).catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a PATCH request to /api/v2/tenants/settings', function(done) {
      var request = this.request;

      this.tenant.updateSettings(data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/tenants/settings', data)
        .reply(200);

      this.tenant.updateSettings(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/tenants/settings')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.tenant.updateSettings(data).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });
});
