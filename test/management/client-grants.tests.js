const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const ClientGrantsManager = require(`../../src/management/ClientGrantsManager`);
const { ArgumentError } = require('rest-facade');

describe('ClientGrantsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.grants = new ClientGrantsManager({
      headers: {
        authorization: `Bearer ${this.token}`,
      },
      baseUrl: API_URL,
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('instance', () => {
    const methods = ['getAll', 'create', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.grants[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new ClientGrantsManager();
      }).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ClientGrantsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ClientGrantsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/client-grants').reply(200);
    });

    it('should accept a callback', function (done) {
      this.grants.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.grants.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/client-grants').reply(500);

      this.grants.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/client-grants').reply(200, data);

      this.grants.getAll().then((grants) => {
        expect(grants).to.be.an.instanceOf(Array);

        expect(grants.length).to.equal(data.length);

        expect(grants[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/client-grants', function (done) {
      const { request } = this;

      this.grants.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/client-grants')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.grants.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/client-grants')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200);

      this.grants.getAll({ include_fields: true, fields: 'test' }).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      client_id: 'CLIENT_ID',
      audience: 'AUDIENCE',
      scope: ['user'],
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/client-grants').reply(201, data);
    });

    it('should accept a callback', function (done) {
      this.grants.create(data, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.grants.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/client-grants', function (done) {
      const { request } = this;

      this.grants.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/client-grants')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(201, data);

      this.grants.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new client grant data in the request body', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/client-grants', data).reply(201, data);

      this.grants.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    beforeEach(function () {
      this.data = { id: 5 };

      this.request = nock(API_URL).patch(`/client-grants/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      this.grants.update({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.grants.update({ id: 5 }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/client-grants/5', function (done) {
      const { request } = this;

      this.grants.update({ id: 5 }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/client-grants/${this.data.id}`, this.data).reply(200);

      this.grants.update({ id: 5 }, this.data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 5;

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/client-grants/${id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.grants.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.grants.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /client-grants/${id}`, function (done) {
      const { request } = this;

      this.grants.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
