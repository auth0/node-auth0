var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var BrandingManager = require(SRC_DIR + '/management/BrandingManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('BrandingManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.branding = new BrandingManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['getSettings', 'updateSettings'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.branding[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(BrandingManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = BrandingManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = BrandingManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getSettings', function() {
    var data = {
      colors: {
        primary: '#FFF'
      },
      favicon_url: 'https://example.com/favicon.ico',
      logo_url: 'https://example.com/logo.png',
      font: {
        url: 'https://example.com/font.ttf'
      }
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/branding')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.branding.getSettings(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.branding
        .getSettings()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/branding')
        .reply(500);

      this.branding.getSettings().catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/branding')
        .reply(200, data);

      this.branding.getSettings().then(function(provider) {
        expect(provider.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/branding', function(done) {
      var request = this.request;

      this.branding.getSettings().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/branding')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.branding.getSettings().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the parameters in the query-string', function(done) {
      nock.cleanAll();

      var params = {
        include_fields: true,
        fields: 'test'
      };

      var request = nock(API_URL)
        .get('/branding')
        .query(params)
        .reply(200);

      this.branding.getSettings(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateSettings', function() {
    var data = {
      colors: {
        primary: '#FFF'
      },
      favicon_url: 'https://example.com/favicon.ico',
      logo_url: 'https://example.com/logo.png',
      font: {
        url: 'https://example.com/font.ttf'
      }
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .patch('/branding')
        .reply(200, data);
    });

    it('should accept a callback', function(done) {
      this.branding.updateSettings({}, data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.branding
        .updateSettings({}, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/branding/' + data.id)
        .reply(500);

      this.branding.updateSettings({}, data).catch(function(err) {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/branding', function(done) {
      var request = this.request;

      this.branding.updateSettings({}, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/branding', data)
        .reply(200);

      this.branding.updateSettings({}, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/branding')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.branding.updateSettings({}, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
