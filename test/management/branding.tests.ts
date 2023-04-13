import chai from 'chai';
import nock from 'nock';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'https://tenant.auth0.com/api/v2';

import { BrandingManager, Configuration } from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('BrandingManager', () => {
  let branding: BrandingManager, token: string;

  before(function () {
    this.token = 'TOKEN';
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: this.token,
    });
    this.branding = client.branding;
    ({ branding, token } = this);
  });

  describe('instance', () => {
    const methods = [
      'getSettings',
      'updateSettings',
      'getTheme',
      'getDefaultTheme',
      'createTheme',
      'updateTheme',
      'deleteTheme',
    ];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.branding[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new BrandingManager(new Configuration({} as any));
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new BrandingManager(new Configuration({ baseUrl: '' }));
      }).to.throw(Error, 'The provided base URL is invalid');
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
      this.request = nock(API_URL).get('/branding').reply(200, data);
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

      branding.getSettings().then((provider) => {
        expect(provider.data.logo_url).to.equal(data.logo_url);

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
        .reply(200, data);

      this.branding.getSettings().then(() => {
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

    it('should return a promise if no callback is given', function (done) {
      branding.updateSettings(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/branding`).reply(500);

      branding.updateSettings(data).catch((err) => {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/branding', function (done) {
      const { request } = this;

      branding.updateSettings(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch('/branding', data).reply(200, data);

      branding.updateSettings(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/branding')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200, data);

      branding.updateSettings(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getUniversalLoginTemplate', () => {
    beforeEach(function () {
      this.request = nock(API_URL)
        .get('/branding/templates/universal-login')
        .reply(200, { body: 'test' });
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', function (done) {
      branding.getUniversalLoginTemplate().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/branding/templates/universal-login').reply(500);

      branding.getUniversalLoginTemplate().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      const data = { body: 'test' };

      nock.cleanAll();

      nock(API_URL).get('/branding/templates/universal-login').reply(200, data);

      branding.getUniversalLoginTemplate().then((response) => {
        expect(typeof response.data !== 'string' && response.data.body).to.equal(data.body);

        done();
      });
    });

    it('should perform a GET request to /api/v2/branding', function (done) {
      const { request } = this;

      branding.getUniversalLoginTemplate().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/branding/templates/universal-login')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200, { body: 'test' });

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

    it('should return a promise if no callback is given', function (done) {
      this.branding
        .setUniversalLoginTemplate({}, {})
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).put('/branding/templates/universal-login').reply(500);

      branding.setUniversalLoginTemplate({ template: '' }).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a PUT request to /api/v2/branding/templates/universal-login', function (done) {
      const { request } = this;

      branding.setUniversalLoginTemplate({ template: '' }).then(() => {
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

      branding.setUniversalLoginTemplate({ template: '' }).then(() => {
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

    it('should return a promise if no callback is given', function (done) {
      branding
        .deleteUniversalLoginTemplate()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).delete('/branding/templates/universal-login').reply(500);

      branding.deleteUniversalLoginTemplate().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/branding/templates/universal-login', function (done) {
      const { request } = this;

      branding.deleteUniversalLoginTemplate().then(() => {
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

      branding.deleteUniversalLoginTemplate().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getTheme', () => {
    beforeEach(() => {});

    it('should return a promise if no callback is given', async () => {
      nock(API_URL)
        .get('/branding/themes/themeid1')
        .reply(200, { borders: { button_border_radius: 1 } });

      const promise = branding.getTheme({ themeId: 'themeid1' });
      expect(promise.then).to.exist;
      expect(promise.catch).to.exist;
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/branding/themes/themeid1').reply(404);

      try {
        await branding.getTheme({ themeId: 'themeid1' });
      } catch (err) {
        expect(err.response.status).to.eq(404);
        expect(err).to.exist;
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      const data = { themeId: 1 };
      nock(API_URL).get('/branding/themes/themeid1').reply(200, data);

      const theme = await branding.getTheme({ themeId: 'themeid1' });
      expect(theme.data.themeId).to.equal(data.themeId);
    });

    it('should perform a GET request to /api/v2/branding/themes/:theme_id', async () => {
      const request = nock(API_URL).get('/branding/themes/themeid1').reply(200, { themeId: 1 });

      await branding.getTheme({ themeId: 'themeid1' });
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .get('/branding/themes/themeid1')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, { themeId: 1 });

      await branding.getTheme({ themeId: 'themeid1' });
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#getDefaultTheme', () => {
    beforeEach(() => {});

    it('should return a promise if no callback is given', async () => {
      const data = JSON.parse(
        (await util.promisify(fs.readFile)(
          path.join(__dirname, '../data/theme.json')
        )) as unknown as string
      );

      nock(API_URL).get('/branding/themes/default').reply(200, data);

      const promise = branding.getDefaultTheme();
      expect(promise.then).to.exist;
      expect(promise.catch).to.exist;
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/branding/themes/default').reply(404);

      try {
        await branding.getDefaultTheme();
      } catch (err) {
        expect(err.response.status).to.eq(404);
        expect(err).to.exist;
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      const data = JSON.parse(
        (await util.promisify(fs.readFile)(
          path.join(__dirname, '../data/theme.json')
        )) as unknown as string
      );
      nock(API_URL).get('/branding/themes/default').reply(200, data);

      const theme = await branding.getDefaultTheme();
      expect(theme.data.themeId).to.equal(data.themeId);
    });

    it('should perform a GET request to /api/v2/branding/themes/default', async () => {
      const data = JSON.parse(
        (await util.promisify(fs.readFile)(
          path.join(__dirname, '../data/theme.json')
        )) as unknown as string
      );
      const request = nock(API_URL).get('/branding/themes/default').reply(200, data);

      await branding.getDefaultTheme();
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .get('/branding/themes/default')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, { id: 1 });

      await branding.getDefaultTheme();
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#createTheme', () => {
    let data;
    beforeEach(async () => {
      data = JSON.parse(
        (await util.promisify(fs.readFile)(
          path.join(__dirname, '../data/theme.json')
        )) as unknown as string
      );
    });

    it('should return a promise if no callback is given', async () => {
      nock(API_URL).post(`/branding/themes`, data).reply(201, data);

      const promise = branding.createTheme(data);
      expect(promise.then).to.exist;
      expect(promise.catch).to.exist;
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).post(`/branding/themes`, data).reply(409);

      try {
        await branding.createTheme(data);
      } catch (err) {
        expect(err.response.status).to.eq(409);
        expect(err).to.exist;
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).post(`/branding/themes`, data).reply(201, data);

      const theme = await branding.createTheme(data);
      expect(theme.data.themeId).to.equal(data.themeId);
    });

    it('should perform a POST request to /branding/themes', async () => {
      const request = nock(API_URL).post(`/branding/themes`, data).reply(201, data);

      await branding.createTheme(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .post('/branding/themes', data)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(201, data);

      await branding.createTheme(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#updateTheme', () => {
    let data, themeId, params;
    beforeEach(async () => {
      ({ themeId, ...data } = JSON.parse(
        (await util.promisify(fs.readFile)(
          path.join(__dirname, '../data/theme.json')
        )) as unknown as string
      ));
      params = { themeId: themeId };
    });

    it('should return a promise if no callback is given', async () => {
      nock(API_URL).patch(`/branding/themes/${themeId}`, data).reply(200, data);

      const promise = branding.updateTheme(params, data);
      expect(promise.then).to.exist;
      expect(promise.catch).to.exist;
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).patch(`/branding/themes/${themeId}`, data).reply(404);

      try {
        await branding.updateTheme(params, data);
      } catch (err) {
        expect(err.response.status).to.eq(404);
        expect(err).to.exist;
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL).patch(`/branding/themes/${themeId}`, data).reply(200, data);

      const theme = await branding.updateTheme(params, data);
      expect(theme.data.themeId).to.equal(data.themeId);
    });

    it('should perform a PATCH request to /api/v2/branding/themes/:theme_id', async () => {
      const request = nock(API_URL).patch(`/branding/themes/${themeId}`, data).reply(200, data);

      await branding.updateTheme(params, data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .patch(`/branding/themes/${themeId}`, data)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      await branding.updateTheme(params, data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#deleteTheme', () => {
    let themeId, params;
    beforeEach(async () => {
      themeId = 'themeid1';
      params = { themeId: themeId };
    });

    it('should return a promise if no callback is given', async () => {
      nock(API_URL).delete(`/branding/themes/${themeId}`).reply(204);

      const promise = branding.deleteTheme(params);
      expect(promise.then).to.exist;
      expect(promise.catch).to.exist;
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).delete(`/branding/themes/${themeId}`).reply(404);

      try {
        await branding.deleteTheme(params);
      } catch (err) {
        expect(err.response.status).to.eq(404);
        expect(err).to.exist;
      }
    });

    it('should perform a PATCH request to /api/v2/branding/themes/:theme_id', async () => {
      const request = nock(API_URL).delete(`/branding/themes/${themeId}`).reply(204);

      await branding.deleteTheme(params);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .delete(`/branding/themes/${themeId}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(204);

      await branding.deleteTheme(params);
      expect(request.isDone()).to.be.true;
    });
  });
});
