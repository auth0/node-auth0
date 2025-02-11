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

      const data = [{ name: 'twilio' }];
      nock(API_URL).get('/branding/phone/providers').reply(200, data);

      branding.getAllPhoneProviders().then((result) => {
        expect(result.data).toBeInstanceOf(Array);

        expect(result.data.length).toBe(data.length);

        expect(result.data[0].name).toBe(data[0].name);

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
});
