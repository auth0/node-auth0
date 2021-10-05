const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const StatsManager = require(`../../src/management/StatsManager`);
const { ArgumentError } = require('rest-facade');

describe('StatsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.stats = new StatsManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['getActiveUsersCount', 'getDaily'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.stats[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new StatsManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new StatsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new StatsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getDaily', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/stats/daily').reply(200);
    });

    it('should accept a callback', function (done) {
      this.stats.getDaily({}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.stats.getDaily().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/stats/daily').reply(500);

      this.stats.getDaily().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async function () {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/stats/daily').reply(200, data);

      const blacklistedTokens = await this.stats.getDaily();
      expect(blacklistedTokens).to.be.an.instanceOf(Array);

      expect(blacklistedTokens.length).to.equal(data.length);

      expect(blacklistedTokens[0].test).to.equal(data[0].test);
    });

    it('should perform a GET request to /api/v2/stats/daily', async function () {
      const { request } = this;

      await this.stats.getDaily();
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/stats/daily')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.stats.getDaily();
      expect(request.isDone()).to.be.true;
    });

    it('should pass the parameters in the query-string', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/stats/daily')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200);

      await this.stats.getDaily({ include_fields: true, fields: 'test' });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getActiveUsersCount', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/stats/active-users').reply(200);
    });

    it('should accept a callback', function (done) {
      this.stats.getActiveUsersCount(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.stats.getActiveUsersCount().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/stats/active-users').reply(500);

      this.stats.getActiveUsersCount().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a GET request to /api/v2/stats/active-users', async function () {
      const { request } = this;

      await this.stats.getActiveUsersCount();
      expect(request.isDone()).to.be.true;
    });

    it('should pass the token data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL).get('/stats/active-users').reply(200);

      await this.stats.getActiveUsersCount();
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/stats/active-users')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.stats.getActiveUsersCount();
      expect(request.isDone()).to.be.true;
    });
  });
});
