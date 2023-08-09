import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { ClientGrant, ClientGrantsManager, ManagementClient } from '../../src/index.js';

describe('ClientGrantsManager', () => {
  let grants: ClientGrantsManager;
  const token = 'TOKEN';
  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    grants = client.clientGrants;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('instance', () => {
    const methods = ['getAll', 'create', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, () => {
        expect((grants as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ClientGrantsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ClientGrantsManager({
          baseUrl: '',
        } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    const data = [{ id: '1', client_id: '123', audience: 'abc', scope: ['openid'] }];
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get('/client-grants').reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      grants.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/client-grants').reply(500, {});

      grants.getAll().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/client-grants').reply(200, data);

      grants.getAll().then((grants) => {
        expect(grants.data).toBeInstanceOf(Array);

        expect((grants.data as Array<ClientGrant>).length).toBe(data.length);
        expect((grants.data as Array<ClientGrant>)[0].id).toBe(data[0].id);
        expect((grants.data as Array<ClientGrant>)[0].client_id).toBe(data[0].client_id);
        expect((grants.data as Array<ClientGrant>)[0].audience).toBe(data[0].audience);
        expect((grants.data as Array<ClientGrant>)[0].scope?.[0]).toBe(data[0].scope[0]);

        done();
      });
    });

    it('should perform a GET request to /api/v2/client-grants', (done) => {
      grants.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/client-grants')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      grants.getAll().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should pass the parameters in the query-string', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/client-grants')
        .query({
          page: 1,
          per_page: 2,
        })
        .reply(200, data);

      grants.getAll({ page: 1, per_page: 2 }).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      client_id: 'CLIENT_ID',
      audience: 'AUDIENCE',
      scope: ['user'],
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/client-grants').reply(201, data);
    });

    it('should return a promise if no callback is given', (done) => {
      grants.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/client-grants', (done) => {
      grants.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/client-grants')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(201, data);

      grants.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the new client grant data in the request body', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).post('/client-grants', data).reply(201, data);

      grants.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#update', () => {
    const data = {
      client_id: 'CLIENT_ID',
      audience: 'AUDIENCE',
      scope: ['user'],
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).patch(`/client-grants/5`).reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      grants.update({ id: '5' }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/client-grants/5', (done) => {
      grants.update({ id: '5' }, {}).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the new data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/client-grants/5`, data).reply(200, data);

      grants.update({ id: '5' }, data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/client-grants/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      grants.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /client-grants/${id}`, (done) => {
      grants.delete({ id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
