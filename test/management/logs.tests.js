var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var LogsManager = require(SRC_DIR + '/management/LogsManager');
var ArgumentError = require(SRC_DIR + '/exceptions').ArgumentError;


describe('LogsManager', function () {
  before(function () {
    this.token = 'TOKEN';
    this.logs = new LogsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });


  describe('instance', function () {
    var methods = ['getAll', 'get'];

    methods.forEach(function (method) {
      it('should have a ' + method + ' method', function () {
        expect(this.logs[method])
          .to.exist
          .to.be.an.instanceOf(Function);
      })
    });
  });


  describe('#constructor', function () {
    it('should error when no options are provided', function () {
      expect(LogsManager)
        .to.throw(ArgumentError, 'Must provide client options');
    });


    it('should throw an error when no base URL is provided', function () {
      var client = LogsManager.bind(null, {});

      expect(client)
        .to.throw(ArgumentError, 'Must provide a base URL for the API');
    });


    it('should throw an error when the base URL is invalid', function () {
      var client = LogsManager.bind(null, { baseUrl: '' });

      expect(client)
        .to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });


  describe('#getAll', function () {
    beforeEach(function () {
      this.request = nock(API_URL)
        .get('/logs')
        .reply(200);
    })


    it('should accept a callback', function (done) {
      this
        .logs
        .getAll(function () {
        done();
      });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .logs
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/logs')
        .reply(500);

      this
        .logs
        .getAll()
        .catch(function (err) {
          expect(err)
            .to.exist;

          done();
        });
    });


    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(API_URL)
        .get('/logs')
        .reply(200, data);

      this
        .logs
        .getAll()
        .then(function (logs) {
          expect(logs)
            .to.be.an.instanceOf(Array);

          expect(logs.length)
            .to.equal(data.length);

          expect(logs[0].test)
            .to.equal(data[0].test);

          done();
        });
    });


    it('should perform a GET request to /api/v2/logs', function (done) {
      var request = this.request;

      this
        .logs
        .getAll()
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/logs')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .logs
        .getAll()
        .then(function () {
          expect(request.isDone())
            .to.be.true;
          done();
        });
    });


    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/logs')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200)

      this
        .logs
        .getAll({ include_fields: true, fields: 'test' })
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#get', function () {
    var params = { id: 5 };
    var data = {
      id: params.id,
      name: 'Test log'
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .get('/logs/' + data.id)
        .reply(200);
    })


    it('should accept a callback', function (done) {
      this
        .logs
        .get(params, function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .logs
        .get(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/logs/' + params.id)
        .reply(500);

      this
        .logs
        .get()
        .catch(function (err) {
          expect(err)
            .to.exist;

          done();
        });
    });


    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/logs/' + params.id)
        .reply(200, data);

      this
        .logs
        .get(params)
        .then(function (log) {
          expect(log.id)
            .to.equal(data.id);

          done();
        });
    });


    it('should perform a GET request to /api/v2/logs/:id', function (done) {
      var request = this.request;

      this
        .logs
        .get(params)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/logs')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .logs
        .getAll()
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/logs')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200)

      this
        .logs
        .getAll({ include_fields: true, fields: 'test' })
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });

});
