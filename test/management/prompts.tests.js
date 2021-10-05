const { expect } = require('chai');
const nock = require('nock');

const API_URL = 'https://tenant.auth0.com';

const PromptsManager = require(`../../src/management/PromptsManager`);
const { ArgumentError } = require('rest-facade');

describe('PromptsManager', () => {
  before(function () {
    this.token = 'TOKEN';
    this.prompts = new PromptsManager({
      headers: { authorization: `Bearer ${this.token}` },
      baseUrl: API_URL,
    });
  });

  describe('instance', () => {
    const methods = ['getSettings', 'updateSettings'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect(this.prompts[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should error when no options are provided', () => {
      expect(() => {
        new PromptsManager();
      }).to.throw(ArgumentError, 'Must provide manager options');
    });

    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new PromptsManager({});
      }).to.throw(ArgumentError, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new PromptsManager({ baseUrl: '' });
      }).to.throw(ArgumentError, 'The provided base URL is invalid');
    });
  });

  describe('#getSettings', () => {
    const data = {
      universal_login_experience: '',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get('/prompts').reply(200);
    });

    it('should accept a callback', function (done) {
      this.prompts.getSettings(() => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.prompts.getSettings().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/prompts').reply(500);

      this.prompts.getSettings().catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/prompts').reply(200, data);

      this.prompts.getSettings().then((provider) => {
        expect(provider.id).to.equal(data.id);

        done();
      });
    });

    it('should perform a GET request to /api/v2/prompts', function (done) {
      const { request } = this;

      this.prompts.getSettings().then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/prompts')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.prompts.getSettings().then(() => {
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

      const request = nock(API_URL).get('/prompts').query(params).reply(200);

      this.prompts.getSettings(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateSettings', () => {
    const data = {
      universal_login_experience: 'new',
    };

    beforeEach(function () {
      this.request = nock(API_URL).patch('/prompts').reply(200, data);
    });

    it('should accept a callback', function (done) {
      this.prompts.updateSettings({}, data, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.prompts
        .updateSettings({}, data)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).patch(`/prompts/${data.id}`).reply(500);

      this.prompts.updateSettings({}, data).catch((err) => {
        expect(err).to.exist.to.be.an.instanceOf(Error);

        done();
      });
    });

    it('should perform a PATCH request to /api/v2/prompts', function (done) {
      const { request } = this;

      this.prompts.updateSettings({}, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should pass the data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).patch('/prompts', data).reply(200);

      this.prompts.updateSettings({}, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .patch('/prompts')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.prompts.updateSettings({}, data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getCustomTextByLanguage', () => {
    const params = {
      prompt: 'test',
      language: 'english',
    };

    beforeEach(function () {
      this.request = nock(API_URL).get('/prompts/test/custom-text/english').reply(200);
    });

    it('should validate empty prompt parameter', function () {
      const _this = this;
      expect(() => {
        _this.prompts.getCustomTextByLanguage({}, _this.body, () => {});
      }).to.throw('The prompt parameter must be a string');
    });

    it('should validate empty language parameter', function () {
      const _this = this;
      expect(() => {
        _this.prompts.getCustomTextByLanguage({ prompt: 'test' }, _this.body, () => {});
      }).to.throw('The language parameter must be a string');
    });

    it('should accept a callback', function (done) {
      this.prompts.getCustomTextByLanguage(params, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.prompts
        .getCustomTextByLanguage(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/prompts/test/custom-text/english').reply(500);

      this.prompts.getCustomTextByLanguage(params).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a GET request to /api/v2/prompts/test/custom-text/english', function (done) {
      const { request } = this;

      this.prompts.getCustomTextByLanguage(params).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/prompts/test/custom-text/english')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.prompts.getCustomTextByLanguage(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#updateCustomTextByLanguage', () => {
    const params = {
      prompt: 'test',
      language: 'english',
      body: { login: { title: 'Hello!' } },
    };

    beforeEach(function () {
      this.request = nock(API_URL).put('/prompts/test/custom-text/english').reply(200);
    });

    it('should validate empty prompt parameter', function () {
      const _this = this;
      expect(() => {
        _this.prompts.updateCustomTextByLanguage({}, _this.body, () => {});
      }).to.throw('The prompt parameter must be a string');
    });

    it('should validate empty language parameter', function () {
      const _this = this;
      expect(() => {
        _this.prompts.updateCustomTextByLanguage({ prompt: 'test' }, _this.body, () => {});
      }).to.throw('The language parameter must be a string');
    });

    it('should validate empty body parameter', function () {
      const _this = this;
      expect(() => {
        _this.prompts.updateCustomTextByLanguage(
          { prompt: 'test', language: 'english' },
          _this.body,
          () => {}
        );
      }).to.throw('The body parameter must be an object');
    });

    it('should accept a callback', function (done) {
      this.prompts.updateCustomTextByLanguage(params, () => {
        done();
      });
    });

    it('should return a promise if no callback is given', function (done) {
      this.prompts
        .updateCustomTextByLanguage(params)
        .then(done.bind(null, null))
        .catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).put('/prompts/test/custom-text/english').reply(500);

      this.prompts.updateCustomTextByLanguage(params).catch((err) => {
        expect(err).to.exist;

        done();
      });
    });

    it('should perform a PUT request to /api/v2/prompts/test/custom-text/english', function (done) {
      const { request } = this;

      this.prompts
        .updateCustomTextByLanguage(params)
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
        .put('/prompts/test/custom-text/english')
        .matchHeader('Authorization', `Bearer ${this.token}`)
        .reply(200);

      this.prompts.updateCustomTextByLanguage(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should send the payload to the body', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .put(
          '/prompts/test/custom-text/english',
          (body) => body && body.login && body.login.title === 'Hello!'
        )
        .reply(200);

      this.prompts.updateCustomTextByLanguage(params).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
