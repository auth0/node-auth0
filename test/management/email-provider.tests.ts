import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  EmailProvider,
  EmailsManager,
  PatchProviderRequest,
  PatchProviderRequestNameEnum,
  PostProviderRequest,
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
        new EmailsManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#get', () => {
    const response: EmailProvider = {
      name: 'sendgrid',
      enabled: true,
      default_from_address: 'from@test.com',
      credentials: {
        api_user: 'test_user',
        region: 'test_region',
        smtp_host: 'test_host',
        smtp_port: 1234,
        smtp_user: 'test_user',
      },
      settings: {
        test: 'setting',
      },
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get('/emails/provider').reply(200, response);
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
      emails.get().then((provider) => {
        expect(provider.data.name).to.equal(response.name);
        expect(provider.data.enabled).to.equal(response.enabled);
        expect(provider.data.default_from_address).to.equal(response.default_from_address);
        expect(provider.data.credentials?.api_user).to.equal(response.credentials?.api_user);
        expect(provider.data.credentials?.region).to.equal(response.credentials?.region);
        expect(provider.data.credentials?.smtp_host).to.equal(response.credentials?.smtp_host);
        expect(provider.data.credentials?.smtp_port).to.equal(response.credentials?.smtp_port);
        expect(provider.data.credentials?.smtp_user).to.equal(response.credentials?.smtp_user);

        expect(provider.data.settings?.test).to.equal(response.settings?.test);

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
        .reply(200, response);

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

      const request = nock(API_URL).get('/emails/provider').query(params).reply(200, response);

      emails.get(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#configure', () => {
    const data: PostProviderRequest = {
      name: PostProviderRequestNameEnum.smtp,
      enabled: true,
      default_from_address: 'from@test.com',
      credentials: {
        api_user: 'test_user',
        region: 'test_region',
        smtp_host: 'test_host',
        smtp_port: 1234,
        smtp_user: 'test_user',
      },
      settings: {
        test: 'test',
      },
    };
    const response = {
      name: PostProviderRequestNameEnum.smtp,
      enabled: true,
      default_from_address: 'from@test.com',
      credentials: {
        api_user: 'test_user',
        region: 'test_region',
        smtp_host: 'test_host',
        smtp_port: 1234,
        smtp_user: 'test_user',
      },
      settings: {
        test: 'test',
      },
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
        .post('/emails/provider', data as any)
        .reply(200, response);
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
      emails.configure(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      emails.configure(data).then((provider) => {
        expect(provider.data.name).to.equal(response.name);
        expect(provider.data.enabled).to.equal(response.enabled);
        expect(provider.data.default_from_address).to.equal(response.default_from_address);
        expect(provider.data.credentials?.api_user).to.equal(response.credentials?.api_user);
        expect(provider.data.credentials?.region).to.equal(response.credentials?.region);
        expect(provider.data.credentials?.smtp_host).to.equal(response.credentials?.smtp_host);
        expect(provider.data.credentials?.smtp_port).to.equal(response.credentials?.smtp_port);
        expect(provider.data.credentials?.smtp_user).to.equal(response.credentials?.smtp_user);

        expect(provider.data.settings?.test).to.equal(response.settings?.test);

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/emails/provider')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      emails.configure(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#update', () => {
    const data: PatchProviderRequest = {
      name: PatchProviderRequestNameEnum.smtp,
      enabled: true,
      default_from_address: 'from@test.com',
      credentials: {
        api_user: 'test_user',
        region: 'test_region',
        smtp_host: 'test_host',
        smtp_port: 1234,
        smtp_user: 'test_user',
      },
      settings: {
        test: 'test',
      },
    };
    const response = {
      name: PatchProviderRequestNameEnum.smtp,
      enabled: true,
      default_from_address: 'from@test.com',
      credentials: {
        api_user: 'test_user',
        region: 'test_region',
        smtp_host: 'test_host',
        smtp_port: 1234,
        smtp_user: 'test_user',
      },
      settings: {
        test: 'test',
      },
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
        .patch('/emails/provider', data as any)
        .reply(200, response);
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
      emails.update(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      emails.update(data).then((provider) => {
        expect(provider.data.name).to.equal(response.name);
        expect(provider.data.enabled).to.equal(response.enabled);
        expect(provider.data.default_from_address).to.equal(response.default_from_address);
        expect(provider.data.credentials?.api_user).to.equal(response.credentials?.api_user);
        expect(provider.data.credentials?.region).to.equal(response.credentials?.region);
        expect(provider.data.credentials?.smtp_host).to.equal(response.credentials?.smtp_host);
        expect(provider.data.credentials?.smtp_port).to.equal(response.credentials?.smtp_port);
        expect(provider.data.credentials?.smtp_user).to.equal(response.credentials?.smtp_user);

        expect(provider.data.settings?.test).to.equal(response.settings?.test);

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/emails/provider')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      emails.update(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
