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
  ManagementClient,
  CreatePhoneProviderRequest,
  GetBrandingPhoneProviders200ResponseProvidersInner,
  CreatePhoneProviderRequestNameEnum,
  UpdatePhoneProviderOperationRequest,
  UpdatePhoneProviderRequest,
  DeletePhoneProviderRequest,
  GetPhoneProviderRequest,
  GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf,
  CreatePhoneTemplateRequestContent,
  CreatePhoneTemplateResponseContent,
  CreatePhoneTemplateRequestContentTypeEnum,
  CreatePhoneTemplateResponseContentTypeEnum,
  UpdatePhoneTemplateResponseContent,
  UpdatePhoneTemplateRequestContent,
} from '../../src/index.js';

describe('BrandingManager', () => {
  let branding: BrandingManager;
  const token = 'TOKEN';

  beforeAll(() => {
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
      it(`should have a ${method} method`, () => {
        expect((branding as any)[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new BrandingManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new BrandingManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
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

    beforeEach(() => {
      request = nock(API_URL).get('/branding').reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      branding.getSettings().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/branding').reply(500, {});

      branding.getSettings().catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/branding').reply(200, data);

      branding.getSettings().then((provider) => {
        expect(provider.data.colors?.primary).toBe(data.colors?.primary);
        expect(provider.data.colors?.page_background).toBe(data.colors?.page_background);
        expect(provider.data.favicon_url).toBe(data.favicon_url);
        expect(provider.data.logo_url).toBe(data.logo_url);
        expect(provider.data.font?.url).toBe(data.font?.url);

        done();
      });
    });

    it('should perform a GET request to /api/v2/branding', (done) => {
      branding.getSettings().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/branding')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      branding.getSettings().then(() => {
        expect(request.isDone()).toBe(true);

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

    beforeEach(() => {
      request = nock(API_URL).patch('/branding').reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      branding.updateSettings(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch(`/branding`).reply(500, {});

      branding.updateSettings(data).catch((err) => {
        expect(err).toBeInstanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/branding', (done) => {
      branding.updateSettings(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).patch('/branding', data).reply(200, data);

      branding.updateSettings(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      branding.updateSettings(data).then((provider) => {
        expect(provider.data.colors?.primary).toBe(data.colors?.primary);
        expect(provider.data.colors?.page_background).toBe(data.colors?.page_background);
        expect(provider.data.favicon_url).toBe(data.favicon_url);
        expect(provider.data.logo_url).toBe(data.logo_url);
        expect(provider.data.font?.url).toBe(data.font?.url);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/branding')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      branding.updateSettings(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#getUniversalLoginTemplate', () => {
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL)
        .get('/branding/templates/universal-login')
        .reply(200, { body: 'test' });
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', (done) => {
      branding.getUniversalLoginTemplate().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/branding/templates/universal-login').reply(500, {});

      branding.getUniversalLoginTemplate().catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      const data = { body: 'test' };

      nock.cleanAll();

      nock(API_URL).get('/branding/templates/universal-login').reply(200, data);

      branding.getUniversalLoginTemplate().then((response) => {
        expect(typeof response.data !== 'string' && response.data.body).toBe(data.body);

        done();
      });
    });

    it('should perform a GET request to /api/v2/branding', (done) => {
      branding.getUniversalLoginTemplate().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/branding/templates/universal-login')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, { body: 'test' });

      branding.getUniversalLoginTemplate().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#setUniversalLoginTemplate', () => {
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).put('/branding/templates/universal-login').reply(200, {});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', (done) => {
      branding
        .setUniversalLoginTemplate({ template: '' })
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).put('/branding/templates/universal-login').reply(500, {});

      branding.setUniversalLoginTemplate({ template: '' }).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a PUT request to /api/v2/branding/templates/universal-login', (done) => {
      branding.setUniversalLoginTemplate({ template: '' }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .put('/branding/templates/universal-login', { template: 'test' })
        .reply(200, {});

      branding.setUniversalLoginTemplate({ template: 'test' }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .put('/branding/templates/universal-login')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      branding.setUniversalLoginTemplate({ template: '' }).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#deleteUniversalLoginTemplate', () => {
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).delete('/branding/templates/universal-login').reply(200, {});
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', (done) => {
      branding
        .deleteUniversalLoginTemplate()
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).delete('/branding/templates/universal-login').reply(500, {});

      branding.deleteUniversalLoginTemplate().catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a DELETE request to /api/v2/branding/templates/universal-login', (done) => {
      branding.deleteUniversalLoginTemplate().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete('/branding/templates/universal-login')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      branding.deleteUniversalLoginTemplate().then(() => {
        expect(request.isDone()).toBe(true);

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
      expect(promise.then).toBeDefined();
      expect(promise.catch).toBeDefined();
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/branding/themes/themeid1').reply(404, {});

      try {
        await branding.getTheme({ themeId: 'themeid1' });
      } catch (err: any) {
        expect(err.statusCode).toBe(404);
        expect(err).toBeDefined();
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
      expect(theme.data.themeId).toBe(data.themeId);
      expect(theme.data.colors.error).toBe(data.colors.error);
      expect(theme.data.colors.header).toBe(data.colors.header);
      expect(theme.data.colors.icons).toBe(data.colors.icons);
      expect(theme.data.borders.button_border_radius).toBe(data.borders.button_border_radius);
      expect(theme.data.borders.button_border_weight).toBe(data.borders.button_border_weight);
      expect(theme.data.fonts.body_text.bold).toBe(data.fonts.body_text.bold);
      expect(theme.data.fonts.body_text.size).toBe(data.fonts.body_text.size);
      expect(theme.data.fonts.buttons_text.bold).toBe(data.fonts.buttons_text.bold);
      expect(theme.data.fonts.buttons_text.size).toBe(data.fonts.buttons_text.size);
    });

    it('should perform a GET request to /api/v2/branding/themes/:theme_id', async () => {
      const request = nock(API_URL).get('/branding/themes/themeid1').reply(200, { themeId: 1 });

      await branding.getTheme({ themeId: 'themeid1' });
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .get('/branding/themes/themeid1')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, { themeId: 1 });

      await branding.getTheme({ themeId: 'themeid1' });
      expect(request.isDone()).toBe(true);
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
      expect(promise.then).toBeDefined();
      expect(promise.catch).toBeDefined();
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).get('/branding/themes/default').reply(404, {});

      try {
        await branding.getDefaultTheme();
      } catch (err: any) {
        expect(err.statusCode).toBe(404);
        expect(err).toBeDefined();
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
      expect(theme.data.themeId).toBe(data.themeId);
      expect(theme.data.colors.error).toBe(data.colors.error);
      expect(theme.data.colors.header).toBe(data.colors.header);
      expect(theme.data.colors.icons).toBe(data.colors.icons);
      expect(theme.data.borders.button_border_radius).toBe(data.borders.button_border_radius);
      expect(theme.data.borders.button_border_weight).toBe(data.borders.button_border_weight);
      expect(theme.data.fonts.body_text.bold).toBe(data.fonts.body_text.bold);
      expect(theme.data.fonts.body_text.size).toBe(data.fonts.body_text.size);
      expect(theme.data.fonts.buttons_text.bold).toBe(data.fonts.buttons_text.bold);
      expect(theme.data.fonts.buttons_text.size).toBe(data.fonts.buttons_text.size);
    });

    it('should perform a GET request to /api/v2/branding/themes/default', async () => {
      const data = JSON.parse(
        (await util.promisify(fs.readFile)(
          path.join(__dirname, '../data/theme.json')
        )) as unknown as string
      );
      const request = nock(API_URL).get('/branding/themes/default').reply(200, data);

      await branding.getDefaultTheme();
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .get('/branding/themes/default')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, { id: 1 });

      await branding.getDefaultTheme();
      expect(request.isDone()).toBe(true);
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
      expect(promise.then).toBeDefined();
      expect(promise.catch).toBeDefined();
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL)
        .post(`/branding/themes`, data as unknown as RequestBodyMatcher)
        .reply(409, {});

      try {
        await branding.createTheme(data);
      } catch (err: any) {
        expect(err.statusCode).toBe(409);
        expect(err).toBeDefined();
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL)
        .post(`/branding/themes`, data as unknown as RequestBodyMatcher)
        .reply(201, data);

      const theme = await branding.createTheme(data);
      expect(theme.data.themeId).toBe(data.themeId);
      expect(theme.data.colors.error).toBe(data.colors.error);
      expect(theme.data.colors.header).toBe(data.colors.header);
      expect(theme.data.colors.icons).toBe(data.colors.icons);
      expect(theme.data.borders.button_border_radius).toBe(data.borders.button_border_radius);
      expect(theme.data.borders.button_border_weight).toBe(data.borders.button_border_weight);
      expect(theme.data.fonts.body_text.bold).toBe(data.fonts.body_text.bold);
      expect(theme.data.fonts.body_text.size).toBe(data.fonts.body_text.size);
      expect(theme.data.fonts.buttons_text.bold).toBe(data.fonts.buttons_text.bold);
      expect(theme.data.fonts.buttons_text.size).toBe(data.fonts.buttons_text.size);
    });

    it('should perform a POST request to /branding/themes', async () => {
      const request = nock(API_URL)
        .post(`/branding/themes`, data as unknown as RequestBodyMatcher)
        .reply(201, data);

      await branding.createTheme(data);
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .post('/branding/themes', data as unknown as RequestBodyMatcher)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(201, data);

      await branding.createTheme(data);
      expect(request.isDone()).toBe(true);
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
      expect(promise.then).toBeDefined();
      expect(promise.catch).toBeDefined();
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL)
        .patch(`/branding/themes/${themeId}`, data as unknown as RequestBodyMatcher)
        .reply(404, {});

      try {
        await branding.updateTheme(params, data);
      } catch (err: any) {
        expect(err.statusCode).toBe(404);
        expect(err).toBeDefined();
      }
    });

    it('should pass the body of the response to the "then" handler', async () => {
      nock(API_URL)
        .patch(`/branding/themes/${themeId}`, data as unknown as RequestBodyMatcher)
        .reply(200, data);

      const theme = await branding.updateTheme(params, data);
      expect(theme.data.colors.error).toBe(data.colors.error);
      expect(theme.data.colors.header).toBe(data.colors.header);
      expect(theme.data.colors.icons).toBe(data.colors.icons);
      expect(theme.data.borders.button_border_radius).toBe(data.borders.button_border_radius);
      expect(theme.data.borders.button_border_weight).toBe(data.borders.button_border_weight);
      expect(theme.data.fonts.body_text.bold).toBe(data.fonts.body_text.bold);
      expect(theme.data.fonts.body_text.size).toBe(data.fonts.body_text.size);
      expect(theme.data.fonts.buttons_text.bold).toBe(data.fonts.buttons_text.bold);
      expect(theme.data.fonts.buttons_text.size).toBe(data.fonts.buttons_text.size);
    });

    it('should perform a PATCH request to /api/v2/branding/themes/:theme_id', async () => {
      const request = nock(API_URL)
        .patch(`/branding/themes/${themeId}`, data as unknown as RequestBodyMatcher)
        .reply(200, data);

      await branding.updateTheme(params, data);
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .patch(`/branding/themes/${themeId}`, data as unknown as RequestBodyMatcher)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      await branding.updateTheme(params, data);
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#deleteTheme', () => {
    let themeId: string, params: DeleteBrandingThemeRequest;

    beforeEach(async () => {
      themeId = 'themeid1';
      params = { themeId: themeId };
    });

    it('should return a promise if no callback is given', async () => {
      nock(API_URL).delete(`/branding/themes/${themeId}`).reply(204, {});

      const promise = branding.deleteTheme(params);
      expect(promise.then).toBeDefined();
      expect(promise.catch).toBeDefined();
      await promise;
    });

    it('should pass any errors to the promise catch handler', async () => {
      nock(API_URL).delete(`/branding/themes/${themeId}`).reply(404, {});

      try {
        await branding.deleteTheme(params);
      } catch (err: any) {
        expect(err.statusCode).toBe(404);
        expect(err).toBeDefined();
      }
    });

    it('should perform a PATCH request to /api/v2/branding/themes/:theme_id', async () => {
      const request = nock(API_URL).delete(`/branding/themes/${themeId}`).reply(204, {});

      await branding.deleteTheme(params);
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .delete(`/branding/themes/${themeId}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(204, {});

      await branding.deleteTheme(params);
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#configurePhoneProvider', () => {
    const data: CreatePhoneProviderRequest = {
      name: 'twilio' as CreatePhoneProviderRequestNameEnum,
      credentials: {
        account_sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        auth_token: 'your_auth_token',
      },
      configuration: {
        default_from: 'default',
        mssid: 'mssid1',
        sid: 'sid1',
        delivery_methods: [],
      },
    };
    const response: GetBrandingPhoneProviders200ResponseProvidersInner = {
      id: 'provider_id',
      name: 'twilio',
      disabled: true,
      configuration: {
        default_from: 'default',
        mssid: 'mssid1',
        sid: 'sid1',
        delivery_methods: [],
      },
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).post('/branding/phone/providers', data).reply(200, response);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', (done) => {
      branding
        .configurePhoneProvider(data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/branding/phone/providers').reply(500, {});

      branding.configurePhoneProvider(data).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should perform a POST request to /api/v2/branding/phone/providers', (done) => {
      branding.configurePhoneProvider(data).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/branding/phone/providers', data)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      branding.configurePhoneProvider(data).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      branding.configurePhoneProvider(data).then((provider) => {
        expect(provider.data.id).toBe(response.id);
        expect(provider.data.name).toBe(response.name);
        expect(provider.data.disabled).toBe(response.disabled);

        const providerConfig = provider.data
          .configuration as GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf;
        const responseConfig =
          response.configuration as GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf;

        expect(providerConfig.default_from).toBe(responseConfig.default_from);
        expect(providerConfig.mssid).toBe(responseConfig.mssid);
        expect(providerConfig.sid).toBe(responseConfig.sid);
        expect(providerConfig.delivery_methods).toEqual(responseConfig.delivery_methods);

        done();
      });
    });
  });

  describe('#updatePhoneProvider', () => {
    const requestParameters: UpdatePhoneProviderOperationRequest = {
      id: 'provider_id',
    };
    const bodyParameters: UpdatePhoneProviderRequest = {
      name: 'twilio' as CreatePhoneProviderRequestNameEnum,
      credentials: {
        account_sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        auth_token: 'your_auth_token',
      },
      configuration: {
        default_from: 'default',
        mssid: 'mssid1',
        sid: 'sid1',
        delivery_methods: [],
      },
    };
    const response: GetBrandingPhoneProviders200ResponseProvidersInner = {
      id: 'provider_id',
      name: 'twilio',
      disabled: true,
      configuration: {
        default_from: 'default',
        mssid: 'mssid1',
        sid: 'sid1',
        delivery_methods: [], // Add the required delivery_methods field
      },
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL)
        .patch(`/branding/phone/providers/${requestParameters.id}`)
        .reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      branding
        .updatePhoneProvider(requestParameters, bodyParameters)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch(`/branding/phone/providers/${requestParameters.id}`).reply(500, {});

      branding.updatePhoneProvider(requestParameters, bodyParameters).catch((err) => {
        expect(err).toBeInstanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /branding/phone/providers/:id', (done) => {
      nock.cleanAll();

      request = nock(API_URL)
        .patch(`/branding/phone/providers/${requestParameters.id}`, bodyParameters as any)
        .reply(200, response);

      branding.updatePhoneProvider(requestParameters, bodyParameters).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch(`/branding/phone/providers/${requestParameters.id}`, bodyParameters as any)
        .reply(200, response);

      branding.updatePhoneProvider(requestParameters, bodyParameters).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      branding.updatePhoneProvider(requestParameters, bodyParameters).then((provider) => {
        expect(provider.data.id).toBe(response.id);
        expect(provider.data.name).toBe(response.name);
        expect(provider.data.disabled).toBe(response.disabled);

        const providerConfig = provider.data
          .configuration as GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf;
        const responseConfig =
          response.configuration as GetBrandingPhoneProviders200ResponseProvidersInnerConfigurationAnyOf;

        expect(providerConfig.default_from).toBe(responseConfig.default_from);
        expect(providerConfig.mssid).toBe(responseConfig.mssid);
        expect(providerConfig.sid).toBe(responseConfig.sid);
        expect(providerConfig.delivery_methods).toEqual(responseConfig.delivery_methods);

        done();
      });
    });
  });

  describe('#deletePhoneProvider', () => {
    const requestParameters: DeletePhoneProviderRequest = {
      id: 'provider_id',
    };

    beforeEach(() => {
      nock(API_URL).delete(`/branding/phone/providers/${requestParameters.id}`).reply(200, {});
    });

    it('should return a promise when no callback is given', (done) => {
      branding.deletePhoneProvider(requestParameters).then(done.bind(null, null));
    });

    it('should perform a DELETE request to /branding/phone/providers/:id', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .delete(`/branding/phone/providers/${requestParameters.id}`)
        .reply(204);

      branding.deletePhoneProvider(requestParameters).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#getAllPhoneProviders', () => {
    let request: nock.Scope;

    beforeEach(() => {
      nock.cleanAll();
      request = nock(API_URL).get('/branding/phone/providers').reply(200, []);
    });

    it('should return a promise if no callback is given', (done) => {
      branding.getAllPhoneProviders().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/branding/phone/providers').reply(500, {});

      branding.getAllPhoneProviders().catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      const data: GetBrandingPhoneProviders200ResponseProvidersInner[] = [{ name: 'twilio' }];
      request = nock(API_URL);
      nock(API_URL)
        .get('/branding/phone/providers')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      branding.getAllPhoneProviders().then((result) => {
        expect(result.data).toBeInstanceOf(Array);
        done();
      });
    });

    it('should perform a GET request to /branding/phone/providers', (done) => {
      branding.getAllPhoneProviders().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/branding/phone/providers')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, []);

      branding.getAllPhoneProviders().then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });
  });

  describe('#getPhoneProvider', () => {
    const requestParameters: GetPhoneProviderRequest = {
      id: 'provider_id',
    };
    const response: GetBrandingPhoneProviders200ResponseProvidersInner = {
      id: 'provider_id',
      name: 'twilio',
      disabled: true,
      configuration: {
        default_from: 'deafult',
        mssid: 'mssid1',
        sid: 'sid1',
        delivery_methods: [],
      },
    };

    let request: nock.Scope;

    beforeEach(() => {
      nock.cleanAll();
      request = nock(API_URL)
        .get(`/branding/phone/providers/${requestParameters.id}`)
        .reply(200, response);
    });

    it('should return a promise if no callback is given', (done) => {
      branding
        .getPhoneProvider(requestParameters)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();
      request = nock(API_URL)
        .get(`/branding/phone/providers/${requestParameters.id}`)
        .reply(500, {});

      branding.getPhoneProvider(requestParameters).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should perform a GET request to /branding/phone/providers/:id', (done) => {
      branding
        .getPhoneProvider(requestParameters)
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();
      const request = nock(API_URL)
        .get(`/branding/phone/providers/${requestParameters.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      branding
        .getPhoneProvider(requestParameters)
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      branding
        .getPhoneProvider(requestParameters)
        .then((result) => {
          expect(result.data.id).toBe(response.id);
          expect(result.data.name).toBe(response.name);
          expect(result.data.disabled).toBe(response.disabled);
          done();
        })
        .catch(done);
    });
  });

  describe('#createPhoneTemplate', () => {
    const data: CreatePhoneTemplateRequestContent = {
      type: 'otp_verify' as CreatePhoneTemplateRequestContentTypeEnum,
      disabled: false,
      content: {
        syntax: 'liquid',
        from: '+1234567890',
        body: {
          text: 'Your verification code is: {{code}}',
          voice: 'Your verification code is {{code}}',
        },
      },
    };
    const response: CreatePhoneTemplateResponseContent = {
      id: 'template_id',
      channel: 'sms',
      customizable: true,
      tenant: 'tenant_id',
      type: 'otp_verify' as CreatePhoneTemplateResponseContentTypeEnum,
      disabled: false,
      content: {
        syntax: 'liquid',
        from: '+1234567890',
        body: {
          text: 'Your verification code is: {{code}}',
          voice: 'Your verification code is {{code}}',
        },
      },
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL)
        .post('/branding/phone/templates', (body) => {
          return JSON.stringify(body) === JSON.stringify(data);
        })
        .reply(201, response);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', (done) => {
      branding
        .createPhoneTemplate(data)
        .then(() => done())
        .catch((err) => done(err));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).post('/branding/phone/templates').reply(500, {});

      branding.createPhoneTemplate(data).catch((err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('should perform a POST request to /api/v2/branding/phone/templates', (done) => {
      branding.createPhoneTemplate(data).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/branding/phone/templates', (body) => JSON.stringify(body) === JSON.stringify(data))
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(201, response);

      branding.createPhoneTemplate(data).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include Content-Type application/json header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/branding/phone/templates', (body) => JSON.stringify(body) === JSON.stringify(data))
        .matchHeader('Content-Type', 'application/json')
        .reply(201, response);

      branding.createPhoneTemplate(data).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      branding.createPhoneTemplate(data).then((result) => {
        expect(result.data.id).toBe(response.id);
        expect(result.data.type).toBe(response.type);
        expect(result.data.disabled).toBe(response.disabled);
        expect(result.data.channel).toBe(response.channel);
        expect(result.data.customizable).toBe(response.customizable);
        expect(result.data.tenant).toBe(response.tenant);
        expect(result.data.content.syntax).toBe(response.content.syntax);
        expect(result.data.content.from).toBe(response.content.from);
        expect(result.data.content.body?.text).toBe(response.content.body?.text);
        expect(result.data.content.body?.voice).toBe(response.content.body?.voice);
        done();
      });
    });
  });

  describe('#getPhoneTemplate', () => {
    const params = { id: '5' };

    const data = {
      id: 'template_id',
      channel: 'sms',
      customizable: true,
      tenant: 'tenant_id',
      type: 'otp_verify' as CreatePhoneTemplateResponseContentTypeEnum,
      disabled: false,
      content: {
        syntax: 'liquid',
        from: '+1234567890',
        body: {
          text: 'Your verification code is: {{code}}',
          voice: 'Your verification code is {{code}}',
        },
      },
    };

    let request: nock.Scope;

    beforeEach(() => {
      nock.cleanAll();

      request = nock(API_URL).get(`/branding/phone/templates/${params.id}`).reply(200, data);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', (done) => {
      branding
        .getPhoneTemplate(params)
        .then(() => done())
        .catch((err) => done(err));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get(`/branding/phone/templates/${params.id}`).reply(500, {});

      branding
        .getPhoneTemplate(params)
        .then(() => done(new Error('Expected method to reject.')))
        .catch((err) => {
          expect(err).toBeDefined();
          done();
        });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      branding
        .getPhoneTemplate(params)
        .then((response) => {
          const result = response.data ?? response;
          expect(result.id).toBe(data.id);
          expect(result.channel).toBe(data.channel);
          expect(result.customizable).toBe(data.customizable);
          expect(result.tenant).toBe(data.tenant);
          expect(result.type).toBe(data.type);
          expect(result.disabled).toBe(data.disabled);
          expect(result.content.syntax).toBe(data.content.syntax);
          expect(result.content.from).toBe(data.content.from);
          expect(result.content.body?.text).toBe(data.content.body?.text);
          expect(result.content.body?.voice).toBe(data.content.body?.voice);
          done();
        })
        .catch(done);
    });

    it('should perform a GET request to /branding/phone/templates/:id', (done) => {
      branding
        .getPhoneTemplate(params)
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const authRequest = nock(API_URL)
        .get(`/branding/phone/templates/${params.id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      branding
        .getPhoneTemplate(params)
        .then(() => {
          expect(authRequest.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });
  });

  describe('#getAllPhoneTemplates', () => {
    const data = {
      templates: [
        {
          id: 'template_id',
          channel: 'sms',
          customizable: true,
          tenant: 'tenant_id',
          type: 'otp_verify' as CreatePhoneTemplateResponseContentTypeEnum,
          disabled: false,
          content: {
            syntax: 'liquid',
            from: '+1234567890',
            body: {
              text: 'Your verification code is: {{code}}',
              voice: 'Your verification code is {{code}}',
            },
          },
        },
      ],
    };

    let request: nock.Scope;

    beforeEach(() => {
      nock.cleanAll();
      request = nock(API_URL).get('/branding/phone/templates').reply(200, data);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', (done) => {
      branding
        .getAllPhoneTemplates()
        .then(() => done())
        .catch((err) => done(err));
    });

    it('should perform a GET request to /branding/phone/templates', (done) => {
      branding
        .getAllPhoneTemplates()
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/branding/phone/templates').reply(200, data);

      branding
        .getAllPhoneTemplates()
        .then((response) => {
          expect(response.data.templates?.[0].id).toBe(data.templates?.[0].id);
          expect(response.data.templates?.[0].channel).toBe(data.templates[0].channel);
          expect(response.data.templates?.[0].customizable).toBe(data.templates[0].customizable);
          expect(response.data.templates?.[0].tenant).toBe(data.templates[0].tenant);
          expect(response.data.templates?.[0].type).toBe(data.templates[0].type);
          expect(response.data.templates?.[0].disabled).toBe(data.templates[0].disabled);
          expect(response.data.templates?.[0].content.from).toBe(data.templates[0].content.from);
          expect(response.data.templates?.[0].content.body?.text).toBe(
            data.templates[0].content.body?.text
          );
          expect(response.data.templates?.[0].content.body?.voice).toBe(
            data.templates[0].content.body?.voice
          );

          done();
        })
        .catch(done);
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const authRequest = nock(API_URL)
        .get('/branding/phone/templates')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, data);

      branding
        .getAllPhoneTemplates()
        .then(() => {
          expect(authRequest.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/branding/phone/templates').reply(500, {});

      branding
        .getAllPhoneTemplates()
        .then(() => done(new Error('Expected method to reject.')))
        .catch((err) => {
          expect(err).toBeDefined();
          done();
        });
    });
  });
  describe('#updatePhoneTemplate', () => {
    const params = { id: '5' };
    const data: UpdatePhoneTemplateRequestContent = {
      content: {
        from: '+123456789',
        body: {
          text: 'Your verification code is: {{code}}',
          voice: 'Your verification code is {{code}}',
        },
      },
      disabled: false,
    };

    const response: UpdatePhoneTemplateResponseContent = {
      id: 'template_id',
      channel: 'sms',
      customizable: true,
      tenant: 'tenant_id',
      type: 'otp_verify' as CreatePhoneTemplateResponseContentTypeEnum,
      disabled: false,
      content: {
        syntax: 'liquid',
        from: '+1234567890',
        body: {
          text: 'Your verification code is: {{code}}',
          voice: 'Your verification code is {{code}}',
        },
      },
    };

    let request: nock.Scope;

    beforeEach(() => {
      nock.cleanAll();
      request = nock(API_URL)
        .patch(`/branding/phone/templates/${params.id}`, (body) => {
          return JSON.stringify(body) === JSON.stringify(data);
        })
        .reply(200, response);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', (done) => {
      branding
        .updatePhoneTemplate(params, data)
        .then(() => done())
        .catch((err) => done(err));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch(`/branding/phone/templates/${params.id}`).reply(500, {});

      branding
        .updatePhoneTemplate(params, data)
        .then(() => done(new Error('Expected method to reject.')))
        .catch((err) => {
          expect(err).toBeDefined();
          done();
        });
    });

    it('should perform a PATCH request to /branding/phone/templates/:id', (done) => {
      branding
        .updatePhoneTemplate(params, data)
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const authRequest = nock(API_URL)
        .patch(
          `/branding/phone/templates/${params.id}`,
          (body) => JSON.stringify(body) === JSON.stringify(data)
        )
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      branding
        .updatePhoneTemplate(params, data)
        .then(() => {
          expect(authRequest.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('should include Content-Type application/json header', (done) => {
      nock.cleanAll();

      const contentTypeRequest = nock(API_URL)
        .patch(
          `/branding/phone/templates/${params.id}`,
          (body) => JSON.stringify(body) === JSON.stringify(data)
        )
        .matchHeader('Content-Type', 'application/json')
        .reply(200, response);

      branding
        .updatePhoneTemplate(params, data)
        .then(() => {
          expect(contentTypeRequest.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      branding
        .updatePhoneTemplate(params, data)
        .then((result) => {
          expect(result.data.id).toBe(response.id);
          expect(result.data.type).toBe(response.type);
          expect(result.data.disabled).toBe(response.disabled);
          expect(result.data.channel).toBe(response.channel);
          expect(result.data.customizable).toBe(response.customizable);
          expect(result.data.tenant).toBe(response.tenant);
          expect(result.data.content.syntax).toBe(response.content.syntax);
          expect(result.data.content.from).toBe(response.content.from);
          expect(result.data.content.body?.text).toBe(response.content.body?.text);
          expect(result.data.content.body?.voice).toBe(response.content.body?.voice);
          done();
        })
        .catch(done);
    });
  });
  describe('#deletePhoneTemplate', () => {
    const id = '5';

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', async () => {
      const request = nock(API_URL).delete(`/branding/phone/templates/${id}`).reply(204, {});

      const promise = branding.deletePhoneTemplate({ id });
      expect(typeof promise.then).toBe('function');
      expect(typeof promise.catch).toBe('function');
      await promise;
      expect(request.isDone()).toBe(true);
    });

    it('should pass any errors to the promise catch handler', async () => {
      const request = nock(API_URL)
        .delete(`/branding/phone/templates/${id}`)
        .reply(404, { message: 'Not Found' });

      try {
        await branding.deletePhoneTemplate({ id });
        throw new Error('Expected method to reject.');
      } catch (err: any) {
        expect(err).toBeDefined();
        expect(err.statusCode).toBe(404);
        expect(request.isDone()).toBe(true);
      }
    });

    it('should perform a DELETE request to /branding/phone/templates/:id', async () => {
      const request = nock(API_URL).delete(`/branding/phone/templates/${id}`).reply(204, {});

      await branding.deletePhoneTemplate({ id });
      expect(request.isDone()).toBe(true);
    });

    it('should include the token in the Authorization header', async () => {
      const request = nock(API_URL)
        .delete(`/branding/phone/templates/${id}`)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(204, {});

      await branding.deletePhoneTemplate({ id });
      expect(request.isDone()).toBe(true);
    });
  });

  describe('#resetTemplate', () => {
    const params = { id: '5' };
    const data = {};

    const response: UpdatePhoneTemplateResponseContent = {
      id: 'template_id',
      channel: 'sms',
      customizable: true,
      tenant: 'tenant_id',
      type: 'otp_verify' as CreatePhoneTemplateResponseContentTypeEnum,
      disabled: false,
      content: {
        syntax: 'liquid',
        from: '+1234567890',
        body: {
          text: 'Your verification code is: {{code}}',
          voice: 'Your verification code is {{code}}',
        },
      },
    };

    let request: nock.Scope;

    beforeEach(() => {
      nock.cleanAll();
      request = nock(API_URL)
        .patch(`/branding/phone/templates/${params.id}/reset`, (body) => {
          return JSON.stringify(body) === JSON.stringify(data);
        })
        .reply(200, response);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return a promise if no callback is given', (done) => {
      branding
        .resetTemplate(params, data)
        .then(() => done())
        .catch((err) => done(err));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch(`/branding/phone/templates/${params.id}/reset`).reply(500, {});

      branding
        .resetTemplate(params, data)
        .then(() => done(new Error('Expected method to reject.')))
        .catch((err) => {
          expect(err).toBeDefined();
          done();
        });
    });

    it('should perform a PATCH request to /branding/phone/templates/:id/reset', (done) => {
      branding
        .resetTemplate(params, data)
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const authRequest = nock(API_URL)
        .patch(
          `/branding/phone/templates/${params.id}/reset`,
          (body) => JSON.stringify(body) === JSON.stringify(data)
        )
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, response);

      branding
        .resetTemplate(params, data)
        .then(() => {
          expect(authRequest.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('should include Content-Type application/json header', (done) => {
      nock.cleanAll();

      const contentTypeRequest = nock(API_URL)
        .patch(
          `/branding/phone/templates/${params.id}/reset`,
          (body) => JSON.stringify(body) === JSON.stringify(data)
        )
        .matchHeader('Content-Type', 'application/json')
        .reply(200, response);

      branding
        .resetTemplate(params, data)
        .then(() => {
          expect(contentTypeRequest.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      branding
        .resetTemplate(params, data)
        .then((result) => {
          expect(result.data.id).toBe(response.id);
          expect(result.data.type).toBe(response.type);
          expect(result.data.disabled).toBe(response.disabled);
          expect(result.data.channel).toBe(response.channel);
          expect(result.data.customizable).toBe(response.customizable);
          expect(result.data.tenant).toBe(response.tenant);
          expect(result.data.content.syntax).toBe(response.content.syntax);
          expect(result.data.content.from).toBe(response.content.from);
          expect(result.data.content.body?.text).toBe(response.content.body?.text);
          expect(result.data.content.body?.voice).toBe(response.content.body?.voice);
          done();
        })
        .catch(done);
    });
  });
});
