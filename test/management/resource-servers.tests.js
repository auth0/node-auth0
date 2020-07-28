var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var ResourceServersManager = require(SRC_DIR + '/management/ResourceServersManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('ResourceServersManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.resourceServers = new ResourceServersManager({
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
    var methods = ['get', 'create', 'update', 'delete'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.resourceServers[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(ResourceServersManager).to.throw(
        ArgumentError,
        'Must provide resource server options'
      );
    });

    it('should throw an error when no base URL is provided', function() {
      var resourceServerManager = ResourceServersManager.bind(null, {});

      expect(resourceServerManager).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var resourceServerManager = ResourceServersManager.bind(null, { baseUrl: '' });

      expect(resourceServerManager).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/resource-servers')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.resourceServers.getAll(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.resourceServers
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/resource-servers')
        .reply(500);

      this.resourceServers.getAll().catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/resource-servers')
        .reply(200, data);

      this.resourceServers.getAll().then(function(resourceServers) {
        expect(resourceServers).to.be.an.instanceOf(Array);

        expect(resourceServers.length).to.equal(data.length);

        expect(resourceServers[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/resource-servers', function(done) {
      var request = this.request;

      this.resourceServers.getAll().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/resource-servers')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.resourceServers.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#get', function() {
    var params = { id: 5 };
    var data = {
      id: params.id,
      name: 'Test Resource Server'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/resource-servers/' + data.id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.resourceServers.get(params, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.resourceServers
        .get(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/resource-servers/' + params.id)
        .reply(500);

      this.resourceServers.get().catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/resource-servers/' + params.id)
        .reply(200, data);

      this.resourceServers.get(params).then(function(connection) {
        expect(connection.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/resource-servers/:id', function(done) {
      var request = this.request;

      this.resourceServers.get(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/resource-servers')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.resourceServers.get().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', function() {
    var data = {
      name: 'Acme Backend API',
      options: {}
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/resource-servers')
        .reply(200, data);
    });

    it('should accept a callback', function(done) {
      this.resourceServers.create(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.resourceServers
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/resource-servers')
        .reply(500);

      this.resourceServers.create(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/resource-servers', function(done) {
      var request = this.request;

      this.resourceServers.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/resource-servers', data)
        .reply(200);

      this.resourceServers.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/resource-servers')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.resourceServers.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', function() {
    var params = { id: 5 };
    var data = {
      id: 5,
      name: 'Acme Backend API',
      options: {}
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .patch('/resource-servers/' + data.id)
        .reply(200, data);
    });

    it('should accept a callback', function(done) {
      this.resourceServers.update(params, data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.resourceServers
        .update(params, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/resource-servers/' + data.id)
        .reply(500);

      this.resourceServers.update(params, data).catch(function(err) {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/resource-servers/:id', function(done) {
      var request = this.request;

      this.resourceServers.update(params, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/resource-servers/' + data.id, data)
        .reply(200);

      this.resourceServers.update(params, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/resource-servers/' + data.id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.resourceServers.update(params, data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', function() {
    var id = 5;

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/resource-servers/' + id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.resourceServers.delete({ id: id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.resourceServers.delete({ id: id }).then(done.bind(null, null));
    });

    it('should perform a DELETE request to /resource-servers/' + id, function(done) {
      var request = this.request;

      this.resourceServers.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/resource-servers/' + id)
        .reply(500);

      this.resourceServers.delete({ id: id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/resource-servers/' + id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.resourceServers.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
