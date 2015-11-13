var expect = require('chai').expect;
var nock = require('nock');
var Promise = require('bluebird');
var ClientsManager = require('../src/ClientsManager');
var constants = require('../src/constants');

var ArgumentError = require('../src/exceptions').ArgumentError;
var BASE_API_URL = 'https://' + constants.DOMAINS_BY_REGION.eu;

describe('ClientsManager', function () {

  beforeEach(function () {
    this.token = 'TEST_TOKEN';
    this.clients = new ClientsManager({
      accessToken: this.token,
      baseUrl: BASE_API_URL
    });
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('#constructor', function () {
    it('should error when no options are provided', function () {
      expect(ClientsManager).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', function () {
      var client = ClientsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function () {
      var client = ClientsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });

    it('should throw an error when no access token is provided', function () {
      var client = ClientsManager.bind(null, { baseUrl: 'http://domain.com' });

      expect(client).to.throw(ArgumentError, 'Must provide an access token');
    });

    it('should throw an error when the token is invalid', function () {
      var options = { baseUrl: 'http://test.com', accessToken: '' };
      var client = ClientsManager.bind(null, options);

      expect(client).to.throw(ArgumentError, 'Invalid access token');
    });
  });

  describe('#create', function () {
    var data = { name: 'Test client' };

    it('should be defined', function () {
      expect(this.clients.create).to.exist;
      expect(this.clients.create).to.be.an.instanceOf(Function);
    });


    it('should perform a POST request to /api/v2/clients', function (done) {
      var request = nock(BASE_API_URL)
        .post('/clients')
        .reply(201, data)

      this.clients
        .create(data)
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });

    it('should include the token in the Authorization header', function (done) {
      var request = nock(BASE_API_URL)
        .post('/clients')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(201, data)

      this.clients
        .create(data)
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });

    it('should include the client data in the request body', function (done) {
      var request = nock(BASE_API_URL)
        .post('/clients', data)
        .reply(201, data)

      this.clients
        .create(data)
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });
  });

  describe('#getAll', function () {

    it('should be defined', function () {
      expect(this.clients.getAll).to.exist;
      expect(this.clients.getAll).to.be.an.instanceOf(Function);
    });

    it('should perform a GET request to /api/v2/clients', function (done) {
      var request = nock(BASE_API_URL)
        .get('/clients')
        .reply(200)

      this.clients
        .getAll()
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });

    it('should include the token in the Authorization header', function (done) {
      var request = nock(BASE_API_URL)
        .get('/clients')
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200)

      this.clients
        .getAll()
        .then(function () {
          expect(request.isDone()).to.be.true;
          done();
        });
    });

    it('should accept a callback', function (done) {
      this.clients.getAll(function () {
        done();
      });
    });

    it('should pass any errors to the callback', function (done) {
      var request = nock(BASE_API_URL)
        .get('/clients')
        .reply(500);

      this.clients.getAll(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the callback', function (done) {
      var data = [{ test: true }];
      var request = nock(BASE_API_URL)
        .get('/clients')
        .reply(200, data);

      this.clients.getAll(function (err, response) {
        expect(response).to.be.an.instanceOf(Array);
        expect(response.length).to.equal(data.length);
        expect(response[0].test).to.equal(data[0].test);
        done();
      });
    });

    it('should return a promise if no callback is given', function () {
      var request = nock(BASE_API_URL)
        .get('/clients')
        .reply(200);
      var returnValue = this.clients.getAll();

      expect(returnValue).to.be.an.instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', function (done) {
      var request = nock(BASE_API_URL)
        .get('/clients')
        .reply(500);

      this.clients
        .getAll()
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      var data = [{ test: true }];
      var request = nock(BASE_API_URL)
        .get('/clients')
        .reply(200, data);

      this.clients
        .getAll()
        .then(function (clients) {
          expect(clients).to.be.an.instanceOf(Array);
          expect(clients.length).to.equal(data.length);
          expect(clients[0].test).to.equal(data[0].test);
          done();
        });
    });
  });
});

