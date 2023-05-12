import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import {
  GetCustomTextByLanguageLanguageEnum,
  GetCustomTextByLanguagePromptEnum,
  PromptsManager,
  PromptsSettingsUniversalLoginExperienceEnum,
  PromptsSettingsUpdateUniversalLoginExperienceEnum,
} from '../../src/management/__generated/index';
import { RequiredError } from '../../src/lib/errors';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('PromptsManager', () => {
  let prompts: PromptsManager;
  const token = 'TOKEN';

  before(function () {
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
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new PromptsManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#get', () => {
    const data = {
      universal_login_experience: PromptsSettingsUniversalLoginExperienceEnum.classic,
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).get('/prompts').reply(200, {});
    });

    it('should return a promise if no callback is given', function (done) {
      prompts.get().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/prompts').reply(500);

      prompts.get().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/prompts').reply(200, data);

      prompts.get().then((provider) => {
        expect(provider.data.universal_login_experience).to.equal(data.universal_login_experience);

        done();
      });
    });

    it('should perform a GET request to /api/v2/prompts', function (done) {
      prompts.get().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/prompts')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      prompts.get().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateSettings', () => {
    const data = {
      universal_login_experience: PromptsSettingsUpdateUniversalLoginExperienceEnum.classic,
    };
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).patch('/prompts').reply(200, data);
    });

    it('should return a promise if no callback is given', function (done) {
      prompts.update(data).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/prompts`).reply(500);

      prompts.update(data).catch((err) => {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/prompts', function (done) {
      prompts.update(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch('/prompts', data).reply(200, {});

      prompts.update(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/prompts')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      prompts.update(data).then(() => {
        expect(request.isDone()).to.be.true;

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

    beforeEach(function () {
      request = nock(API_URL).get('/prompts/consent/custom-text/en').reply(200, {});
    });

    it('should validate empty prompt parameter', function () {
      expect(prompts.getCustomTextByLanguage({} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.prompt was null or undefined.`
      );
    });

    it('should validate empty language parameter', function () {
      expect(prompts.getCustomTextByLanguage({} as any)).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.language was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', function (done) {
      prompts
        .getCustomTextByLanguage(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/prompts/consent/custom-text/en').reply(500);

      prompts.getCustomTextByLanguage(params).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a GET request to /api/v2/prompts/consent/custom-text/nl', function (done) {
      prompts.getCustomTextByLanguage(params).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/prompts/consent/custom-text/en')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      prompts.getCustomTextByLanguage(params).then(() => {
        expect(request.isDone()).to.be.true;

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

    beforeEach(function () {
      request = nock(API_URL).put('/prompts/consent/custom-text/en').reply(200, {});
    });

    it('should validate empty prompt parameter', function () {
      expect(prompts.updateCustomTextByLanguage({} as any, {})).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.prompt was null or undefined.`
      );
    });

    it('should validate empty language parameter', function () {
      expect(
        prompts.updateCustomTextByLanguage({ prompt: 'common' } as any, {})
      ).to.be.rejectedWith(
        RequiredError,
        `Required parameter requestParameters.language was null or undefined.`
      );
    });

    it('should return a promise if no callback is given', function (done) {
      prompts
        .updateCustomTextByLanguage(params, params.body)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).put('/prompts/consent/custom-text/en').reply(500);

      prompts.updateCustomTextByLanguage(params, params.body).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a PUT request to /api/v2/prompts/consent/custom-text/en', function (done) {
      prompts
        .updateCustomTextByLanguage(params, params.body)
        .then(() => {
          expect(request.isDone()).to.be.true;
          done();
        })
        .catch((e) => {
          console.error(e);
        });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .put('/prompts/consent/custom-text/en')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, {});

      prompts.updateCustomTextByLanguage(params, params.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should send the payload to the body', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .put(
          '/prompts/consent/custom-text/en',
          (body) => body && body.login && body.login.title === 'Hello!'
        )
        .reply(200, {});

      prompts.updateCustomTextByLanguage(params, params.body).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
