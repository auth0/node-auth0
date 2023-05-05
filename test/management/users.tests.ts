import chai, { use } from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  UsersManager,
  UsersByEmailManager,
  PostIdentitiesRequestProviderEnum,
  DeleteUserIdentityByUserIdProviderEnum,
  DeleteMultifactorByProviderProviderEnum,
} from '../../src/management/__generated/index';
import { RequiredError } from '../../src/lib/errors';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('UsersManager', () => {
  const token = 'TOKEN§';

  let usersManager: UsersManager;
  let usersByEmailManager: UsersByEmailManager;
  before(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    usersManager = client.users;
    usersByEmailManager = client.usersByEmail;
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new UsersManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new UsersManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).get('/users').reply(200, []);
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

      const data = [{ family_name: 'test' }];
      nock(API_URL).get('/users').reply(200, data);

      const users = await usersManager.getAll();
      expect(users.data).to.be.an.instanceOf(Array);
      expect(users.data.length).to.equal(data.length);
      expect(users.data[0].family_name).to.equal(data[0].family_name);
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
        .reply(200, []);

      await usersManager.getAll();
      expect(request.isDone()).to.be.true;
    });

    it('should pass the parameters in the query-string', async () => {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };
      const request = nock(API_URL).get('/users').query(params).reply(200, []);

      await usersManager.getAll(params);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getByEmail', () => {
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).get('/users-by-email').reply(200, {});
    });

    it('should return a promise if no callback is given', () => {
      expect(usersByEmailManager.getByEmail({ email: '' })).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).get('/users-by-email').reply(500);

      try {
        await usersByEmailManager.getByEmail({ email: '' });
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const params = { email: 'test' };
      const data = [{ family_name: 'test' }];
      nock(API_URL).get('/users-by-email').query(params).reply(200, data);

      const users = await usersByEmailManager.getByEmail(params);
      expect(users.data).to.be.an.instanceOf(Array);
      expect(users.data.length).to.equal(data.length);
      expect(users.data[0].family_name).to.equal(data[0].family_name);
    });

    it('should perform a GET request to /api/v2/users-by-email', async () => {
      nock.cleanAll();
      const params = { email: 'test' };
      const data = [{ family_name: 'test' }];
      nock(API_URL).get('/users-by-email').query(params).reply(200, data);

      await usersByEmailManager.getByEmail(params);

      expect(scope.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const params = { email: 'test' };
      const request = nock(API_URL)
        .get('/users-by-email')
        .query(params)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      await usersByEmailManager.getByEmail(params);
      expect(request.isDone()).to.be.true;
    });

    it('should pass an email in as a query string', async () => {
      nock.cleanAll();

      const params = {
        email: 'email@example.com',
      };
      const request = nock(API_URL).get('/users-by-email').query(params).reply(200, []);

      await usersByEmailManager.getByEmail(params);
      expect(request.isDone()).to.be.true;
    });

    it('should pass additional options into the query string', async () => {
      nock.cleanAll();

      const params = {
        email: 'email@example.com',
        fields: 'user_id, email, email_verified',
        include_fields: true,
      };

      const request = nock(API_URL).get('/users-by-email').query(params).reply(200, []);

      await usersByEmailManager.getByEmail(params);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#get', () => {
    const data = {
      id: '5',
      name: 'Test rule',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      stage: 'login_success',
    };
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).get(`/users/${data.id}`).reply(200, data);
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
        .reply(200, []);

      await usersManager.get({ id: data.id });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#create', () => {
    const data = {
      id: 5,
      name: 'Test rule',
      connection: '',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      stage: 'login_success',
    };
    let scope: nock.Scope;
    beforeEach(() => {
      scope = nock(API_URL).post('/users').reply(200, {});
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

      const request = nock(API_URL).post('/users', data).reply(200, {});

      await usersManager.create(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/users')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await usersManager.create(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#update', () => {
    const data = { id: '5' };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).patch(`/users/${data.id}`).reply(200, data);
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.update({ id: '5' }, {})).instanceOf(Promise);
    });

    it('should perform a PATCH request to /api/v2/users/5', async () => {
      await usersManager.update({ id: '5' }, {});
      expect(scope.isDone()).to.be.true;
    });

    it('should include the new data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/users/${data.id}`, data).reply(200, {});

      await usersManager.update({ id: '5' }, data);

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
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).delete(`/users/${id}`).reply(200);
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
      provider: PostIdentitiesRequestProviderEnum.twitter,
      user_id: '191919191919191',
    };
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).post(`/users/${userId}/identities`).reply(200, {});
    });

    it('should validate empty userId', () => {
      expect(usersManager.link({} as any, {})).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.link({ id: userId }, data)).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${userId}/identities`).reply(500);

      try {
        await usersManager.link({ id: userId }, data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a POST request to /api/v2/users', async () => {
      await usersManager.link({ id: userId }, data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).post(`/users/${userId}/identities`, data).reply(200, []);

      await usersManager.link({ id: userId }, data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${userId}/identities`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      await usersManager.link({ id: userId }, data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#unlink', () => {
    const data = {
      id: 'u1',
      user_id: 'u2',
      provider: DeleteUserIdentityByUserIdProviderEnum.auth0,
    };
    const url = `/users/${data.id}/identities/${data.provider}/${data.user_id}`;

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).delete(url).reply(200, []);
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
        .reply(200, []);

      await usersManager.unlink(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#deleteMultifactorProvider', () => {
    const data = {
      id: 'u1',
      provider: DeleteMultifactorByProviderProviderEnum.duo,
    };
    const url = `/users/${data.id}/multifactor/${data.provider}`;
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).delete(url).reply(200);
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

  describe('#update', () => {
    const data = {
      id: '5',
      foo: 'bar',
      test: 'data',
    };
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).patch(`/users/${data.id}`).reply(200, data);
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.update({ id: '5' }, {})).instanceOf(Promise);
    });

    it('should perform a PATCH request to /api/v2/users/5', async () => {
      await usersManager.update({ id: '5' }, {});
      expect(scope.isDone()).to.be.true;
    });

    it('should include the metadata in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/users/${data.id}`, {
          user_metadata: data,
        })
        .reply(200, {});

      await usersManager.update(
        { id: '5' },
        {
          user_metadata: data,
        }
      );
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

  describe('#logs', () => {
    const data = {
      id: 'user_id',
    };
    const url = `/users/${data.id}/logs`;
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).get(url).reply(200, []);
    });

    it('should return a promise when no callback is given', () => {
      expect(usersManager.getLogs(data)).instanceOf(Promise);
    });

    it(`should perform a GET request to ${url}`, async () => {
      await usersManager.getLogs(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).get(url).reply(500);

      try {
        await usersManager.getLogs(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(url)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, []);

      await usersManager.getLogs(data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock.cleanAll();

      const response = [{ audience: '123' }];
      nock(API_URL).get(url).reply(200, response);

      const logs = await usersManager.getLogs(data);
      expect(logs.data).to.be.an.instanceOf(Array);

      expect(logs.data.length).to.equal(response.length);

      expect(logs.data[0].audience).to.equal(response[0].audience);
    });

    it('should pass the parameters in the query-string', async () => {
      nock.cleanAll();

      const params = {
        page: 0,
        per_page: 30,
      };
      const request = nock(API_URL).get(url).query(params).reply(200, []);

      await usersManager.getLogs({
        id: data.id,
        ...params,
      });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getGuardianEnrollments', () => {
    const data = {
      id: '5',
    };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).get(`/users/${data.id}/enrollments`).reply(200, []);
    });

    it('should return a promise when no callback is given', () => {
      expect(usersManager.getEnrollments(data)).instanceOf(Promise);
    });

    it('should perform a GET request to /api/v2/users/5/enrollments', async () => {
      await usersManager.getEnrollments(data);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).get(`/users/${data.id}/enrollments`).reply(500);

      try {
        await usersManager.getEnrollments(data);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should include the token in the authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/users/${data.id}/enrollments`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, []);

      await usersManager.getEnrollments(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#regenerateRecoveryCode', () => {
    const data = {
      id: 'USER_ID',
    };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).post(`/users/${data.id}/recovery-code-regeneration`).reply(200, {});
    });

    it('should validate empty id', () => {
      expect(usersManager.regenerateRecoveryCode({} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
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
        .reply(200, {});

      await usersManager.regenerateRecoveryCode(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#invalidateRememberBrowser', () => {
    const data = {
      id: 'USER_ID',
    };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL)
        .post(`/users/${data.id}/multifactor/actions/invalidate-remember-browser`)
        .reply(204);
    });

    it('should validate empty id', () => {
      expect(usersManager.invalidateRememberBrowser({} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
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
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).get(`/users/${data.id}/roles`).reply(200, []);
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
        .reply(200, []);

      await usersManager.getRoles(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#assignRoles', () => {
    const data = {
      id: 'user_id',
    };
    const body = { roles: ['role1', 'role2', 'role3'] };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).post(`/users/${data.id}/roles`).reply(200);
    });

    it('should validate empty id', () => {
      expect(usersManager.assignRoles({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.assignRoles(data, {} as any)).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${data.id}/roles`).reply(500);

      try {
        usersManager.assignRoles(data, {} as any);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a POST request to /api/v2/users/user_id/roles', async () => {
      await usersManager.assignRoles(data, {} as any);
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

      await usersManager.assignRoles(data, {} as any);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#removeRoles', () => {
    const data = {
      id: 'user_id',
    };
    const body = { roles: ['role1', 'role2', 'role3'] };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).delete(`/users/${data.id}/roles`, {}).reply(200);
    });

    it('should validate empty id', () => {
      expect(usersManager.deleteRoles({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.deleteRoles(data, {} as any)).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${data.id}/roles`).reply(500);

      try {
        await usersManager.deleteRoles(data, {} as any);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a DELETE request to /api/v2/users/user_id/roles', async () => {
      await usersManager.deleteRoles(data, {} as any);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).delete(`/users/${data.id}/roles`, body).reply(200);

      await usersManager.deleteRoles(data, body);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/users/${data.id}/roles`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.deleteRoles(data, {} as any);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getPermissions', () => {
    const data = {
      id: 'user_id',
    };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).get(`/users/${data.id}/permissions`).reply(200, []);
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
        .reply(200, []);

      await usersManager.getPermissions(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#assignPermissions', () => {
    const data = {
      id: 'user_id',
    };
    const body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).post(`/users/${data.id}/permissions`).reply(200, 'Test');
    });

    it('should validate empty id', () => {
      expect(usersManager.assignPermissions({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.assignPermissions(data, {} as any)).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${data.id}/permissions`).reply(500);

      try {
        await usersManager.assignPermissions(data, {} as any);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a POST request to /api/v2/users/user_id/permissions', async () => {
      await usersManager.assignPermissions(data, {} as any);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${data.id}/permissions`, { permissions: [body] })
        .reply(200, 'Test');

      await usersManager.assignPermissions(data, { permissions: [body] });
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/users/${data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, 'Test');

      await usersManager.assignPermissions(data, {} as any);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#removePermissions', () => {
    const data = {
      id: 'user_id',
    };
    const body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).delete(`/users/${data.id}/permissions`, {}).reply(200);
    });

    it('should validate empty id', () => {
      expect(usersManager.deletePermissions({} as any, {} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.deletePermissions(data, {} as any)).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${data.id}/permissions`).reply(500);

      try {
        await usersManager.deletePermissions(data, {} as any);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a DELETE request to /api/v2/users/user_id/permissions', async () => {
      await usersManager.deletePermissions(data, {} as any);
      expect(scope.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async () => {
      nock.cleanAll();

      const request = nock(API_URL).delete(`/users/${data.id}/permissions`, body).reply(200);

      await usersManager.deletePermissions(data, body as any);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/users/${data.id}/permissions`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.deletePermissions(data, {} as any);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#deleteAllAuthenticators', () => {
    const params = {
      id: '123',
    };
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).delete(`/users/${params.id}/authenticators`).reply(200);
    });

    it('should validate empty id', async () => {
      await expect(usersManager.deleteAllAuthenticators({} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.id was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', () => {
      expect(usersManager.deleteAllAuthenticators(params)).instanceOf(Promise);
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock.cleanAll();

      nock(API_URL).post(`/users/${params.id}/authenticators`).reply(500);

      try {
        await usersManager.deleteAllAuthenticators(params);
      } catch (err) {
        expect(err).to.exist;
      }
    });

    it('should perform a DELETE request to /api/v2/users/user_id/authenticators', async () => {
      await usersManager.deleteAllAuthenticators(params);
      expect(scope.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/users/${params.id}/authenticators`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      await usersManager.deleteAllAuthenticators(params);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getUserOrganizations', () => {
    const data = {
      id: 'user_id',
    };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).get(`/users/${data.id}/organizations`).reply(200, []);
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
        .reply(200, []);

      await usersManager.getUserOrganizations(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getAuthenticationMethods', () => {
    const params = {
      id: 'user_id',
    };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).get(`/users/${params.id}/authentication-methods`).reply(200, []);
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
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL)
        .get(`/users/${params.id}/authentication-methods/${params.authentication_method_id}`)
        .reply(200, {});
    });

    it('should perform a GET request to /api/v2/users/{user}/authentication-methods/{authentication_method_id}', async () => {
      await usersManager.getAuthenticationMethod(params);
      expect(scope.isDone()).to.be.true;
    });
  });

  describe('#createAuthenticationMethod', () => {
    const params = {
      id: 'user_id',
    };
    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).post(`/users/${params.id}/authentication-methods`).reply(200, {});
    });

    it('should perform a POST request to /api/v2/users/{id}/authentication-methods', async () => {
      await usersManager.createAuthenticationMethod(params, {} as any);
      expect(scope.isDone()).to.be.true;
    });
  });

  describe('#updateAuthenticationMethods', () => {
    const params = {
      id: 'user_id',
    };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL).put(`/users/${params.id}/authentication-methods`).reply(200, {});
    });

    it('should perform a PUT request to /api/v2/users/{user}/authentication-methods', async () => {
      await usersManager.updateAuthenticationMethods(params, {} as any);
      expect(scope.isDone()).to.be.true;
    });
  });

  describe('#updateAuthenticationMethodById', () => {
    const params = {
      id: 'user_id',
      authentication_method_id: 'authentication_method_id',
    };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL)
        .patch(`/users/${params.id}/authentication-methods/${params.authentication_method_id}`)
        .reply(200, {});
    });

    it('should perform a PATCH request to /api/v2/users/{user}/authentication-methods/{authentication_method_id}', async () => {
      await usersManager.updateAuthenticationMethod(params, {});
      expect(scope.isDone()).to.be.true;
    });
  });

  describe('#deleteAuthenticationMethodById', () => {
    const params = {
      id: 'user_id',
      authentication_method_id: 'authentication_method_id',
    };

    let scope: nock.Scope;

    beforeEach(() => {
      scope = nock(API_URL)
        .delete(`/users/${params.id}/authentication-methods/${params.authentication_method_id}`)
        .reply(200);
    });

    it('should perform a DELETE request to /api/v2/users/{user}/authentication-methods/{authentication_method_id}', async () => {
      await usersManager.deleteAuthenticationMethod(params);
      expect(scope.isDone()).to.be.true;
    });
  });
});
