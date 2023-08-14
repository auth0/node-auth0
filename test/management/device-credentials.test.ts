import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  DeviceCredentialsManager,
  DeviceCredentialCreate,
  ManagementClient,
} from '../../src/index.js';

describe('DeviceCredentialsManager', () => {
  let credentials: DeviceCredentialsManager;

  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    credentials = client.deviceCredentials;
  });

  describe('instance', () => {
    const methods = ['createPublicKey', 'getAll', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((credentials as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new DeviceCredentialsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new DeviceCredentialsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;
    const response = [
      {
        id: 'dcr_0000000000000001',
        device_name: 'iPhone Mobile Safari UI/WKWebView',
        device_id: '550e8400-e29b-41d4-a716-446655440000',
        type: 'public_key',
        user_id: 'usr_5457edea1b8f33391a000004',
        client_id: 'AaiyAPdpYdesoKnqjj8HJqRn4T5titww',
      },
    ];
    beforeEach(() => {
      request = nock(API_URL).get('/device-credentials').reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      credentials.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/device-credentials').reply(500, {});

      credentials.getAll().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      credentials.getAll().then((credentials) => {
        expect(credentials.data).toBeInstanceOf(Array);

        expect(credentials.data.length).toBe(response.length);

        expect(credentials.data[0].id).toBe(response[0].id);
        expect(credentials.data[0].device_id).toBe(response[0].device_id);
        expect(credentials.data[0].device_name).toBe(response[0].device_name);
        expect(credentials.data[0].type).toBe(response[0].type);
        expect(credentials.data[0].user_id).toBe(response[0].user_id);
        expect(credentials.data[0].client_id).toBe(response[0].client_id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/device-credentials', (done) => {
      credentials.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/device-credentials')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      credentials.getAll().then(() => {
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
      const request = nock(API_URL).get('/device-credentials').query(params).reply(200, []);

      credentials.getAll(params).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#createPublicKey', () => {
    const data: DeviceCredentialCreate = {
      device_id: 'Sample device',
      value: '',
      device_name: 'Sample device',
      type: 'public_key',
    };
    const response = {
      id: 'dcr_0000001',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL)
        .post('/device-credentials', data as any)
        .reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      credentials.createPublicKey(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/device-credentials').reply(500, {});

      credentials.createPublicKey(data).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a POST request to /api/v2/device-credentials', (done) => {
      credentials.createPublicKey(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      credentials.createPublicKey(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      credentials.createPublicKey(data).then((credential) => {
        expect(credential.data.id).toBe(response.id);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/device-credentials')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      credentials.createPublicKey(data as DeviceCredentialCreate).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/device-credentials/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      credentials.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /device-credentials/${id}`, (done) => {
      credentials.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/device-credentials/${id}`).reply(500, {});

      credentials.delete({ id }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/device-credentials/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      credentials.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
