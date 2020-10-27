var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var ClientsManager = require(SRC_DIR + '/management/ClientsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('ClientsManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.clients = new ClientsManager({
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
    var methods = ['getAll', 'get', 'create', 'update', 'delete'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.clients[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(ClientsManager).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = ClientsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = ClientsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/clients')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.clients.getAll(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.clients
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/clients')
        .reply(500);

      this.clients.getAll().catch(function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/clients')
        .reply(200, data);

      this.clients.getAll().then(function(clients) {
        expect(clients).to.be.an.instanceOf(Array);

        expect(clients.length).to.equal(data.length);

        expect(clients[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/clients', function(done) {
      var request = this.request;

      this.clients.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/clients')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.clients.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/clients')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200);

      this.clients.getAll({ include_fields: true, fields: 'test' }).then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#create', function() {
    var data = { name: 'Test client' };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/clients')
        .reply(201, data);
    });

    it('should accept a callback', function(done) {
      this.clients.create(data, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.clients
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients', function(done) {
      var request = this.request;

      this.clients.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/clients')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(201, data);

      this.clients.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new client data in the request body', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/clients', data)
        .reply(201, data);

      this.clients.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.data = {
        id: 5,
        name: 'John Doe',
        email: 'john@doe.com'
      };

      this.request = nock(API_URL)
        .get('/clients/' + this.data.id)
        .reply(201, this.data);
    });

    it('should accept a callback', function(done) {
      var params = { id: this.data.id };

      this.clients.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.clients
        .get({ id: this.data.id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients/5', function(done) {
      var request = this.request;

      this.clients.get({ client_id: this.data.id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', function() {
    beforeEach(function() {
      this.data = { id: 5 };

      this.request = nock(API_URL)
        .patch('/clients/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.clients.update({ client_id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.clients
        .update({ client_id: 5 }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/clients/5', function(done) {
      var request = this.request;

      this.clients.update({ client_id: 5 }, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/clients/' + this.data.id, this.data)
        .reply(200);

      this.clients.update({ client_id: 5 }, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', function() {
    var id = 5;

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/clients/' + id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.clients.delete({ client_id: id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.clients.delete({ client_id: id }).then(done.bind(null, null));
    });

    it('should perform a DELETE request to /clients/' + id, function(done) {
      var request = this.request;

      this.clients.delete({ client_id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
