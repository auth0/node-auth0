var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var ClientGrantsManager = require(SRC_DIR + '/management/ClientGrantsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('ClientGrantsManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.grants = new ClientGrantsManager({
      headers: {
        authorization: 'Bearer ' + this.token
      },
      baseUrl: API_URL
    });
  });

  afterEach(function() {
    nock.cleanAll();
  });

  describe('instance', function() {
    var methods = ['getAll', 'create', 'update', 'delete'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.grants[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(ClientGrantsManager).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', function() {
      var grants = ClientGrantsManager.bind(null, {});

      expect(grants).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var grants = ClientGrantsManager.bind(null, { baseUrl: '' });

      expect(grants).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/client-grants')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.grants.getAll(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.grants
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/client-grants')
        .reply(500);

      this.grants.getAll().catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/client-grants')
        .reply(200, data);

      this.grants.getAll().then(function(grants) {
        expect(grants).to.be.an.instanceOf(Array);

        expect(grants.length).to.equal(data.length);

        expect(grants[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/client-grants', function(done) {
      var request = this.request;

      this.grants.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/client-grants')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.grants.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/client-grants')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200);

      this.grants.getAll({ include_fields: true, fields: 'test' }).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#create', function() {
    var data = {
      client_id: 'CLIENT_ID',
      audience: 'AUDIENCE',
      scope: ['user']
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/client-grants')
        .reply(201, data);
    });

    it('should accept a callback', function(done) {
      this.grants.create(data, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.grants
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/client-grants', function(done) {
      var request = this.request;

      this.grants.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/client-grants')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(201, data);

      this.grants.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new client grant data in the request body', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/client-grants', data)
        .reply(201, data);

      this.grants.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', function() {
    beforeEach(function() {
      this.data = { id: 5 };

      this.request = nock(API_URL)
        .patch('/client-grants/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.grants.update({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.grants
        .update({ id: 5 }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/client-grants/5', function(done) {
      var request = this.request;

      this.grants.update({ id: 5 }, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/client-grants/' + this.data.id, this.data)
        .reply(200);

      this.grants.update({ id: 5 }, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', function() {
    var id = 5;

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/client-grants/' + id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.grants.delete({ id: id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.grants.delete({ id: id }).then(done.bind(null, null));
    });

    it('should perform a DELETE request to /client-grants/' + id, function(done) {
      var request = this.request;

      this.grants.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
