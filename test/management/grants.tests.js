const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const GrantsManager = require(`../../src/management/GrantsManager`);
const { ArgumentError } = require('rest-facade');

describe('GrantsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.grants = new GrantsManager({
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
    const methods = ['getAll', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.grants[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new GrantsManager();
      }).to.throw(ArgumentError, 'Must provide client options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new GrantsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new GrantsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/grants').reply(200);
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

      nock(API_URL).get('/grants').reply(500);

      this.grants.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/grants').reply(200, data);

      this.grants.getAll().then((grants) => {
        expect(grants).to.be.an.instanceOf(Array);

        expect(grants.length).to.equal(data.length);

        expect(grants[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/grants', function (done) {
      const { request } = this;

      this.grants.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/grants')
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
        .get('/grants')
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

  describe('#delete', () => {
    const id = 5;

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/grants/${id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.grants.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.grants.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /grants/${id}`, function (done) {
      const { request } = this;

      this.grants.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
