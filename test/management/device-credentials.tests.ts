import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  DeviceCredentialsManager,
  DeviceCredentialCreate,
} from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('DeviceCredentialsManager', () => {
  let credentials: DeviceCredentialsManager;

  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    credentials = client.deviceCredentials;
  });

  describe('instance', () => {
    const methods = ['createPublicKey', 'getAll', 'delete'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect((credentials as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new DeviceCredentialsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new DeviceCredentialsManager({ baseUrl: '' });
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get('/device-credentials').reply(200, []);
    });

    it('should return a promise if no callback is given', function (done) {
      credentials.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/device-credentials').reply(500);

      credentials.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ device_id: '123' }];
      nock(API_URL).get('/device-credentials').reply(200, data);

      credentials.getAll().then((credentials) => {
        expect(credentials.data).to.be.an.instanceOf(Array);

        expect(credentials.data.length).to.equal(data.length);

        expect(credentials.data[0].device_id).to.equal(data[0].device_id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/device-credentials', function (done) {
      credentials.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/device-credentials')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      credentials.getAll().then(() => {
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
      const request = nock(API_URL).get('/device-credentials').query(params).reply(200, []);

      credentials.getAll(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#createPublicKey', () => {
    const data = {
      device_id: 'Sample device',
      value: '',
      device_name: 'Sample device',
      type: 'public_key',
      user_id: 'github|1234',
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/device-credentials').reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      credentials
        .createPublicKey(data as DeviceCredentialCreate)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/device-credentials').reply(500);

      credentials.createPublicKey(data as DeviceCredentialCreate).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/device-credentials', function (done) {
      credentials.createPublicKey(data as DeviceCredentialCreate).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/device-credentials', data).reply(200, {});

      credentials.createPublicKey(data as DeviceCredentialCreate).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/device-credentials')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      credentials.createPublicKey(data as DeviceCredentialCreate).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#delete', () => {
    const id = '5';
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete(`/device-credentials/${id}`).reply(200);
    });

    it('should return a promise when no callback is given', function (done) {
      credentials.delete({ id }).then(done.bind(null, null));
    });

    it(`should perform a delete request to /device-credentials/${id}`, function (done) {
      credentials.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete(`/device-credentials/${id}`).reply(500);

      credentials.delete({ id }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should include the token in the authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/device-credentials/${id}`)
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200);

      credentials.delete({ id }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
