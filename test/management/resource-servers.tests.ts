import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { ResourceServersManager } from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('ResourceServersManager', () => {
  let resourceServers: ResourceServersManager;
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    resourceServers = client.resourceServers;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new ResourceServersManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new ResourceServersManager({ baseUrl: '' });
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;
    beforeEach(function () {
      request = nock(API_URL).get('/resource-servers').reply(200, []);
    });

    it('should return a promise if no callback is given', function (done) {
      resourceServers.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/resource-servers').reply(500);

      resourceServers.getAll().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ id: '123' }];
      nock(API_URL).get('/resource-servers').reply(200, data);

      resourceServers.getAll().then((resourceServers) => {
        expect(resourceServers.data).to.be.an.instanceOf(Array);

        expect(resourceServers.data.length).to.equal(data.length);

        expect(resourceServers.data[0].id).to.equal(data[0].id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/resource-servers', function (done) {
      resourceServers.getAll().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/resource-servers')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      resourceServers.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#get', () => {
    const params = { id: '5' };
    const data = {
      id: params.id,
      name: 'Test Resource Server',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get(`/resource-servers/${data.id}`).reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      resourceServers.get(params).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/resource-servers/${params.id}`).reply(500);

      resourceServers.get(params).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get(`/resource-servers/${params.id}`).reply(200, data);

      resourceServers.get(params).then((resourceServer) => {
        expect(resourceServer.data.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/resource-servers/:id', function (done) {
      resourceServers.get(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get(`/resource-servers/${params.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      resourceServers.get(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#create', () => {
    const data = {
      name: 'Acme Backend API',
      options: {},
      identifier: '123',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/resource-servers').reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      resourceServers.create(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/resource-servers').reply(500);

      resourceServers.create(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/resource-servers', function (done) {
      resourceServers.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/resource-servers', data).reply(200, {});

      resourceServers.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/resource-servers')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      resourceServers.create(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    const params = { id: '5' };
    const data = {
      id: '5',
      name: 'Acme Backend API',
      options: {},
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).patch(`/resource-servers/${data.id}`).reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      resourceServers.update(params, data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/resource-servers/${data.id}`).reply(500);

      resourceServers.update(params, data).catch((err) => {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/resource-servers/:id', function (done) {
      resourceServers.update(params, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch(`/resource-servers/${data.id}`, data).reply(200, {});

      resourceServers.update(params, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/resource-servers/${data.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      resourceServers.update(params, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/resource-servers/${id}`).reply(200);
    });

    it('should accept a callback', function (done) {
      resourceServers.delete({ id }, done.bind(null, null));
    });

    it('should return a promise when no callback is given', function (done) {
      resourceServers.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a DELETE request to /resource-servers/${id}`, function (done) {
      resourceServers.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/resource-servers/${id}`).reply(500);

      resourceServers.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/resource-servers/${id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      resourceServers.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
