import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { TenantsManager, ManagementClient } from '../../src/index.js';

describe('TenantManager', () => {
  let tenant: TenantsManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    tenant = client.tenants;
  });

  describe('instance', () => {
    const methods = ['updateSettings', 'getSettings'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((tenant as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new TenantsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new TenantsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getSettings', () => {
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get('/tenants/settings').reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      tenant.getSettings().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/tenants/settings').reply(500, {});

      tenant.getSettings().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const data = { friendly_name: '123' };
      nock(API_URL).get('/tenants/settings').reply(200, data);

      const blacklistedTokens = await tenant.getSettings();

      expect(blacklistedTokens.data.friendly_name).toBe(data.friendly_name);
    });

    it('should perform a GET request to /api/v2/tenants/settings', async () => {
      await tenant.getSettings();
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/tenants/settings')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await tenant.getSettings();
      expect(request.isDone()).toBe(true);
    });

    it('should pass the parameters in the query-string', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/tenants/settings')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200, {});

      await tenant.getSettings({ include_fields: true, fields: 'test' });
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#updateSettings', () => {
    const data = {
      friendly_name: 'Test name',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).patch('/tenants/settings').reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      tenant.updateSettings(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch('/tenants/settings').reply(500, {});

      tenant.updateSettings(data).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should perform a PATCH request to /api/v2/tenants/settings', async () => {
      await tenant.updateSettings(data);
      expect(request.isDone()).toBe(true);
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).patch('/tenants/settings', data).reply(200, {});

      await tenant.updateSettings(data);
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/tenants/settings')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await tenant.updateSettings(data);
      expect(request.isDone()).toBe(true);
    });
  });
});
