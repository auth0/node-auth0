var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var LogStreamsManager = require(SRC_DIR + '/management/LogStreamsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('LogStreamsManager', function() {
  before(function() {
    this.token = 'TOKEN';
    this.logstreams = new LogStreamsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });

  describe('instance', function() {
    var methods = ['getAll', 'get', 'create', 'update', 'delete'];

    methods.forEach(function(method) {
      it('should have a ' + method + ' method', function() {
        expect(this.logstreams[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function() {
    it('should error when no options are provided', function() {
      expect(LogStreamsManager).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', function() {
      var client = LogStreamsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function() {
      var client = LogStreamsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', function() {
    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/log-streams')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.logstreams.getAll(function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.logstreams
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/log-streams')
        .reply(500);

      this.logstreams.getAll().catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/log-streams')
        .reply(200, data);

      this.logstreams.getAll().then(function(logs) {
        expect(logs).to.be.an.instanceOf(Array);

        expect(logs.length).to.equal(data.length);

        expect(logs[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/log-streams', function(done) {
      var request = this.request;

      this.logstreams.getAll().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/log-streams')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.logstreams.getAll().then(function() {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#get', function() {
    var params = { id: 5 };
    var data = {
      id: params.id,
      name: 'Test log'
    };

    beforeEach(function() {
      this.request = nock(API_URL)
        .get('/log-streams/' + data.id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.logstreams.get(params, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.logstreams
        .get(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/log-streams/' + params.id)
        .reply(500);

      this.logstreams.get().catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/log-streams/' + params.id)
        .reply(200, data);

      this.logstreams.get(params).then(function(log) {
        expect(log.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/log-streams/:id', function(done) {
      var request = this.request;

      this.logstreams.get(params).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/log-streams')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.logstreams.getAll().then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the parameters in the query-string', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/log-streams')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200);

      this.logstreams.getAll({ include_fields: true, fields: 'test' }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', function() {
    var data = {
      name: 'Test log stream'
    };
    beforeEach(function() {
      this.request = nock(API_URL)
        .post('/log-streams')
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.logstreams.create(data, function() {
        done();
      });
    });

    it('should return a promise if no callback is given', function(done) {
      this.logstreams
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/log-streams')
        .reply(500);

      this.logstreams.create(data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/log-streams', function(done) {
      var request = this.request;

      this.logstreams.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/log-streams', data)
        .reply(200);

      this.logstreams.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/log-streams')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.logstreams.create(data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', function() {
    beforeEach(function() {
      this.data = { id: 5 };

      this.request = nock(API_URL)
        .patch('/log-streams/' + this.data.id)
        .reply(200, this.data);
    });

    it('should accept a callback', function(done) {
      this.logstreams.update({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function(done) {
      this.logstreams
        .update({ id: 5 }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/log-streams/5', function(done) {
      var request = this.request;

      this.logstreams.update({ id: 5 }, {}).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/log-streams/' + this.data.id, this.data)
        .reply(200);

      this.logstreams.update({ id: 5 }, this.data).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/log-streams/' + this.data.id)
        .reply(500);

      this.logstreams.update({ id: this.data.id }, this.data).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', function() {
    var id = 5;

    beforeEach(function() {
      this.request = nock(API_URL)
        .delete('/log-streams/' + id)
        .reply(200);
    });

    it('should accept a callback', function(done) {
      this.logstreams.delete({ id: id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function(done) {
      this.logstreams.delete({ id: id }).then(done.bind(null, null));
    });

    it('should perform a delete request to /log-streams/' + id, function(done) {
      var request = this.request;

      this.logstreams.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/log-streams/' + id)
        .reply(500);

      this.logstreams.delete({ id: id }).catch(function(err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function(done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/log-streams/' + id)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.logstreams.delete({ id: id }).then(function() {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
