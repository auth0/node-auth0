var expect = require('chai').expect;
var nock = require('nock');

var SRC_DIR = '../../src';
var API_URL = 'https://tenant.auth0.com';

var ClientCredentialsManager = require(SRC_DIR + '/management/ClientCredentialsManager');
var ArgumentError = require('rest-facade').ArgumentError;

describe('ClientsCredentialsManager', function () {
  before(function () {
    this.token = 'TOKEN';
    this.clientCredentials = new ClientCredentialsManager({
      headers: { authorization: 'Bearer ' + this.token },
      baseUrl: API_URL,
    });
  });

  describe('instance', function () {
    var methods = ['getAll', 'getByID', 'create', 'delete'];

    methods.forEach(function (method) {
      it('should have a ' + method + ' method', function () {
        expect(this.clientCredentials[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', function () {
    it('should error when no options are provided', function () {
      expect(ClientCredentialsManager).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', function () {
      var client = ClientCredentialsManager.bind(null, {});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', function () {
      var client = ClientCredentialsManager.bind(null, { baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#create', function () {
    const FAKE_CLIENT_ID = 'cli_1234';
    const PATH = `/clients/${FAKE_CLIENT_ID}/credentials`;
    const options = { client_id: FAKE_CLIENT_ID };
    const data = {
      pem: 'some-public-key',
      name: 'some-super-name-given-to-my-public-key',
    };

    beforeEach(function () {
      this.request = nock(API_URL).post(PATH).reply(200);
    });

    it('should accept a callback', function (done) {
      this.clientCredentials.create(options, data, done);
    });

    it('should return a promise when no callback is given', function (done) {
      this.clientCredentials
        .create(options, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the "catch" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(PATH).reply(500);

      this.clientCredentials.create(options, data).catch(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it(`should perform POST request to ${PATH}`, function (done) {
      const request = this.request;

      this.clientCredentials.create(options, data).then(function () {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(PATH)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.clientCredentials.create(options, data).then(function () {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(PATH, data).reply(200);

      this.clientCredentials.create(options, data).then(function () {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
  describe('#getAll', function () {
    const FAKE_CLIENT_ID = 'cli_1234';
    const PATH = `/clients/${FAKE_CLIENT_ID}/credentials`;
    const options = { client_id: FAKE_CLIENT_ID };

    beforeEach(function () {
      this.request = nock(API_URL).get(PATH).reply(200);
    });

    it('should accept a callback', function (done) {
      this.clientCredentials.getAll(options, done);
    });

    it('should return a promise when no callback is given', function (done) {
      this.clientCredentials
        .getAll(options)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the "catch" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(PATH).reply(500);

      this.clientCredentials.getAll(options).catch(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get(PATH).reply(200, data);

      this.clientCredentials.getAll(options).then(function (credentials) {
        expect(credentials).to.be.an.instanceOf(Array);
        expect(credentials.length).to.equal(data.length);
        expect(credentials[0].test).to.equal(data[0].test);
        done();
      });
    });

    it(`should perform GET request to ${PATH}`, function (done) {
      const request = this.request;

      this.clientCredentials.getAll(options).then(function () {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(PATH)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.clientCredentials.getAll(options).then(function () {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };

      const request = nock(API_URL).get(PATH).query(params).reply(200);

      const combinedOptions = Object.assign({}, params, options);

      this.clientCredentials.getAll(combinedOptions).then(function () {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });
  describe('#getByID', function () {
    const FAKE_CLIENT_ID = 'cli_1234';
    const FAKE_CREDENTIAL_ID = 'cre_1234';
    const PATH = `/clients/${FAKE_CLIENT_ID}/credentials/${FAKE_CREDENTIAL_ID}`;
    const options = { client_id: FAKE_CLIENT_ID, credential_id: FAKE_CREDENTIAL_ID };

    beforeEach(function () {
      this.request = nock(API_URL).get(PATH).reply(200);
    });

    it('should accept a callback', function (done) {
      this.clientCredentials.getByID(options, done);
    });

    it('should return a promise when no callback is given', function (done) {
      this.clientCredentials
        .getByID(options)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the "catch" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(PATH).reply(500);

      this.clientCredentials.getByID(options).catch(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get(PATH).reply(200, data);

      this.clientCredentials.getByID(options).then(function (credentials) {
        expect(credentials).to.be.an.instanceOf(Array);
        expect(credentials.length).to.equal(data.length);
        expect(credentials[0].test).to.equal(data[0].test);
        done();
      });
    });

    it(`should perform GET request to ${PATH}`, function (done) {
      const request = this.request;

      this.clientCredentials.getByID(options).then(function () {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(PATH)
        .matchHeader('Authorization', 'Bearer ' + this.token)
        .reply(200);

      this.clientCredentials.getByID(options).then(function () {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };

      const request = nock(API_URL).get(PATH).query(params).reply(200);

      const combinedOptions = Object.assign({}, params, options);

      this.clientCredentials.getByID(combinedOptions).then(function () {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#delete', function () {
    const FAKE_CLIENT_ID = 'cli_1234';
    const FAKE_CREDENTIAL_ID = 'cre_1234';
    const PATH = `/clients/${FAKE_CLIENT_ID}/credentials/${FAKE_CREDENTIAL_ID}`;
    const options = { client_id: FAKE_CLIENT_ID, credential_id: FAKE_CREDENTIAL_ID };

    beforeEach(function () {
      this.request = nock(API_URL).delete(PATH).reply(200);
    });

    it('should accept a callback', function (done) {
      this.clientCredentials.delete(options, done);
    });

    it('should return a promise when no callback is given', function (done) {
      this.clientCredentials
        .delete(options)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it(`should perform DELETE request to ${PATH}`, function (done) {
      const request = this.request;

      this.clientCredentials.delete(options).then(function () {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(PATH).reply(500);

      this.clientCredentials.delete(options).catch(function (err) {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(PATH)
        .matchHeader('authorization', 'Bearer ' + this.token)
        .reply(200);

      this.clientCredentials.delete(options).then(function () {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
