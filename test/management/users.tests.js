const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenants.auth0.com';

const UsersManager = require(`../../src/management/UsersManager`);
const { ArgumentError } = require('rest-facade');

describe('UsersManager', () => {
  /**
   * @type {string}
   */
  let token;

  /**
   * @type {UsersManager}
   */
  let usersManager;
  before(() => {
    token = 'TOKEN';
    usersManager = new UsersManager({
      headers: { authorization: `Bearer ${token}` },
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
      it(`should have a ${method} method`, () => {
        expect(usersManager[method]).to.exist.to.be.an.instanceOf(Function);
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
    /**
     * @type {nock}
     */
    let scope;
    beforeEach(() => {
      scope = nock(API_URL).get('/users').reply(200);
    });

    it('should accept a callback', (done) => {
      usersManager.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.getAll()).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/users').reply(500);

      try {
        await usersManager.getAll();
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/users').reply(200, data);

      const users = await usersManager.getAll();
      expect(users).to.be.an.instanceOf(Array);
      expect(users.length).to.equal(data.length);
      expect(users[0].test).to.equal(data[0].test);
    });

    it('should perform a GET request to /api/v2/users', async () => {
      await usersManager.getAll();
      expect(scope.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/users')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.getAll();
      expect(request.isDone()).to.be.true;
    });

    it('should pass the parameters in the query-string', async () => {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };
      const request = nock(API_URL).get('/users').query(params).reply(200);

      await usersManager.getAll(params);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getByEmail', () => {
    /**
     * @type {nock}
     */
    let scope;
    beforeEach(() => {
      scope = nock(API_URL).get('/users-by-email').reply(200);
    });

    it('should accept a callback', (done) => {
      usersManager.getByEmail('someone@example.com', () => {
        done();
      });
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.getByEmail()).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/users-by-email').reply(500);

      try {
        await usersManager.getByEmail();
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/users-by-email').reply(200, data);

      const users = await usersManager.getByEmail();
      expect(users).to.be.an.instanceOf(Array);
      expect(users.length).to.equal(data.length);
      expect(users[0].test).to.equal(data[0].test);
    });

    it('should perform a GET request to /api/v2/users-by-email', async () => {
      await usersManager.getByEmail();
      expect(scope.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/users-by-email')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.getByEmail();
      expect(request.isDone()).to.be.true;
    });

    it('should pass an email in as a query string', async () => {
      nock.cleanAll();

      const params = {
        email: 'email@example.com',
      };
      const request = nock(API_URL).get('/users-by-email').query(params).reply(200);

      await usersManager.getByEmail(params.email);
      expect(request.isDone()).to.be.true;
    });

    it('should pass additional options into the query string', async () => {
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

      await usersManager.getByEmail(params.email, additionalOptions);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#get', () => {
    /**
     * @typedef {object} data
     * @property {number} id Id
     * @property {string} name Name
     * @property {boolean} enabled Enabled
     * @property {string} script Script
     * @property {string} stage Stage
     */

    /**
     * @type {data}
     */
    let data;

    /**
     * @type {nock}
     */
    let scope;
    beforeEach(() => {
      data = {
        id: 5,
        name: 'Test rule',
        enabled: true,
        script: "function (user, contest, callback) { console.log('Test'); }",
        stage: 'login_success',
      };

      scope = nock(API_URL).get(`/users/${data.id}`).reply(200, data);
    });

    it('should accept a callback', (done) => {
      const params = { id: data.id };

      usersManager.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.get({ id: data.id })).instanceOf(Promise);
    });

    it('should perform a POST request to /api/v2/users/5', async () => {
      await usersManager.get({ id: data.id });
      expect(scope.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).get(`/users/${data.id}`).reply(500);

      try {
        await usersManager.get({ id: data.id });
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/users/${data.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.get({ id: data.id });
      expect(request.isDone()).to.be.true;
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

    /**
     * @type {nock}
     */
    let scope;
    beforeEach(() => {
      scope = nock(API_URL).post('/users').reply(200);
    });

    it('should accept a callback', (done) => {
      usersManager.create(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.create(data)).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post('/users').reply(500);

      try {
        await usersManager.create(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a POST request to /api/v2/users', async () => {
      await usersManager.create(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).post('/users', data).reply(200);

      await usersManager.create(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/users')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.create(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#update', () => {
    /**
     * @typedef {object} data
     * @property {number} id Id
     */

    /**
     * @type {data}
     */
    let data;

    /**
     * @type {nock}
     */
    let scope;
    beforeEach(() => {
      data = { id: 5 };

      scope = nock(API_URL).patch(`/users/${data.id}`).reply(200, data);
    });

    it('should accept a callback', (done) => {
      usersManager.update({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.update({ id: 5 }, {})).instanceOf(Promise);
    });

    it('should perform a PATCH request to /api/v2/users/5', async () => {
      await usersManager.update({ id: 5 }, {});
      expect(scope.isDone()).to.be.true;
    });

    it('should include the new data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/users/${data.id}`, data).reply(200);

      await usersManager.update({ id: 5 }, data);

      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).patch(`/users/${data.id}`).reply(500);

      try {
        await usersManager.update({ id: data.id }, data);
      } catch (err) {
        expect(err).to.exist;
      }
    });
  });

  describe('#delete', () => {
    const id = 'USER_5';

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).delete(`/users/${id}`).reply(200);
    });

    it('should accept a callback', (done) => {
      usersManager.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', () => {
      expect(usersManager.delete({ id })).instanceOf(Promise);
    });

    it(`should perform a delete request to /users/${id}`, async () => {
      await usersManager.delete({ id });
      expect(scope.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).delete(`/users/${id}`).reply(500);

      try {
        await usersManager.delete({ id });
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/users/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.delete({ id });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#link', () => {
    const userId = 'USER_ID';
    const data = {
      provider: 'twitter',
      user_id: '191919191919191',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).post(`/users/${userId}/identities`).reply(200);
    });

    it('should validate empty userId', () => {
      expect(() => {
        usersManager.link(null, data, () => {});
      }).to.throw('The userId cannot be null or undefined');
    });

    it('should validate non-string userId', () => {
      expect(() => {
        usersManager.link(123, data, () => {});
      }).to.throw('The userId has to be a string');
    });

    it('should accept a callback', (done) => {
      usersManager.link(userId, data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.link(userId, data)).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${userId}/identities`).reply(500);

      try {
        await usersManager.link(userId, data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a POST request to /api/v2/users', async () => {
      await usersManager.link(userId, data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).post(`/users/${userId}/identities`, data).reply(200);

      await usersManager.link(userId, data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${userId}/identities`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.link(userId, data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#unlink', () => {
    const data = {
      id: 'u1',
      user_id: 'u2',
      provider: 'auth0',
    };
    const url = `/users/${data.id}/identities/${data.provider}/${data.user_id}`;

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).delete(url).reply(200);
    });

    it('should accept a callback', (done) => {
      usersManager.unlink(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', () => {
      expect(usersManager.unlink(data)).instanceOf(Promise);
    });

    it(`should perform a DELETE request to ${url}`, async () => {
      await usersManager.unlink(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).delete(url).reply(500);

      try {
        usersManager.unlink(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(url)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.unlink(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#deleteMultifactorProvider', () => {
    const data = {
      id: 'u1',
      provider: 'auth0',
    };
    const url = `/users/${data.id}/multifactor/${data.provider}`;

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).delete(url).reply(200);
    });

    it('should accept a callback', (done) => {
      usersManager.deleteMultifactorProvider(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', () => {
      expect(usersManager.deleteMultifactorProvider(data)).instanceOf(Promise);
    });

    it(`should perform a DELETE request to ${url}`, async () => {
      await usersManager.deleteMultifactorProvider(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).delete(url).reply(500);

      try {
        await usersManager.deleteMultifactorProvider(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(url)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.deleteMultifactorProvider(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#updateUserMetadata', () => {
    /**
     * @typedef {object} data
     * @property {number} id Id
     * @property {string} foo Foo
     * @property {string} test Test
     */

    /**
     * @type {data}
     */
    let data;

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      data = {
        id: 5,
        foo: 'bar',
        test: 'data',
      };

      scope = nock(API_URL).patch(`/users/${data.id}`).reply(200, data);
    });

    it('should accept a callback', (done) => {
      usersManager.updateUserMetadata({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.updateUserMetadata({ id: 5 }, {})).instanceOf(Promise);
    });

    it('should perform a PATCH request to /api/v2/users/5', async () => {
      await usersManager.updateUserMetadata({ id: 5 }, {});
      expect(scope.isDone()).to.be.true;
    });

    it('should include the metadata in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/users/${data.id}`, {
          user_metadata: data,
        })
        .reply(200);

      await usersManager.updateUserMetadata({ id: 5 }, data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).patch(`/users/${data.id}`).reply(500);

      try {
        await usersManager.updateUserMetadata({ id: data.id }, data);
      } catch (err) {
        expect(err).to.exist;
      }
    });
  });

  describe('#logs', () => {
    const data = {
      id: 'user_id',
    };
    const url = `/users/${data.id}/logs`;

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).get(url).reply(200);
    });

    it('should accept a callback', (done) => {
      usersManager.logs(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', () => {
      expect(usersManager.logs(data)).instanceOf(Promise);
    });

    it(`should perform a GET request to ${url}`, async () => {
      await usersManager.logs(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).get(url).reply(500);

      try {
        await usersManager.logs(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(url)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.logs(data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const response = [{ test: true }];
      nock(API_URL).get(url).reply(200, response);

      const logs = await usersManager.logs(data);
      expect(logs).to.be.an.instanceOf(Array);

      expect(logs.length).to.equal(response.length);

      expect(logs[0].test).to.equal(response[0].test);
    });

    it('should pass the parameters in the query-string', async () => {
      nock.cleanAll();

      const params = {
        page: 0,
        per_page: 30,
      };
      const request = nock(API_URL).get(url).query(params).reply(200);

      const ownData = { ...data };
      ownData.page = params.page;
      ownData.per_page = params.per_page;

      await usersManager.logs(ownData);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getGuardianEnrollments', () => {
    const data = {
      id: 5,
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).get(`/users/${data.id}/enrollments`).reply(200);
    });

    it('should accept a callback', (done) => {
      usersManager.getGuardianEnrollments(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', () => {
      expect(usersManager.getGuardianEnrollments(data)).instanceOf(Promise);
    });

    it('should perform a GET request to /api/v2/users/5/enrollments', async () => {
      await usersManager.getGuardianEnrollments(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).get(`/users/${data.id}/enrollments`).reply(500);

      try {
        await usersManager.getGuardianEnrollments(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/users/${data.id}/enrollments`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.getGuardianEnrollments(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#regenerateRecoveryCode', () => {
    const data = {
      id: 'USER_ID',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).post(`/users/${data.id}/recovery-code-regeneration`).reply(200);
    });

    it('should validate empty userId', () => {
      expect(() => {
        usersManager.regenerateRecoveryCode(null, () => {});
      }).to.throw('The userId cannot be null or undefined');
    });

    it('should accept a callback', (done) => {
      usersManager.regenerateRecoveryCode(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.regenerateRecoveryCode(data)).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${data.id}/recovery-code-regeneration`).reply(500);

      try {
        await usersManager.regenerateRecoveryCode(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a POST request to /api/v2/users/:id/recovery-code-regeneration', async () => {
      await usersManager.regenerateRecoveryCode(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${data.id}/recovery-code-regeneration`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.regenerateRecoveryCode(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#invalidateRememberBrowser', () => {
    const data = {
      id: 'USER_ID',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL)
        .post(`/users/${data.id}/multifactor/actions/invalidate-remember-browser`)
        .reply(204);
    });

    it('should validate empty userId', () => {
      expect(() => {
        usersManager.invalidateRememberBrowser(null, () => {});
      }).to.throw('The userId cannot be null or undefined');
    });

    it('should accept a callback', (done) => {
      usersManager.invalidateRememberBrowser(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.invalidateRememberBrowser(data)).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL)
        .post(`/users/${data.id}/multifactor/actions/invalidate-remember-browser`)
        .reply(500);

      try {
        await usersManager.invalidateRememberBrowser(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a POST request to /api/v2/users/:id/multifactor/actions/invalidate-remember-browser', async () => {
      await usersManager.invalidateRememberBrowser(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${data.id}/multifactor/actions/invalidate-remember-browser`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.invalidateRememberBrowser(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getRoles', () => {
    const data = {
      id: 'user_id',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).get(`/users/${data.id}/roles`).reply(200);
    });

    it('should accept a callback', (done) => {
      usersManager.getRoles(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', () => {
      expect(usersManager.getRoles(data)).instanceOf(Promise);
    });

    it('should perform a GET request to /api/v2/users/user_id/roles', async () => {
      await usersManager.getRoles(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).get(`/users/${data.id}/roles`).reply(500);

      try {
        await usersManager.getRoles(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/users/${data.id}/roles`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.getRoles(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#assignRoles', () => {
    /**
     * @typedef {object} data
     * @property {string} id Id
     */

    /**
     * @typedef {object} body
     * @property {Array<string>} roles Roles
     */

    /**
     * @type {data}
     */
    let data;

    /**
     * @type {body}
     */
    let body;

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      data = {
        id: 'user_id',
      };
      body = { roles: ['role1', 'role2', 'role3'] };

      scope = nock(API_URL).post(`/users/${data.id}/roles`).reply(200);
    });

    it('should validate empty user_id', () => {
      expect(() => {
        usersManager.assignRoles({ id: null }, body, () => {});
      }).to.throw('The user_id cannot be null or undefined');
    });

    it('should validate non-string user_id', () => {
      expect(() => {
        usersManager.assignRoles({ id: 127 }, body, () => {});
      }).to.throw('The user_id has to be a string');
    });

    it('should accept a callback', (done) => {
      usersManager.assignRoles(data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.assignRoles(data, {})).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${data.id}/roles`).reply(500);

      try {
        usersManager.assignRoles(data, {});
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a POST request to /api/v2/users/user_id/roles', async () => {
      await usersManager.assignRoles(data, {});
      expect(scope.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).post(`/users/${data.id}/roles`, body).reply(200);

      await usersManager.assignRoles(data, body);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${data.id}/roles`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.assignRoles(data, {});
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#removeRoles', () => {
    /**
     * @typedef {object} data
     * @property {string} id Id
     */

    /**
     * @typedef {object} body
     * @property {Array<string>} roles Roles
     */

    /**
     * @type {data}
     */
    let data;

    /**
     * @type {body}
     */
    let body;

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      data = {
        id: 'user_id',
      };
      body = { roles: ['role1', 'role2', 'role3'] };

      scope = nock(API_URL).delete(`/users/${data.id}/roles`, {}).reply(200);
    });

    it('should validate empty user_id', () => {
      expect(() => {
        usersManager.removeRoles({ id: null }, body, () => {});
      }).to.throw('The user_id cannot be null or undefined');
    });

    it('should validate non-string user_id', () => {
      expect(() => {
        usersManager.removeRoles({ id: 123 }, body, () => {});
      }).to.throw('The user_id has to be a string');
    });

    it('should accept a callback', (done) => {
      usersManager.removeRoles(data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.removeRoles(data, {})).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${data.id}/roles`).reply(500);

      try {
        await usersManager.removeRoles(data, {});
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a DELETE request to /api/v2/users/user_id/roles', async () => {
      await usersManager.removeRoles(data, {});
      expect(scope.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).delete(`/users/${data.id}/roles`, body).reply(200);

      await usersManager.removeRoles(data, body);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/users/${data.id}/roles`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.removeRoles(data, {});
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getPermissions', () => {
    const data = {
      id: 'user_id',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).get(`/users/${data.id}/permissions`).reply(200);
    });

    it('should accept a callback', (done) => {
      usersManager.getPermissions(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', () => {
      expect(usersManager.getPermissions(data)).instanceOf(Promise);
    });

    it('should perform a GET request to /api/v2/users/user_id/permissions', async () => {
      await usersManager.getPermissions(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).get(`/users/${data.id}/permissions`).reply(500);

      try {
        usersManager.getPermissions(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/users/${data.id}/permissions`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.getPermissions(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#assignPermissions', () => {
    /**
     * @typedef {object} data
     * @property {string} id Id
     */

    /**
     * @typedef {object} body
     * @property {string} permission_name Permission name
     * @property {string} resource_server_identifier Resource server identifier
     */

    /**
     * @type {data}
     */
    let data;

    /**
     * @type {body}
     */
    let body;

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      data = {
        id: 'user_id',
      };
      body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

      scope = nock(API_URL).post(`/users/${data.id}/permissions`).reply(200);
    });

    it('should validate empty user_id', () => {
      expect(() => {
        usersManager.assignPermissions({ id: null }, body, () => {});
      }).to.throw('The user_id cannot be null or undefined');
    });

    it('should validate non-string user_id', () => {
      expect(() => {
        usersManager.assignPermissions({ id: 123 }, body, () => {});
      }).to.throw('The user_id has to be a string');
    });

    it('should accept a callback', (done) => {
      usersManager.assignPermissions(data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.assignPermissions(data, {})).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${data.id}/permissions`).reply(500);

      try {
        await usersManager.assignPermissions(data, {});
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a POST request to /api/v2/users/user_id/permissions', async () => {
      await usersManager.assignPermissions(data, {});
      expect(scope.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).post(`/users/${data.id}/permissions`, body).reply(200);

      await usersManager.assignPermissions(data, body);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.assignPermissions(data, {});
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#removePermissions', () => {
    /**
     * @typedef {object} data
     * @property {string} id Id
     */

    /**
     * @typedef {object} body
     * @property {string} permission_name Permission name
     * @property {string} resource_server_identifier Resource server identifier
     */

    /**
     * @type {data}
     */
    let data;

    /**
     * @type {body}
     */
    let body;

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      data = {
        id: 'user_id',
      };
      body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

      scope = nock(API_URL).delete(`/users/${data.id}/permissions`, {}).reply(200);
    });

    it('should validate empty user_id', () => {
      expect(() => {
        usersManager.removePermissions({ id: null }, body, () => {});
      }).to.throw('The user_id cannot be null or undefined');
    });

    it('should validate non-string user_id', () => {
      expect(() => {
        usersManager.removePermissions({ id: 123 }, body, () => {});
      }).to.throw('The user_id has to be a string');
    });

    it('should accept a callback', (done) => {
      usersManager.removePermissions(data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.removePermissions(data, {})).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${data.id}/permissions`).reply(500);

      try {
        await usersManager.removePermissions(data, {});
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a DELETE request to /api/v2/users/user_id/permissions', async () => {
      await usersManager.removePermissions(data, {});
      expect(scope.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).delete(`/users/${data.id}/permissions`, body).reply(200);

      await usersManager.removePermissions(data, body);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/users/${data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.removePermissions(data, {});
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#deleteAllAuthenticators', () => {
    let params;
    let scope;

    beforeEach(() => {
      params = {
        id: 'user_id',
      };

      scope = nock(API_URL).delete(`/users/${params.id}/authenticators`).reply(200);
    });

    it('should validate empty user_id', () => {
      expect(() => {
        usersManager.deleteAllAuthenticators({ id: null }, () => {});
      }).to.throw('The user_id cannot be null or undefined');
    });

    it('should validate non-string user_id', () => {
      expect(() => {
        usersManager.deleteAllAuthenticators({ id: 123 }, () => {});
      }).to.throw('The user_id has to be a string');
    });

    it('should accept a callback', (done) => {
      usersManager.deleteAllAuthenticators(params, (err) => {
        expect(err).to.be.null;
        done();
      });
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.deleteAllAuthenticators(params, {})).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${params.id}/authenticators`).reply(500);

      try {
        await usersManager.deleteAllAuthenticators(params, {});
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a DELETE request to /api/v2/users/user_id/authenticators', async () => {
      await usersManager.deleteAllAuthenticators(params, {});
      expect(scope.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/users/${params.id}/authenticators`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.deleteAllAuthenticators(params, {});
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getUserOrganizations', () => {
    const data = {
      id: 'user_id',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).get(`/users/${data.id}/organizations`).reply(200);
    });

    it('should accept a callback', (done) => {
      usersManager.getUserOrganizations(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', () => {
      expect(usersManager.getUserOrganizations(data)).instanceOf(Promise);
    });

    it('should perform a GET request to /api/v2/users/user_id/organizations', async () => {
      await usersManager.getUserOrganizations(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).get(`/users/${data.id}/organizations`).reply(500);

      try {
        await usersManager.getUserOrganizations(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/users/${data.id}/organizations`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.getUserOrganizations(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getAuthenticationMethods', () => {
    const params = {
      id: 'user_id',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).get(`/users/${params.id}/authentication-methods`).reply(200);
    });

    it('should perform a GET request to /api/v2/users/{user}/authentication-methods', async () => {
      await usersManager.getAuthenticationMethods(params);
      expect(scope.isDone()).to.be.true;
    });
  });

  describe('#getAuthenticationMethodById', () => {
    const params = {
      id: 'user_id',
      authentication_method_id: 'authentication_method_id',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL)
        .get(`/users/${params.id}/authentication-methods/${params.authentication_method_id}`)
        .reply(200);
    });

    it('should perform a GET request to /api/v2/users/{user}/authentication-methods/{authentication_method_id}', async () => {
      await usersManager.getAuthenticationMethodById(params);
      expect(scope.isDone()).to.be.true;
    });
  });

  describe('#createAuthenticationMethod', () => {
    const params = {
      id: 'user_id',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).post(`/users/${params.id}/authentication-methods`).reply(200);
    });

    it('should perform a POST request to /api/v2/users/{id}/authentication-methods', async () => {
      await usersManager.createAuthenticationMethod(params, {});
      expect(scope.isDone()).to.be.true;
    });
  });

  describe('#updateAuthenticationMethods', () => {
    const params = {
      id: 'user_id',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).put(`/users/${params.id}/authentication-methods`).reply(200);
    });

    it('should perform a PUT request to /api/v2/users/{user}/authentication-methods', async () => {
      await usersManager.updateAuthenticationMethods(params, {});
      expect(scope.isDone()).to.be.true;
    });
  });

  describe('#updateAuthenticationMethodById', () => {
    const params = {
      id: 'user_id',
      authentication_method_id: 'authentication_method_id',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL)
        .patch(`/users/${params.id}/authentication-methods/${params.authentication_method_id}`)
        .reply(200);
    });

    it('should perform a PATCH request to /api/v2/users/{user}/authentication-methods/{authentication_method_id}', async () => {
      await usersManager.updateAuthenticationMethodById(params, {});
      expect(scope.isDone()).to.be.true;
    });
  });

  describe('#deleteAuthenticationMethods', () => {
    const params = {
      id: 'user_id',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL).delete(`/users/${params.id}/authentication-methods`).reply(200);
    });

    it('should perform a DELETE request to /api/v2/users/{user}/authentication-methods', async () => {
      await usersManager.deleteAuthenticationMethods(params);
      expect(scope.isDone()).to.be.true;
    });
  });

  describe('#deleteAuthenticationMethodById', () => {
    const params = {
      id: 'user_id',
      authentication_method_id: 'authentication_method_id',
    };

    /**
     * @type {nock}
     */
    let scope;

    beforeEach(() => {
      scope = nock(API_URL)
        .delete(`/users/${params.id}/authentication-methods/${params.authentication_method_id}`)
        .reply(200);
    });

    it('should perform a DELETE request to /api/v2/users/{user}/authentication-methods/{authentication_method_id}', async () => {
      await usersManager.deleteAuthenticationMethodById(params);
      expect(scope.isDone()).to.be.true;
    });
  });
});
