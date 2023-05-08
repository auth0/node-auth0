import chai from 'chai';
import nock, { RequestBodyMatcher } from 'nock';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  BrandingManager,
  DeleteBrandingThemeRequest,
  GetBranding200Response,
  PatchBrandingThemeRequest,
  PostBrandingTheme200Response,
  PostBrandingThemeRequest,
} from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('BrandingManager', () => {
  let branding: BrandingManager;
  const token = 'TOKEN';

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    branding = client.branding;
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
        expect((branding as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new BrandingManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new BrandingManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getSettings', () => {
    const data: GetBranding200Response = {
      colors: {
        primary: '#FFF',
        page_background: '#000',
      },
      favicon_url: 'https://example.com/favicon.ico',
      logo_url: 'https://example.com/logo.png',
      font: {
        url: 'https://example.com/font.ttf',
      },
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get('/branding').reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      branding.getSettings().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/branding').reply(500);

      branding.getSettings().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/branding').reply(200, data);

      branding.getSettings().then((provider) => {
        expect(provider.data.colors?.primary).to.equal(data.colors?.primary);
        expect(provider.data.colors?.page_background).to.equal(data.colors?.page_background);
        expect(provider.data.favicon_url).to.equal(data.favicon_url);
        expect(provider.data.logo_url).to.equal(data.logo_url);
        expect(provider.data.font?.url).to.equal(data.font?.url);

        done();
      });
    });

    it('should perform a GET request to /api/v2/branding', function (done) {
      branding.getSettings().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/branding')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      branding.getSettings().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateSettings', () => {
    const data = {
      colors: {
        primary: '#FFF',
        page_background: '#000',
      },
      favicon_url: 'https://example.com/favicon.ico',
      logo_url: 'https://example.com/logo.png',
      font: {
        url: 'https://example.com/font.ttf',
      },
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).patch('/branding').reply(200, data);
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

    it('should pass the body of the response to the "then" handler', function (done) {
      branding.updateSettings(data).then((provider) => {
        expect(provider.data.colors?.primary).to.equal(data.colors?.primary);
        expect(provider.data.colors?.page_background).to.equal(data.colors?.page_background);
        expect(provider.data.favicon_url).to.equal(data.favicon_url);
        expect(provider.data.logo_url).to.equal(data.logo_url);
        expect(provider.data.font?.url).to.equal(data.font?.url);

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/branding')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      branding.updateSettings(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getUniversalLoginTemplate', () => {
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
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
      branding.getUniversalLoginTemplate().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/branding/templates/universal-login')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, { body: 'test' });

      branding.getUniversalLoginTemplate().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#setUniversalLoginTemplate', () => {
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).put('/branding/templates/universal-login').reply(200);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', function (done) {
      branding
        .setUniversalLoginTemplate({ template: '' })
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
      branding.setUniversalLoginTemplate({ template: '' }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .put('/branding/templates/universal-login', { template: 'test' })
        .reply(200);

      branding.setUniversalLoginTemplate({ template: 'test' }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .put('/branding/templates/universal-login')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      branding.setUniversalLoginTemplate({ template: '' }).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#deleteUniversalLoginTemplate', () => {
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).delete('/branding/templates/universal-login').reply(200);
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
      branding.deleteUniversalLoginTemplate().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete('/branding/templates/universal-login')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      branding.deleteUniversalLoginTemplate().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getTheme', () => {
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
      } catch (err: any) {
        expect(err.statusCode).to.eq(404);
        expect(err).to.exist;
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      const data = JSON.parse(
        (await util.promisify(fs.readFile)(
          path.join(__dirname, '../data/theme.json')
        )) as unknown as string
      ) as PostBrandingTheme200Response;
      nock(API_URL).get('/branding/themes/themeid1').reply(200, data);

      const theme = await branding.getTheme({ themeId: 'themeid1' });
      expect(theme.data.themeId).to.equal(data.themeId);
      expect(theme.data.colors.error).to.equal(data.colors.error);
      expect(theme.data.colors.header).to.equal(data.colors.header);
      expect(theme.data.colors.icons).to.equal(data.colors.icons);
      expect(theme.data.borders.button_border_radius).to.equal(data.borders.button_border_radius);
      expect(theme.data.borders.button_border_weight).to.equal(data.borders.button_border_weight);
      expect(theme.data.fonts.body_text.bold).to.equal(data.fonts.body_text.bold);
      expect(theme.data.fonts.body_text.size).to.equal(data.fonts.body_text.size);
      expect(theme.data.fonts.buttons_text.bold).to.equal(data.fonts.buttons_text.bold);
      expect(theme.data.fonts.buttons_text.size).to.equal(data.fonts.buttons_text.size);
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
      } catch (err: any) {
        expect(err.statusCode).to.eq(404);
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
      expect(theme.data.colors.error).to.equal(data.colors.error);
      expect(theme.data.colors.header).to.equal(data.colors.header);
      expect(theme.data.colors.icons).to.equal(data.colors.icons);
      expect(theme.data.borders.button_border_radius).to.equal(data.borders.button_border_radius);
      expect(theme.data.borders.button_border_weight).to.equal(data.borders.button_border_weight);
      expect(theme.data.fonts.body_text.bold).to.equal(data.fonts.body_text.bold);
      expect(theme.data.fonts.body_text.size).to.equal(data.fonts.body_text.size);
      expect(theme.data.fonts.buttons_text.bold).to.equal(data.fonts.buttons_text.bold);
      expect(theme.data.fonts.buttons_text.size).to.equal(data.fonts.buttons_text.size);
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
    let data: PostBrandingThemeRequest & { themeId: string };

    beforeEach(async () => {
      data = JSON.parse(
        (await util.promisify(fs.readFile)(
          path.join(__dirname, '../data/theme.json')
        )) as unknown as string
      );
    });

    it('should return a promise if no callback is given', async () => {
      nock(API_URL)
        .post(`/branding/themes`, data as unknown as RequestBodyMatcher)
        .reply(201, data);

      const promise = branding.createTheme(data);
      expect(promise.then).to.exist;
      expect(promise.catch).to.exist;
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL)
        .post(`/branding/themes`, data as unknown as RequestBodyMatcher)
        .reply(409);

      try {
        await branding.createTheme(data);
      } catch (err: any) {
        expect(err.statusCode).to.eq(409);
        expect(err).to.exist;
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL)
        .post(`/branding/themes`, data as unknown as RequestBodyMatcher)
        .reply(201, data);

      const theme = await branding.createTheme(data);
      expect(theme.data.themeId).to.equal(data.themeId);
      expect(theme.data.colors.error).to.equal(data.colors.error);
      expect(theme.data.colors.header).to.equal(data.colors.header);
      expect(theme.data.colors.icons).to.equal(data.colors.icons);
      expect(theme.data.borders.button_border_radius).to.equal(data.borders.button_border_radius);
      expect(theme.data.borders.button_border_weight).to.equal(data.borders.button_border_weight);
      expect(theme.data.fonts.body_text.bold).to.equal(data.fonts.body_text.bold);
      expect(theme.data.fonts.body_text.size).to.equal(data.fonts.body_text.size);
      expect(theme.data.fonts.buttons_text.bold).to.equal(data.fonts.buttons_text.bold);
      expect(theme.data.fonts.buttons_text.size).to.equal(data.fonts.buttons_text.size);
    });

    it('should perform a POST request to /branding/themes', async () => {
      const request = nock(API_URL)
        .post(`/branding/themes`, data as unknown as RequestBodyMatcher)
        .reply(201, data);

      await branding.createTheme(data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .post('/branding/themes', data as unknown as RequestBodyMatcher)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(201, data);

      await branding.createTheme(data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#updateTheme', () => {
    let data: PostBrandingThemeRequest, themeId: string, params: PatchBrandingThemeRequest;

    beforeEach(async () => {
      ({ themeId, ...data } = JSON.parse(
        (await util.promisify(fs.readFile)(
          path.join(__dirname, '../data/theme.json')
        )) as unknown as string
      ) as PostBrandingThemeRequest & { themeId: string });
      params = { themeId: themeId };
    });

    it('should return a promise if no callback is given', async () => {
      nock(API_URL)
        .patch(`/branding/themes/${themeId}`, data as unknown as RequestBodyMatcher)
        .reply(200, data);

      const promise = branding.updateTheme(params, data);
      expect(promise.then).to.exist;
      expect(promise.catch).to.exist;
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL)
        .patch(`/branding/themes/${themeId}`, data as unknown as RequestBodyMatcher)
        .reply(404);

      try {
        await branding.updateTheme(params, data);
      } catch (err: any) {
        expect(err.statusCode).to.eq(404);
        expect(err).to.exist;
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL)
        .patch(`/branding/themes/${themeId}`, data as unknown as RequestBodyMatcher)
        .reply(200, data);

      const theme = await branding.updateTheme(params, data);
      expect(theme.data.colors.error).to.equal(data.colors.error);
      expect(theme.data.colors.header).to.equal(data.colors.header);
      expect(theme.data.colors.icons).to.equal(data.colors.icons);
      expect(theme.data.borders.button_border_radius).to.equal(data.borders.button_border_radius);
      expect(theme.data.borders.button_border_weight).to.equal(data.borders.button_border_weight);
      expect(theme.data.fonts.body_text.bold).to.equal(data.fonts.body_text.bold);
      expect(theme.data.fonts.body_text.size).to.equal(data.fonts.body_text.size);
      expect(theme.data.fonts.buttons_text.bold).to.equal(data.fonts.buttons_text.bold);
      expect(theme.data.fonts.buttons_text.size).to.equal(data.fonts.buttons_text.size);
    });

    it('should perform a PATCH request to /api/v2/branding/themes/:theme_id', async () => {
      const request = nock(API_URL)
        .patch(`/branding/themes/${themeId}`, data as unknown as RequestBodyMatcher)
        .reply(200, data);

      await branding.updateTheme(params, data);
      expect(request.isDone()).to.be.true;
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .patch(`/branding/themes/${themeId}`, data as unknown as RequestBodyMatcher)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      await branding.updateTheme(params, data);
      expect(request.isDone()).to.be.true;
    });
  });

  describe('#deleteTheme', () => {
    let themeId: string, params: DeleteBrandingThemeRequest;

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
      } catch (err: any) {
        expect(err.statusCode).to.eq(404);
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
