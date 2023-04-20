import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { RulesConfigsManager } from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('RulesConfigsManager', () => {
  let rulesConfigs: RulesConfigsManager;
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    rulesConfigs = client.rulesConfigs;
  });

  describe('instance', () => {
    const methods = ['set', 'getAll', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect((rulesConfigs as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new RulesConfigsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new RulesConfigsManager({ baseUrl: '' });
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    it('should return a promise if no callback is given', function (done) {
      rulesConfigs.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/rules-configs').reply(500);

      rulesConfigs.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', async function () {
      nock.cleanAll();

      const data = [{ key: 'dbconnectionstring' }];
      nock(API_URL).get('/rules-configs').reply(200, data);

      const configs = await rulesConfigs.getAll();
      expect(configs.data).to.be.an.instanceOf(Array);

      expect(configs.data.length).to.equal(data.length);

      expect(configs.data[0].key).to.equal(data[0].key);
    });

    it('should perform a GET request to rules-configs', async function () {
      nock.cleanAll();

      const request = nock(API_URL).get('/rules-configs').reply(200, {});

      await rulesConfigs.getAll();
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/rules-configs')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await rulesConfigs.getAll();
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#set', () => {
    const data = { value: 'foobar' };
    const params = { key: 'KEY' };

    it('should return a promise if no callback is given', function (done) {
      rulesConfigs.set(params, data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).put(`/rules-configs/${params.key}`).reply(500);

      rulesConfigs.set(params, data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a PUT request to /rules-configs/{KEY}', async function () {
      nock.cleanAll();

      const request = nock(API_URL).put(`/rules-configs/${params.key}`, data).reply(200, {});

      await rulesConfigs.set(params, data);
      expect(request.isDone()).to.be.true;
    });

    it('should pass the data in the body of the request', async function () {
      nock.cleanAll();

      const request = nock(API_URL).put(`/rules-configs/${params.key}`, data).reply(200, {});

      await rulesConfigs.set(params, data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .put(`/rules-configs/${params.key}`, data)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      await rulesConfigs.set(params, data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#delete', () => {
    const key = 'KEY';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/rules-configs/${key}`).reply(200);
    });

    it('should accept a callback', function (done) {
      rulesConfigs.delete({ key }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function () {
      expect(rulesConfigs.delete({ key })).instanceOf(Promise);
    });

    it(`should perform a delete request to /rules-configs/${key}`, async function () {
      await rulesConfigs.delete({ key });
      expect(request.isDone()).to.be.true;
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/rules-configs/${key}`).reply(500);

      rulesConfigs.delete({ key }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', async function () {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/rules-configs/${key}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, {});

      await rulesConfigs.delete({ key });
      expect(request.isDone()).to.be.true;
    });
  });
});
