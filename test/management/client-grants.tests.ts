import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { ClientGrant, ClientGrantsManager } from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('ClientGrantsManager', () => {
  let grants: ClientGrantsManager;
  const token = 'TOKEN';
  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    grants = client.clientGrants;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('instance', () => {
    const methods = ['getAll', 'create', 'update', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect((grants as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ClientGrantsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ClientGrantsManager({
          baseUrl: '',
        } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    const data = [{ id: '1', client_id: '123', audience: 'abc', scope: ['openid'] }];
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get('/client-grants').reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      grants.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/client-grants').reply(500, {});

      grants.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/client-grants').reply(200, data);

      grants.getAll().then((grants) => {
        expect(grants.data).to.be.an.instanceOf(Array);

        expect((grants.data as Array<ClientGrant>).length).to.equal(data.length);
        expect((grants.data as Array<ClientGrant>)[0].id).to.equal(data[0].id);
        expect((grants.data as Array<ClientGrant>)[0].client_id).to.equal(data[0].client_id);
        expect((grants.data as Array<ClientGrant>)[0].audience).to.equal(data[0].audience);
        expect((grants.data as Array<ClientGrant>)[0].scope?.[0]).to.equal(data[0].scope[0]);

        done();
      });
    });

    it('should perform a GET request to /api/v2/client-grants', function (done) {
      grants.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/client-grants')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      grants.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/client-grants')
        .query({
          page: 1,
          per_page: 2,
        })
        .reply(200, data);

      grants.getAll({ page: 1, per_page: 2 }).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      client_id: 'CLIENT_ID',
      audience: 'AUDIENCE',
      scope: ['user'],
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/client-grants').reply(201, data);
    });

    it('should return a promise if no callback is given', function (done) {
      grants.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a POST request to /api/v2/client-grants', function (done) {
      grants.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/client-grants')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(201, data);

      grants.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new client grant data in the request body', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/client-grants', data).reply(201, data);

      grants.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    const data = {
      client_id: 'CLIENT_ID',
      audience: 'AUDIENCE',
      scope: ['user'],
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).patch(`/client-grants/5`).reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      grants.update({ id: '5' }, {}).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should perform a PATCH request to /api/v2/client-grants/5', function (done) {
      grants.update({ id: '5' }, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the new data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/client-grants/5`, data).reply(200, data);

      grants.update({ id: '5' }, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/client-grants/${id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', function (done) {
      grants.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /client-grants/${id}`, function (done) {
      grants.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
