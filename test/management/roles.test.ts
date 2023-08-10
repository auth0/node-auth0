import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { RolesManager, ManagementClient, RequiredError } from '../../src/index.js';

describe('RolesManager', () => {
  let roles: RolesManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    roles = client.roles;
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new RolesManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new RolesManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get('/roles').reply(200, []);
    });

    it('should return a promise if no callback is given', (done) => {
      roles.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/roles').reply(500, {});

      roles.getAll().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const data = [{ name: 'test role' }];
      nock(API_URL).get('/roles').reply(200, data);

      const credentials = await roles.getAll();
      expect(credentials.data).toBeInstanceOf(Array);

      expect(credentials.data.length).toBe(data.length);

      expect(credentials.data[0].name).toBe(data[0].name);
    });

    it('should perform a GET request to /api/v2/roles', async () => {
      await roles.getAll();
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/roles')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      await roles.getAll();
      expect(request.isDone()).toBe(true);
    });

    it('should pass the parameters in the query-string', async () => {
      nock.cleanAll();

      const params = {
        name_filter: 'test',
      };
      const request = nock(API_URL).get('/roles').query(params).reply(200, []);

      await roles.getAll(params);
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#get', () => {
    let request: nock.Scope;
    const data = {
      id: 'rol_ID',
      name: 'My role',
      description: 'This is my role',
    };

    beforeEach(() => {
      request = nock(API_URL).get(`/roles/${data.id}`).reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      roles.get({ id: data.id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/roles/rol_ID', async () => {
      await roles.get({ id: data.id });
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/roles/${data.id}`).reply(500, {});

      roles.get({ id: data.id }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/roles/${data.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      roles.get({ id: data.id }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#create', () => {
    let request: nock.Scope;
    const data = {
      id: 'rol_ID',
      name: 'My role',
      description: 'This is my role',
    };

    beforeEach(() => {
      request = nock(API_URL).post('/roles').reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      roles.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/roles').reply(500, {});

      roles.create(data).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles', async () => {
      await roles.create(data);
      expect(request.isDone()).toBe(true);
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).post('/roles', data).reply(200, {});

      await roles.create(data);
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/roles')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      roles.create(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#update', () => {
    const data = { id: 'rol_ID' };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).patch(`/roles/${data.id}`).reply(200, data);
    });

    it('should accept a callback', (done) => {
      roles.update({ id: 'rol_ID' }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', (done) => {
      roles.update({ id: 'rol_ID' }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/roles/rol_ID', (done) => {
      roles.update({ id: 'rol_ID' }, {}).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the new data in the body of the request', async () => {
      nock.cleanAll();
      const body = { name: '' };
      const request = nock(API_URL).patch(`/roles/${data.id}`, body).reply(200, []);

      await roles.update(data, body);
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch(`/roles/${data.id}`).reply(500, {});

      roles.update({ id: data.id }, { name: '' }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 'rol_ID';
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/roles/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      expect(roles.delete({ id }).then(() => done())).toBeInstanceOf(Promise);
    });

    it(`should perform a delete request to /roles/${id}`, async () => {
      await roles.delete({ id });
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete(`/roles/${id}`).reply(500, {});

      roles.delete({ id }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/roles/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      await roles.delete({ id });
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#getPermissions', () => {
    const data = {
      id: 'role_id',
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get(`/roles/${data.id}/permissions`).reply(200, []);
    });

    it('should accept a callback', (done) => {
      roles.getPermissions(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', () => {
      expect(roles.getPermissions(data)).toBeInstanceOf(Promise);
    });

    it('should perform a GET request to /api/v2/roles/rol_ID/permissions', async () => {
      await roles.getPermissions(data);
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/roles/${data.id}/permissions`).reply(500, {});

      roles.getPermissions(data).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/roles/${data.id}/permissions`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, []);

      await roles.getPermissions(data);
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#addPermissions', () => {
    const data = {
      id: 'rol_ID',
    };
    let request: nock.Scope;
    const body = {
      permissions: [{ permission_name: 'My Permission', resource_server_identifier: 'test123' }],
    };

    beforeEach(() => {
      request = nock(API_URL).post(`/roles/${data.id}/permissions`).reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      roles.addPermissions(data, body).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post(`/roles/${data.id}/permissions`).reply(500, {});

      roles.addPermissions(data, body).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles/rol_ID/permissions', async () => {
      await roles.addPermissions(data, body);
      expect(request.isDone()).toBe(true);
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).post(`/roles/${data.id}/permissions`, body).reply(200, {});

      roles.addPermissions(data, body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/roles/${data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      roles.addPermissions(data, body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#deletePermissions', () => {
    const data = {
      id: 'rol_ID',
    };

    const body = {
      permissions: [{ permission_name: 'My Permission', resource_server_identifier: 'test123' }],
    };

    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete(`/roles/${data.id}/permissions`, body).reply(200, {});
    });

    it('should validate empty roleId', async () => {
      await expect(roles.deletePermissions({} as any, body)).rejects.toThrowError(RequiredError);
    });

    it('should return a promise if no callback is given', (done) => {
      roles.deletePermissions(data, body).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post(`/roles/${data.id}/permissions`).reply(500, {});

      roles.deletePermissions(data, body).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/roles/rol_ID/permissions', (done) => {
      roles.deletePermissions(data, body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).delete(`/roles/${data.id}/permissions`, body).reply(200, {});

      roles.deletePermissions(data, body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/roles/${data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      roles.deletePermissions(data, body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#getUsers', () => {
    const data = {
      id: 'role_id',
    };

    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get(`/roles/${data.id}/users`).reply(200, []);
    });

    it('should return a promise when no callback is given', (done) => {
      roles.getUsers(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/roles/rol_Id/users', (done) => {
      roles.getUsers(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/roles/${data.id}/users`).reply(500, {});

      roles.getUsers(data).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should include the token in the authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/roles/${data.id}/users`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, []);

      roles.getUsers(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#assignUsers', () => {
    const data = {
      id: 'rol_ID',
    };
    const body = { users: ['userID1'] };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post(`/roles/${data.id}/users`).reply(200, {});
    });

    it('should validate empty roleId', async () => {
      await expect(roles.assignUsers({} as any, body)).rejects.toThrowError(RequiredError);
    });

    it('should return a promise if no callback is given', (done) => {
      roles.assignUsers(data, body).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post(`/roles/${data.id}/users`).reply(500, {});

      roles.assignUsers(data, body).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles/rol_ID/users', (done) => {
      roles.assignUsers(data, body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).post(`/roles/${data.id}/users`, body).reply(200, {});

      roles.assignUsers(data, body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/roles/${data.id}/users`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      roles.assignUsers(data, body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
