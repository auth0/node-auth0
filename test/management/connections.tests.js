var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var ConnectionsManager = require(SRC_DIR + '/management/ConnectionsManager');
var ArgumentError = require('rest-facade').ArgumentError;


describe('ConnectionsManager', function () {
  before(function () {
    this.token = 'TOKEN';
    this.connections = new ConnectionsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL
    });
  });


  describe('instance', function () {
    var methods = ['getAll', 'get', 'create', 'update', 'delete'];

    methods.forEach(function (method) {
      it('should have a ' + method + ' method', function () {
        expect(this.connections[method])
          .to.exist
          .to.be.an.instanceOf(Function);
      })
    });
  });


  describe('#constructor', function () {
    it('should error when no options are provided', function () {
      expect(ConnectionsManager)
        .to.throw(ArgumentError, 'Must provide client options');
    });


    it('should throw an error when no base URL is provided', function () {
      var client = ConnectionsManager.bind(null, {});

      expect(client)
        .to.throw(ArgumentError, 'Must provide a base URL for the API');
    });


    it('should throw an error when the base URL is invalid', function () {
      var client = ConnectionsManager.bind(null, { baseUrl: '' });

      expect(client)
        .to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });


  describe('#getAll', function () {
    beforeEach(function () {
      this.request = nock(API_URL)
        .get('/connections')
        .reply(200);
    })


    it('should accept a callback', function (done) {
      this
        .connections
        .getAll(function () {
        done();
      });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .connections
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/connections')
        .reply(500);

      this
        .connections
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
        .get('/connections')
        .reply(200, data);

      this
        .connections
        .getAll()
        .then(function (connections) {
          expect(connections)
            .to.be.an.instanceOf(Array);

          expect(connections.length)
            .to.equal(data.length);

          expect(connections[0].test)
            .to.equal(data[0].test);

          done();
        });
    });


    it('should perform a GET request to /api/v2/connections', function (done) {
      var request = this.request;

      this
        .connections
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
        .get('/connections')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .connections
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
        .get('/connections')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200)

      this
        .connections
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
      name: 'Test connection'
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .get('/connections/' + data.id)
        .reply(200);
    })


    it('should accept a callback', function (done) {
      this
        .connections
        .get(params, function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .connections
        .get(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .get('/connections/' + params.id)
        .reply(500);

      this
        .connections
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
        .get('/connections/' + params.id)
        .reply(200, data);

      this
        .connections
        .get(params)
        .then(function (connection) {
          expect(connection.id)
            .to.equal(data.id);

          done();
        });
    });


    it('should perform a GET request to /api/v2/connections/:id', function (done) {
      var request = this.request;

      this
        .connections
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
        .get('/connections')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .connections
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
        .get('/connections')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200)

      this
        .connections
        .getAll({ include_fields: true, fields: 'test' })
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#create', function () {
    var data = {
      name: 'Test connection',
      options: {}
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .post('/connections')
        .reply(200, data);
    })


    it('should accept a callback', function (done) {
      this
        .connections
        .create(data, function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .connections
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/connections')
        .reply(500);

      this
        .connections
        .create(data)
        .catch(function (err) {
          expect(err)
            .to.exist;

          done();
        });
    });


    it('should perform a POST request to /api/v2/connections', function (done) {
      var request = this.request;

      this
        .connections
        .create(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/connections', data)
        .reply(200);

      this
        .connections
        .create(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .post('/connections')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .connections
        .create(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#update', function () {
    var params = { id: 5 };
    var data = {
      id: 5,
      name: 'Test connection',
      options: {}
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .patch('/connections/' + data.id)
        .reply(200, data);
    })


    it('should accept a callback', function (done) {
      this
        .connections
        .update(params, data, function () {
          done();
        });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .connections
        .update(params, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/connections/' + data.id)
        .reply(500);

      this
        .connections
        .update(params, data)
        .catch(function (err) {
          expect(err)
            .to.exist
            .to.be.an.instanceOf(Error);

          done();
        });
    });


    it('should perform a PATCH request to /api/v2/connections/:id', function (done) {
      var request = this.request;

      this
        .connections
        .update(params, data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/connections/' + data.id, data)
        .reply(200);

      this
        .connections
        .update(params, data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .patch('/connections/' + data.id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .connections
        .update(params, data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#delete', function () {
    var id = 5;

    beforeEach(function () {
      this.request = nock(API_URL)
        .delete('/connections/' + id)
        .reply(200);
    });


    it('should accept a callback', function (done) {
      this
        .connections
        .delete({ id: id }, done.bind(null, null));
    });


    it('should return a promise when no callback is given', function (done) {
      this
        .connections
        .delete({ id: id })
        .then(done.bind(null, null));
    });


    it('should perform a DELETE request to /connections/' + id, function (done) {
      var request = this.request;

      this
        .connections
        .delete({ id: id })
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/connections/' + id)
        .reply(500);

      this
        .connections
        .delete({ id: id })
        .catch(function (err) {
          expect(err)
            .to.exist;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(API_URL)
        .delete('/connections/' + id)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .connections
        .delete({ id: id })
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });

});
