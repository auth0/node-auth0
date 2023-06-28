import chai from 'chai';
import nock from 'nock';

const API_URL = 'https://tenant.auth0.com/api/v2';

import { BlacklistsManager } from '../../src/management/__generated/index';
import { ManagementClient } from '../../src/management';

const { expect } = chai;

describe('BlacklistedTokensManager', () => {
  const token = 'TOKEN';
  let blacklistedTokens: BlacklistsManager;

  before(function () {
    const client = new ManagementClient({
      domain: 'tenant.auth0.com',
      token: token,
    });
    blacklistedTokens = client.blacklists;
  });

  describe('instance', () => {
    const methods = ['add', 'getAll'];

    methods.forEach((method) => {
      it(`should have a ${method} method`, function () {
        expect((blacklistedTokens as any)[method]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#constructor', () => {
    it('should throw an error when no base URL is provided', () => {
      expect(() => {
        new BlacklistsManager({} as any);
      }).to.throw(Error, 'Must provide a base URL for the API');
    });

    it('should throw an error when the base URL is invalid', () => {
      expect(() => {
        new BlacklistsManager({ baseUrl: '' } as any);
      }).to.throw(Error, 'The provided base URL is invalid');
    });
  });

  describe('#getAll', () => {
    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL)
        .get('/blacklists/tokens')
        .reply(200, [{ aud: 'abc', jti: '123' }]);
    });

    it('should return a promise if no callback is given', function (done) {
      blacklistedTokens.getAll().then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).get('/blacklists/tokens').reply(500, {});

      blacklistedTokens.getAll().catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should pass the body of the response to the "then" handler', function (done) {
      nock.cleanAll();

      const data = [{ aud: 'abc', jti: '123' }];
      nock(API_URL).get('/blacklists/tokens').reply(200, data);

      blacklistedTokens.getAll().then((blacklistedTokens) => {
        expect(blacklistedTokens.data).to.be.an.instanceOf(Array);

        expect(blacklistedTokens.data.length).to.equal(data.length);

        expect(blacklistedTokens.data[0].aud).to.equal(data[0].aud);
        expect(blacklistedTokens.data[0].jti).to.equal(data[0].jti);

        done();
      });
    });

    it('should perform a GET request to /api/v2/blacklists/tokens', function (done) {
      blacklistedTokens.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/blacklists/tokens')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, [{ aud: 'abc', jti: '123' }]);

      blacklistedTokens.getAll().then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the parameters in the query-string', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .get('/blacklists/tokens')
        .query({
          aud: 'abc',
        })
        .reply(200, [{ aud: 'abc', jti: '123' }]);

      blacklistedTokens.getAll({ aud: 'abc' }).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });

  describe('#add', () => {
    const tokenData = {
      aud: '',
      jti: '',
    };

    let request: nock.Scope;

    beforeEach(function () {
      request = nock(API_URL).post('/blacklists/tokens').reply(200, tokenData);
    });

    it('should return a promise if no callback is given', function (done) {
      blacklistedTokens.add(tokenData).then(done.bind(null, null)).catch(done.bind(null, null));
    });

    it('should pass any errors to the promise catch handler', function (done) {
      nock.cleanAll();

      nock(API_URL).post('/blacklists/tokens').reply(500, {});

      blacklistedTokens.add(tokenData).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('should perform a POST request to /api/v2/blacklists/tokens', function (done) {
      blacklistedTokens.add(tokenData).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });

    it('should pass the token data in the body of the request', function (done) {
      nock.cleanAll();

      const request = nock(API_URL).post('/blacklists/tokens', tokenData).reply(200, {});

      blacklistedTokens.add(tokenData).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the token in the Authorization header', function (done) {
      nock.cleanAll();

      const request = nock(API_URL)
        .post('/blacklists/tokens')
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200, tokenData);

      blacklistedTokens.add(tokenData).then(() => {
        expect(request.isDone()).to.be.true;
        done();
      });
    });
  });
});
