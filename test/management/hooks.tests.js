const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const HookManager = require(`../../src/management/HooksManager`);
const { ArgumentError } = require('rest-facade');

describe('HookManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.hooks = new HookManager({
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
      'getSecrets',
      'addSecrets',
      'updateSecrets',
      'removeSecrets',
    ];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.hooks[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new HookManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new HookManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new HookManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/hooks').reply(200);
    });

    it('should accept a callback', function (done) {
      this.hooks.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.hooks.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/hooks').reply(500);

      this.hooks.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/hooks').reply(200, data);

      this.hooks.getAll().then((credentials) => {
        expect(credentials).to.be.an.instanceOf(Array);

        expect(credentials.length).to.equal(data.length);

        expect(credentials[0].test).to.equal(data[0].test);

        done();
      });
    });

    it('should perform a GET request to /api/v2/hooks', function (done) {
      const { request } = this;

      this.hooks.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/hooks')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.hooks.getAll().then(() => {
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
      const request = nock(API_URL).get('/hooks').query(params).reply(200);

      this.hooks.getAll(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#get', () => {
    beforeEach(function () {
      this.data = {
        id: 5,
        name: 'Test hook',
        enabled: true,
        script: "function (user, contest, callback) { console.log('Test'); }",
        stage: 'login_success',
      };

      this.request = nock(API_URL).get(`/hooks/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      const params = { id: this.data.id };

      this.hooks.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.hooks.get({ id: this.data.id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/hooks/5', function (done) {
      const { request } = this;

      this.hooks.get({ id: this.data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/hooks/${this.data.id}`).reply(500);

      this.hooks.get({ id: this.data.id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/hooks/${this.data.id}`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.hooks.get({ id: this.data.id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      id: 5,
      name: 'Test hook',
      enabled: true,
      script: "function (user, contest, callback) { console.log('Test'); }",
      stage: 'login_success',
    };

    beforeEach(function () {
      this.request = nock(API_URL).post('/hooks').reply(200);
    });

    it('should accept a callback', function (done) {
      this.hooks.create(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.hooks.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/hooks').reply(500);

      this.hooks.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/hooks', function (done) {
      const { request } = this;

      this.hooks.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/hooks', data).reply(200);

      this.hooks.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/hooks')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.hooks.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    beforeEach(function () {
      this.data = { id: 5 };

      this.request = nock(API_URL).patch(`/hooks/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      this.hooks.update({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.hooks.update({ id: 5 }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/hooks/5', function (done) {
      const { request } = this;

      this.hooks.update({ id: 5 }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/hooks/${this.data.id}`, this.data).reply(200);

      this.hooks.update({ id: 5 }, this.data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/hooks/${this.data.id}`).reply(500);

      this.hooks.update({ id: this.data.id }, this.data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 5;

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/hooks/${id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.hooks.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.hooks.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /hooks/${id}`, function (done) {
      const { request } = this;

      this.hooks.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/hooks/${id}`).reply(500);

      this.hooks.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/hooks/${id}`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.hooks.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getSecrets', () => {
    const data = {
      id: 'hook_id',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get(`/hooks/${data.id}/secrets`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.hooks.getSecrets(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      this.hooks.getSecrets(data).then(done.bind(null, null));
    });

    it('should perform a GET request to /api/v2/hooks/hook_id/secrets', function (done) {
      const { request } = this;

      this.hooks.getSecrets(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/hooks/${data.id}/secrets`).reply(500);

      this.hooks.getSecrets(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/hooks/${data.id}/secrets`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      this.hooks.getSecrets(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#addSecrets', () => {
    beforeEach(function () {
      this.data = {
        id: 'hook_id',
      };
      this.body = { permission_name: 'My Permission', resource_server_identifier: 'test123' };

      this.request = nock(API_URL).post(`/hooks/${this.data.id}/secrets`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.hooks.addSecrets(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.hooks.addSecrets(this.data, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/hooks/${this.data.id}/secrets`).reply(500);

      this.hooks.addSecrets(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/hooks/hook_id/secrets', function (done) {
      const { request } = this;

      this.hooks.addSecrets(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post(`/hooks/${this.data.id}/secrets`, this.body).reply(200);

      this.hooks.addSecrets(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post(`/hooks/${this.data.id}/secrets`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.hooks.addSecrets(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateSecrets', () => {
    beforeEach(function () {
      this.data = {
        id: 'hook_id',
      };
      this.body = { DB_PASSWORD: 'abcd1234', APITOKEN: 'foosecret' };

      this.request = nock(API_URL).patch(`/hooks/${this.data.id}/secrets`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.hooks.updateSecrets(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.hooks
        .updateSecrets(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/hooks/${this.data.id}/secrets`).reply(500);

      this.hooks.updateSecrets(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/hooks/hook_id/secrets', function (done) {
      const { request } = this;

      this.hooks.updateSecrets(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/hooks/${this.data.id}/secrets`, this.body).reply(200);

      this.hooks.updateSecrets(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/hooks/${this.data.id}/secrets`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.hooks.updateSecrets(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#removeSecrets', () => {
    beforeEach(function () {
      this.data = {
        id: 'hook_id',
      };
      this.body = { DB_PASSWORD: 'abcd1234', APITOKEN: 'foosecret' };

      this.request = nock(API_URL).delete(`/hooks/${this.data.id}/secrets`, {}).reply(200);
    });

    it('should validate empty hookId', function () {
      const _this = this;
      expect(() => {
        _this.hooks.removeSecrets({ id: null }, _this.body, () => {});
      }).to.throw('The id passed in params cannot be null or undefined');
    });

    it('should validate non-string hookId', function () {
      const _this = this;
      expect(() => {
        _this.hooks.removeSecrets({ id: 123 }, _this.body, () => {});
      }).to.throw('The hook Id has to be a string');
    });

    it('should accept a callback', function (done) {
      this.hooks.removeSecrets(this.data, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.hooks
        .removeSecrets(this.data, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post(`/hooks/${this.data.id}/secrets`).reply(500);

      this.hooks.removeSecrets(this.data, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/hooks/hook_id/secrets', function (done) {
      this.hooks.removeSecrets(this.data, {}).then(() => {
        expect(this.request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).delete(`/hooks/${this.data.id}/secrets`, this.body).reply(200);

      this.hooks.removeSecrets(this.data, this.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/hooks/${this.data.id}/secrets`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.hooks.removeSecrets(this.data, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
