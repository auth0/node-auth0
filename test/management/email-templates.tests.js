var expect = require('chai').expect;
var nock = require('nock');
var EmailTemplatesManager = require('../../src/management/EmailTemplatesManager');
var ArgumentError = require('rest-facade').ArgumentError;

var API_URL = 'https://tenant.auth0.com';
const TEMPLATE_NAME = 'foobar';
const DEFAULT_PARAMS = { name: TEMPLATE_NAME };
const DEFAULT_DATA = {
  template: 'verify_email',
  body: '',
  from: 'sender@auth0.com',
  resultUrl: '',
  subject: '',
  syntax: 'liquid',
  urlLifetimeInSeconds: 0,
  enabled: false
};

describe('EmailTemplatesManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.emailTemplates = new EmailTemplatesManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });
  describe('instance', function() {
    var methods = ['get', 'create', 'update'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.emailTemplates[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(EmailTemplatesManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = EmailTemplatesManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a valid string as base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = EmailTemplatesManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'Must provide a valid string as base URL for the API');
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/email-templates/' + TEMPLATE_NAME)
        .reply(200, DEFAULT_DATA);
    });

    it('should accept a callback', function(done) {
      this.emailTemplates.get(DEFAULT_PARAMS, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.emailTemplates
        .get(DEFAULT_PARAMS)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/email-templates/' + TEMPLATE_NAME, function(done) {
      var request = this.request;
      this.emailTemplates.get(DEFAULT_PARAMS).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/email-templates/' + TEMPLATE_NAME)
        .reply(500);

      this.emailTemplates.get(DEFAULT_PARAMS).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/email-templates/' + TEMPLATE_NAME)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.emailTemplates.get(DEFAULT_PARAMS).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/email-templates')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.emailTemplates.create(DEFAULT_DATA, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.emailTemplates
        .create(DEFAULT_DATA)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/email-templates')
        .reply(500);

      this.emailTemplates.create(DEFAULT_DATA).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/email-templates', function(done) {
      var request = this.request;

      this.emailTemplates.create(DEFAULT_DATA).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/email-templates', DEFAULT_DATA)
        .reply(200);

      this.emailTemplates.create(DEFAULT_DATA).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/email-templates')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.emailTemplates.create(DEFAULT_DATA).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', function() {
    beforeEach(function() {
      this.patchData = { from: 'new@email.com' };

      this.request = nock(API_URL)
        .patch('/email-templates/' + TEMPLATE_NAME)
        .reply(200, DEFAULT_DATA);
    });

    it('should accept a callback', function(done) {
      this.emailTemplates.update(DEFAULT_PARAMS, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.emailTemplates
        .update(DEFAULT_PARAMS, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/email-templates/' + TEMPLATE_NAME, function(
      done
    ) {
      var request = this.request;

      this.emailTemplates.update(DEFAULT_PARAMS, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/email-templates/' + TEMPLATE_NAME, this.patchData)
        .reply(200);

      this.emailTemplates.update(DEFAULT_PARAMS, this.patchData).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/email-templates/' + TEMPLATE_NAME)
        .reply(500);

      this.emailTemplates.update(DEFAULT_PARAMS, this.patchData).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });
  });
});
