const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenants.auth0.com';

const TenantManager = require(`../../src/management/TenantManager`);
const { ArgumentError } = require('rest-facade');

describe('TenantManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.tenant = new TenantManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['updateSettings', 'getSettings'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.tenant[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new TenantManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new TenantManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new TenantManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getSettings', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/tenants/settings').reply(200);
    });

    it('should accept a callback', function (done) {
      this.tenant.getSettings(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.tenant.getSettings().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/tenants/settings').reply(500);

      this.tenant.getSettings().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async function () {
      nock.cleanAll();

      const data = [{ test: true }];
      nock(API_URL).get('/tenants/settings').reply(200, data);

      const blacklistedTokens = await this.tenant.getSettings();
      expect(blacklistedTokens).to.be.an.instanceOf(Array);

      expect(blacklistedTokens.length).to.equal(data.length);

      expect(blacklistedTokens[0].test).to.equal(data[0].test);
    });

    it('should perform a GET request to /api/v2/tenants/settings', async function () {
      const { request } = this;

      await this.tenant.getSettings();
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/tenants/settings')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.tenant.getSettings();
      expect(request.isDone()).to.be.true;
    });

    it('should pass the parameters in the query-string', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/tenants/settings')
        .query({
          include_fields: true,
          fields: 'test',
        })
        .reply(200);

      await this.tenant.getSettings({ include_fields: true, fields: 'test' });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#updateSettings', () => {
    const data = {
      friendly_name: 'Test name',
    };

    beforeEach(function () {
      this.request = nock(API_URL).patch('/tenants/settings').reply(200);
    });

    it('should accept a callback', function (done) {
      this.tenant.updateSettings(data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.tenant.updateSettings(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch('/tenants/settings').reply(500);

      this.tenant.updateSettings(data).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a PATCH request to /api/v2/tenants/settings', async function () {
      const { request } = this;

      await this.tenant.updateSettings(data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL).patch('/tenants/settings', data).reply(200);

      await this.tenant.updateSettings(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/tenants/settings')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      await this.tenant.updateSettings(data);
      expect(request.isDone()).to.be.true;
    });
  });
});
