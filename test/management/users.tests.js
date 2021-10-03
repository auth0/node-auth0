const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenants.auth0.com';

const UsersManager = require(`../../src/management/UsersManager`);
const { ArgumentError } = require('rest-facade');

describe('UsersManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.users = new UsersManager({
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
      'deleteAll',
      'unlink',
      'link',
      'logs',
      'deleteMultifactorProvider',
      'updateUserMetadata',
      'updateAppMetadata',
      'getGuardianEnrollments',
      'regenerateRecoveryCode',
      'invalidateRememberBrowser',
      'getRoles',
      'assignRoles',
      'removeRoles',
      'getPermissions',
      'assignPermissions',
      'removePermissions',
      'getUserOrganizations',
    ];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.users[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new UsersManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new UsersManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new UsersManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/users').reply(200);
    });

    it('should accept a callback', function (done) {
      this.users.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.users.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/users').reply(500);

      this.users.getAll().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/users').reply(200, data);

      this.users.getAll().then((users) => {
        expect(users).to.be.an.instanceOf(Array);

        expect(users.length).to.equal(data.length);

        expect(users[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/users', function (done) {
      const { request } = this;

      this.users.getAll().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/users')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.getAll().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };
      const request = nock(API_URL).get('/users').query(params).reply(200);

      this.users.getAll(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getByEmail', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/users-by-email').reply(200);
    });

    it('should accept a callback', function (done) {
      this.users.getByEmail('someone@example.com', () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.users.getByEmail().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/users-by-email').reply(500);

      this.users.getByEmail().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/users-by-email').reply(200, data);

      this.users.getByEmail().then((users) => {
        expect(users).to.be.an.instanceOf(Array);

        expect(users.length).to.equal(data.length);

        expect(users[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/users-by-email', function (done) {
      const { request } = this;

      this.users.getByEmail().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/users-by-email')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.getByEmail().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass an email in as a query string', function (done) {
      nock.cleanAll();

      const params = {
        email: 'email@example.com',
      };
      const request = nock(API_URL).get('/users-by-email').query(params).reply(200);

      this.users.getByEmail(params.email).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass additional options into the query string', function (done) {
      nock.cleanAll();

      const additionalOptions = {
        fields: 'user_id, email, email_verified',
        include_fields: true,
      };
      const params = {
        email: 'email@example.com',
        ...additionalOptions,
      };

      const request = nock(API_URL).get('/users-by-email').query(params).reply(200);

      this.users.getByEmail(params.email, additionalOptions).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', () => {
    beforeEach(function () {
      this.data = {
        id: 5,
        name: 'Test rule',
        enabled: true,
        script: "function (user, contest, callback) { console.log('Test'); }",
        stage: 'login_success',
      };

      this.request = nock(API_URL).get(`/users/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      const params = { id: this.data.id };

      this.users.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.users.get({ id: this.data.id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/users/5', function (done) {
      const { request } = this;

      this.users.get({ id: this.data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/users/${this.data.id}`).reply(500);

      this.users.get({ id: this.data.id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/users/${this.data.id}`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.get({ id: this.data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      id: 5,
      name: 'Test rule',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      stage: 'login_success',
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/users').reply(200);
    });

    it('should accept a callback', function (done) {
      this.users.create(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.users.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/users').reply(500);

      this.users.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/users', function (done) {
      const { request } = this;

      this.users.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/users', data).reply(200);

      this.users.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/users')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    beforeEach(function () {
      this.data = { id: 5 };

      this.request = nock(API_URL).patch(`/users/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      this.users.update({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.users.update({ id: 5 }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/users/5', function (done) {
      const { request } = this;

      this.users.update({ id: 5 }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/users/${this.data.id}`, this.data).reply(200);

      this.users.update({ id: 5 }, this.data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/users/${this.data.id}`).reply(500);

      this.users.update({ id: this.data.id }, this.data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 'USER_5';

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/users/${id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.users.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.users.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /users/${id}`, function (done) {
      const { request } = this;

      this.users.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/users/${id}`).reply(500);

      this.users.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/users/${id}`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#link', () => {
    const userId = 'USER_ID';
    const data = {
      provider: 'twitter',
      user_id: '191919191919191',
    };

    beforeEach(function () {
      this.request = nock(API_URL).post(`/users/${userId}/identities`).reply(200);
    });

    it('should validate empty userId', function () {
      const _this = this;
      expect(() => {
        _this.users.link(null, data, () => {});
      }).to.throw('The userId cannot be null or undefined');
    });

    it('should validate non-string userId', function () {
      const _this = this;
      expect(() => {
        _this.users.link(123, data, () => {});
      }).to.throw('The userId has to be a string');
    });

    it('should accept a callback', function (done) {
      this.users.link(userId, data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.users.link(userId, data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/users/${userId}/identities`).reply(500);

      this.users.link(userId, data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/users', function (done) {
      const { request } = this;

      this.users.link(userId, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(`/users/${userId}/identities`, data).reply(200);

      this.users.link(userId, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${userId}/identities`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.link(userId, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#unlink', () => {
    const data = {
      id: 'u1',
      user_id: 'u2',
      provider: 'auth0',
    };
    const url = `/users/${data.id}/identities/${data.provider}/${data.user_id}`;

    beforeEach(function () {
      this.request = nock(API_URL).delete(url).reply(200);
    });

    it('should accept a callback', function (done) {
      this.users.unlink(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.users.unlink(data).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to ${url}`, function (done) {
      const { request } = this;

      this.users.unlink(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(url).reply(500);

      this.users.unlink(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(url)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.unlink(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#deleteMultifactorProvider', () => {
    const data = {
      id: 'u1',
      provider: 'auth0',
    };
    const url = `/users/${data.id}/multifactor/${data.provider}`;

    beforeEach(function () {
      this.request = nock(API_URL).delete(url).reply(200);
    });

    it('should accept a callback', function (done) {
      this.users.deleteMultifactorProvider(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.users.deleteMultifactorProvider(data).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to ${url}`, function (done) {
      const { request } = this;

      this.users.deleteMultifactorProvider(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(url).reply(500);

      this.users.deleteMultifactorProvider(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(url)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.deleteMultifactorProvider(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateUserMetadata', () => {
    beforeEach(function () {
      this.data = {
        id: 5,
        foo: 'bar',
        test: 'data',
      };

      this.request = nock(API_URL).patch(`/users/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      this.users.updateUserMetadata({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.users
        .updateUserMetadata({ id: 5 }, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/users/5', function (done) {
      const { request } = this;

      this.users.updateUserMetadata({ id: 5 }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the metadata in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/users/${this.data.id}`, {
          user_metadata: this.data,
        })
        .reply(200);

      this.users
        .updateUserMetadata({ id: 5 }, this.data)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/users/${this.data.id}`).reply(500);

      this.users.updateUserMetadata({ id: this.data.id }, this.data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#logs', () => {
    const data = {
      id: 'user_id',
    };
    const url = `/users/${data.id}/logs`;

    beforeEach(function () {
      this.request = nock(API_URL).get(url).reply(200);
    });

    it('should accept a callback', function (done) {
      this.users.logs(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.users.logs(data).then(done.bind(null, null));
    });

    it(`should perform a GET request to ${url}`, function (done) {
      const { request } = this;

      this.users.logs(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(url).reply(500);

      this.users.logs(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(url)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.logs(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const response = [{ test: true }];
      nock(API_URL).get(url).reply(200, response);

      this.users.logs(data).then((logs) => {
        expect(logs).to.be.an.instanceOf(Array);

        expect(logs.length).to.equal(response.length);

        expect(logs[0].test).to.equal(response[0].test);

        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const params = {
        page: 0,
        per_page: 30,
      };
      const request = nock(API_URL).get(url).query(params).reply(200);

      data.page = params.page;
      data.per_page = params.per_page;

      this.users.logs(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getGuardianEnrollments', () => {
    const data = {
      id: 5,
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/users/${data.id}/enrollments`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.users.getGuardianEnrollments(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.users.getGuardianEnrollments(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/users/5/enrollments', function (done) {
      const { request } = this;

      this.users.getGuardianEnrollments(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/users/${data.id}/enrollments`).reply(500);

      this.users.getGuardianEnrollments(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/users/${data.id}/enrollments`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.getGuardianEnrollments(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#regenerateRecoveryCode', () => {
    const data = {
      id: 'USER_ID',
    };

    beforeEach(function () {
      this.request = nock(API_URL).post(`/users/${data.id}/recovery-code-regeneration`).reply(200);
    });

    it('should validate empty userId', function () {
      const _this = this;
      expect(() => {
        _this.users.regenerateRecoveryCode(null, () => {});
      }).to.throw('The userId cannot be null or undefined');
    });

    it('should accept a callback', function (done) {
      this.users.regenerateRecoveryCode(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.users
        .regenerateRecoveryCode(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/users/${data.id}/recovery-code-regeneration`).reply(500);

      this.users.regenerateRecoveryCode(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/users/:id/recovery-code-regeneration', function (done) {
      const { request } = this;

      this.users.regenerateRecoveryCode(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${data.id}/recovery-code-regeneration`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.regenerateRecoveryCode(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#invalidateRememberBrowser', () => {
    const data = {
      id: 'USER_ID',
    };

    beforeEach(function () {
      this.request = nock(API_URL)
        .post(`/users/${data.id}/multifactor/actions/invalidate-remember-browser`)
        .reply(204);
    });

    it('should validate empty userId', function () {
      const _this = this;
      expect(() => {
        _this.users.invalidateRememberBrowser(null, () => {});
      }).to.throw('The userId cannot be null or undefined');
    });

    it('should accept a callback', function (done) {
      this.users.invalidateRememberBrowser(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.users
        .invalidateRememberBrowser(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL)
        .post(`/users/${data.id}/multifactor/actions/invalidate-remember-browser`)
        .reply(500);

      this.users.invalidateRememberBrowser(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/users/:id/multifactor/actions/invalidate-remember-browser', function (done) {
      const { request } = this;

      this.users.invalidateRememberBrowser(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${data.id}/multifactor/actions/invalidate-remember-browser`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.invalidateRememberBrowser(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getRoles', () => {
    const data = {
      id: 'user_id',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/users/${data.id}/roles`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.users.getRoles(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.users.getRoles(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/users/user_id/roles', function (done) {
      const { request } = this;

      this.users.getRoles(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/users/${data.id}/roles`).reply(500);

      this.users.getRoles(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/users/${data.id}/roles`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.getRoles(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#assignRoles', () => {
    beforeEach(function () {
      this.data = {
        id: 'user_id',
      };
      this.body = { roles: ['role1', 'role2', 'role3'] };

      this.request = nock(API_URL).post(`/users/${this.data.id}/roles`).reply(200);
    });

    it('should validate empty user_id', function () {
      const _this = this;
      expect(() => {
        _this.users.assignRoles({ id: null }, _this.body, () => {});
      }).to.throw('The user_id cannot be null or undefined');
    });

    it('should validate non-string user_id', function () {
      const _this = this;
      expect(() => {
        _this.users.assignRoles({ id: 127 }, _this.body, () => {});
      }).to.throw('The user_id has to be a string');
    });

    it('should accept a callback', function (done) {
      this.users.assignRoles(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.users
        .assignRoles(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/users/${this.data.id}/roles`).reply(500);

      this.users.assignRoles(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/users/user_id/roles', function (done) {
      const { request } = this;

      this.users.assignRoles(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(`/users/${this.data.id}/roles`, this.body).reply(200);

      this.users.assignRoles(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${this.data.id}/roles`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.assignRoles(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removeRoles', () => {
    beforeEach(function () {
      this.data = {
        id: 'user_id',
      };
      this.body = { roles: ['role1', 'role2', 'role3'] };

      this.request = nock(API_URL).delete(`/users/${this.data.id}/roles`, {}).reply(200);
    });

    it('should validate empty user_id', function () {
      const _this = this;
      expect(function () {
        _this.users.removeRoles({ id: null }, this.body, () => {});
      }).to.throw('The user_id cannot be null or undefined');
    });

    it('should validate non-string user_id', function () {
      const _this = this;
      expect(() => {
        _this.users.removeRoles({ id: 123 }, _this.body, () => {});
      }).to.throw('The user_id has to be a string');
    });

    it('should accept a callback', function (done) {
      this.users.removeRoles(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.users
        .removeRoles(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/users/${this.data.id}/roles`).reply(500);

      this.users.removeRoles(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/users/user_id/roles', function (done) {
      const { request } = this;

      this.users.removeRoles(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).delete(`/users/${this.data.id}/roles`, this.body).reply(200);

      this.users.removeRoles(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/users/${this.data.id}/roles`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.removeRoles(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getPermissions', () => {
    const data = {
      id: 'user_id',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/users/${data.id}/permissions`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.users.getPermissions(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.users.getPermissions(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/users/user_id/permissions', function (done) {
      const { request } = this;

      this.users.getPermissions(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/users/${data.id}/permissions`).reply(500);

      this.users.getPermissions(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/users/${data.id}/permissions`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.getPermissions(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#assignPermissions', () => {
    beforeEach(function () {
      this.data = {
        id: 'user_id',
      };
      this.body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

      this.request = nock(API_URL).post(`/users/${this.data.id}/permissions`).reply(200);
    });

    it('should validate empty user_id', function () {
      const _this = this;
      expect(function () {
        _this.users.assignPermissions({ id: null }, this.body, () => {});
      }).to.throw('The user_id cannot be null or undefined');
    });

    it('should validate non-string user_id', function () {
      const _this = this;
      expect(() => {
        _this.users.assignPermissions({ id: 123 }, _this.body, () => {});
      }).to.throw('The user_id has to be a string');
    });

    it('should accept a callback', function (done) {
      this.users.assignPermissions(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.users
        .assignPermissions(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/users/${this.data.id}/permissions`).reply(500);

      this.users.assignPermissions(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/users/user_id/permissions', function (done) {
      const { request } = this;

      this.users.assignPermissions(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${this.data.id}/permissions`, this.body)
        .reply(200);

      this.users.assignPermissions(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${this.data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.assignPermissions(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removePermissions', () => {
    beforeEach(function () {
      this.data = {
        id: 'user_id',
      };
      this.body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

      this.request = nock(API_URL).delete(`/users/${this.data.id}/permissions`, {}).reply(200);
    });

    it('should validate empty user_id', function () {
      const _this = this;
      expect(function () {
        _this.users.removePermissions({ id: null }, this.body, () => {});
      }).to.throw('The user_id cannot be null or undefined');
    });

    it('should validate non-string user_id', function () {
      const _this = this;
      expect(() => {
        _this.users.removePermissions({ id: 123 }, _this.body, () => {});
      }).to.throw('The user_id has to be a string');
    });

    it('should accept a callback', function (done) {
      this.users.removePermissions(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.users
        .removePermissions(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/users/${this.data.id}/permissions`).reply(500);

      this.users.removePermissions(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/users/user_id/permissions', function (done) {
      const { request } = this;

      this.users.removePermissions(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/users/${this.data.id}/permissions`, this.body)
        .reply(200);

      this.users.removePermissions(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/users/${this.data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.removePermissions(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getUserOrganizations', () => {
    const data = {
      id: 'user_id',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/users/${data.id}/organizations`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.users.getUserOrganizations(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.users.getUserOrganizations(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/users/user_id/organizations', function (done) {
      const { request } = this;

      this.users.getUserOrganizations(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/users/${data.id}/organizations`).reply(500);

      this.users.getUserOrganizations(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/users/${data.id}/organizations`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.users.getUserOrganizations(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
