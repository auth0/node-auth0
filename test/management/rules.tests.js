const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const RulesManager = require(`../../src/management/RulesManager`);
const { ArgumentError } = require('rest-facade');

describe('RulesManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.rules = new RulesManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['get', 'getAll', 'create', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.rules[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new RulesManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new RulesManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new RulesManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/rules').reply(200);
    });

    it('should accept a callback', function (done) {
      this.rules.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.rules.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/rules').reply(500);

      this.rules.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async function () {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/rules').reply(200, data);

      const credentials = await this.rules.getAll();
      expect(credentials).to.be.an.instanceOf(Array);

      expect(credentials.length).to.equal(data.length);

      expect(credentials[0].test).to.equal(data[0].test);
    });

    it('should perform a GET request to /api/v2/rules', async function () {
      const { request } = this;

      await this.rules.getAll();
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/rules')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.rules.getAll();
      expect(request.isDone()).to.be.true;
    });

    it('should pass the parameters in the query-string', async function () {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };
      const request = nock(API_URL).get('/rules').query(params).reply(200);

      await this.rules.getAll(params);
      expect(request.isDone()).to.be.true;
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

      this.request = nock(API_URL).get(`/rules/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      const params = { id: this.data.id };

      this.rules.get(params, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.rules.get({ id: this.data.id }).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/rules/5', async function () {
      const { request } = this;

      await this.rules.get({ id: this.data.id });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/rules/${this.data.id}`).reply(500);

      this.rules.get({ id: this.data.id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/rules/${this.data.id}`)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.rules.get({ id: this.data.id });
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

    beforeEach(function () {
      this.request = nock(API_URL).post('/rules').reply(200);
    });

    it('should accept a callback', function (done) {
      this.rules.create(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.rules.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/rules').reply(500);

      this.rules.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/rules', async function () {
      const { request } = this;

      await this.rules.create(data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL).post('/rules', data).reply(200);

      await this.rules.create(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/rules')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.rules.create(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#update', () => {
    beforeEach(function () {
      this.data = { id: 5 };

      this.request = nock(API_URL).patch(`/rules/${this.data.id}`).reply(200, this.data);
    });

    it('should accept a callback', function (done) {
      this.rules.update({ id: 5 }, {}, done.bind(null, null));
    });

    it('should return a promise if no callback is given', function (done) {
      this.rules.update({ id: 5 }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/rules/5', async function () {
      const { request } = this;

      await this.rules.update({ id: 5 }, {});
      expect(request.isDone()).to.be.true;
    });

    it('should include the new data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/rules/${this.data.id}`, this.data).reply(200);

      await this.rules.update({ id: 5 }, this.data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/rules/${this.data.id}`).reply(500);

      this.rules.update({ id: this.data.id }, this.data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = 5;

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/rules/${id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.rules.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function () {
      expect(this.rules.delete({ id })).instanceOf(Promise);
    });

    it(`should perform a delete request to /rules/${id}`, async function () {
      const { request } = this;

      await this.rules.delete({ id });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/rules/${id}`).reply(500);

      this.rules.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/rules/${id}`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.rules.delete({ id });
      expect(request.isDone()).to.be.true;
    });
  });
});
