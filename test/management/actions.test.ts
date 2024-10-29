import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  ActionsManager,
  PatchActionRequest,
  PatchBindingsRequest,
  PostActionRequest,
  ManagementClient,
  GetActions200ResponseActionsInnerSupportedTriggersInnerIdAnyOf,
} from '../../src/index.js';

describe('ActionsManager', () => {
  let actions: ActionsManager;
  let token: string;

  beforeAll(() => {
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
      it(`should have a ${method} method`, () => {
        expect((actions as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ActionsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ActionsManager({
          baseUrl: '',
        } as any);
      }).toThrowError(Error);
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

      beforeEach(() => {
        request = nock(API_URL).get('/actions/actions').reply(200, data);
      });

      it('should return a promise if no callback is given', (done) => {
        actions.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get('/actions/actions').reply(500, {});

        actions.getAll().catch((err) => {
          expect(err).toBeDefined();
          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get('/actions/actions').reply(200, { actions: data });

        actions.getAll().then((credentials) => {
          expect(credentials.data.actions).toBeInstanceOf(Array);

          expect(credentials.data.actions?.length).toBe(data.length);

          expect(credentials.data.actions?.[0].id).toBe(data[0].id);
          expect(credentials.data.actions?.[0].name).toBe(data[0].name);
          expect(credentials.data.actions?.[0].supported_triggers?.length).toBe(
            data[0].supported_triggers.length
          );
          expect(credentials.data.actions?.[0].supported_triggers?.[0].id).toBe(
            data[0].supported_triggers[0].id
          );
          expect(credentials.data.actions?.[0].supported_triggers?.[0].version).toBe(
            data[0].supported_triggers[0].version
          );
          expect(credentials.data.actions?.[0].supported_triggers?.[0].status).toBe(
            data[0].supported_triggers[0].status
          );
          expect(credentials.data.actions?.[0].supported_triggers?.[0].runtimes?.[0]).toBe(
            data[0].supported_triggers[0].runtimes[0]
          );
          expect(credentials.data.actions?.[0].code).toBe(data[0].code);
          expect(credentials.data.actions?.[0].dependencies?.[0].name).toBe(
            data[0].dependencies[0].name
          );
          expect(credentials.data.actions?.[0].runtime).toBe(data[0].runtime);
          expect(credentials.data.actions?.[0].secrets?.[0].name).toBe(data[0].secrets[0].name);
          expect(credentials.data.actions?.[0].secrets?.[0].updated_at).toBe(
            data[0].secrets[0].updated_at
          );
          expect(credentials.data.actions?.[0].installed_integration_id).toBe(
            data[0].installed_integration_id
          );
          expect(credentials.data.actions?.[0].integration?.id).toBe(data[0].integration.id);
          expect(credentials.data.actions?.[0].all_changes_deployed).toBe(
            data[0].all_changes_deployed
          );

          done();
        });
      });

      it('should perform a GET request', (done) => {
        actions.getAll().then(() => {
          expect(request.isDone()).toBe(true);
          done();
        });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .get('/actions/actions')
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.getAll().then(() => {
          expect(request.isDone()).toBe(true);
          done();
        });
      });

      it('should pass the parameters in the query-string', (done) => {
        nock.cleanAll();

        const params = {
          triggerId: GetActions200ResponseActionsInnerSupportedTriggersInnerIdAnyOf.post_login,
          actionName: 'test',
        };
        const request = nock(API_URL).get('/actions/actions').query(params).reply(200, {});

        actions.getAll(params).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });

    describe('#get', () => {
      const data = {
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
      beforeEach(() => {
        request = nock(API_URL).get(`/actions/actions/${data.id}`).reply(200, data);
      });

      it('should return a promise if no callback is given', (done) => {
        actions
          .get({ id: data.id as string })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', (done) => {
        actions.get({ id: data.id as string }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${data.id}`).reply(500, {});

        actions.get({ id: data.id as string }).catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${data.id}`).reply(200, data);

        actions.get({ id: data.id as string }).then((credentials) => {
          expect(credentials.data.id).toBe(data.id);
          expect(credentials.data.name).toBe(data.name);
          expect(credentials.data.supported_triggers?.length).toBe(data.supported_triggers?.length);
          expect(credentials.data.supported_triggers?.[0].id).toBe(data.supported_triggers?.[0].id);
          expect(credentials.data.supported_triggers?.[0].version).toBe(
            data.supported_triggers?.[0].version
          );
          expect(credentials.data.supported_triggers?.[0].status).toBe(
            data.supported_triggers?.[0].status
          );
          expect(credentials.data.supported_triggers?.[0].runtimes?.[0]).toBe(
            data.supported_triggers?.[0].runtimes?.[0]
          );
          expect(credentials.data.code).toBe(data.code);
          expect(credentials.data.dependencies?.[0].name).toBe(data.dependencies?.[0].name);
          expect(credentials.data.runtime).toBe(data.runtime);
          expect(credentials.data.secrets?.[0].name).toBe(data.secrets?.[0].name);
          expect(credentials.data.secrets?.[0].updated_at).toBe(data.secrets?.[0].updated_at);
          expect(credentials.data.installed_integration_id).toBe(data.installed_integration_id);
          expect(credentials.data.integration?.id).toBe(data.integration?.id);
          expect(credentials.data.all_changes_deployed).toBe(data.all_changes_deployed);

          done();
        });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${data.id}`)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.get({ id: data.id as string }).then(() => {
          expect(request.isDone()).toBe(true);

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
            id: GetActions200ResponseActionsInnerSupportedTriggersInnerIdAnyOf.post_login,
            version: 'v1',
            status: 'pending',
            runtimes: ['node12'],
          },
        ],
        runtime: 'node12',
        secrets: [{ name: 'secret1' }],
      };

      beforeEach(() => {
        request = nock(API_URL).post('/actions/actions').reply(201, data);
      });

      it('should return a promise if no callback is given', (done) => {
        actions.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).post('/actions/actions/').reply(500, {});

        actions.create(data).catch((err) => {
          expect(err).toBeDefined();
          done();
        });
      });

      it('should perform a POST request', (done) => {
        actions.create(data).then(() => {
          expect(request.isDone()).toBe(true);
          done();
        });
      });

      it('should pass the data in the body of the request', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .post('/actions/actions', data as any)
          .reply(200, {});

        actions.create(data).then(() => {
          expect(request.isDone()).toBe(true);
          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        actions.create(data).then((action) => {
          expect(action.data.name).toBe(data.name);
          expect(action.data.code).toBe(data.code);
          expect(action.data.dependencies?.[0].name).toBe(data.dependencies?.[0].name);
          expect(action.data.dependencies?.[0].version).toBe(data.dependencies?.[0].version);
          expect(action.data.supported_triggers?.[0].id).toBe(data.supported_triggers[0].id);
          expect(action.data.supported_triggers?.[0].version).toBe(
            data.supported_triggers[0].version
          );
          expect(action.data.supported_triggers?.[0].status).toBe(
            data.supported_triggers[0].status
          );
          expect(action.data.supported_triggers?.[0].runtimes?.[0]).toBe(
            data.supported_triggers[0].runtimes?.[0]
          );
          expect(action.data.runtime).toBe(data.runtime);
          expect(action.data.secrets?.[0].name).toBe(data.secrets?.[0].name);

          done();
        });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .post('/actions/actions')
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.create(data).then(() => {
          expect(request.isDone()).toBe(true);

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
            id: GetActions200ResponseActionsInnerSupportedTriggersInnerIdAnyOf.post_login,
            version: 'v1',
            status: 'pending',
            runtimes: ['node12'],
          },
        ],
        runtime: 'node12',
        secrets: [{ name: 'secret1' }],
      };
      beforeEach(() => {
        request = nock(API_URL)
          .patch(`/actions/actions/${id}`, data as any)
          .reply(200, data);
      });

      it('should return a promise if no callback is given', (done) => {
        actions.update({ id }, data).then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should perform a PATCH request', (done) => {
        actions.update({ id }, data).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should include the new data in the body of the request', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(`/actions/actions/${id}`, data as any)
          .reply(200, {});

        actions.update({ id }, data).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        actions.update({ id }, data).then((action) => {
          expect(action.data.name).toBe(data.name);
          expect(action.data.code).toBe(data.code);
          expect(action.data.dependencies?.[0].name).toBe(data.dependencies?.[0].name);
          expect(action.data.dependencies?.[0].version).toBe(data.dependencies?.[0].version);
          expect(action.data.supported_triggers?.[0].id).toBe(data.supported_triggers?.[0].id);
          expect(action.data.supported_triggers?.[0].version).toBe(
            data.supported_triggers?.[0].version
          );
          expect(action.data.supported_triggers?.[0].status).toBe(
            data.supported_triggers?.[0].status
          );
          expect(action.data.supported_triggers?.[0].runtimes?.[0]).toBe(
            data.supported_triggers?.[0].runtimes?.[0]
          );
          expect(action.data.runtime).toBe(data.runtime);
          expect(action.data.secrets?.[0].name).toBe(data.secrets?.[0].name);

          done();
        });
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).patch(`/actions/actions/${id}`).reply(500, {});

        actions.update({ id }, data).catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });
    });

    describe('#deploy', () => {
      const action_id = 'action-id-1';

      beforeEach(() => {
        request = nock(API_URL).post(`/actions/actions/${action_id}/deploy`).reply(200, {});
      });

      it('should return a promise when no callback is given', (done) => {
        actions.deploy({ id: action_id }).then(done.bind(null, null));
      });

      it(`should perform a post request`, (done) => {
        actions.deploy({ id: action_id }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).post(`/actions/actions/${action_id}/deploy`).reply(500, {});

        actions.deploy({ id: action_id }).catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });

      it('should include the token in the authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/deploy`)
          .matchHeader('authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.deploy({ id: action_id }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });

    describe('#test', () => {
      const action_id = 'action-id-1';
      const payload = { event: {} };

      beforeEach(() => {
        request = nock(API_URL).post(`/actions/actions/${action_id}/test`).reply(200, {});
      });

      it('should return a promise when no callback is given', (done) => {
        actions.test({ id: action_id }, { payload }).then(done.bind(null, null));
      });

      it(`should perform a post request${action_id}`, (done) => {
        actions.test({ id: action_id }, { payload }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).post(`/actions/actions/${action_id}/test`).reply(500, {});

        actions.test({ id: action_id }, { payload }).catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });

      it('should include the token in the authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/test`)
          .matchHeader('authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.test({ id: action_id }, { payload }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });

    describe('#delete', () => {
      const action_id = 'action-id-1';

      beforeEach(() => {
        request = nock(API_URL).delete(`/actions/actions/${action_id}`).reply(200, {});
      });

      it('should return a promise when no callback is given', (done) => {
        actions.delete({ id: action_id }).then(done.bind(null, null));
      });

      it(`should perform a delete request${action_id}`, (done) => {
        actions.delete({ id: action_id }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).delete(`/actions/actions/${action_id}`).reply(500, {});

        actions.delete({ id: action_id }).catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });

      it('should include the token in the authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .delete(`/actions/actions/${action_id}`)
          .matchHeader('authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.delete({ id: action_id }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });
  });

  describe('action versions', () => {
    describe('#getVersions', () => {
      const actionId = '123';
      const id = '0d565aa1-d8ce-4802-83e7-82e3d2040222';
      const data = [
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

      beforeEach(() => {
        nock.cleanAll();

        request = nock(API_URL).get(`/actions/actions/${actionId}/versions`).reply(200, data);
      });

      it('should return a promise if no callback is given', (done) => {
        actions.getVersions({ actionId }).then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should perform a GET request', (done) => {
        actions.getVersions({ actionId }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${actionId}/versions`).reply(500, {});

        actions.getVersions({ actionId }).catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${actionId}/versions`).reply(200, { versions: data });

        actions.getVersions({ actionId }).then((versions) => {
          expect(versions.data.versions).toBeInstanceOf(Array);

          expect(versions.data.versions?.length).toBe(data.length);

          expect(versions.data.versions?.[0].id).toBe(data[0].id);
          expect(versions.data.versions?.[0].action_id).toBe(data[0].action_id);
          expect(versions.data.versions?.[0].supported_triggers?.length).toBe(
            data[0].supported_triggers?.length
          );
          expect(versions.data.versions?.[0].supported_triggers?.[0].id).toBe(
            data[0].supported_triggers?.[0].id
          );
          expect(versions.data.versions?.[0].supported_triggers?.[0].version).toBe(
            data[0].supported_triggers?.[0].version
          );
          expect(versions.data.versions?.[0].supported_triggers?.[0].status).toBe(
            data[0].supported_triggers?.[0].status
          );
          expect(versions.data.versions?.[0].supported_triggers?.[0].runtimes?.[0]).toBe(
            data[0].supported_triggers?.[0].runtimes?.[0]
          );
          expect(versions.data.versions?.[0].code).toBe(data[0].code);
          expect(versions.data.versions?.[0].dependencies?.[0].name).toBe(
            data[0].dependencies?.[0].name
          );
          expect(versions.data.versions?.[0].runtime).toBe(data[0].runtime);
          expect(versions.data.versions?.[0].secrets?.[0].name).toBe(data[0].secrets?.[0].name);

          done();
        });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${actionId}/versions`)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.getVersions({ actionId }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });

    describe('#getVersion', () => {
      const actionId = '0d565aa1-d8ce-4802-83e7-82e3d2040222';
      const id = '7asd8sd9-d8ce-4802-83e7-82e3d2040222';
      const data = {
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

      beforeEach(() => {
        nock.cleanAll();

        request = nock(API_URL).get(`/actions/actions/${actionId}/versions/${id}`).reply(200, data);
      });

      it('should return a promise if no callback is given', (done) => {
        actions
          .getVersion({ actionId, id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', (done) => {
        actions.getVersion({ actionId, id }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${actionId}/versions/${id}`).reply(500, {});

        actions.getVersion({ actionId, id }).catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${actionId}/versions/${id}`).reply(200, data);

        actions.getVersion({ actionId, id }).then((version) => {
          expect(version.data.id).toBe(data.id);
          expect(version.data.action_id).toBe(data.action_id);
          expect(version.data.supported_triggers?.length).toBe(data.supported_triggers?.length);
          expect(version.data.supported_triggers?.[0].id).toBe(data.supported_triggers?.[0].id);
          expect(version.data.supported_triggers?.[0].version).toBe(
            data.supported_triggers?.[0].version
          );
          expect(version.data.supported_triggers?.[0].status).toBe(
            data.supported_triggers?.[0].status
          );
          expect(version.data.supported_triggers?.[0].runtimes?.[0]).toBe(
            data.supported_triggers?.[0].runtimes?.[0]
          );
          expect(version.data.code).toBe(data.code);
          expect(version.data.dependencies?.[0].name).toBe(data.dependencies?.[0].name);
          expect(version.data.runtime).toBe(data.runtime);
          expect(version.data.secrets?.[0].name).toBe(data.secrets?.[0].name);

          done();
        });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${actionId}/versions/${id}`)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, data);

        actions.getVersion({ actionId, id }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });

    describe('#deployVersion', () => {
      const action_id = 'action-id-1';
      const version_id = 'action-version-id-1';
      let request: nock.Scope;

      beforeEach(() => {
        request = nock(API_URL)
          .post(`/actions/actions/${action_id}/versions/${version_id}/deploy`)
          .reply(200, {});
      });

      it('should return a promise when no callback is given', (done) => {
        actions
          .deployVersion({ actionId: action_id, id: version_id }, {})
          .then(done.bind(null, null));
      });

      it('should perform a post request', (done) => {
        actions
          .deployVersion({ actionId: action_id, id: version_id }, { update_draft: true })
          .then(() => {
            expect(request.isDone()).toBe(true);

            done();
          });
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL)
          .post(`/actions/actions/${action_id}/versions/${version_id}/deploy`)
          .reply(500, {});

        actions.deployVersion({ actionId: action_id, id: version_id }, {}).catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });

      it('should include the token in the authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/versions/${version_id}/deploy`)
          .matchHeader('authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.deployVersion({ actionId: action_id, id: version_id }, {}).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });
  });

  describe('executions', () => {
    let data: any = {
      id: '0d565aa1-d8ce-4802-83e7',
      trigger_id: 'credentials-exchange',
      status: 'final',
      results: [{ action_name: 'test_action' }],
    };
    let request: nock.Scope;

    describe('#getExecution', () => {
      beforeEach(() => {
        data = {
          id: '0d565aa1-d8ce-4802-83e7',
        };

        request = nock(API_URL).get(`/actions/executions/${data.id}`).reply(200, data);
      });

      it('should return a promise if no callback is given', (done) => {
        actions
          .getExecution({ id: data.id as string })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', (done) => {
        actions
          .getExecution({ id: data.id as string })
          .then(() => {
            expect(request.isDone()).toBe(true);

            done();
          })
          .catch((err) => {
            console.log(err);
          });
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get(`/actions/executions/${data.id}`).reply(500, {});

        actions.getExecution({ id: data.id as string }).catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get(`/actions/executions/${data.id}`).reply(200, data);

        actions.getExecution({ id: data.id as string }).then((execution) => {
          expect(execution.data.id).toBe(data.id);
          expect(execution.data.trigger_id).toBe(data.trigger_id);
          expect(execution.data.status).toBe(data.status);
          expect(execution.data.results?.[0].action_name).toBe(data.results?.[0].action_name);

          done();
        });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/executions/${data.id}`)
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.getExecution({ id: data.id as string }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });
    });
  });

  describe('triggers', () => {
    let request: nock.Scope;

    describe('#getAllTriggers', () => {
      const data = [
        {
          id: 'post-login',
          version: 'v1',
          status: 'building',
          runtimes: ['node12'],
          default_runtime: 'node12',
        },
      ];
      beforeEach(() => {
        request = nock(API_URL).get('/actions/triggers').reply(200, { triggers: data });
      });

      it('should return a promise if no callback is given', (done) => {
        actions.getAllTriggers().then(done.bind(null, null)).catch(done.bind(null, null));
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get('/actions/triggers').reply(500, {});

        actions.getAllTriggers().catch((err) => {
          expect(err).toBeDefined();
          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        nock.cleanAll();

        nock(API_URL).get('/actions/triggers').reply(200, { triggers: data });

        actions.getAllTriggers().then((triggers) => {
          expect(triggers.data.triggers).toBeInstanceOf(Array);

          expect(triggers.data.triggers?.length).toBe(data.length);

          expect(triggers.data.triggers?.[0].id).toBe(data[0].id);
          expect(triggers.data.triggers?.[0].version).toBe(data[0].version);
          expect(triggers.data.triggers?.[0].status).toBe(data[0].status);
          expect(triggers.data.triggers?.[0].runtimes?.[0]).toBe(data[0].runtimes?.[0]);
          expect(triggers.data.triggers?.[0].default_runtime).toBe(data[0].default_runtime);

          done();
        });
      });

      it('should perform a GET request', (done) => {
        actions.getAllTriggers().then(() => {
          expect(request.isDone()).toBe(true);
          done();
        });
      });

      it('should include the token in the Authorization header', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .get('/actions/triggers')
          .matchHeader('Authorization', `Bearer ${token}`)
          .reply(200, {});

        actions.getAllTriggers().then(() => {
          expect(request.isDone()).toBe(true);
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

      beforeEach(() => {
        nock(API_URL).patch(`/actions/triggers/${trigger_id}/bindings`).reply(200, response);
      });

      it('should return a promise if no callback is given', (done) => {
        actions
          .updateTriggerBindings({ triggerId: trigger_id }, data)
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a PATCH request', (done) => {
        actions.updateTriggerBindings({ triggerId: trigger_id }, data).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should include the new data in the body of the request', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .patch(`/actions/triggers/${trigger_id}/bindings`, data as any)
          .reply(200, {});

        actions.updateTriggerBindings({ triggerId: trigger_id }, data).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        actions.updateTriggerBindings({ triggerId: trigger_id }, data).then((binding) => {
          expect(binding.data.bindings?.[0].id).toBe(response.bindings[0].id);
          expect(binding.data.bindings?.[0].trigger_id).toBe(response.bindings[0].trigger_id);
          expect(binding.data.bindings?.[0].display_name).toBe(response.bindings[0].display_name);
          expect(binding.data.bindings?.[0].action?.id).toBe(response.bindings[0].action.id);
          expect(binding.data.bindings?.[0].action?.name).toBe(response.bindings[0].action.name);
          done();
        });
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).patch(`/actions/triggers/${trigger_id}/bindings`).reply(500, {});

        actions.updateTriggerBindings({ triggerId: trigger_id }, data).catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });
    });

    describe('#getTriggerBindings', () => {
      const trigger_id = 'post-login';
      const data = [
        {
          id: '123',
          trigger_id: 'post-user-registration',
          display_name: 'test',
          action: {
            id: 'action-id',
            name: 'test action',
          },
        },
      ];
      let request: nock.Scope;

      beforeEach(() => {
        request = nock(API_URL)
          .get(`/actions/triggers/${trigger_id}/bindings`)
          .reply(200, { bindings: data });
      });

      it('should return a promise if no callback is given', (done) => {
        actions
          .getTriggerBindings({ triggerId: trigger_id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', (done) => {
        actions.getTriggerBindings({ triggerId: trigger_id }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should include the new data in the body of the request', (done) => {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/triggers/${trigger_id}/bindings`)
          .reply(200, {});

        actions.getTriggerBindings({ triggerId: trigger_id }).then(() => {
          expect(request.isDone()).toBe(true);

          done();
        });
      });

      it('should pass the body of the response to the "then" handler', (done) => {
        actions.getTriggerBindings({ triggerId: trigger_id }).then((bindings) => {
          expect(bindings.data.bindings?.[0].id).toBe(data[0].id);

          expect(bindings.data.bindings?.[0].trigger_id).toBe(data[0].trigger_id);
          expect(bindings.data.bindings?.[0].display_name).toBe(data[0].display_name);
          expect(bindings.data.bindings?.[0].action?.id).toBe(data[0].action?.id);
          expect(bindings.data.bindings?.[0].action?.name).toBe(data[0].action?.name);
          done();
        });
      });

      it('should pass any errors to the promise catch handler', (done) => {
        nock.cleanAll();

        nock(API_URL).patch(`/actions/triggers/${trigger_id}/bindings`).reply(500, {});

        actions.getTriggerBindings({ triggerId: trigger_id }).catch((err) => {
          expect(err).toBeDefined();

          done();
        });
      });
    });
  });
});
