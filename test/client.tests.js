var expect = require('chai').expect;
var nock = require('nock');
var Promise = require('bluebird');
var ClientsManager = require('../src/ClientsManager');

var ArgumentError = require('../src/exceptions').ArgumentError;
var BASE_API_URL = 'https://tenant.auth0.com';


describe('ClientsManager', function () {

  beforeEach(function () {
    this.clients = new ClientsManager({
      headers: {
        authorization: 'Bearer ' + this.token
      },
      baseUrl: BASE_API_URL
    });
  });


  afterEach(function () {
    nock.cleanAll();
  });


  describe('#constructor', function () {
    it('should error when no options are provided', function () {
      expect(ClientsManager)
        .to.throw(ArgumentError, 'Must provide client options');
    });


    it('should throw an error when no base URL is provided', function () {
      var client = ClientsManager.bind(null, {});

      expect(client)
        .to.throw(ArgumentError, 'Must provide a base URL for the API');
    });


    it('should throw an error when the base URL is invalid', function () {
      var client = ClientsManager.bind(null, { baseUrl: '' });

      expect(client)
        .to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });


  describe('#getAll', function () {

    beforeEach(function () {
      this.request = nock(BASE_API_URL)
        .get('/clients')
        .reply(200);
    })

    it('should be defined', function () {
      expect(this.clients.getAll)
        .to.exist
        .to.be.an.instanceOf(Function);
    });


    it('should accept a callback', function (done) {
      this.clients.getAll(function () {
        done();
      });
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .clients
        .getAll()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      var request = nock(BASE_API_URL)
        .get('/clients')
        .reply(500);

      this
        .clients
        .getAll()
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });


    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      var data = [{ test: true }];
      var request = nock(BASE_API_URL)
        .get('/clients')
        .reply(200, data);

      this
        .clients
        .getAll()
        .then(function (clients) {
          expect(clients)
            .to.be.an.instanceOf(Array);

          expect(clients.length)
            .to.equal(data.length);

          expect(clients[0].test)
            .to.equal(data[0].test);

          done();
        });
    });


    it('should perform a GET request to /api/v2/clients', function (done) {
      var request = this.request;

      this
        .clients
        .getAll()
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(BASE_API_URL)
        .get('/clients')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this
        .clients
        .getAll()
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      var request = nock(BASE_API_URL)
        .get('/clients')
        .query({
          include_fields: true,
          fields: 'test'
        })
        .reply(200)

      this
        .clients
        .getAll({ includeFields: true, fields: 'test' })
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });
  });


  describe('#create', function () {
    var data = { name: 'Test client' };

    beforeEach(function () {
      this.request = nock(BASE_API_URL)
        .post('/clients')
        .reply(201, data)
    })

    it('should be defined', function () {
      expect(this.clients.create)
        .to.exist
        .to.be.an.instanceOf(Function);
    });


    it('should accept a callback', function (done) {
      this
        .clients
        .create(data, done.bind(null, null));
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .clients
        .create(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should perform a POST request to /api/v2/clients', function (done) {
      var request = this.request;

      this
        .clients
        .create(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      var request = nock(BASE_API_URL)
        .post('/clients')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(201, data)

      this
        .clients
        .create(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });


    it('should include the new client data in the request body', function (done) {
      nock.cleanAll();

      var request = nock(BASE_API_URL)
        .post('/clients', data)
        .reply(201, data)

      this
        .clients
        .create(data)
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });


  describe('#get', function () {
    beforeEach(function () {
      this.data = {
        id: 5,
        name: 'John Doe',
        email: 'john@doe.com'
      };

      this.request = nock(BASE_API_URL)
        .get('/clients/' + this.data.id)
        .reply(201, this.data);
    })


    it('should be defined', function () {
      expect(this.clients.get)
        .to.exist
        .to.be.an.instanceOf(Function);
    });


    it('should accept a callback', function (done) {
      var params = { id: this.data.id };

      this
        .clients
        .get(params, done.bind(null, null));
    });


    it('should return a promise if no callback is given', function (done) {
      this
        .clients
        .get({ id: this.data.id })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });


    it('should perform a POST request to /api/v2/clients/5', function (done) {
      var request = this.request;

      this
        .clients
        .get({ clientId: this.data.id })
        .then(function () {
          expect(request.isDone())
            .to.be.true;

          done();
        });
    });
  });
});

