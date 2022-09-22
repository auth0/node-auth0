const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const ActionsManager = require(`../../src/management/ActionsManager`);
const { ArgumentError } = require('rest-facade');

describe('ActionsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.actions = new ActionsManager({
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
      'deploy',
      'test',
      'getVersions',
      'getVersion',
      'createVersion',
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
    it('should error when no options are provided', () => {
      expect(() => {
        new ActionsManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ActionsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ActionsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#actions', () => {
    describe('#getAll', () => {
      beforeEach(function () {
        this.request = nock(API_URL).get('/actions/actions').reply(200);
      });

      it('should accept a callback', function (done) {
        this.actions.getAll(() => {
          done();
        });
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
          expect(credentials).to.be.an.instanceOf(Array);

          expect(credentials.length).to.equal(data.length);

          expect(credentials[0].test).to.equal(data[0].test);

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
          .reply(200);

        this.actions.getAll().then(() => {
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
        const request = nock(API_URL).get('/actions/actions').query(params).reply(200);

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

      it('should accept a callback', function (done) {
        const params = { id: this.data.id };

        this.actions.get(params, done.bind(null, null));
      });

      it('should be backwards compatible with action_id', function (done) {
        const params = { action_id: this.data.id };

        this.actions.get(params, done.bind(null, null));
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

        nock(API_URL).get(`/actions/actions${this.data.id}`).reply(500);

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
          .reply(200);

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
        this.request = nock(API_URL).post('/actions/actions').reply(201);
      });

      it('should accept a callback', function (done) {
        this.actions.create(data, () => {
          done();
        });
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

        const request = nock(API_URL).post('/actions/actions', data).reply(200);

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
          .reply(200);

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

      it('should accept a callback', function (done) {
        this.actions.update(
          { id: 'ACTION_ID' },
          { name: 'my-new-action-name' },
          done.bind(null, null)
        );
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
          .reply(200);

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
        this.request = nock(API_URL).post(`/actions/actions/${action_id}/deploy`).reply(200);
      });

      it('should accept a callback', function (done) {
        this.actions.deploy({ action_id }, done.bind(null, null));
      });

      it('should return a promise when no callback is given', function (done) {
        this.actions.deploy({ action_id }).then(done.bind(null, null));
      });

      it(`should perform a post request${action_id}`, function (done) {
        const { request } = this;

        this.actions.deploy({ action_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).post(`/actions/actions/${action_id}/deploy`).reply(500);

        this.actions.deploy({ action_id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/deploy`)
          .matchHeader('authorization', `Bearer ${this.token}`)
          .reply(200);

        this.actions.deploy({ action_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#test', () => {
      const action_id = 'action-id-1';
      const payload = { event: {} };

      beforeEach(function () {
        this.request = nock(API_URL).post(`/actions/actions/${action_id}/test`).reply(200);
      });

      it('should accept a callback', function (done) {
        this.actions.test({ action_id }, { payload }, done.bind(null, null));
      });

      it('should return a promise when no callback is given', function (done) {
        this.actions.test({ action_id }, { payload }).then(done.bind(null, null));
      });

      it(`should perform a post request${action_id}`, function (done) {
        const { request } = this;

        this.actions.test({ action_id }, { payload }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).post(`/actions/actions/${action_id}/test`).reply(500);

        this.actions.test({ action_id }, { payload }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/test`)
          .matchHeader('authorization', `Bearer ${this.token}`)
          .reply(200);

        this.actions.test({ action_id }, { payload }).then(() => {
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

      it('should accept a callback', function (done) {
        this.actions.delete({ action_id }, done.bind(null, null));
      });

      it('should return a promise when no callback is given', function (done) {
        this.actions.delete({ action_id }).then(done.bind(null, null));
      });

      it(`should perform a delete request${action_id}`, function (done) {
        const { request } = this;

        this.actions.delete({ action_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).delete(`/actions/actions/${action_id}`).reply(500);

        this.actions.delete({ action_id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .delete(`/actions/actions/${action_id}`)
          .matchHeader('authorization', `Bearer ${this.token}`)
          .reply(200);

        this.actions.delete({ action_id }).then(() => {
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

      it('should accept a callback', function (done) {
        const params = { id: this.data.id };

        this.actions.getVersions(params, done.bind(null, null));
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .get({ id: this.data.id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        const { request } = this;

        this.actions.getVersions({ id: this.data.id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).get(`/actions/actions/${this.data.id}/versions`).reply(500);

        this.actions.getVersions({ id: this.data.id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/actions/${this.data.id}/versions`)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200);

        this.actions.getVersions({ id: this.data.id }).then(() => {
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

      it('should accept a callback', function (done) {
        const params = { id: this.data.id, version_id: this.data.versionId };

        this.actions.getVersion(params, done.bind(null, null));
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .get({ id: this.data.id, version_id: this.data.versionId })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        const { request } = this;

        this.actions.getVersion({ id: this.data.id, version_id: this.data.versionId }).then(() => {
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
          .getVersion({ id: this.data.id, version_id: this.data.versionId })
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
          .reply(200);

        this.actions.getVersion({ id: this.data.id, version_id: this.data.versionId }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });
    });

    describe('#createVersion', () => {
      beforeEach(function () {
        nock.cleanAll();

        this.data = {
          id: '0d565aa1-d8ce-4802-83e7-82e3d2040222',
        };

        this.request = nock(API_URL)
          .post(`/actions/actions/${this.data.id}/versions`)
          .reply(200, this.data);
      });

      it('should accept a callback', function (done) {
        const params = { id: this.data.id };

        this.actions.createVersion(params, this.data, done.bind(null, null));
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .createVersion({ id: this.data.id }, {})
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a POST request', function (done) {
        const { request } = this;

        this.actions.createVersion({ id: this.data.id }, {}).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).post(`/actions/actions/${this.data.id}/versions`).reply(500);

        this.actions.createVersion({ id: this.data.id }, {}).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${this.data.id}/versions`)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200);

        this.actions.createVersion({ id: this.data.id }, {}).then(() => {
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
          .reply(200);
      });

      it('should accept a callback', function (done) {
        this.actions.deployVersion({ action_id, version_id }, done.bind(null, null));
      });

      it('should return a promise when no callback is given', function (done) {
        this.actions.deployVersion({ action_id, version_id }).then(done.bind(null, null));
      });

      it('should perform a post request', function (done) {
        const { request } = this;

        this.actions.deployVersion({ action_id, version_id, update_draft: true }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL)
          .post(`/actions/actions/${action_id}/versions/${version_id}/deploy`)
          .reply(500);

        this.actions.deployVersion({ action_id, version_id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .post(`/actions/actions/${action_id}/deploy`)
          .matchHeader('authorization', `Bearer ${this.token}`)
          .reply(200);

        this.actions.deploy({ action_id }).then(() => {
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

        this.request = nock(API_URL).get(`/actions/executions/${this.data.id}`).reply(200);
      });

      it('should accept a callback', function (done) {
        const params = { execution_id: this.data.id };

        this.actions.getExecution(params, done.bind(null, null));
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .getExecution({ execution_id: this.data.id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        const { request } = this;

        this.actions
          .getExecution({ execution_id: this.data.id })
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

        this.actions.getExecution({ execution_id: this.data.id }).catch((err) => {
          expect(err).to.exist;

          done();
        });
      });

      it('should include the token in the Authorization header', function (done) {
        nock.cleanAll();

        const request = nock(API_URL)
          .get(`/actions/executions/${this.data.id}`)
          .matchHeader('Authorization', `Bearer ${this.token}`)
          .reply(200);

        this.actions.getExecution({ execution_id: this.data.id }).then(() => {
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
        this.request = nock(API_URL).get('/actions/triggers').reply(200);
      });

      it('should accept a callback', function (done) {
        this.actions.getAllTriggers(params, () => {
          done();
        });
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
          expect(triggers).to.be.an.instanceOf(Array);

          expect(triggers.length).to.equal(data.length);

          expect(triggers[0].trigger1).to.equal(data[0].trigger1);

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
          .reply(200);

        this.actions.getAllTriggers().then(() => {
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
        const request = nock(API_URL).get('/actions/triggers').query(params).reply(200);

        this.actions.getAllTriggers(params).then(() => {
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

      it('should accept a callback', function (done) {
        this.actions.updateTriggerBindings({ trigger_id }, this.data, done.bind(null, null));
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .updateTriggerBindings({ trigger_id }, this.data)
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a PATCH request', function (done) {
        const { request } = this;

        this.actions.updateTriggerBindings({ trigger_id }, this.data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the new data in the body of the request', function (done) {
        nock.cleanAll();

        const request = nock(API_URL).patch(`/actions/triggers/${trigger_id}/bindings`).reply(200);

        this.actions.updateTriggerBindings({ trigger_id }, this.data).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should pass any errors to the promise catch handler', function (done) {
        nock.cleanAll();

        nock(API_URL).patch(`/actions/triggers/${trigger_id}/bindings`).reply(500);

        this.actions.updateTriggerBindings({ trigger_id }, this.data).catch((err) => {
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

      it('should accept a callback', function (done) {
        this.actions.getTriggerBindings({ trigger_id }, done.bind(null, null));
      });

      it('should return a promise if no callback is given', function (done) {
        this.actions
          .getTriggerBindings({ trigger_id })
          .then(done.bind(null, null))
          .catch(done.bind(null, null));
      });

      it('should perform a GET request', function (done) {
        const { request } = this;

        this.actions.getTriggerBindings({ trigger_id }).then(() => {
          expect(request.isDone()).to.be.true;

          done();
        });
      });

      it('should include the new data in the body of the request', function (done) {
        nock.cleanAll();

        const request = nock(API_URL).get(`/actions/triggers/${trigger_id}/bindings`).reply(200);

        this.actions.getTriggerBindings({ trigger_id }).then(() => {
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
