import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { StatsManager, ManagementClient } from '../../src/index.js';

describe('StatsManager', () => {
  let stats: StatsManager;
  const token = 'TOKEN';

  beforeAll(() => {
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
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new StatsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getDaily', () => {
    let request: nock.Scope;
    beforeEach(() => {
      request = nock(API_URL).get('/stats/daily').reply(200, []);
    });

    it('should return a promise if no callback is given', (done) => {
      stats.getDaily().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/stats/daily').reply(500, {});

      stats.getDaily().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const data = [{ logins: 5 }];
      nock(API_URL).get('/stats/daily').reply(200, data);

      const dailyStats = await stats.getDaily();
      expect(dailyStats.data).toBeInstanceOf(Array);

      expect(dailyStats.data.length).toBe(data.length);

      expect(dailyStats.data[0].logins).toBe(data[0].logins);
    });

    it('should perform a GET request to /api/v2/stats/daily', async () => {
      await stats.getDaily();
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/stats/daily')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      await stats.getDaily();
      expect(request.isDone()).toBe(true);
    });

    it('should pass the parameters in the query-string', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/stats/daily')
        .query({
          from: '2023-01-01',
          to: '2023-01-02',
        })
        .reply(200, []);

      await stats.getDaily({ from: '2023-01-01', to: '2023-01-02' });
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#getActiveUsersCount', () => {
    let request: nock.Scope;
    beforeEach(() => {
      request = nock(API_URL)
        .get('/stats/active-users')
        .reply(200, 5 as any);
    });

    it('should return a promise if no callback is given', (done) => {
      stats.getActiveUsersCount().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/stats/active-users').reply(500, {});

      stats.getActiveUsersCount().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should perform a GET request to /api/v2/stats/active-users', async () => {
      await stats.getActiveUsersCount();
      expect(request.isDone()).toBe(true);
    });

    it('should pass the token data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/stats/active-users')
        .reply(200, 5 as any);

      await stats.getActiveUsersCount();
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/stats/active-users')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, 5 as any);

      await stats.getActiveUsersCount();
      expect(request.isDone()).toBe(true);
    });
  });
});
