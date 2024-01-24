import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  GetCustomTextByLanguageLanguageEnum,
  GetCustomTextByLanguagePromptEnum,
  PromptsManager,
  PromptsSettingsUniversalLoginExperienceEnum,
  PromptsSettingsUpdateUniversalLoginExperienceEnum,
  GetTemplatePartialsByPromptEnum,
  PutTemplatePartialsByPromptEnum,
  ManagementClient,
  RequiredError,
} from '../../src/index.js';

describe('PromptsManager', () => {
  let prompts: PromptsManager;
  const token = 'TOKEN';

  beforeAll(() => {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    prompts = client.prompts;
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new PromptsManager({} as any);
      }).toThrowError(Error);
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new PromptsManager({ baseUrl: '' } as any);
      }).toThrowError(Error);
    });
  });

  describe('#get', () => {
    const data = {
      universal_login_experience: PromptsSettingsUniversalLoginExperienceEnum.classic,
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get('/prompts').reply(200, {});
    });

    it('should return a promise if no callback is given', (done) => {
      prompts.get().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/prompts').reply(500, {});

      prompts.get().catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/prompts').reply(200, data);

      prompts.get().then((provider) => {
        expect(provider.data.universal_login_experience).toBe(data.universal_login_experience);

        done();
      });
    });

    it('should perform a GET request to /api/v2/prompts', (done) => {
      prompts.get().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/prompts')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      prompts.get().then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#updateSettings', () => {
    const data = {
      universal_login_experience: PromptsSettingsUpdateUniversalLoginExperienceEnum.classic,
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).patch('/prompts').reply(200, data);
    });

    it('should return a promise if no callback is given', (done) => {
      prompts.update(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).patch(`/prompts`).reply(500, {});

      prompts.update(data).catch((err) => {
        expect(err).toBeInstanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/prompts', (done) => {
      prompts.update(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should pass the data in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(API_URL).patch('/prompts', data).reply(200, {});

      prompts.update(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/prompts')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      prompts.update(data).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#getCustomTextByLanguage', () => {
    const params = {
      prompt: GetCustomTextByLanguagePromptEnum.consent,
      language: GetCustomTextByLanguageLanguageEnum.en,
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).get('/prompts/consent/custom-text/en').reply(200, {});
    });

    it('should validate empty prompt parameter', async () => {
      await expect(prompts.getCustomTextByLanguage({} as any)).rejects.toThrowError(RequiredError);
    });

    it('should validate empty language parameter', async () => {
      await expect(prompts.getCustomTextByLanguage({} as any)).rejects.toThrowError(RequiredError);
    });

    it('should return a promise if no callback is given', (done) => {
      prompts
        .getCustomTextByLanguage(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/prompts/consent/custom-text/en').reply(500, {});

      prompts.getCustomTextByLanguage(params).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a GET request to /api/v2/prompts/consent/custom-text/nl', (done) => {
      prompts.getCustomTextByLanguage(params).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/prompts/consent/custom-text/en')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      prompts.getCustomTextByLanguage(params).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#updateCustomTextByLanguage', () => {
    const params = {
      prompt: GetCustomTextByLanguagePromptEnum.consent,
      language: GetCustomTextByLanguageLanguageEnum.en,
      body: { login: { title: 'Hello!' } },
    };
    let request: nock.Scope;

    beforeEach(() => {
      request = nock(API_URL).put('/prompts/consent/custom-text/en').reply(200, {});
    });

    it('should validate empty prompt parameter', async () => {
      await expect(prompts.updateCustomTextByLanguage({} as any, {})).rejects.toThrowError(
        RequiredError
      );
    });

    it('should validate empty language parameter', async () => {
      await expect(
        prompts.updateCustomTextByLanguage({ prompt: 'common' } as any, {})
      ).rejects.toThrowError(RequiredError);
    });

    it('should return a promise if no callback is given', (done) => {
      prompts
        .updateCustomTextByLanguage(params, params.body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).put('/prompts/consent/custom-text/en').reply(500, {});

      prompts.updateCustomTextByLanguage(params, params.body).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a PUT request to /api/v2/prompts/consent/custom-text/en', (done) => {
      prompts
        .updateCustomTextByLanguage(params, params.body)
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        })
        .catch((e) => {
          console.error(e);
        });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .put('/prompts/consent/custom-text/en')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      prompts.updateCustomTextByLanguage(params, params.body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should send the payload to the body', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .put(
          '/prompts/consent/custom-text/en',
          (body) => body && body.login && body.login.title === 'Hello!'
        )
        .reply(200, {});

      prompts.updateCustomTextByLanguage(params, params.body).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#getTemplatePartialsByPrompt', () => {
    let request: nock.Scope;
    const params = {
      prompt: GetTemplatePartialsByPromptEnum.login,
    };

    const partial = { login: { 'form-content-start': '<div>TEST</div>' } };

    beforeEach(() => {
      request = nock(API_URL).get('/prompts/login/partials').reply(200, partial);
    });

    it('should validate empty prompt parameter', async () => {
      await expect(prompts.getTemplatePartialsByPrompt({} as any)).rejects.toThrowError(
        RequiredError
      );
    });

    it('should return a promise if no callback is given', (done) => {
      prompts
        .getTemplatePartialsByPrompt(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).get('/prompts/login/partials').reply(500, {});

      prompts.getTemplatePartialsByPrompt(params).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a GET request to /api/v2/prompts/login/partials', (done) => {
      prompts.getTemplatePartialsByPrompt(params).then(() => {
        expect(request.isDone()).toBe(true);
        done();
      });
    });

    it('should return the value returned from the Management API', (done) => {
      prompts.getTemplatePartialsByPrompt(params).then((res) => {
        expect(res.data).toEqual(partial);
        done();
      });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/prompts/login/partials')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      prompts.getTemplatePartialsByPrompt(params).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });

  describe('#updateTemplatePartialsByPrompt', () => {
    let request: nock.Scope;
    const prompt = PutTemplatePartialsByPromptEnum.login;
    const partial = { login: { 'form-content-start': '<div>TESTING</div>' } };

    beforeEach(() => {
      request = nock(API_URL).put('/prompts/login/partials').reply(200, partial);
    });

    it('should validate empty prompt parameter', async () => {
      await expect(prompts.updateTemplatePartialsByPrompt({} as any, {})).rejects.toThrowError(
        RequiredError
      );
    });

    it('should return a promise if no callback is given', (done) => {
      prompts
        .updateTemplatePartialsByPrompt({ prompt }, partial)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', (done) => {
      nock.cleanAll();

      nock(API_URL).put('/prompts/login/partials').reply(500, {});

      prompts.updateTemplatePartialsByPrompt({ prompt }, partial).catch((err) => {
        expect(err).toBeDefined();

        done();
      });
    });

    it('should perform a PUT request to /api/v2/prompts/login/partials', (done) => {
      prompts
        .updateTemplatePartialsByPrompt({ prompt }, partial)
        .then(() => {
          expect(request.isDone()).toBe(true);
          done();
        })
        .catch((e) => {
          console.error(e);
        });
    });

    it('should return the value returned from the Management API', (done) => {
      prompts
        .updateTemplatePartialsByPrompt({ prompt }, partial)
        .then((res) => {
          expect(res.data).toEqual(partial);
          done();
        })
        .catch((e) => {
          console.error(e);
        });
    });

    it('should include the token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .put('/prompts/login/partials')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      prompts.updateTemplatePartialsByPrompt({ prompt }, partial).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });

    it('should send the payload to the body', (done) => {
      nock.cleanAll();

      const request = nock(API_URL)
        .put(
          '/prompts/login/partials',
          (body) => body?.login?.['form-content-start'] === '<div>TESTING</div>'
        )
        .reply(200, {});

      prompts.updateTemplatePartialsByPrompt({ prompt }, partial).then(() => {
        expect(request.isDone()).toBe(true);

        done();
      });
    });
  });
});
