import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { HookCreateTriggerIdEnum, HooksManager } from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('HooksManager', () => {
  let hooks: HooksManager;
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    hooks = client.hooks;
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new HooksManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new HooksManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;
    const response = [
      {
        triggerId: 'abc',
        id: '00001',
        name: 'hook',
        enabled: true,
        script:
          'module.exports = function(client, scope, audience, context, cb) cb(null, access_token); };',
        dependencies: {},
      },
    ];

    beforeEach(function () {
      request = nock(API_URL).get('/hooks').reply(200, response);
    });

    it('should return a promise if no callback is given', function (done) {
      hooks.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/hooks').reply(500, {});

      hooks.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      hooks.getAll().then((credentials) => {
        expect(credentials.data).to.be.an.instanceOf(Array);

        expect(credentials.data.length).to.equal(response.length);

        expect(credentials.data[0].id).to.equal(response[0].id);
        expect(credentials.data[0].triggerId).to.equal(response[0].triggerId);
        expect(credentials.data[0].name).to.equal(response[0].name);
        expect(credentials.data[0].enabled).to.equal(response[0].enabled);
        expect(credentials.data[0].script).to.equal(response[0].script);

        done();
      });
    });

    it('should perform a GET request to /api/v2/hooks', function (done) {
      hooks.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/hooks')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      hooks.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const params = {
        fields: 'test',
      };
      const request = nock(API_URL).get('/hooks').query(params).reply(200, []);

      hooks.getAll(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', () => {
    const response = {
      id: '5',
      name: 'Test hook',
      triggerId: 'abc',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      dependencies: {},
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/hooks/${response.id}`).reply(200, response);
    });

    it('should return a promise if no callback is given', function (done) {
      hooks.get({ id: response.id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/hooks/5', function (done) {
      hooks.get({ id: response.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/hooks/${response.id}`).reply(500, {});

      hooks.get({ id: response.id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      hooks.get({ id: response.id }).then((hook) => {
        expect(hook.data.id).to.equal(response.id);
        expect(hook.data.triggerId).to.equal(response.triggerId);
        expect(hook.data.name).to.equal(response.name);
        expect(hook.data.enabled).to.equal(response.enabled);
        expect(hook.data.script).to.equal(response.script);

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/hooks/${response.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      hooks.get({ id: response.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      name: 'Test hook',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      triggerId: HookCreateTriggerIdEnum.credentials_exchange,
      dependencies: {},
    };

    const response = {
      id: '5',
      name: 'Test hook',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      triggerId: HookCreateTriggerIdEnum.credentials_exchange,
      dependencies: {},
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/hooks', data).reply(200, response);
    });

    it('should return a promise if no callback is given', function (done) {
      hooks.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/hooks').reply(500, {});

      hooks.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/hooks', function (done) {
      hooks.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      hooks.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      hooks.create(data).then((hook) => {
        expect(hook.data.id).to.equal(response.id);
        expect(hook.data.triggerId).to.equal(response.triggerId);
        expect(hook.data.name).to.equal(response.name);
        expect(hook.data.enabled).to.equal(response.enabled);
        expect(hook.data.script).to.equal(response.script);

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/hooks')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      hooks.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    const id = '5';
    let request: nock.Scope;

    const data = {
      name: 'Test hook',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      triggerId: HookCreateTriggerIdEnum.credentials_exchange,
      dependencies: {},
    };

    const response = {
      id: '5',
      name: 'Test hook',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      triggerId: HookCreateTriggerIdEnum.credentials_exchange,
      dependencies: {},
    };

    beforeEach(function () {
      request = nock(API_URL).patch(`/hooks/${id}`, data).reply(200, response);
    });

    it('should return a promise if no callback is given', function (done) {
      hooks.update({ id }, data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/hooks/5', function (done) {
      hooks.update({ id }, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      hooks.update({ id }, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      hooks.update({ id }, data).then((hook) => {
        expect(hook.data.id).to.equal(response.id);
        expect(hook.data.triggerId).to.equal(response.triggerId);
        expect(hook.data.name).to.equal(response.name);
        expect(hook.data.enabled).to.equal(response.enabled);
        expect(hook.data.script).to.equal(response.script);

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/hooks/${id}`).reply(500, {});

      hooks.update({ id }, data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/hooks/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', function (done) {
      hooks.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /hooks/${id}`, function (done) {
      hooks.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/hooks/${id}`).reply(500, {});

      hooks.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/hooks/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      hooks.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getSecrets', () => {
    const data = {
      id: 'hook_id',
    };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/hooks/${data.id}/secrets`).reply(200, {});
    });

    it('should return a promise when no callback is given', function (done) {
      hooks.getSecrets(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/hooks/hook_id/secrets', function (done) {
      hooks.getSecrets(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/hooks/${data.id}/secrets`).reply(500, {});

      hooks.getSecrets(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/hooks/${data.id}/secrets`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      hooks.getSecrets(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addSecrets', () => {
    const data = {
      id: 'hook_id',
    };
    const body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post(`/hooks/${data.id}/secrets`).reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      hooks.addSecrets(data, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/hooks/${data.id}/secrets`).reply(500, {});

      hooks.addSecrets(data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/hooks/hook_id/secrets', function (done) {
      hooks.addSecrets(data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(`/hooks/${data.id}/secrets`, body).reply(200, {});

      hooks.addSecrets(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/hooks/${data.id}/secrets`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      hooks.addSecrets(data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateSecrets', () => {
    const data = {
      id: 'hook_id',
    };

    const body = { DB_PASSWORD: 'abcd1234', APITOKEN: 'foosecret' };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).patch(`/hooks/${data.id}/secrets`).reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      hooks.updateSecrets(data, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/hooks/${data.id}/secrets`).reply(500, {});

      hooks.updateSecrets(data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/hooks/hook_id/secrets', function (done) {
      hooks.updateSecrets(data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/hooks/${data.id}/secrets`, body).reply(200, {});

      hooks.updateSecrets(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/hooks/${data.id}/secrets`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      hooks.updateSecrets(data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removeSecrets', () => {
    const data = {
      id: 'hook_id',
    };
    const body = ['DB_PASS'];
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/hooks/${data.id}/secrets`).reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      hooks.deleteSecrets(data, body).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/hooks/${data.id}/secrets`).reply(500, {});

      hooks.deleteSecrets(data, body).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/hooks/hook_id/secrets', function (done) {
      hooks.deleteSecrets(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).delete(`/hooks/${data.id}/secrets`, body).reply(200, {});

      hooks.deleteSecrets(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/hooks/${data.id}/secrets`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      hooks.deleteSecrets(data, body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
