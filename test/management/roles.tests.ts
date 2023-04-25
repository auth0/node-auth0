import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { RequiredError, RolesManager } from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('RolesManager', () => {
  let roles: RolesManager;
  const token = 'TOKEN';

  before(function () {
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
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new RolesManager({ baseUrl: '' });
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get('/roles').reply(200, []);
    });

    it('should return a promise if no callback is given', function (done) {
      roles.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/roles').reply(500);

      roles.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async function () {
      nock.cleanAll();

      const data = [{ name: 'test role' }];
      nock(API_URL).get('/roles').reply(200, data);

      const credentials = await roles.getAll();
      expect(credentials.data).to.be.an.instanceOf(Array);

      expect(credentials.data.length).to.equal(data.length);

      expect(credentials.data[0].name).to.equal(data[0].name);
    });

    it('should perform a GET request to /api/v2/roles', async function () {
      await roles.getAll();
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/roles')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      await roles.getAll();
      expect(request.isDone()).to.be.true;
    });

    it('should pass the parameters in the query-string', async function () {
      nock.cleanAll();

      const params = {
        name_filter: 'test',
      };
      const request = nock(API_URL).get('/roles').query(params).reply(200, []);

      await roles.getAll(params);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#get', () => {
    let request: nock.Scope;
    const data = {
      id: 'rol_ID',
      name: 'My role',
      description: 'This is my role',
    };

    beforeEach(function () {
      request = nock(API_URL).get(`/roles/${data.id}`).reply(200, data);
    });

    it('should accept a callback', function (done) {
      const params = { id: data.id };

      roles.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      roles.get({ id: data.id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/roles/rol_ID', async function () {
      await roles.get({ id: data.id });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/roles/${data.id}`).reply(500);

      roles.get({ id: data.id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/roles/${data.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      roles.get({ id: data.id }).then(() => {
        expect(request.isDone()).to.be.true;

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

    beforeEach(function () {
      request = nock(API_URL).post('/roles').reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      roles.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/roles').reply(500);

      roles.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles', async function () {
      await roles.create(data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL).post('/roles', data).reply(200, {});

      await roles.create(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/roles')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      roles.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    const data = { id: 'rol_ID' };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).patch(`/roles/${data.id}`).reply(200, data);
    });

    it('should accept a callback', function (done) {
      roles.update({ id: 'rol_ID' }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      roles.update({ id: 'rol_ID' }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/roles/rol_ID', function (done) {
      roles.update({ id: 'rol_ID' }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', async function () {
      nock.cleanAll();
      const body = { name: '' };
      const request = nock(API_URL).patch(`/roles/${data.id}`, body).reply(200, []);

      await roles.update(data, body);
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/roles/${data.id}`).reply(500);

      roles.update({ id: data.id }, { name: '' }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 'rol_ID';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/roles/${id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      roles.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function () {
      expect(roles.delete({ id })).instanceOf(Promise);
    });

    it(`should perform a delete request to /roles/${id}`, async function () {
      await roles.delete({ id });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/roles/${id}`).reply(500);

      roles.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/roles/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      await roles.delete({ id });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getPermissions', () => {
    const data = {
      id: 'role_id',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/roles/${data.id}/permissions`).reply(200, []);
    });

    it('should accept a callback', function (done) {
      roles.getPermissions(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function () {
      expect(roles.getPermissions(data)).instanceOf(Promise);
    });

    it('should perform a GET request to /api/v2/roles/rol_ID/permissions', async function () {
      await roles.getPermissions(data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/roles/${data.id}/permissions`).reply(500);

      roles.getPermissions(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/roles/${data.id}/permissions`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, []);

      await roles.getPermissions(data);
      expect(request.isDone()).to.be.true;
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

    beforeEach(function () {
      request = nock(API_URL).post(`/roles/${data.id}/permissions`).reply(200);
    });

    it('should return a promise if no callback is given', function (done) {
      roles.addPermissions(data, body).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/roles/${data.id}/permissions`).reply(500);

      roles.addPermissions(data, body).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles/rol_ID/permissions', async function () {
      await roles.addPermissions(data, body);
      expect(request.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(`/roles/${data.id}/permissions`, body).reply(200);

      roles.addPermissions(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/roles/${data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      roles.addPermissions(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removePermissions', () => {
    const data = {
      id: 'rol_ID',
    };

    const body = {
      permissions: [{ permission_name: 'My Permission', resource_server_identifier: 'test123' }],
    };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/roles/${data.id}/permissions`, body).reply(200, {});
    });

    it('should validate empty roleId', function () {
      expect(roles.removePermissions({} as any, body)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', function (done) {
      roles.removePermissions(data, body).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/roles/${data.id}/permissions`).reply(500);

      roles.removePermissions(data, body).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/roles/rol_ID/permissions', function (done) {
      roles.removePermissions(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).delete(`/roles/${data.id}/permissions`, body).reply(200);

      roles.removePermissions(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/roles/${data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      roles.removePermissions(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getUsers', () => {
    const data = {
      id: 'role_id',
    };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/roles/${data.id}/users`).reply(200, []);
    });

    it('should return a promise when no callback is given', function (done) {
      roles.getUsers(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/roles/rol_Id/users', function (done) {
      roles.getUsers(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/roles/${data.id}/users`).reply(500);

      roles.getUsers(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/roles/${data.id}/users`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, []);

      roles.getUsers(data).then(() => {
        expect(request.isDone()).to.be.true;

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

    beforeEach(function () {
      request = nock(API_URL).post(`/roles/${data.id}/users`).reply(200, {});
    });

    it('should validate empty roleId', function () {
      expect(roles.assignUsers({} as any, body)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', function (done) {
      roles.assignUsers(data, body).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/roles/${data.id}/users`).reply(500);

      roles.assignUsers(data, body).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles/rol_ID/users', function (done) {
      roles.assignUsers(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(`/roles/${data.id}/users`, body).reply(200);

      roles.assignUsers(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/roles/${data.id}/users`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      roles.assignUsers(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
