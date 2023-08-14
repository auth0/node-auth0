import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { RulesConfigsManager, ManagementClient } from '../../src/index.js';

describe('RulesConfigsManager', () => {
  let rulesConfigs: RulesConfigsManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    rulesConfigs = client.rulesConfigs;
  });

  describe('instance', () => {
    const methods = ['set', 'getAll', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((rulesConfigs as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new RulesConfigsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new RulesConfigsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    it('should return a promise if no callback is given', (done) => {
      rulesConfigs.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/rules-configs').reply(500, {});

      rulesConfigs.getAll().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const data = [{ key: 'dbconnectionstring' }];
      nock(API_URL).get('/rules-configs').reply(200, data);

      const configs = await rulesConfigs.getAll();
      expect(configs.data).toBeInstanceOf(Array);

      expect(configs.data.length).toBe(data.length);

      expect(configs.data[0].key).toBe(data[0].key);
    });

    it('should perform a GET request to rules-configs', async () => {
      nock.cleanAll();

      const request = nock(API_URL).get('/rules-configs').reply(200, {});

      await rulesConfigs.getAll();
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/rules-configs')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await rulesConfigs.getAll();
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#set', () => {
    const data = { value: 'foobar' };
    const params = { key: 'KEY' };

    it('should return a promise if no callback is given', (done) => {
      rulesConfigs.set(params, data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).put(`/rules-configs/${params.key}`).reply(500, {});

      rulesConfigs.set(params, data).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a PUT request to /rules-configs/{KEY}', async () => {
      nock.cleanAll();

      const request = nock(API_URL).put(`/rules-configs/${params.key}`, data).reply(200, {});

      await rulesConfigs.set(params, data);
      expect(request.isDone()).toBe(true);
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).put(`/rules-configs/${params.key}`, data).reply(200, {});

      await rulesConfigs.set(params, data);
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .put(`/rules-configs/${params.key}`, data)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await rulesConfigs.set(params, data);
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#delete', () => {
    const key = 'KEY';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/rules-configs/${key}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      expect(rulesConfigs.delete({ key }).then(() => done())).toBeInstanceOf(Promise);
    });

    it(`should perform a delete request to /rules-configs/${key}`, async () => {
      await rulesConfigs.delete({ key });
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/rules-configs/${key}`).reply(500, {});

      rulesConfigs.delete({ key }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/rules-configs/${key}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      await rulesConfigs.delete({ key });
      expect(request.isDone()).toBe(true);
    });
  });
});
