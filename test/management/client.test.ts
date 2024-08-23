import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  Client,
  ClientCreate,
  ClientUpdate,
  ClientsManager,
  GetCredentials200ResponseInner,
  PatchCredentialsByCredentialIdRequest,
  PostCredentialsOperationRequest,
  PostCredentialsRequest,
  ManagementClient,
  GetClientsRequest,
} from '../../src/index.js';

import { RequiredError } from '../../src/lib/errors.js';

let clients: ClientsManager;

describe('ClientsManager', () => {
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });

    clients = client.clients;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('instance', () => {
    const methods = ['getAll', 'get', 'create', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((clients as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ClientsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ClientsManager({
          baseUrl: '',
        } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;
    const response: Partial<Client>[] = [
      {
        tenant: 'test_tenant',
        client_id: '123',
        name: 'test_name',
        description: 'test_description',
        global: false,
        client_secret: 'tes_secret',
        app_type: 'spa',
        logo_uri: 'test_logo_uri',
      },
    ];

    beforeEach(() => {
      request = nock(API_URL).get('/clients').reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      clients.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/clients').reply(500, {});

      clients.getAll().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients.getAll().then((clients) => {
        expect(clients.data).toBeInstanceOf(Array);

        expect(clients.data.length).toBe(response.length);

        expect(clients.data[0].tenant).toBe(response[0].tenant);
        expect(clients.data[0].client_id).toBe(response[0].client_id);
        expect(clients.data[0].name).toBe(response[0].name);
        expect(clients.data[0].description).toBe(response[0].description);
        expect(clients.data[0].global).toBe(response[0].global);
        expect(clients.data[0].client_secret).toBe(response[0].client_secret);
        expect(clients.data[0].app_type).toBe(response[0].app_type);
        expect(clients.data[0].logo_uri).toBe(response[0].logo_uri);

        done();
      });
    });

    it('should perform a GET request to /api/v2/clients', (done) => {
      clients.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const data = [{ client_id: '1' }];
      const request = nock(API_URL)
        .get('/clients')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      clients.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const queryParameters: GetClientsRequest | any = {
        fields: 'name,email',
        include_fields: true,
        page: 0,
        per_page: 50,
        include_totals: false,
        from: '12345',
        take: 50,
        is_global: true,
        is_first_party: false,
        app_type: 'web,mobile',
        client_ids: 'client1,client2,client3',
        q: 'name:John AND email:john@example.com',
      };

      const data = [{ client_id: '1' }];
      const request = nock(API_URL).get('/clients').query(queryParameters).reply(200, data);

      clients.getAll({ ...queryParameters }).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });

  describe('#create', () => {
    const data: ClientCreate = {
      name: 'test_name',
      description: 'test_description',
      app_type: 'spa',
      logo_uri: 'test_logo_uri',
    };
    const response: Partial<Client> = {
      tenant: 'test_tenant',
      client_id: '123',
      name: data.name,
      description: data.description,
      global: false,
      client_secret: 'test_secret',
      app_type: data.app_type,
      logo_uri: data.logo_uri,
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/clients').reply(201, response);
    });

    it('should return a promise if no callback is given', (done) => {
      clients.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients', (done) => {
      clients.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/clients')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(201, data);

      clients.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the new client data in the request body', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/clients', data as any)
        .reply(201, data);

      clients.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients.create(data).then((client) => {
        expect(client.data.client_id).toBe(response.client_id);
        expect(client.data.name).toBe(response.name);
        expect(client.data.description).toBe(response.description);
        expect(client.data.global).toBe(response.global);
        expect(client.data.client_secret).toBe(response.client_secret);
        expect(client.data.app_type).toBe(response.app_type);
        expect(client.data.logo_uri).toBe(response.logo_uri);

        done();
      });
    });
  });

  describe('#get', () => {
    const response: Partial<Client> = {
      tenant: 'test_tenant',
      client_id: '123',
      name: 'test_name',
      description: 'test_description',
      global: false,
      client_secret: 'test_secret',
      app_type: 'spa',
      logo_uri: 'test_logo_uri',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get(`/clients/${response.client_id}`).reply(201, response);
    });

    it('should return a promise if no callback is given', (done) => {
      clients
        .get({ client_id: response.client_id as string })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients/5', (done) => {
      clients.get({ client_id: response.client_id as string }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients.get({ client_id: response.client_id as string }).then((client) => {
        expect(client.data.client_id).toBe(response.client_id);
        expect(client.data.name).toBe(response.name);
        expect(client.data.description).toBe(response.description);
        expect(client.data.global).toBe(response.global);
        expect(client.data.client_secret).toBe(response.client_secret);
        expect(client.data.app_type).toBe(response.app_type);
        expect(client.data.logo_uri).toBe(response.logo_uri);

        done();
      });
    });
  });

  describe('#update', () => {
    const data: ClientUpdate = {
      name: 'test_name',
      description: 'test_description',
      app_type: 'spa',
      logo_uri: 'test_logo_uri',
    };
    const response: Partial<Client> = {
      tenant: 'test_tenant',
      client_id: '123',
      name: data.name,
      description: data.description,
      global: false,
      client_secret: 'test_secret',
      app_type: data.app_type,
      logo_uri: data.logo_uri,
    };

    let request: nock.Scope;
    beforeEach(() => {
      request = nock(API_URL).patch(`/clients/${response.client_id}`).reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      clients
        .update({ client_id: response.client_id as string }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/clients/5', (done) => {
      clients.update({ client_id: response.client_id as string }, {}).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the new data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/clients/${response.client_id as string}`, data as any)
        .reply(200, response);

      clients.update({ client_id: response.client_id as string }, data as any).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients.update({ client_id: response.client_id as string }, data as any).then((client) => {
        expect(client.data.client_id).toBe(response.client_id);
        expect(client.data.name).toBe(response.name);
        expect(client.data.description).toBe(response.description);
        expect(client.data.global).toBe(response.global);
        expect(client.data.client_secret).toBe(response.client_secret);
        expect(client.data.app_type).toBe(response.app_type);
        expect(client.data.logo_uri).toBe(response.logo_uri);

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/clients/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      clients.delete({ client_id: id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /clients/${id}`, (done) => {
      clients.delete({ client_id: id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#rotateSecret', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post(`/clients/${id}/rotate-secret`).reply(200, { client_id: '123' });
    });

    it('should return a promise if no callback is given', (done) => {
      clients
        .rotateClientSecret({ client_id: id }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients/5/rotate-secret', (done) => {
      clients.rotateClientSecret({ client_id: id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should return an error when client_id is not sent', async () => {
      await expect(clients.rotateClientSecret({} as any)).rejects.toThrowError(RequiredError);
    });

    it('should include the new data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/clients/${id}/rotate-secret`)
        .reply(200, { client_id: '123' });

      clients.rotateClientSecret({ client_id: id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post(`/clients/${id}/rotate-secret`).reply(500, {});

      clients.rotateClientSecret({ client_id: id }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });
  });

  describe('#getCredentials', () => {
    let request: nock.Scope;
    const response: GetCredentials200ResponseInner[] = [
      {
        id: 'cred_1m7sfABoNTTKYwTQ8qt6tX',
        name: '',
        kid: 'IZSSTECp...',
        alg: 'RS256',
        credential_type: '',
        created_at: '',
        updated_at: '',
        expires_at: '',
        subject_dn: '',
        thumbprint_sha256: '',
      },
    ];

    beforeEach(() => {
      request = nock(API_URL).get('/clients/123/credentials').reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      clients
        .getCredentials({
          client_id: '123',
        })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/clients/123/credentials').reply(500, {});

      clients.getCredentials({ client_id: '123' }).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients
        .getCredentials({
          client_id: '123',
        })
        .then((credentials) => {
          expect(credentials.data).toBeInstanceOf(Array);

          expect(credentials.data.length).toBe(response.length);

          expect(credentials.data[0].kid).toBe(response[0].kid);

          done();
        });
    });

    it('should perform a GET request to /api/v2/clients/123/credentials', (done) => {
      clients
        .getCredentials({
          client_id: '123',
        })
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const data = [{ client_id: '1' }];
      const request = nock(API_URL)
        .get('/clients/123/credentials')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      clients
        .getCredentials({
          client_id: '123',
        })
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        });
    });
  });

  describe('#getCredential', () => {
    let request: nock.Scope;
    const response: GetCredentials200ResponseInner = {
      id: 'cred_1m7sfABoNTTKYwTQ8qt6tX',
      name: '',
      kid: 'IZSSTECp...',
      alg: 'RS256',
      credential_type: '',
      created_at: '',
      updated_at: '',
      expires_at: '',
      subject_dn: '',
      thumbprint_sha256: '',
    };
    beforeEach(() => {
      request = nock(API_URL).get('/clients/123/credentials/abc').reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      clients
        .getCredential({
          client_id: '123',
          credential_id: 'abc',
        })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/clients/123/credentials/abc').reply(500, {});

      clients
        .getCredential({
          client_id: '123',
          credential_id: 'abc',
        })
        .catch((err) => {
          expect(err).toBeDefined();
          done();
        });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients
        .getCredential({
          client_id: '123',
          credential_id: 'abc',
        })
        .then((credentials) => {
          expect(credentials.data.kid).toBe(response.kid);

          done();
        });
    });

    it('should perform a GET request to /api/v2/clients/123/credentials/abc', (done) => {
      clients
        .getCredential({
          client_id: '123',
          credential_id: 'abc',
        })
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const data = [{ client_id: '1' }];
      const request = nock(API_URL)
        .get('/clients/123/credentials/abc')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      clients
        .getCredential({
          client_id: '123',
          credential_id: 'abc',
        })
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        });
    });
  });

  describe('#createCredential', () => {
    const data: PostCredentialsOperationRequest = {
      client_id: '123',
    };
    const body: PostCredentialsRequest = {
      name: '',
      alg: 'RS256',
      credential_type: 'public_key',
      pem: '123',
    };
    const response: GetCredentials200ResponseInner = {
      id: 'cred_1m7sfABoNTTKYwTQ8qt6tX',
      name: '',
      kid: 'IZSSTECp...',
      alg: 'RS256',
      credential_type: 'public_key',
      created_at: '',
      updated_at: '',
      expires_at: '',
      subject_dn: '',
      thumbprint_sha256: '',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/clients/123/credentials').reply(201, response);
    });

    it('should return a promise if no callback is given', (done) => {
      clients.createCredential(data, body).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/clients/123/credentials', (done) => {
      clients.createCredential(data, body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/clients/123/credentials')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(201, data);

      clients.createCredential(data, body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the new credential data in the request body', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/clients/123/credentials', body as any)
        .reply(201, data);

      clients.createCredential(data, body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients.createCredential(data, body).then((credential) => {
        expect(credential.data.kid).toBe(response.kid);

        done();
      });
    });
  });

  describe('#updateCredential', () => {
    const data: PatchCredentialsByCredentialIdRequest = {};
    const response: GetCredentials200ResponseInner = {
      id: 'cred_1m7sfABoNTTKYwTQ8qt6tX',
      name: '',
      kid: 'IZSSTECp...',
      alg: 'RS256',
      credential_type: 'public_key',
      created_at: '',
      updated_at: '',
      expires_at: '',
      subject_dn: '',
      thumbprint_sha256: '',
    };

    let request: nock.Scope;
    beforeEach(() => {
      request = nock(API_URL)
        .patch(`/clients/123/credentials/abc`, data as any)
        .reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      clients
        .updateCredential({ client_id: '123', credential_id: 'abc' }, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/clients/123/credentials/abc', (done) => {
      clients.updateCredential({ client_id: '123', credential_id: 'abc' }, data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the new data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/clients/123/credentials/abc`, data as any)
        .reply(200, response);

      clients.updateCredential({ client_id: '123', credential_id: 'abc' }, data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      clients
        .updateCredential({ client_id: '123', credential_id: 'abc' }, data)
        .then((credential) => {
          expect(credential.data.kid).toBe(response.kid);

          done();
        });
    });
  });

  describe('#deleteCredential', () => {
    const id = '123';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/clients/123/credentials/abc`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      clients
        .deleteCredential({ client_id: '123', credential_id: 'abc' })
        .then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /clients/${id}`, (done) => {
      clients.deleteCredential({ client_id: '123', credential_id: 'abc' }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
