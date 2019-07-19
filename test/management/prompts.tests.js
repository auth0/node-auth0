var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var PromptsManager = require(SRC_DIR + '/management/PromptsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('PromptsManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.prompts = new PromptsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['getSettings', 'updateSettings'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.prompts[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(PromptsManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = PromptsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = PromptsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getSettings', function() {
    var data = {
      universal_login_experience: ''
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/prompts')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.prompts.getSettings(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.prompts
        .getSettings()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/prompts')
        .reply(500);

      this.prompts.getSettings().catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/prompts')
        .reply(200, data);

      this.prompts.getSettings().then(function(provider) {
        expect(provider.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/prompts', function(done) {
      var request = this.request;

      this.prompts.getSettings().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/prompts')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.prompts.getSettings().then(function() {
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
        .get('/prompts')
        .query(params)
        .reply(200);

      this.prompts.getSettings(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateSettings', function() {
    var data = {
      universal_login_experience: 'new'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .patch('/prompts')
        .reply(200, data);
    });

    it('should accept a callback', function(done) {
      this.prompts.updateSettings({}, data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.prompts
        .updateSettings({}, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/prompts/' + data.id)
        .reply(500);

      this.prompts.updateSettings({}, data).catch(function(err) {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/prompts', function(done) {
      var request = this.request;

      this.prompts.updateSettings({}, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/prompts', data)
        .reply(200);

      this.prompts.updateSettings({}, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/prompts')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.prompts.updateSettings({}, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
