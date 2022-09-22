const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const BlacklistedTokensManager = require(`../../src/management/BlacklistedTokensManager`);
const { ArgumentError } = require('rest-facade');

describe('BlacklistedTokensManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.blacklistedTokens = new BlacklistedTokensManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['add', 'getAll'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.blacklistedTokens[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new BlacklistedTokensManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new BlacklistedTokensManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new BlacklistedTokensManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/blacklists/tokens').reply(200);
    });

    it('should accept a callback', function (done) {
      this.blacklistedTokens.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.blacklistedTokens.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/blacklists/tokens').reply(500);

      this.blacklistedTokens.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/blacklists/tokens').reply(200, data);

      this.blacklistedTokens.getAll().then((blacklistedTokens) => {
        expect(blacklistedTokens).to.be.an.instanceOf(Array);

        expect(blacklistedTokens.length).to.equal(data.length);

        expect(blacklistedTokens[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/blacklists/tokens', function (done) {
      const { request } = this;

      this.blacklistedTokens.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/blacklists/tokens')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.blacklistedTokens.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/blacklists/tokens')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200);

      this.blacklistedTokens.getAll({ include_fields: true, fields: 'test' }).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#add', () => {
    const tokenData = {
      aud: '',
      jti: '',
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/blacklists/tokens').reply(200);
    });

    it('should accept a callback', function (done) {
      this.blacklistedTokens.add(tokenData, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.blacklistedTokens
        .add(tokenData)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/blacklists/tokens').reply(500);

      this.blacklistedTokens.add(tokenData).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a POST request to /api/v2/blacklists/tokens', function (done) {
      const { request } = this;

      this.blacklistedTokens.add(tokenData).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the token data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/blacklists/tokens', tokenData).reply(200);

      this.blacklistedTokens.add(tokenData).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/blacklists/tokens')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.blacklistedTokens.add(tokenData).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });
});
