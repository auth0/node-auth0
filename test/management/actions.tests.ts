import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  ActionsManager,
  GetActionVersions200ResponseVersionsInner,
  GetActions200ResponseActionsInner,
  GetActions200ResponseActionsInnerSupportedTriggersInner,
  GetActions200ResponseActionsInnerSupportedTriggersInnerIdEnum,
  GetActionsTriggerIdEnum,
  GetBindings200ResponseBindingsInner,
  GetExecution200Response,
  PatchActionRequest,
  PatchBindingsRequest,
  PostActionRequest,
} from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

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
      const data = [
        {
          id: '1',
          name: 'tets action',
          code: 'code here',
          dependencies: [{ name: 'dep1', version: 'dep1_v1' }],
          supported_triggers: [
            { id: 'post-login', version: 'v1', status: 'pending', runtimes: ['node12'] },
          ],
          runtime: 'node12',
          secrets: [{ name: 'secret1', updated_at: new Date().toISOString() }],
          installed_integration_id: '1',
          integration: {
            id: '1',
          },
          status: 'building',
          all_changes_deployed: true,
        },
      ];

      beforeEach(function () {
        request = nock(API_URL).get('/actions/actions').reply(200, data);
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

        nock(API_URL).get('/actions/actions').reply(200, { actions: data });

        actions.getAll().then((credentials) => {
          expect(credentials.data.actions).to.be.an.instanceOf(Array);

          expect(credentials.data.actions?.length).to.equal(data.length);

          expect(credentials.data.actions?.[0].id).to.equal(data[0].id);
          expect(credentials.data.actions?.[0].name).to.equal(data[0].name);
          expect(credentials.data.actions?.[0].supported_triggers?.length).to.equal(
            data[0].supported_triggers.length
          );
          expect(credentials.data.actions?.[0].supported_triggers?.[0].id).to.equal(
            data[0].supported_triggers[0].id
          );
          expect(credentials.data.actions?.[0].supported_triggers?.[0].version).to.equal(
            data[0].supported_triggers[0].version
          );
          expect(credentials.data.actions?.[0].supported_triggers?.[0].status).to.equal(
            data[0].supported_triggers[0].status
          );
          expect(credentials.data.actions?.[0].supported_triggers?.[0].runtimes?.[0]).to.equal(
            data[0].supported_triggers[0].runtimes[0]
          );
          expect(credentials.data.actions?.[0].code).to.equal(data[0].code);
          expect(credentials.data.actions?.[0].dependencies?.[0].name).to.equal(
            data[0].dependencies[0].name
          );
          expect(credentials.data.actions?.[0].runtime).to.equal(data[0].runtime);
          expect(credentials.data.actions?.[0].secrets?.[0].name).to.equal(data[0].secrets[0].name);
          expect(credentials.data.actions?.[0].secrets?.[0].updated_at).to.equal(
            data[0].secrets[0].updated_at
          );
          expect(credentials.data.actions?.[0].installed_integration_id).to.equal(
            data[0].installed_integration_id
          );
          expect(credentials.data.actions?.[0].integration?.id).to.equal(data[0].integration.id);
          expect(credentials.data.actions?.[0].all_changes_deployed).to.equal(
            data[0].all_changes_deployed
          );

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
      const data: GetActions200ResponseActionsInner = {
        id: '0d565aa1-d8ce-4802-83e7-82e3d2040222',
        name: 'Test Action',
        code: 'code here',
        dependencies: [{ name: 'dep1', version: 'dep1_v1' }],
        supported_triggers: [
          { id: 'post-login', version: 'v1', status: 'pending', runtimes: ['node12'] },
        ],
        runtime: 'node12',
        secrets: [{ name: 'secret1', updated_at: new Date().toISOString() }],
        installed_integration_id: '1',
        integration: {
          id: '1',
        },
        status: 'building',
        all_changes_deployed: true,
        created_at: '2020-07-29T19:45:15.725999098Z',
        updated_at: '2020-07-29T19:45:15.725999098Z',
      };
      beforeEach(function () {
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

      it('should pass the body of the response to the "then" handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${data.id}`).reply(200, data);

        actions.get({ id: data.id as string }).then((credentials) => {
          expect(credentials.data.id).to.equal(data.id);
          expect(credentials.data.name).to.equal(data.name);
          expect(credentials.data.supported_triggers?.length).to.equal(
            data.supported_triggers?.length
          );
          expect(credentials.data.supported_triggers?.[0].id).to.equal(
            data.supported_triggers?.[0].id
          );
          expect(credentials.data.supported_triggers?.[0].version).to.equal(
            data.supported_triggers?.[0].version
          );
          expect(credentials.data.supported_triggers?.[0].status).to.equal(
            data.supported_triggers?.[0].status
          );
          expect(credentials.data.supported_triggers?.[0].runtimes?.[0]).to.equal(
            data.supported_triggers?.[0].runtimes?.[0]
          );
          expect(credentials.data.code).to.equal(data.code);
          expect(credentials.data.dependencies?.[0].name).to.equal(data.dependencies?.[0].name);
          expect(credentials.data.runtime).to.equal(data.runtime);
          expect(credentials.data.secrets?.[0].name).to.equal(data.secrets?.[0].name);
          expect(credentials.data.secrets?.[0].updated_at).to.equal(data.secrets?.[0].updated_at);
          expect(credentials.data.installed_integration_id).to.equal(data.installed_integration_id);
          expect(credentials.data.integration?.id).to.equal(data.integration?.id);
          expect(credentials.data.all_changes_deployed).to.equal(data.all_changes_deployed);

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
      const data: PostActionRequest = {
        name: 'Test Action',
        code: 'code here',
        dependencies: [{ name: 'dep1', version: 'dep1_v1' }],
        supported_triggers: [
          {
            id: GetActions200ResponseActionsInnerSupportedTriggersInnerIdEnum.post_login,
            version: 'v1',
            status: 'pending',
            runtimes: ['node12'],
          },
        ],
        runtime: 'node12',
        secrets: [{ name: 'secret1' }],
      };

      beforeEach(function () {
        request = nock(API_URL).post('/actions/actions').reply(201, data);
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

        const request = nock(API_URL)
          .post('/actions/actions', data as any)
          .reply(200, {});

        actions.create(data).then(() => {
          expect(request.isDone()).to.be.true;
          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        actions.create(data).then((action) => {
          expect(action.data.name).to.equal(data.name);
          expect(action.data.code).to.equal(data.code);
          expect(action.data.dependencies?.[0].name).to.equal(data.dependencies?.[0].name);
          expect(action.data.dependencies?.[0].version).to.equal(data.dependencies?.[0].version);
          expect(action.data.supported_triggers?.[0].id).to.equal(data.supported_triggers[0].id);
          expect(action.data.supported_triggers?.[0].version).to.equal(
            data.supported_triggers[0].version
          );
          expect(action.data.supported_triggers?.[0].status).to.equal(
            data.supported_triggers[0].status
          );
          expect(action.data.supported_triggers?.[0].runtimes?.[0]).to.equal(
            data.supported_triggers[0].runtimes?.[0]
          );
          expect(action.data.runtime).to.equal(data.runtime);
          expect(action.data.secrets?.[0].name).to.equal(data.secrets?.[0].name);

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
      const id = 'ACTION_ID';
      const data: PatchActionRequest = {
        name: 'Test Action',
        code: 'code here',
        dependencies: [{ name: 'dep1', version: 'dep1_v1' }],
        supported_triggers: [
          {
            id: GetActions200ResponseActionsInnerSupportedTriggersInnerIdEnum.post_login,
            version: 'v1',
            status: 'pending',
            runtimes: ['node12'],
          },
        ],
        runtime: 'node12',
        secrets: [{ name: 'secret1' }],
      };
      beforeEach(function () {
        request = nock(API_URL)
          .patch(`/actions/actions/${id}`, data as any)
          .reply(200, data);
      });

      it('should return a promise if no callback is given', function (done) {
        actions.update({ id }, data).then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should perform a PATCH request', function (done) {
        actions.update({ id }, data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the new data in the body of the request', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(`/actions/actions/${id}`, data as any)
          .reply(200, {});

        actions.update({ id }, data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        actions.update({ id }, data).then((action) => {
          expect(action.data.name).to.equal(data.name);
          expect(action.data.code).to.equal(data.code);
          expect(action.data.dependencies?.[0].name).to.equal(data.dependencies?.[0].name);
          expect(action.data.dependencies?.[0].version).to.equal(data.dependencies?.[0].version);
          expect(action.data.supported_triggers?.[0].id).to.equal(data.supported_triggers?.[0].id);
          expect(action.data.supported_triggers?.[0].version).to.equal(
            data.supported_triggers?.[0].version
          );
          expect(action.data.supported_triggers?.[0].status).to.equal(
            data.supported_triggers?.[0].status
          );
          expect(action.data.supported_triggers?.[0].runtimes?.[0]).to.equal(
            data.supported_triggers?.[0].runtimes?.[0]
          );
          expect(action.data.runtime).to.equal(data.runtime);
          expect(action.data.secrets?.[0].name).to.equal(data.secrets?.[0].name);

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).patch(`/actions/actions/${id}`).reply(500);

        actions.update({ id }, data).catch((err) => {
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
      const actionId = '123';
      const id = '0d565aa1-d8ce-4802-83e7-82e3d2040222';
      const data: GetActionVersions200ResponseVersionsInner[] = [
        {
          id: id,
          action_id: actionId,
          code: 'code here',
          dependencies: [{ name: 'dep1', version: 'dep1_v1' }],
          supported_triggers: [
            { id: 'post-login', version: 'v1', status: 'pending', runtimes: ['node12'] },
          ],
          runtime: 'node12',
          secrets: [{ name: 'secret1', updated_at: new Date().toISOString() }],
          deployed: true,
        },
      ];
      let request: nock.Scope;

      beforeEach(function () {
        nock.cleanAll();

        request = nock(API_URL).get(`/actions/actions/${actionId}/versions`).reply(200, data);
      });

      it('should return a promise if no callback is given', function (done) {
        actions.getVersions({ actionId }).then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        actions.getVersions({ actionId }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${actionId}/versions`).reply(500);

        actions.getVersions({ actionId }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${actionId}/versions`).reply(200, { versions: data });

        actions.getVersions({ actionId }).then((versions) => {
          expect(versions.data.versions).to.be.an.instanceOf(Array);

          expect(versions.data.versions?.length).to.equal(data.length);

          expect(versions.data.versions?.[0].id).to.equal(data[0].id);
          expect(versions.data.versions?.[0].action_id).to.equal(data[0].action_id);
          expect(versions.data.versions?.[0].supported_triggers?.length).to.equal(
            data[0].supported_triggers?.length
          );
          expect(versions.data.versions?.[0].supported_triggers?.[0].id).to.equal(
            data[0].supported_triggers?.[0].id
          );
          expect(versions.data.versions?.[0].supported_triggers?.[0].version).to.equal(
            data[0].supported_triggers?.[0].version
          );
          expect(versions.data.versions?.[0].supported_triggers?.[0].status).to.equal(
            data[0].supported_triggers?.[0].status
          );
          expect(versions.data.versions?.[0].supported_triggers?.[0].runtimes?.[0]).to.equal(
            data[0].supported_triggers?.[0].runtimes?.[0]
          );
          expect(versions.data.versions?.[0].code).to.equal(data[0].code);
          expect(versions.data.versions?.[0].dependencies?.[0].name).to.equal(
            data[0].dependencies?.[0].name
          );
          expect(versions.data.versions?.[0].runtime).to.equal(data[0].runtime);
          expect(versions.data.versions?.[0].secrets?.[0].name).to.equal(data[0].secrets?.[0].name);

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${actionId}/versions`)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.getVersions({ actionId }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#getVersion', () => {
      const actionId = '0d565aa1-d8ce-4802-83e7-82e3d2040222';
      const id = '7asd8sd9-d8ce-4802-83e7-82e3d2040222';
      const data: GetActionVersions200ResponseVersionsInner = {
        id: id,
        action_id: actionId,
        code: 'code here',
        dependencies: [{ name: 'dep1', version: 'dep1_v1' }],
        supported_triggers: [
          { id: 'post-login', version: 'v1', status: 'pending', runtimes: ['node12'] },
        ],
        runtime: 'node12',
        secrets: [{ name: 'secret1', updated_at: new Date().toISOString() }],
        deployed: true,
      };
      let request: nock.Scope;

      beforeEach(function () {
        nock.cleanAll();

        request = nock(API_URL).get(`/actions/actions/${actionId}/versions/${id}`).reply(200, data);
      });

      it('should return a promise if no callback is given', function (done) {
        actions
          .getVersion({ actionId, id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        actions.getVersion({ actionId, id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${actionId}/versions/${id}`).reply(500);

        actions.getVersion({ actionId, id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${actionId}/versions/${id}`).reply(200, data);

        actions.getVersion({ actionId, id }).then((version) => {
          expect(version.data.id).to.equal(data.id);
          expect(version.data.action_id).to.equal(data.action_id);
          expect(version.data.supported_triggers?.length).to.equal(data.supported_triggers?.length);
          expect(version.data.supported_triggers?.[0].id).to.equal(data.supported_triggers?.[0].id);
          expect(version.data.supported_triggers?.[0].version).to.equal(
            data.supported_triggers?.[0].version
          );
          expect(version.data.supported_triggers?.[0].status).to.equal(
            data.supported_triggers?.[0].status
          );
          expect(version.data.supported_triggers?.[0].runtimes?.[0]).to.equal(
            data.supported_triggers?.[0].runtimes?.[0]
          );
          expect(version.data.code).to.equal(data.code);
          expect(version.data.dependencies?.[0].name).to.equal(data.dependencies?.[0].name);
          expect(version.data.runtime).to.equal(data.runtime);
          expect(version.data.secrets?.[0].name).to.equal(data.secrets?.[0].name);

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${actionId}/versions/${id}`)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, data);

        actions.getVersion({ actionId, id }).then(() => {
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
    let data: GetExecution200Response = {
      id: '0d565aa1-d8ce-4802-83e7',
      trigger_id: 'credentials-exchange',
      status: 'final',
      results: [{ action_name: 'test_action' }],
    };
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

      it('should pass the body of the response to the "then" handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/executions/${data.id}`).reply(200, data);

        actions.getExecution({ id: data.id as string }).then((execution) => {
          expect(execution.data.id).to.equal(data.id);
          expect(execution.data.trigger_id).to.equal(data.trigger_id);
          expect(execution.data.status).to.equal(data.status);
          expect(execution.data.results?.[0].action_name).to.equal(data.results?.[0].action_name);

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
    let request: nock.Scope;

    describe('#getAllTriggers', () => {
      const data: GetActions200ResponseActionsInnerSupportedTriggersInner[] = [
        {
          id: 'post-login',
          version: 'v1',
          status: 'building',
          runtimes: ['node12'],
          default_runtime: 'node12',
        },
      ];
      beforeEach(function () {
        request = nock(API_URL).get('/actions/triggers').reply(200, { triggers: data });
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

        nock(API_URL).get('/actions/triggers').reply(200, { triggers: data });

        actions.getAllTriggers().then((triggers) => {
          expect(triggers.data.triggers).to.be.an.instanceOf(Array);

          expect(triggers.data.triggers?.length).to.equal(data.length);

          expect(triggers.data.triggers?.[0].id).to.equal(data[0].id);
          expect(triggers.data.triggers?.[0].version).to.equal(data[0].version);
          expect(triggers.data.triggers?.[0].status).to.equal(data[0].status);
          expect(triggers.data.triggers?.[0].runtimes?.[0]).to.equal(data[0].runtimes?.[0]);
          expect(triggers.data.triggers?.[0].default_runtime).to.equal(data[0].default_runtime);

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
      const data: PatchBindingsRequest = {
        bindings: [
          {
            ref: { type: 'action_id', value: '' },
            display_name: 'test',
            secrets: [{ name: 'test_secret', value: 'secret' }],
          },
        ],
      };
      const response = {
        bindings: [
          {
            id: '123',
            trigger_id: 'post-login',
            display_name: 'test trigger',
            action: { id: 'test-action', name: 'test action' },
          },
        ],
      };

      beforeEach(function () {
        nock(API_URL).patch(`/actions/triggers/${trigger_id}/bindings`).reply(200, response);
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
          .patch(`/actions/triggers/${trigger_id}/bindings`, data as any)
          .reply(200, {});

        actions.updateTriggerBindings({ triggerId: trigger_id }, data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', function (done) {
        actions.updateTriggerBindings({ triggerId: trigger_id }, data).then((binding) => {
          expect(binding.data.bindings?.[0].id).to.equal(response.bindings[0].id);
          expect(binding.data.bindings?.[0].trigger_id).to.equal(response.bindings[0].trigger_id);
          expect(binding.data.bindings?.[0].display_name).to.equal(
            response.bindings[0].display_name
          );
          expect(binding.data.bindings?.[0].action?.id).to.equal(response.bindings[0].action.id);
          expect(binding.data.bindings?.[0].action?.name).to.equal(
            response.bindings[0].action.name
          );
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
      const data: GetBindings200ResponseBindingsInner[] = [
        {
          id: '123',
          trigger_id: 'iga-approval',
          display_name: 'test',
          action: { id: 'action-id', name: 'test action' },
        },
      ];
      let request: nock.Scope;

      beforeEach(function () {
        request = nock(API_URL)
          .get(`/actions/triggers/${trigger_id}/bindings`)
          .reply(200, { bindings: data });
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

      it('should pass the body of the response to the "then" handler', function (done) {
        actions.getTriggerBindings({ triggerId: trigger_id }).then((bindings) => {
          expect(bindings.data.bindings?.[0].id).to.equal(data[0].id);

          expect(bindings.data.bindings?.[0].trigger_id).to.equal(data[0].trigger_id);
          expect(bindings.data.bindings?.[0].display_name).to.equal(data[0].display_name);
          expect(bindings.data.bindings?.[0].action?.id).to.equal(data[0].action?.id);
          expect(bindings.data.bindings?.[0].action?.name).to.equal(data[0].action?.name);
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
