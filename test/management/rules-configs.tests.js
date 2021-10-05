const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const RulesConfigsManager = require(`../../src/management/RulesConfigsManager`);
const { ArgumentError } = require('rest-facade');

describe('RulesConfigsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.rulesConfigs = new RulesConfigsManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['set', 'getAll', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.rulesConfigs[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new RulesConfigsManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new RulesConfigsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new RulesConfigsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    it('should accept a callback', function (done) {
      this.rulesConfigs.getAll(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.rulesConfigs.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/rules-configs').reply(500);

      this.rulesConfigs.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async function () {
      nock.cleanAll();

      const data = [{ key: 'dbconnectionstring' }];
      nock(API_URL).get('/rules-configs').reply(200, data);

      const rulesConfigs = await this.rulesConfigs.getAll();
      expect(rulesConfigs).to.be.an.instanceOf(Array);

      expect(rulesConfigs.length).to.equal(data.length);

      expect(rulesConfigs[0].key).to.equal(data[0].key);
    });

    it('should perform a GET request to rules-configs', async function () {
      nock.cleanAll();

      const request = nock(API_URL).get('/rules-configs').reply(200);

      await this.rulesConfigs.getAll();
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/rules-configs')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.rulesConfigs.getAll();
      expect(request.isDone()).to.be.true;
    });

    it('should pass the parameters in the query-string', async function () {
      nock.cleanAll();

      const params = {
        include_fields: true,
        fields: 'test',
      };
      const request = nock(API_URL).get('/rules-configs').query(params).reply(200);

      await this.rulesConfigs.getAll(params);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#set', () => {
    beforeEach(function () {
      this.data = { value: 'foobar' };
      this.params = { key: 'KEY' };
    });

    it('should accept a callback', function (done) {
      this.rulesConfigs.set(this.params, this.data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.rulesConfigs
        .set(this.params, this.data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).put(`/rules-configs/${this.params.key}`).reply(500);

      this.rulesConfigs.set(this.params, this.data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a PUT request to /rules-configs/{KEY}', async function () {
      nock.cleanAll();

      const request = nock(API_URL).put(`/rules-configs/${this.params.key}`, this.data).reply(200);

      await this.rulesConfigs.set(this.params, this.data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL).put(`/rules-configs/${this.params.key}`, this.data).reply(200);

      await this.rulesConfigs.set(this.params, this.data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .put(`/rules-configs/${this.params.key}`, this.data)
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.rulesConfigs.set(this.params, this.data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#delete', () => {
    const key = 'KEY';

    beforeEach(function () {
      this.request = nock(API_URL).delete(`/rules-configs/${key}`).reply(200);
    });

    it('should accept a callback', function (done) {
      this.rulesConfigs.delete({ key }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function () {
      expect(this.rulesConfigs.delete({ key })).instanceOf(Promise);
    });

    it(`should perform a delete request to /rules-configs/${key}`, async function () {
      const { request } = this;

      await this.rulesConfigs.delete({ key });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/rules-configs/${key}`).reply(500);

      this.rulesConfigs.delete({ key }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/rules-configs/${key}`)
        .matchHeader('authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.rulesConfigs.delete({ key });
      expect(request.isDone()).to.be.true;
    });
  });
});
