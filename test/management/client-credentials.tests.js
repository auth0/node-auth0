const { expect } = require('chai');
const nock = require('nock');

const SRC_DIR = '../../src';
const API_URL = 'https://tenant.auth0.com';

const ClientCredentialsManager = require(`${SRC_DIR}/management/ClientCredentialsManager`);
const { ArgumentError } = require('rest-facade');

describe('ClientsCredentialsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.clientCredentials = new ClientCredentialsManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['getAll', 'get', 'create', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.clientCredentials[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => new ClientCredentialsManager()).to.throw(
        ArgumentError,
        'Must provide manager options'
      );
    });

    it('should throw an error when no base URL is provided', () => {
      const client = () => new ClientCredentialsManager({});

      expect(client).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      const client = () => new ClientCredentialsManager({ baseUrl: '' });

      expect(client).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#create', () => {
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

      this.clientCredentials.create(options, data).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it(`should perform POST request to ${PATH}`, function (done) {
      const { request } = this;

      this.clientCredentials.create(options, data).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(PATH)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.clientCredentials.create(options, data).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(PATH, data).reply(200);

      this.clientCredentials.create(options, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
  describe('#getAll', () => {
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

      this.clientCredentials.getAll(options).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get(PATH).reply(200, data);

      this.clientCredentials.getAll(options).then((credentials) => {
        expect(credentials).to.be.an.instanceOf(Array);
        expect(credentials.length).to.equal(data.length);
        expect(credentials[0].test).to.equal(data[0].test);
        done();
      });
    });

    it(`should perform GET request to ${PATH}`, function (done) {
      const { request } = this;

      this.clientCredentials.getAll(options).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(PATH)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.clientCredentials.getAll(options).then(() => {
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

      this.clientCredentials.getAll(combinedOptions).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });
  describe('#get', () => {
    const FAKE_CLIENT_ID = 'cli_1234';
    const FAKE_CREDENTIAL_ID = 'cre_1234';
    const PATH = `/clients/${FAKE_CLIENT_ID}/credentials/${FAKE_CREDENTIAL_ID}`;
    const options = { client_id: FAKE_CLIENT_ID, credential_id: FAKE_CREDENTIAL_ID };

    beforeEach(function () {
      this.request = nock(API_URL).get(PATH).reply(200);
    });

    it('should accept a callback', function (done) {
      this.clientCredentials.get(options, done);
    });

    it('should return a promise when no callback is given', function (done) {
      this.clientCredentials.get(options).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the "catch" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(PATH).reply(500);

      this.clientCredentials.get(options).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get(PATH).reply(200, data);

      this.clientCredentials.get(options).then((credentials) => {
        expect(credentials).to.be.an.instanceOf(Array);
        expect(credentials.length).to.equal(data.length);
        expect(credentials[0].test).to.equal(data[0].test);
        done();
      });
    });

    it(`should perform GET request to ${PATH}`, function (done) {
      const { request } = this;

      this.clientCredentials.get(options).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(PATH)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.clientCredentials.get(options).then(() => {
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

      this.clientCredentials.get(combinedOptions).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#delete', () => {
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
      const { request } = this;

      this.clientCredentials.delete(options).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(PATH).reply(500);

      this.clientCredentials.delete(options).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(PATH)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.clientCredentials.delete(options).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
