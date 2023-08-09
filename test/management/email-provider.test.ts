import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  EmailProvider,
  EmailsManager,
  PatchProviderRequest,
  PatchProviderRequestNameEnum,
  PostProviderRequest,
  PostProviderRequestNameEnum,
  ManagementClient,
} from '../../src/index.js';

describe('EmailProviderManager', () => {
  let emails: EmailsManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    emails = client.emails;
  });

  describe('instance', () => {
    const methods = ['configure', 'get', 'update'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((emails as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new EmailsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new EmailsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#get', () => {
    const response: EmailProvider = {
      name: 'sendgrid',
      enabled: true,
      default_from_address: 'from@test.com',
      credentials: {
        api_user: 'test_user',
        region: 'test_region',
        smtp_host: 'test_host',
        smtp_port: 1234,
        smtp_user: 'test_user',
      },
      settings: {
        test: 'setting',
      },
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get('/emails/provider').reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      emails.get().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/emails/provider').reply(500, {});

      emails.get().catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      emails.get().then((provider) => {
        expect(provider.data.name).toBe(response.name);
        expect(provider.data.enabled).toBe(response.enabled);
        expect(provider.data.default_from_address).toBe(response.default_from_address);
        expect(provider.data.credentials?.api_user).toBe(response.credentials?.api_user);
        expect(provider.data.credentials?.region).toBe(response.credentials?.region);
        expect(provider.data.credentials?.smtp_host).toBe(response.credentials?.smtp_host);
        expect(provider.data.credentials?.smtp_port).toBe(response.credentials?.smtp_port);
        expect(provider.data.credentials?.smtp_user).toBe(response.credentials?.smtp_user);

        expect(provider.data.settings?.test).toBe(response.settings?.test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/emails/provider', (done) => {
      emails.get().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/emails/provider')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      emails.get().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };

      const request = nock(API_URL).get('/emails/provider').query(params).reply(200, response);

      emails.get(params).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#configure', () => {
    const data: PostProviderRequest = {
      name: PostProviderRequestNameEnum.smtp,
      enabled: true,
      default_from_address: 'from@test.com',
      credentials: {
        api_user: 'test_user',
        region: 'test_region',
        smtp_host: 'test_host',
        smtp_port: 1234,
        smtp_user: 'test_user',
      },
      settings: {
        test: 'test',
      },
    };
    const response = {
      name: PostProviderRequestNameEnum.smtp,
      enabled: true,
      default_from_address: 'from@test.com',
      credentials: {
        api_user: 'test_user',
        region: 'test_region',
        smtp_host: 'test_host',
        smtp_port: 1234,
        smtp_user: 'test_user',
      },
      settings: {
        test: 'test',
      },
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL)
        .post('/emails/provider', data as any)
        .reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      emails.configure(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/emails/provider').reply(500, {});

      emails.configure(data).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a POST request to /api/v2/emails/provider', (done) => {
      emails.configure(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      emails.configure(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      emails.configure(data).then((provider) => {
        expect(provider.data.name).toBe(response.name);
        expect(provider.data.enabled).toBe(response.enabled);
        expect(provider.data.default_from_address).toBe(response.default_from_address);
        expect(provider.data.credentials?.api_user).toBe(response.credentials?.api_user);
        expect(provider.data.credentials?.region).toBe(response.credentials?.region);
        expect(provider.data.credentials?.smtp_host).toBe(response.credentials?.smtp_host);
        expect(provider.data.credentials?.smtp_port).toBe(response.credentials?.smtp_port);
        expect(provider.data.credentials?.smtp_user).toBe(response.credentials?.smtp_user);

        expect(provider.data.settings?.test).toBe(response.settings?.test);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/emails/provider')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      emails.configure(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#update', () => {
    const data: PatchProviderRequest = {
      name: PatchProviderRequestNameEnum.smtp,
      enabled: true,
      default_from_address: 'from@test.com',
      credentials: {
        api_user: 'test_user',
        region: 'test_region',
        smtp_host: 'test_host',
        smtp_port: 1234,
        smtp_user: 'test_user',
      },
      settings: {
        test: 'test',
      },
    };
    const response = {
      name: PatchProviderRequestNameEnum.smtp,
      enabled: true,
      default_from_address: 'from@test.com',
      credentials: {
        api_user: 'test_user',
        region: 'test_region',
        smtp_host: 'test_host',
        smtp_port: 1234,
        smtp_user: 'test_user',
      },
      settings: {
        test: 'test',
      },
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL)
        .patch('/emails/provider', data as any)
        .reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      emails.update(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch(`/emails/provider`).reply(500, {});

      emails.update(data).catch((err) => {
        expect(err).toBeInstanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/emails/provider', (done) => {
      emails.update(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      emails.update(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      emails.update(data).then((provider) => {
        expect(provider.data.name).toBe(response.name);
        expect(provider.data.enabled).toBe(response.enabled);
        expect(provider.data.default_from_address).toBe(response.default_from_address);
        expect(provider.data.credentials?.api_user).toBe(response.credentials?.api_user);
        expect(provider.data.credentials?.region).toBe(response.credentials?.region);
        expect(provider.data.credentials?.smtp_host).toBe(response.credentials?.smtp_host);
        expect(provider.data.credentials?.smtp_port).toBe(response.credentials?.smtp_port);
        expect(provider.data.credentials?.smtp_user).toBe(response.credentials?.smtp_user);

        expect(provider.data.settings?.test).toBe(response.settings?.test);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/emails/provider')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      emails.update(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
