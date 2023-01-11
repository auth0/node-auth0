const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const LogsManager = require(`../../src/management/LogsManager`);
const { ArgumentError } = require('rest-facade');

describe('LogsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.logs = new LogsManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['getAll', 'get'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.logs[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new LogsManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new LogsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new LogsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/logs').reply(200);
    });

    it('should accept a callback', function (done) {
      this.logs.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.logs.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/logs').reply(500);

      this.logs.getAll().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/logs').reply(200, data);

      this.logs.getAll().then((logs) => {
        expect(logs).to.be.an.instanceOf(Array);

        expect(logs.length).to.equal(data.length);

        expect(logs[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/logs', function (done) {
      const { request } = this;

      this.logs.getAll().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/logs')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.logs.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/logs')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200);

      this.logs.getAll({ include_fields: true, fields: 'test' }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', () => {
    const params = { id: 5 };
    const data = {
      id: params.id,
      name: 'Test log',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/logs/${data.id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.logs.get(params, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.logs.get(params).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/logs/${params.id}`).reply(500);

      this.logs.get().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/logs/${params.id}`).reply(200, data);

      this.logs.get(params).then((log) => {
        expect(log.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/logs/:id', function (done) {
      const { request } = this;

      this.logs.get(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/logs')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.logs.getAll().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/logs')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200);

      this.logs.getAll({ include_fields: true, fields: 'test' }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
