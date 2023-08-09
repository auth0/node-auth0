import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { BlacklistsManager, ManagementClient } from '../../src/index.js';

describe('BlacklistedTokensManager', () => {
  const token = 'TOKEN';
  let blacklistedTokens: BlacklistsManager;

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    blacklistedTokens = client.blacklists;
  });

  describe('instance', () => {
    const methods = ['add', 'getAll'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((blacklistedTokens as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new BlacklistsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new BlacklistsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL)
        .get('/blacklists/tokens')
        .reply(200, [{ aud: 'abc', jti: '123' }]);
    });

    it('should return a promise if no callback is given', (done) => {
      blacklistedTokens.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/blacklists/tokens').reply(500, {});

      blacklistedTokens.getAll().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data = [{ aud: 'abc', jti: '123' }];
      nock(API_URL).get('/blacklists/tokens').reply(200, data);

      blacklistedTokens.getAll().then((blacklistedTokens) => {
        expect(blacklistedTokens.data).toBeInstanceOf(Array);

        expect(blacklistedTokens.data.length).toBe(data.length);

        expect(blacklistedTokens.data[0].aud).toBe(data[0].aud);
        expect(blacklistedTokens.data[0].jti).toBe(data[0].jti);

        done();
      });
    });

    it('should perform a GET request to /api/v2/blacklists/tokens', (done) => {
      blacklistedTokens.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/blacklists/tokens')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, [{ aud: 'abc', jti: '123' }]);

      blacklistedTokens.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/blacklists/tokens')
        .query({
          aud: 'abc',
        })
        .reply(200, [{ aud: 'abc', jti: '123' }]);

      blacklistedTokens.getAll({ aud: 'abc' }).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });

  describe('#add', () => {
    const tokenData = {
      aud: '',
      jti: '',
    };

    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/blacklists/tokens').reply(200, tokenData);
    });

    it('should return a promise if no callback is given', (done) => {
      blacklistedTokens.add(tokenData).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/blacklists/tokens').reply(500, {});

      blacklistedTokens.add(tokenData).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should perform a POST request to /api/v2/blacklists/tokens', (done) => {
      blacklistedTokens.add(tokenData).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should pass the token data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).post('/blacklists/tokens', tokenData).reply(200, {});

      blacklistedTokens.add(tokenData).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/blacklists/tokens')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, tokenData);

      blacklistedTokens.add(tokenData).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });
});
