import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  ActionsManager,
  GetActionVersionRequest,
  GetActions200ResponseActionsInner,
  GetActions200ResponseActionsInnerSupportedTriggersInnerIdEnum,
  GetActionsTriggerIdEnum,
  GetBindings200ResponseBindingsInner,
  GetExecution200Response,
  PatchActionOperationRequest,
  PatchBindingsRequest,
} from '../../src/management/__generated/index';
import { ManagementApiError, ManagementClient } from '../../src/management';

const { expect } = chai;
describe('ActionsManager', () => {
  let actions: ActionsManager;
  let token: string;

  before(function () {
    token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    actions = client.actions;
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
        expect((actions as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ActionsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ActionsManager({
          baseUrl: '',
        } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#actions', () => {
    let request: nock.Scope;

    describe('#getAll', () => {
      beforeEach(function () {
        request = nock(API_URL)
          .get('/actions/actions')
          .reply(200, [{ test: true }]);
      });

      it('should return a promise if no callback is given', function (done) {
        actions.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get('/actions/actions').reply(500);

        actions.getAll().catch((err) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        nock.cleanAll();

        const data = { actions: [{ id: '123' }] };
        nock(API_URL).get('/actions/actions').reply(200, data);

        actions.getAll().then((credentials) => {
          expect(credentials.data.actions).to.be.an.instanceOf(Array);

          expect(credentials.data.actions?.length).to.equal(data.actions.length);

          expect(credentials.data.actions?.[0].id).to.equal(data.actions[0].id);

          done();
        });
      });

      it('should perform a GET request', function (done) {
        actions.getAll().then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get('/actions/actions')
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.getAll().then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });

      it('should pass the parameters in the query-string', function (done) {
        nock.cleanAll();

        const params = {
          triggerId: GetActionsTriggerIdEnum.post_login,
          actionName: 'test',
        };
        const request = nock(API_URL).get('/actions/actions').query(params).reply(200, {});

        actions.getAll(params).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#get', () => {
      let data: GetActions200ResponseActionsInner;
      beforeEach(function () {
        data = {
          id: '0d565aa1-d8ce-4802-83e7-82e3d2040222',
          name: 'Test Action',
          supported_triggers: [
            {
              id: 'post-login',
              version: 'v1',
            },
          ],
          created_at: '2020-07-29T19:45:15.725999098Z',
          updated_at: '2020-07-29T19:45:15.725999098Z',
        };

        request = nock(API_URL).get(`/actions/actions/${data.id}`).reply(200, data);
      });

      it('should return a promise if no callback is given', function (done) {
        actions
          .get({ id: data.id as string })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        actions.get({ id: data.id as string }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${data.id}`).reply(500);

        actions.get({ id: data.id as string }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${data.id}`)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.get({ id: data.id as string }).then(() => {
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
            id: GetActions200ResponseActionsInnerSupportedTriggersInnerIdEnum.post_login,
            version: 'v1',
          },
        ],
      };

      beforeEach(function () {
        request = nock(API_URL).post('/actions/actions').reply(201, {});
      });

      it('should return a promise if no callback is given', function (done) {
        actions.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).post('/actions/actions/').reply(500);

        actions.create(data).catch((err) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should perform a POST request', function (done) {
        actions.create(data).then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });

      it('should pass the data in the body of the request', function (done) {
        nock.cleanAll();

        const request = nock(API_URL).post('/actions/actions', data).reply(200, {});

        actions.create(data).then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post('/actions/actions')
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.create(data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#update', () => {
      let data: PatchActionOperationRequest;
      beforeEach(function () {
        data = { id: 'ACTION_ID' };

        request = nock(API_URL)
          .patch(`/actions/actions/${data.id}`, { name: 'my-new-action-name' })
          .reply(200, data);
      });

      it('should return a promise if no callback is given', function (done) {
        actions
          .update({ id: 'ACTION_ID' }, { name: 'my-new-action-name' })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a PATCH request', function (done) {
        actions.update({ id: 'ACTION_ID' }, { name: 'my-new-action-name' }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the new data in the body of the request', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(`/actions/actions/${data.id}`, { name: 'my-new-action-name' })
          .reply(200, {});

        actions.update({ id: 'ACTION_ID' }, { name: 'my-new-action-name' }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).patch(`/actions/actions/${data.id}`).reply(500);

        actions.update({ id: data.id }, { name: 'my-new-action-name' }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });
    });

    describe('#deploy', () => {
      const action_id = 'action-id-1';

      beforeEach(function () {
        request = nock(API_URL).post(`/actions/actions/${action_id}/deploy`).reply(200, {});
      });

      it('should return a promise when no callback is given', function (done) {
        actions.deploy({ id: action_id }).then(done.bind(null, null));
      });

      it(`should perform a post request`, function (done) {
        actions.deploy({ id: action_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).post(`/actions/actions/${action_id}/deploy`).reply(500);

        actions.deploy({ id: action_id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/deploy`)
          .matchHeader('authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.deploy({ id: action_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#test', () => {
      const action_id = 'action-id-1';
      const payload = { event: {} };

      beforeEach(function () {
        request = nock(API_URL).post(`/actions/actions/${action_id}/test`).reply(200, {});
      });

      it('should return a promise when no callback is given', function (done) {
        actions.test({ id: action_id }, { payload }).then(done.bind(null, null));
      });

      it(`should perform a post request${action_id}`, function (done) {
        actions.test({ id: action_id }, { payload }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).post(`/actions/actions/${action_id}/test`).reply(500);

        actions.test({ id: action_id }, { payload }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/test`)
          .matchHeader('authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.test({ id: action_id }, { payload }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#delete', () => {
      const action_id = 'action-id-1';

      beforeEach(function () {
        request = nock(API_URL).delete(`/actions/actions/${action_id}`).reply(200);
      });

      it('should return a promise when no callback is given', function (done) {
        actions.delete({ id: action_id }).then(done.bind(null, null));
      });

      it(`should perform a delete request${action_id}`, function (done) {
        actions.delete({ id: action_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).delete(`/actions/actions/${action_id}`).reply(500);

        actions.delete({ id: action_id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .delete(`/actions/actions/${action_id}`)
          .matchHeader('authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.delete({ id: action_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });
  });

  describe('action versions', () => {
    describe('#getVersions', () => {
      let data: GetActionVersionRequest;
      let request: nock.Scope;

      beforeEach(function () {
        nock.cleanAll();

        data = {
          id: '0d565aa1-d8ce-4802-83e7-82e3d2040222',
          actionId: '123',
        };

        request = nock(API_URL).get(`/actions/actions/${data.id}/versions`).reply(200, data);
      });

      it('should return a promise if no callback is given', function (done) {
        actions
          .getVersion({ actionId: data.id, id: '123' })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        actions.getVersions({ actionId: data.id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${data.id}/versions`).reply(500);

        actions.getVersions({ actionId: data.id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${data.id}/versions`)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.getVersions({ actionId: data.id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#getVersion', () => {
      let data: GetActionVersionRequest;
      let request: nock.Scope;

      beforeEach(function () {
        nock.cleanAll();

        data = {
          actionId: '0d565aa1-d8ce-4802-83e7-82e3d2040222',
          id: '7asd8sd9-d8ce-4802-83e7-82e3d2040222',
        };

        request = nock(API_URL)
          .get(`/actions/actions/${data.actionId}/versions/${data.id}`)
          .reply(200, data);
      });

      it('should return a promise if no callback is given', function (done) {
        actions
          .getVersion({ actionId: data.actionId, id: data.id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        actions.getVersion({ actionId: data.actionId, id: data.id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${data.actionId}/versions/${data.id}`).reply(500);

        actions.getVersion({ actionId: data.actionId, id: data.id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${data.actionId}/versions/${data.id}`)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.getVersion({ actionId: data.actionId, id: data.id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#deployVersion', () => {
      const action_id = 'action-id-1';
      const version_id = 'action-version-id-1';
      let request: nock.Scope;

      beforeEach(function () {
        request = nock(API_URL)
          .post(`/actions/actions/${action_id}/versions/${version_id}/deploy`)
          .reply(200, {});
      });

      it('should return a promise when no callback is given', function (done) {
        actions
          .deployVersion({ actionId: action_id, id: version_id }, {})
          .then(done.bind(null, null));
      });

      it('should perform a post request', function (done) {
        actions
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

        actions.deployVersion({ actionId: action_id, id: version_id }, {}).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/versions/${version_id}/deploy`)
          .matchHeader('authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.deployVersion({ actionId: action_id, id: version_id }, {}).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });
  });

  describe('executions', () => {
    let data: GetExecution200Response;
    let request: nock.Scope;

    describe('#getExecution', () => {
      beforeEach(function () {
        data = {
          id: '0d565aa1-d8ce-4802-83e7',
        };

        request = nock(API_URL).get(`/actions/executions/${data.id}`).reply(200, data);
      });

      it('should return a promise if no callback is given', function (done) {
        actions
          .getExecution({ id: data.id as string })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        actions
          .getExecution({ id: data.id as string })
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

        nock(API_URL).get(`/actions/executions/${data.id}`).reply(500);

        actions.getExecution({ id: data.id as string }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/executions/${data.id}`)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.getExecution({ id: data.id as string }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });
  });

  describe('triggers', () => {
    const params = { per_page: 2 };
    let request: nock.Scope;

    describe('#getAllTriggers', () => {
      beforeEach(function () {
        request = nock(API_URL).get('/actions/triggers').reply(200, {});
      });

      it('should return a promise if no callback is given', function (done) {
        actions.getAllTriggers().then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get('/actions/triggers').reply(500);

        actions.getAllTriggers().catch((err) => {
          expect(err).to.exist;
          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        nock.cleanAll();

        const data = { triggers: [{ id: 'trigger1' }] };
        nock(API_URL).get('/actions/triggers').reply(200, data);

        actions.getAllTriggers().then((triggers) => {
          expect(triggers.data.triggers).to.be.an.instanceOf(Array);

          expect(triggers.data.triggers?.length).to.equal(data.triggers.length);

          expect(triggers.data.triggers?.[0].id).to.equal(data.triggers[0].id);

          done();
        });
      });

      it('should perform a GET request', function (done) {
        actions.getAllTriggers().then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get('/actions/triggers')
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.getAllTriggers().then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });
    });

    describe('#updateTriggerBindings', () => {
      const trigger_id = 'post-login';
      let data: PatchBindingsRequest;

      beforeEach(function () {
        data = { bindings: [] };

        nock(API_URL).patch(`/actions/triggers/${trigger_id}/bindings`).reply(200, data);
      });

      it('should return a promise if no callback is given', function (done) {
        actions
          .updateTriggerBindings({ triggerId: trigger_id }, data)
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a PATCH request', function (done) {
        actions.updateTriggerBindings({ triggerId: trigger_id }, data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the new data in the body of the request', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(`/actions/triggers/${trigger_id}/bindings`)
          .reply(200, {});

        actions.updateTriggerBindings({ triggerId: trigger_id }, data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).patch(`/actions/triggers/${trigger_id}/bindings`).reply(500);

        actions.updateTriggerBindings({ triggerId: trigger_id }, data).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });
    });

    describe('#getTriggerBindings', () => {
      const trigger_id = 'post-login';
      let data: GetBindings200ResponseBindingsInner[];
      let request: nock.Scope;

      beforeEach(function () {
        data = [];

        request = nock(API_URL).get(`/actions/triggers/${trigger_id}/bindings`).reply(200, data);
      });

      it('should return a promise if no callback is given', function (done) {
        actions
          .getTriggerBindings({ triggerId: trigger_id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        actions.getTriggerBindings({ triggerId: trigger_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the new data in the body of the request', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/triggers/${trigger_id}/bindings`)
          .reply(200, {});

        actions.getTriggerBindings({ triggerId: trigger_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).patch(`/actions/triggers/${trigger_id}/bindings`).reply(500);

        actions.getTriggerBindings({ triggerId: trigger_id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });
    });
  });
});
