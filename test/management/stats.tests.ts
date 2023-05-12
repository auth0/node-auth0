import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { StatsManager } from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('StatsManager', () => {
  let stats: StatsManager;
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    stats = client.stats;
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new StatsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new StatsManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getDaily', () => {
    let request: nock.Scope;
    beforeEach(function () {
      request = nock(API_URL).get('/stats/daily').reply(200, []);
    });

    it('should return a promise if no callback is given', function (done) {
      stats.getDaily().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/stats/daily').reply(500);

      stats.getDaily().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async function () {
      nock.cleanAll();

      const data = [{ logins: 5 }];
      nock(API_URL).get('/stats/daily').reply(200, data);

      const dailyStats = await stats.getDaily();
      expect(dailyStats.data).to.be.an.instanceOf(Array);

      expect(dailyStats.data.length).to.equal(data.length);

      expect(dailyStats.data[0].logins).to.equal(data[0].logins);
    });

    it('should perform a GET request to /api/v2/stats/daily', async function () {
      await stats.getDaily();
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/stats/daily')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      await stats.getDaily();
      expect(request.isDone()).to.be.true;
    });

    it('should pass the parameters in the query-string', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/stats/daily')
        .query({
          from: '2023-01-01',
          to: '2023-01-02',
        })
        .reply(200, []);

      await stats.getDaily({ from: '2023-01-01', to: '2023-01-02' });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getActiveUsersCount', () => {
    let request: nock.Scope;
    beforeEach(function () {
      request = nock(API_URL)
        .get('/stats/active-users')
        .reply(200, 5 as any);
    });

    it('should return a promise if no callback is given', function (done) {
      stats.getActiveUsersCount().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/stats/active-users').reply(500);

      stats.getActiveUsersCount().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a GET request to /api/v2/stats/active-users', async function () {
      await stats.getActiveUsersCount();
      expect(request.isDone()).to.be.true;
    });

    it('should pass the token data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/stats/active-users')
        .reply(200, 5 as any);

      await stats.getActiveUsersCount();
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/stats/active-users')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, 5 as any);

      await stats.getActiveUsersCount();
      expect(request.isDone()).to.be.true;
    });
  });
});
