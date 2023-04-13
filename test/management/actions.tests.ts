import chai from 'chai';
import nock from 'nock';
import fetch, { RequestInfo as NFRequestInfo, RequestInit as NFRequestInit } from 'node-fetch';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { ActionsManager, Configuration } from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;
describe('ActionsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: this.token,
    });
    this.actions = client.actions;
  });

  describe('instance', () => {
    const methods = [
      'get',
      'getAll',
      'create',
      'update',
      'delete',
      'deploy',
      'test',
      'getVersions',
      'getVersion',
      'deployVersion',
      'getAllTriggers',
      'getTriggerBindings',
      'updateTriggerBindings',
    ];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.actions[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ActionsManager(
          new Configuration({
            fetchApi: (url: RequestInfo, init: RequestInit) => {
              return fetch(
                url as NFRequestInfo,
                init as NFRequestInit
              ) as unknown as Promise<Response>;
            },
            middleware: [],
          } as any)
        );
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ActionsManager(
          new Configuration({
            baseUrl: '',
            fetchApi: (url: RequestInfo, init: RequestInit) => {
              return fetch(
                url as NFRequestInfo,
                init as NFRequestInit
              ) as unknown as Promise<Response>;
            },
            middleware: [],
          })
        );
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#actions', () => {
    describe('#getAll', () => {
      beforeEach(function () {
        this.request = nock(API_URL)
          .get('/actions/actions')
          .reply(200, [{ test: true }]);
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get('/actions/actions').reply(500);

        this.actions.getAll().catch((err) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        nock.cleanAll();

        const data = [{ test: true }];
        nock(API_URL).get('/actions/actions').reply(200, data);

        this.actions.getAll().then((credentials) => {
          expect(credentials.data).to.be.an.instanceOf(Array);

          expect(credentials.data.length).to.equal(data.length);

          expect(credentials.data[0].test).to.equal(data[0].test);

          done();
        });
      });

      it('should perform a GET request', function (done) {
        const { request } = this;
        this.actions.getAll().then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get('/actions/actions')
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200, {});

        this.actions.getAll().then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });

      it('should pass the parameters in the query-string', function (done) {
        nock.cleanAll();

        const params = {
          triggerId: 'post-login',
          actionName: 'test',
        };
        const request = nock(API_URL).get('/actions/actions').query(params).reply(200, {});

        this.actions.getAll(params).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#get', () => {
      beforeEach(function () {
        this.data = {
          id: '0d565aa1-d8ce-4802-83e7-82e3d2040222',
          name: 'Test Action',
          supported_triggers: [
            {
              id: 'post-login',
              version: 'v1',
            },
          ],
          required_configuration: [],
          required_secrets: [],
          created_at: '2020-07-29T19:45:15.725999098Z',
          updated_at: '2020-07-29T19:45:15.725999098Z',
        };

        this.request = nock(API_URL).get(`/actions/actions/${this.data.id}`).reply(200, this.data);
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .get({ id: this.data.id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        const { request } = this;

        this.actions.get({ id: this.data.id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${this.data.id}`).reply(500);

        this.actions.get({ id: this.data.id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${this.data.id}`)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200, {});

        this.actions.get({ id: this.data.id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#create', () => {
      const data = {
        name: 'my-action-13',
        supported_triggers: [
          {
            id: 'post-login',
            version: 'v1',
          },
        ],
      };

      beforeEach(function () {
        this.request = nock(API_URL).post('/actions/actions').reply(201, {});
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).post('/actions/actions/').reply(500);

        this.actions.create(data).catch((err) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should perform a POST request', function (done) {
        const { request } = this;

        this.actions.create(data).then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });

      it('should pass the data in the body of the request', function (done) {
        nock.cleanAll();

        const request = nock(API_URL).post('/actions/actions', data).reply(200, {});

        this.actions.create(data).then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post('/actions/actions')
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200, {});

        this.actions.create(data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#update', () => {
      beforeEach(function () {
        this.data = { id: 'ACTION_ID' };

        this.request = nock(API_URL)
          .patch(`/actions/actions/${this.data.id}`, { name: 'my-new-action-name' })
          .reply(200, this.data);
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .update({ id: 'ACTION_ID' }, { name: 'my-new-action-name' })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a PATCH request', function (done) {
        const { request } = this;

        this.actions.update({ id: 'ACTION_ID' }, { name: 'my-new-action-name' }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the new data in the body of the request', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(`/actions/actions/${this.data.id}`, { name: 'my-new-action-name' })
          .reply(200, {});

        this.actions.update({ id: 'ACTION_ID' }, { name: 'my-new-action-name' }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).patch(`/actions/actions/${this.data.id}`).reply(500);

        this.actions.update({ id: this.data.id }, { name: 'my-new-action-name' }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });
    });

    describe('#deploy', () => {
      const action_id = 'action-id-1';

      beforeEach(function () {
        this.request = nock(API_URL).post(`/actions/actions/${action_id}/deploy`).reply(200, {});
      });

      it('should return a promise when no callback is given', function (done) {
        this.actions.deploy({ id: action_id }).then(done.bind(null, null));
      });

      it(`should perform a post request`, function (done) {
        const { request } = this;

        this.actions.deploy({ id: action_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).post(`/actions/actions/${action_id}/deploy`).reply(500);

        this.actions.deploy({ id: action_id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/deploy`)
          .matchHeader('authorization', `Bearer ${this.token}`)
          .reply(200, {});

        this.actions.deploy({ id: action_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#test', () => {
      const action_id = 'action-id-1';
      const payload = { event: {} };

      beforeEach(function () {
        this.request = nock(API_URL).post(`/actions/actions/${action_id}/test`).reply(200, {});
      });

      it('should return a promise when no callback is given', function (done) {
        this.actions.test({ id: action_id }, { payload }).then(done.bind(null, null));
      });

      it(`should perform a post request${action_id}`, function (done) {
        const { request } = this;

        this.actions.test({ id: action_id }, { payload }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).post(`/actions/actions/${action_id}/test`).reply(500);

        this.actions.test({ id: action_id }, { payload }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/test`)
          .matchHeader('authorization', `Bearer ${this.token}`)
          .reply(200, {});

        this.actions.test({ id: action_id }, { payload }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#delete', () => {
      const action_id = 'action-id-1';

      beforeEach(function () {
        this.request = nock(API_URL).delete(`/actions/actions/${action_id}`).reply(200);
      });

      it('should return a promise when no callback is given', function (done) {
        this.actions.delete({ id: action_id }).then(done.bind(null, null));
      });

      it(`should perform a delete request${action_id}`, function (done) {
        const { request } = this;

        this.actions.delete({ id: action_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).delete(`/actions/actions/${action_id}`).reply(500);

        this.actions.delete({ id: action_id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .delete(`/actions/actions/${action_id}`)
          .matchHeader('authorization', `Bearer ${this.token}`)
          .reply(200, {});

        this.actions.delete({ id: action_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });
  });

  describe('action versions', () => {
    describe('#getVersions', () => {
      beforeEach(function () {
        nock.cleanAll();

        this.data = {
          id: '0d565aa1-d8ce-4802-83e7-82e3d2040222',
        };

        this.request = nock(API_URL)
          .get(`/actions/actions/${this.data.id}/versions`)
          .reply(200, this.data);
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .getVersion({ actionId: this.data.id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        const { request } = this;

        this.actions.getVersions({ actionId: this.data.id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${this.data.id}/versions`).reply(500);

        this.actions.getVersions({ actionId: this.data.id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${this.data.id}/versions`)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200, {});

        this.actions.getVersions({ actionId: this.data.id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#getVersion', () => {
      beforeEach(function () {
        nock.cleanAll();

        this.data = {
          id: '0d565aa1-d8ce-4802-83e7-82e3d2040222',
          versionId: '7asd8sd9-d8ce-4802-83e7-82e3d2040222',
        };

        this.request = nock(API_URL)
          .get(`/actions/actions/${this.data.id}/versions/${this.data.versionId}`)
          .reply(200, this.data);
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .get({ id: this.data.id, version_id: this.data.versionId })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        const { request } = this;

        this.actions.getVersion({ actionId: this.data.id, id: this.data.versionId }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL)
          .get(`/actions/actions/${this.data.id}/versions/${this.data.versionId}`)
          .reply(500);

        this.actions
          .getVersion({ actionId: this.data.id, id: this.data.versionId })
          .catch((err) => {
            expect(err).to.exist;

            done();
          });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${this.data.id}/versions/${this.data.versionId}`)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200, {});

        this.actions.getVersion({ actionId: this.data.id, id: this.data.versionId }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#deployVersion', () => {
      const action_id = 'action-id-1';
      const version_id = 'action-version-id-1';

      beforeEach(function () {
        this.request = nock(API_URL)
          .post(`/actions/actions/${action_id}/versions/${version_id}/deploy`)
          .reply(200, {});
      });

      it('should return a promise when no callback is given', function (done) {
        this.actions
          .deployVersion({ actionId: action_id, id: version_id })
          .then(done.bind(null, null));
      });

      it('should perform a post request', function (done) {
        const { request } = this;

        this.actions
          .deployVersion({ actionId: action_id, id: version_id }, { update_draft: true })
          .then(() => {
            expect(request.isDone()).to.be.true;

            done();
          });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL)
          .post(`/actions/actions/${action_id}/versions/${version_id}/deploy`)
          .reply(500);

        this.actions.deployVersion({ actionId: action_id, id: version_id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/versions/${version_id}/deploy`)
          .matchHeader('authorization', `Bearer ${this.token}`)
          .reply(200, {});

        this.actions.deployVersion({ actionId: action_id, id: version_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });
  });

  describe('executions', () => {
    describe('#getExecution', () => {
      beforeEach(function () {
        this.data = {
          id: '0d565aa1-d8ce-4802-83e7',
          name: 'Execution',
        };

        this.request = nock(API_URL)
          .get(`/actions/executions/${this.data.id}`)
          .reply(200, this.data);
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .getExecution({ id: this.data.id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        const { request } = this;

        this.actions
          .getExecution({ id: this.data.id })
          .then(() => {
            expect(request.isDone()).to.be.true;

            done();
          })
          .catch((err) => {
            console.log(err);
          });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/executions/${this.data.id}`).reply(500);

        this.actions.getExecution({ id: this.data.id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/executions/${this.data.id}`)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200, {});

        this.actions.getExecution({ id: this.data.id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });
  });

  describe('triggers', () => {
    const params = { per_page: 2 };
    describe('#getAllTriggers', () => {
      beforeEach(function () {
        this.request = nock(API_URL).get('/actions/triggers').reply(200, {});
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions.getAllTriggers().then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get('/actions/triggers').reply(500);

        this.actions.getAllTriggers().catch((err) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        nock.cleanAll();

        const data = [{ trigger1: 'rigger1' }];
        nock(API_URL).get('/actions/triggers').reply(200, data);

        this.actions.getAllTriggers().then((triggers) => {
          expect(triggers.data).to.be.an.instanceOf(Array);

          expect(triggers.data.length).to.equal(data.length);

          expect(triggers.data[0].trigger1).to.equal(data[0].trigger1);

          done();
        });
      });

      it('should perform a GET request', function (done) {
        const { request } = this;

        this.actions.getAllTriggers().then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get('/actions/triggers')
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200, {});

        this.actions.getAllTriggers().then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });
    });

    describe('#updateTriggerBindings', () => {
      const trigger_id = 'post-login';

      beforeEach(function () {
        this.data = { bindings: [] };

        this.request = nock(API_URL)
          .patch(`/actions/triggers/${trigger_id}/bindings`)
          .reply(200, this.data);
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .updateTriggerBindings({ triggerId: trigger_id }, this.data)
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a PATCH request', function (done) {
        const { request } = this;

        this.actions.updateTriggerBindings({ triggerId: trigger_id }, this.data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the new data in the body of the request', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(`/actions/triggers/${trigger_id}/bindings`)
          .reply(200, {});

        this.actions.updateTriggerBindings({ triggerId: trigger_id }, this.data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).patch(`/actions/triggers/${trigger_id}/bindings`).reply(500);

        this.actions.updateTriggerBindings({ triggerId: trigger_id }, this.data).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });
    });

    describe('#getTriggerBindings', () => {
      const trigger_id = 'post-login';

      beforeEach(function () {
        this.data = { bindings: {} };

        this.request = nock(API_URL)
          .get(`/actions/triggers/${trigger_id}/bindings`)
          .reply(200, this.data);
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .getTriggerBindings({ triggerId: trigger_id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        const { request } = this;

        this.actions.getTriggerBindings({ triggerId: trigger_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the new data in the body of the request', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/triggers/${trigger_id}/bindings`)
          .reply(200, {});

        this.actions.getTriggerBindings({ triggerId: trigger_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).patch(`/actions/triggers/${trigger_id}/bindings`).reply(500);

        this.actions.getTriggerBindings({ trigger_id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });
    });
  });
});
