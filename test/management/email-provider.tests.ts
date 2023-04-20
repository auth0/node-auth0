import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  EmailsManager,
  PatchProviderRequestNameEnum,
  PostProviderRequestNameEnum,
} from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('EmailProviderManager', () => {
  let emails: EmailsManager;
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    emails = client.emails;
  });

  describe('instance', () => {
    const methods = ['configure', 'get', 'update'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect((emails as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new EmailsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new EmailsManager({ baseUrl: '' });
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#get', () => {
    const data = {
      name: 'Test provider',
      options: {},
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get('/emails/provider').reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      emails.get().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/emails/provider').reply(500);

      emails.get().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/emails/provider').reply(200, data);

      emails.get().then((provider) => {
        expect(provider.data.name).to.equal(data.name);

        done();
      });
    });

    it('should perform a GET request to /api/v2/emails/provider', function (done) {
      emails.get().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/emails/provider')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      emails.get().then(() => {
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

      const request = nock(API_URL).get('/emails/provider').query(params).reply(200, {});

      emails.get(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#configure', () => {
    const data = {
      name: PostProviderRequestNameEnum.smtp,
      credentials: {},
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/emails/provider').reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      emails.configure(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/emails/provider').reply(500);

      emails.configure(data).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a POST request to /api/v2/emails/provider', function (done) {
      emails.configure(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/emails/provider', data).reply(200, {});

      emails.configure(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/emails/provider')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      emails.configure(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    const data = {
      name: PatchProviderRequestNameEnum.smtp,
      credentials: {},
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).patch('/emails/provider').reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      emails.update(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/emails/provider`).reply(500);

      emails.update(data).catch((err) => {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/emails/provider', function (done) {
      emails.update(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch('/emails/provider', data).reply(200, {});

      emails.update(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/emails/provider')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      emails.update(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
