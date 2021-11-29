const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const BrandingManager = require(`../../src/management/BrandingManager`);
const { ArgumentError } = require('rest-facade');

describe('BrandingManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.branding = new BrandingManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['getSettings', 'updateSettings'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.branding[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new BrandingManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new BrandingManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new BrandingManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getSettings', () => {
    const data = {
      colors: {
        primary: '#FFF',
      },
      favicon_url: 'https://example.com/favicon.ico',
      logo_url: 'https://example.com/logo.png',
      font: {
        url: 'https://example.com/font.ttf',
      },
    };

    beforeEach(function () {
      this.request = nock(API_URL).get('/branding').reply(200);
    });

    it('should accept a callback', function (done) {
      this.branding.getSettings(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.branding.getSettings().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/branding').reply(500);

      this.branding.getSettings().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/branding').reply(200, data);

      this.branding.getSettings().then((provider) => {
        expect(provider.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/branding', function (done) {
      const { request } = this;

      this.branding.getSettings().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/branding')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.branding.getSettings().then(() => {
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

      const request = nock(API_URL).get('/branding').query(params).reply(200);

      this.branding.getSettings(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateSettings', () => {
    const data = {
      colors: {
        primary: '#FFF',
      },
      favicon_url: 'https://example.com/favicon.ico',
      logo_url: 'https://example.com/logo.png',
      font: {
        url: 'https://example.com/font.ttf',
      },
    };

    beforeEach(function () {
      this.request = nock(API_URL).patch('/branding').reply(200, data);
    });

    it('should accept a callback', function (done) {
      this.branding.updateSettings({}, data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.branding
        .updateSettings({}, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/branding/${data.id}`).reply(500);

      this.branding.updateSettings({}, data).catch((err) => {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/branding', function (done) {
      const { request } = this;

      this.branding.updateSettings({}, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch('/branding', data).reply(200);

      this.branding.updateSettings({}, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/branding')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.branding.updateSettings({}, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getUniversalLoginTemplate', () => {
    beforeEach(function () {
      this.request = nock(API_URL).get('/branding/templates/universal-login').reply(200);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should accept a callback', function (done) {
      this.branding.getUniversalLoginTemplate(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.branding
        .getUniversalLoginTemplate()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/branding/templates/universal-login').reply(500);

      this.branding.getUniversalLoginTemplate().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      const data = { body: 'test' };

      nock.cleanAll();

      nock(API_URL).get('/branding/templates/universal-login').reply(200, data);

      this.branding.getUniversalLoginTemplate().then((response) => {
        expect(response.body).to.equal(data.body);

        done();
      });
    });

    it('should perform a GET request to /api/v2/branding', function (done) {
      const { request } = this;

      this.branding.getUniversalLoginTemplate().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/branding/templates/universal-login')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.branding.getUniversalLoginTemplate().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#setUniversalLoginTemplate', () => {
    beforeEach(function () {
      this.request = nock(API_URL).put('/branding/templates/universal-login').reply(200);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should accept a callback', function (done) {
      this.branding.setUniversalLoginTemplate({}, {}, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.branding
        .setUniversalLoginTemplate({}, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).put('/branding/templates/universal-login').reply(500);

      this.branding.setUniversalLoginTemplate({}, {}).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      const data = { body: 'test' };

      nock.cleanAll();

      nock(API_URL).put('/branding/templates/universal-login').reply(200, data);

      this.branding.setUniversalLoginTemplate({}, data).then((response) => {
        expect(response.body).to.equal(data.body);

        done();
      });
    });

    it('should perform a PUT request to /api/v2/branding/templates/universal-login', function (done) {
      const { request } = this;

      this.branding.setUniversalLoginTemplate({}, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .put('/branding/templates/universal-login')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.branding.setUniversalLoginTemplate({}, {}).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#deleteUniversalLoginTemplate', () => {
    beforeEach(function () {
      this.request = nock(API_URL).delete('/branding/templates/universal-login').reply(200);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should accept a callback', function (done) {
      this.branding.deleteUniversalLoginTemplate(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.branding
        .deleteUniversalLoginTemplate()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete('/branding/templates/universal-login').reply(500);

      this.branding.deleteUniversalLoginTemplate().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      const data = { body: 'test' };

      nock.cleanAll();

      nock(API_URL).delete('/branding/templates/universal-login').reply(200, data);

      this.branding.deleteUniversalLoginTemplate().then((response) => {
        expect(response.body).to.equal(data.body);

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/branding/templates/universal-login', function (done) {
      const { request } = this;

      this.branding.deleteUniversalLoginTemplate().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete('/branding/templates/universal-login')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.branding.deleteUniversalLoginTemplate().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
