import nock from 'nock';
import queryString from 'querystring';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { ResourceServersManager, ManagementClient } from '../../src/index.js';

describe('ResourceServersManager', () => {
  let resourceServers: ResourceServersManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    resourceServers = client.resourceServers;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ResourceServersManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ResourceServersManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;
    beforeEach(() => {
      request = nock(API_URL).get('/resource-servers').reply(200, []);
    });

    it('should return a promise if no callback is given', (done) => {
      resourceServers.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/resource-servers').reply(500, {});

      resourceServers.getAll().catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data = [{ id: '123' }];
      nock(API_URL).get('/resource-servers').reply(200, data);

      resourceServers.getAll().then((resourceServers) => {
        expect(resourceServers.data).toBeInstanceOf(Array);

        expect(resourceServers.data.length).toBe(data.length);

        expect(resourceServers.data[0].id).toBe(data[0].id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/resource-servers', (done) => {
      resourceServers.getAll().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const queryParams = {
        identifiers: ['123'],
        page: 0,
        per_page: 10,
        include_totals: true,
        include_fields: true,
      };

      const request = nock(API_URL)
        .get(`/resource-servers?${queryString.stringify(queryParams)}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        // .query(queryParams)
        .reply(200, []);

      await resourceServers.getAll(queryParams);
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#get', () => {
    const params = { id: '5' };
    const data = {
      id: params.id,
      name: 'Test Resource Server',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get(`/resource-servers/${data.id}`).reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      resourceServers.get(params).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/resource-servers/${params.id}`).reply(500, {});

      resourceServers.get(params).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/resource-servers/${params.id}`).reply(200, data);

      resourceServers.get(params).then((resourceServer) => {
        expect(resourceServer.data.id).toBe(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/resource-servers/:id', (done) => {
      resourceServers.get(params).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/resource-servers/${params.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      resourceServers.get(params).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      name: 'Acme Backend API',
      options: {},
      identifier: '123',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/resource-servers').reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      resourceServers.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/resource-servers').reply(500, {});

      resourceServers.create(data).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a POST request to /api/v2/resource-servers', (done) => {
      resourceServers.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).post('/resource-servers', data).reply(200, {});

      resourceServers.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/resource-servers')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      resourceServers.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#update', () => {
    const params = { id: '5' };
    const data = {
      id: '5',
      name: 'Acme Backend API',
      options: {},
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).patch(`/resource-servers/${data.id}`).reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      resourceServers.update(params, data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch(`/resource-servers/${data.id}`).reply(500, {});

      resourceServers.update(params, data).catch((err) => {
        expect(err).toBeInstanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/resource-servers/:id', (done) => {
      resourceServers.update(params, data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/resource-servers/${data.id}`, data).reply(200, {});

      resourceServers.update(params, data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/resource-servers/${data.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      resourceServers.update(params, data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/resource-servers/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      resourceServers.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /resource-servers/${id}`, (done) => {
      resourceServers.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/resource-servers/${id}`).reply(500, {});

      resourceServers.delete({ id }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/resource-servers/${id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      resourceServers.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
