const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const RolesManager = require(`../../src/management/RolesManager`);
const { ArgumentError } = require('rest-facade');

describe('RolesManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.roles = new RolesManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = [
      'get',
      'getAll',
      'create',
      'update',
      'delete',
      'getPermissions',
      'addPermissions',
      'removePermissions',
      'getUsers',
      'assignUsers',
    ];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.roles[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new RolesManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new RolesManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new RolesManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/roles').reply(200);
    });

    it('should accept a callback', function (done) {
      this.roles.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.roles.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/roles').reply(500);

      this.roles.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async function () {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/roles').reply(200, data);

      const credentials = await this.roles.getAll();
      expect(credentials).to.be.an.instanceOf(Array);

      expect(credentials.length).to.equal(data.length);

      expect(credentials[0].test).to.equal(data[0].test);
    });

    it('should perform a GET request to /api/v2/roles', async function () {
      const { request } = this;

      await this.roles.getAll();
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/roles')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.roles.getAll();
      expect(request.isDone()).to.be.true;
    });

    it('should pass the parameters in the query-string', async function () {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };
      const request = nock(API_URL).get('/roles').query(params).reply(200);

      await this.roles.getAll(params);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#get', () => {
    beforeEach(function () {
      this.data = {
        id: 'rol_ID',
        name: 'My role',
        description: 'This is my role',
      };

      this.request = nock(API_URL).get(`/roles/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      const params = { id: this.data.id };

      this.roles.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.roles.get({ id: this.data.id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/roles/rol_ID', async function () {
      const { request } = this;

      await this.roles.get({ id: this.data.id });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/roles/${this.data.id}`).reply(500);

      this.roles.get({ id: this.data.id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/roles/${this.data.id}`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.roles.get({ id: this.data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      id: 'rol_ID',
      name: 'My role',
      description: 'This is my role',
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/roles').reply(200);
    });

    it('should accept a callback', function (done) {
      this.roles.create(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.roles.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/roles').reply(500);

      this.roles.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles', async function () {
      const { request } = this;

      await this.roles.create(data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL).post('/roles', data).reply(200);

      await this.roles.create(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/roles')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.roles.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    beforeEach(function () {
      this.data = { id: 'rol_ID' };

      this.request = nock(API_URL).patch(`/roles/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      this.roles.update({ id: 'rol_ID' }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.roles
        .update({ id: 'rol_ID' }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/roles/rol_ID', function (done) {
      const { request } = this;

      this.roles.update({ id: 'rol_ID' }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/roles/${this.data.id}`, this.data).reply(200);

      await this.roles.update({ id: 'rol_ID' }, this.data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/roles/${this.data.id}`).reply(500);

      this.roles.update({ id: this.data.id }, this.data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 'rol_ID';

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/roles/${id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.roles.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function () {
      expect(this.roles.delete({ id })).instanceOf(Promise);
    });

    it(`should perform a delete request to /roles/${id}`, async function () {
      const { request } = this;

      await this.roles.delete({ id });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/roles/${id}`).reply(500);

      this.roles.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/roles/${id}`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.roles.delete({ id });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getPermissions', () => {
    const data = {
      id: 'role_id',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/roles/${data.id}/permissions`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.roles.getPermissions(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function () {
      expect(this.roles.getPermissions(data)).instanceOf(Promise);
    });

    it('should perform a GET request to /api/v2/roles/rol_ID/permissions', async function () {
      const { request } = this;

      await this.roles.getPermissions(data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/roles/${data.id}/permissions`).reply(500);

      this.roles.getPermissions(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/roles/${data.id}/permissions`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.roles.getPermissions(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#addPermissions', () => {
    beforeEach(function () {
      this.data = {
        id: 'rol_ID',
      };
      this.body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

      this.request = nock(API_URL).post(`/roles/${this.data.id}/permissions`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.roles.addPermissions(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.roles
        .addPermissions(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/roles/${this.data.id}/permissions`).reply(500);

      this.roles.addPermissions(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles/rol_ID/permissions', async function () {
      const { request } = this;

      await this.roles.addPermissions(this.data, {});
      expect(request.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/roles/${this.data.id}/permissions`, this.body)
        .reply(200);

      this.roles.addPermissions(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/roles/${this.data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.roles.addPermissions(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removePermissions', () => {
    beforeEach(function () {
      this.data = {
        id: 'rol_ID',
      };
      this.body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

      this.request = nock(API_URL).delete(`/roles/${this.data.id}/permissions`, {}).reply(200);
    });

    it('should validate empty roleId', function () {
      const _this = this;
      expect(() => {
        _this.roles.removePermissions({ id: null }, _this.body, () => {});
      }).to.throw('The roleId passed in params cannot be null or undefined');
    });

    it('should validate non-string roleId', function () {
      const _this = this;
      expect(() => {
        _this.roles.removePermissions({ id: 123 }, _this.body, () => {});
      }).to.throw('The role Id has to be a string');
    });

    it('should accept a callback', function (done) {
      this.roles.removePermissions(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.roles
        .removePermissions(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/roles/${this.data.id}/permissions`).reply(500);

      this.roles.removePermissions(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/roles/rol_ID/permissions', function (done) {
      const { request } = this;

      this.roles.removePermissions(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/roles/${this.data.id}/permissions`, this.body)
        .reply(200);

      this.roles.removePermissions(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/roles/${this.data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.roles.removePermissions(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getUsers', () => {
    const data = {
      id: 'role_id',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/roles/${data.id}/users`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.roles.getUsers(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.roles.getUsers(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/roles/rol_Id/users', function (done) {
      const { request } = this;

      this.roles.getUsers(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/roles/${data.id}/users`).reply(500);

      this.roles.getUsers(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/roles/${data.id}/users`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.roles.getUsers(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#assignUsers', () => {
    beforeEach(function () {
      this.data = {
        id: 'rol_ID',
      };
      this.body = { users: ['userID1'] };

      this.request = nock(API_URL).post(`/roles/${this.data.id}/users`).reply(200);
    });

    it('should validate empty roleId', function () {
      const _this = this;
      expect(() => {
        _this.roles.assignUsers({ id: null }, _this.body, () => {});
      }).to.throw('The roleId passed in params cannot be null or undefined');
    });

    it('should validate non-string roleId', function () {
      const _this = this;
      expect(() => {
        _this.roles.assignUsers({ id: 123 }, _this.body, () => {});
      }).to.throw('The role Id has to be a string');
    });

    it('should accept a callback', function (done) {
      this.roles.assignUsers(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.roles
        .assignUsers(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/roles/${this.data.id}/users`).reply(500);

      this.roles.assignUsers(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles/rol_ID/users', function (done) {
      const { request } = this;

      this.roles.assignUsers(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should perform a POST request to /api/v2/roles/rol_ID/users with a callback', function (done) {
      const { request } = this;

      this.roles.assignUsers(this.data, {}, () => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(`/roles/${this.data.id}/users`, this.body).reply(200);

      this.roles.assignUsers(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/roles/${this.data.id}/users`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.roles.assignUsers(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
