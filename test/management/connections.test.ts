import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  ConnectionsManager,
  ConnectionCreateStrategyEnum,
  ManagementClient,
  RequiredError,
} from '../../src/index.js';

describe('ConnectionsManager', () => {
  let connections: ConnectionsManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    connections = client.connections;
  });

  describe('instance', () => {
    const methods = ['getAll', 'get', 'create', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((connections as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ConnectionsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ConnectionsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;
    const response = [
      {
        name: 'test_connection',
        display_name: 'Test Connection',
        id: 'test_connection_id',
        strategy: 'auth0',
        realms: ['test'],
        is_domain_connection: false,
        metadata: {
          test: 'test value',
        },
      },
    ];
    beforeEach(() => {
      request = nock(API_URL).get('/connections').reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      connections.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/connections').reply(500, {});

      connections.getAll().catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/connections').reply(200, response);

      connections.getAll().then((connections) => {
        expect(connections.data).toBeInstanceOf(Array);

        expect(connections.data.length).toBe(response.length);

        expect(connections.data[0].display_name).toBe(response[0].display_name);
        expect(connections.data[0].name).toBe(response[0].name);
        expect(connections.data[0].id).toBe(response[0].id);
        expect(connections.data[0].strategy).toBe(response[0].strategy);
        expect(connections.data[0].realms?.[0]).toBe(response[0].realms[0]);
        expect(connections.data[0].is_domain_connection).toBe(response[0].is_domain_connection);
        expect(connections.data[0].metadata?.test).toBe(response[0].metadata.test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/connections', (done) => {
      connections.getAll().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/connections')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      connections.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/connections')
        .query({
          include_fields: true,
          fields: 'test',
          strategy: ['ad', 'adfs'],
        })
        .reply(200, []);

      connections
        .getAll({ include_fields: true, fields: 'test', strategy: ['ad', 'adfs'] })
        .then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
    });

    it('should pass exploded array parameters in the query-string', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/connections?strategy=ad&strategy=adfs')

        .reply(200, []);

      connections.getAll({ strategy: ['ad', 'adfs'] }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#get', () => {
    const params = { id: '5' };
    let request: nock.Scope;

    const response = {
      name: 'test_connection',
      display_name: 'Test Connection',
      id: 'test_connection_id',
      strategy: 'auth0',
      realms: ['test'],
      is_domain_connection: false,
      metadata: {
        test: 'test value',
      },
    };
    beforeEach(() => {
      request = nock(API_URL).get(`/connections/${params.id}`).reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      connections.get(params).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/connections/${params.id}`).reply(500, {});

      connections.get(params).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/connections/${params.id}`).reply(200, response);

      connections.get(params).then((connection) => {
        expect(connection.data.display_name).toBe(response.display_name);
        expect(connection.data.name).toBe(response.name);
        expect(connection.data.id).toBe(response.id);
        expect(connection.data.strategy).toBe(response.strategy);
        expect(connection.data.realms?.[0]).toBe(response.realms[0]);
        expect(connection.data.is_domain_connection).toBe(response.is_domain_connection);
        expect(connection.data.metadata?.test).toBe(response.metadata.test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/connections/:id', (done) => {
      connections.get(params).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/connections')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      connections.getAll().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/connections')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200, {});

      connections.getAll({ include_fields: true, fields: 'test' }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      display_name: 'Test connection',
      name: 'Test connection',
      strategy: ConnectionCreateStrategyEnum.auth0,
    };

    const response = {
      name: 'test_connection',
      display_name: 'Test Connection',
      id: 'test_connection_id',
      strategy: 'auth0',
      realms: ['test'],
      is_domain_connection: false,
      metadata: {
        test: 'test value',
      },
    };

    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/connections', data).reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      connections.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/connections').reply(500, {});

      connections.create(data).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a POST request to /api/v2/connections', (done) => {
      connections.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      connections.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      connections.create(data).then((connection) => {
        expect(connection.data.display_name).toBe(response.display_name);
        expect(connection.data.name).toBe(response.name);
        expect(connection.data.id).toBe(response.id);
        expect(connection.data.strategy).toBe(response.strategy);
        expect(connection.data.realms?.[0]).toBe(response.realms[0]);
        expect(connection.data.is_domain_connection).toBe(response.is_domain_connection);
        expect(connection.data.metadata?.test).toBe(response.metadata.test);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/connections')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      connections.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#update', () => {
    const params = { id: '5' };
    const data = {
      id: 5,
      name: 'Test connection',
      options: {},
    };
    const response = {
      name: 'test_connection',
      display_name: 'Test Connection',
      id: 'test_connection_id',
      strategy: 'auth0',
      realms: ['test'],
      is_domain_connection: false,
      metadata: {
        test: 'test value',
      },
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).patch(`/connections/${data.id}`, data).reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      connections.update(params, data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch(`/connections/${data.id}`).reply(500, {});

      connections.update(params, data).catch((err) => {
        expect(err).toBeInstanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/connections/:id', (done) => {
      connections.update(params, data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      connections.update(params, data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      connections.update(params, data).then((connection) => {
        expect(connection.data.display_name).toBe(response.display_name);
        expect(connection.data.name).toBe(response.name);
        expect(connection.data.id).toBe(response.id);
        expect(connection.data.strategy).toBe(response.strategy);
        expect(connection.data.realms?.[0]).toBe(response.realms[0]);
        expect(connection.data.is_domain_connection).toBe(response.is_domain_connection);
        expect(connection.data.metadata?.test).toBe(response.metadata.test);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/connections/${data.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      connections.update(params, data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/connections/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      connections.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /connections/${id}`, (done) => {
      connections.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/connections/${id}`).reply(500, {});

      connections.delete({ id }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/connections/${id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      connections.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#checkStatus', () => {
    const params = { id: '5' };
    const data = {
      id: params.id,
      name: 'Test connection',
    };

    beforeEach(() => {
      nock(API_URL).get(`/connections/${data.id}/status`).reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      connections.checkStatus(params).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should report success', (done) => {
      connections.checkStatus(params).then((response) => {
        expect(response).toBeDefined();
        done();
      });
    });

    it('should report failure', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/connections/${params.id}/status`).reply(500, {});

      connections.checkStatus(params).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });
  });

  describe('#delete user', () => {
    const id = '5';
    const email = 'user@domain.com';
    const endpoint = `/connections/${id}/users?email=${encodeURIComponent(email)}`;
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(endpoint).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      connections.deleteUserByEmail({ id, email }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to ${endpoint}`, (done) => {
      connections.deleteUserByEmail({ id, email }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(endpoint, {}).reply(500, {});

      connections.deleteUserByEmail({ id, email }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should require a connection id', async () => {
      await expect(connections.deleteUserByEmail({ email } as any)).rejects.toThrowError(
        RequiredError
      );
    });

    it('should require an email', async () => {
      await expect(connections.deleteUserByEmail({ id } as any)).rejects.toThrowError(
        RequiredError
      );
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(endpoint)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      connections.deleteUserByEmail({ id, email }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
