const { expect } = require('chai');
const nock = require('nock');

const isPromise = (thing) => thing && typeof thing.then === 'function';

const BASE_URL = 'https://tenant.auth0.com';

const { ArgumentError } = require('rest-facade');
const TokensManager = require('../../src/auth/TokensManager');

describe('TokensManager', () => {
  const validOptions = {
    baseUrl: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Test-Header': 'TEST',
    },
    clientId: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
  };

  afterEach(() => {
    nock.cleanAll();
  });

  describe('#constructor', () => {
    it('should require an options object', () => {
      expect(() => {
        new TokensManager();
      }).to.throw(ArgumentError, 'Missing tokens manager options');
    });

    it('should require a base URL', () => {
      expect(() => {
        new TokensManager({});
      }).to.throw(ArgumentError, 'baseUrl field is required');
    });
  });

  describe('instance', () => {
    const methods = ['getInfo', 'getDelegationToken', 'revokeRefreshToken'];
    const manager = new TokensManager(validOptions);

    methods.forEach((methodName) => {
      it(`should have a ${methodName} method`, () => {
        expect(manager[methodName]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#getInfo', () => {
    const manager = new TokensManager(validOptions);
    const path = '/tokeninfo';

    beforeEach(function () {
      this.request = nock(BASE_URL).post(path).reply(200);
    });

    it('should require an ID token', () => {
      const getInfo = manager.getInfo.bind(manager);

      expect(getInfo).to.throw(ArgumentError, 'An ID token is required');
    });

    it('should throw an error when the token is invalid', () => {
      const getInfo = manager.getInfo.bind(manager, '');

      expect(getInfo).to.throw(ArgumentError, 'The ID token is not valid');
    });

    it('should not throw errors when the token is valid', () => {
      const getInfo = manager.getInfo.bind(manager, 'VALID_TOKEN');

      expect(getInfo).to.not.throw(ArgumentError);
    });

    it('should accept a callback', (done) => {
      manager.getInfo('VALID_TOKEN', done.bind(null, null));
    });

    it('should return a promise when no callback is provided', () => {
      const returnValue = manager.getInfo('VALID_TOKEN');
      expect(isPromise(returnValue)).ok;
    });

    it('should not return a promise when a callback is provided', () => {
      const returnValue = manager.getInfo('VALID_TOKEN', () => {});

      expect(returnValue).to.be.undefined;
    });

    it(`should perform a POST request to ${path}`, function (done) {
      const { request } = this;

      manager.getInfo('VALID_TOKEN').then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the headers specified in the instance options', (done) => {
      nock.cleanAll();

      const request = nock(BASE_URL)
        .post(path)
        .matchHeader('Content-Type', validOptions.headers['Content-Type'])
        .reply(200);

      manager.getInfo('VALID_TOKEN').then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should send the ID token in the body of the request', (done) => {
      nock.cleanAll();

      const request = nock(BASE_URL)
        .post(path, (body) => body.id_token === 'VALID_TOKEN')
        .reply(200);

      manager.getInfo('VALID_TOKEN').then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#getDelegationToken', () => {
    const path = '/delegation';
    const manager = new TokensManager(validOptions);

    beforeEach(function () {
      this.request = nock(BASE_URL).post(path).reply(200);
    });

    it('should require a data object', () => {
      const getDelegationToken = manager.getDelegationToken.bind(manager);

      expect(getDelegationToken).to.throw(ArgumentError, 'Missing token data object');
    });

    it('should require an ID token or refresh token', () => {
      const data = {};
      const getDelegationToken = manager.getDelegationToken.bind(manager, data);

      expect(getDelegationToken).to.throw(
        ArgumentError,
        'one of id_token or refresh_token is required'
      );
    });

    it('should not accept an ID token and a refresh token simulatenously', () => {
      const data = { id_token: 'foo', refresh_token: 'bar' };
      const getDelegationToken = manager.getDelegationToken.bind(manager, data);

      expect(getDelegationToken).to.throw(
        ArgumentError,
        'id_token and refresh_token fields cannot be specified simulatenously'
      );
    });

    it('should require a target client', () => {
      const data = { id_token: 'TEST_ID_TOKEN' };
      const getDelegationToken = manager.getDelegationToken.bind(manager, data);

      expect(getDelegationToken).to.throw(ArgumentError, 'target field is required');
    });

    it('should require an API type', () => {
      const data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
      };
      const getDelegationToken = manager.getDelegationToken.bind(manager, data);

      expect(getDelegationToken).to.throw(ArgumentError, 'api_type field is required');
    });

    it('should require an grant type', () => {
      const data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
      };
      const getDelegationToken = manager.getDelegationToken.bind(manager, data);

      expect(getDelegationToken).to.throw(ArgumentError, 'grant_type field is required');
    });

    it('should accept a callback', (done) => {
      const data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE',
      };

      manager.getDelegationToken(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', () => {
      const data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE',
      };
      const returnValue = manager.getDelegationToken(data);
      expect(isPromise(returnValue)).ok;
    });

    it('should not return a promise when a callback is given', () => {
      const data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE',
      };
      const returnValue = manager.getDelegationToken(data, () => {});

      expect(returnValue).to.equal(undefined);
    });

    it(`should perform a POST request to ${path}`, () => {});

    it('should include the data in the body of the request', (done) => {
      nock.cleanAll();

      const data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE',
      };

      const request = nock(BASE_URL)
        .post(path, (body) => {
          for (const property in data) {
            if (body[property] !== data[property]) {
              return false;
            }
          }

          return true;
        })
        .reply();

      manager.getDelegationToken(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should use the instance client ID if none specified', (done) => {
      nock.cleanAll();

      const data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE',
      };

      const request = nock(BASE_URL)
        .post(path, (body) => body.client_id === validOptions.clientId)
        .reply();

      manager.getDelegationToken(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should let the user override the default client ID', (done) => {
      nock.cleanAll();

      const data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE',
        client_id: 'OVERRIDEN_CLIENT_ID',
      };

      const request = nock(BASE_URL)
        .post(path, (body) => body.client_id === data.client_id)
        .reply();

      manager.getDelegationToken(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the headers specified in the instance options', (done) => {
      nock.cleanAll();

      const data = {
        id_token: 'TEST_ID_TOKEN',
        target: 'TEST_TARGET',
        api_type: 'aws',
        grant_type: 'SAMPLE_GRANT_TYPE',
      };

      const request = nock(BASE_URL)
        .post(path)
        .matchHeader('Test-Header', validOptions.headers['Test-Header'])
        .reply(200);

      manager.getDelegationToken(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });

  describe('#revokeRefreshToken', () => {
    const path = '/oauth/revoke';
    const manager = new TokensManager(validOptions);

    beforeEach(function () {
      this.request = nock(BASE_URL).post(path).reply(200);
    });

    it('should require a token data object', () => {
      const revokeRefreshToken = manager.revokeRefreshToken.bind(manager);

      expect(revokeRefreshToken).to.throw(ArgumentError, 'Missing token data object');
    });

    it('should require a token property in the token data object', () => {
      const data = {};
      const revokeRefreshToken = manager.revokeRefreshToken.bind(manager, data);

      expect(revokeRefreshToken).to.throw(ArgumentError, 'token property is required');
    });

    it('should require at least a target client ID', () => {
      const manager = new TokensManager({
        baseUrl: BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          'Test-Header': 'TEST',
        },
      });

      const data = {
        token: 'TEST_REFRESH_TOKEN',
      };

      const revokeRefreshToken = manager.revokeRefreshToken.bind(manager, data);

      expect(revokeRefreshToken).to.throw(
        ArgumentError,
        'Neither token data client_id property or constructor clientId property has been set'
      );
    });

    it('should accept a callback', (done) => {
      const data = {
        token: 'TEST_REFRESH_TOKEN',
      };

      manager.revokeRefreshToken(data, done.bind(null, null));
    });

    it('should return a promise when no callback is given', () => {
      const data = {
        token: 'TEST_REFRESH_TOKEN',
      };
      const returnValue = manager.revokeRefreshToken(data);
      expect(isPromise(returnValue)).ok;
    });

    it('should not return a promise when a callback is given', () => {
      const data = {
        token: 'TEST_REFRESH_TOKEN',
      };
      const returnValue = manager.revokeRefreshToken(data, () => {});

      expect(returnValue).to.equal(undefined);
    });

    it(`should perform a POST request to ${path}`, () => {});

    it('should include the data in the body of the request', (done) => {
      nock.cleanAll();

      const data = {
        token: 'TEST_REFRESH_TOKEN',
      };

      const request = nock(BASE_URL)
        .post(path, (body) => {
          for (const property in data) {
            if (body[property] !== data[property]) {
              return false;
            }
          }

          return true;
        })
        .reply();

      manager.revokeRefreshToken(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should use the TokensManager instance client ID if none specified', (done) => {
      nock.cleanAll();

      const data = {
        token: 'TEST_REFRESH_TOKEN',
      };

      const request = nock(BASE_URL)
        .post(path, (body) => body.client_id === validOptions.clientId)
        .reply();

      manager.revokeRefreshToken(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should let the user override the default client ID', (done) => {
      nock.cleanAll();

      const data = {
        token: 'TEST_REFRESH_TOKEN',
        client_id: 'OVERRIDEN_CLIENT_ID',
      };

      const request = nock(BASE_URL)
        .post(path, (body) => body.client_id === data.client_id)
        .reply();

      manager.revokeRefreshToken(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should use the TokensManager instance client secret if none specified', (done) => {
      nock.cleanAll();

      const data = {
        token: 'TEST_REFRESH_TOKEN',
      };

      const request = nock(BASE_URL)
        .post(path, (body) => body.client_secret === validOptions.clientSecret)
        .reply();

      manager.revokeRefreshToken(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should let the user override the default client secret', (done) => {
      nock.cleanAll();

      const data = {
        token: 'TEST_REFRESH_TOKEN',
        client_secret: 'OVERRIDEN_CLIENT_SECRET',
      };

      const request = nock(BASE_URL)
        .post(path, (body) => body.client_secret === data.client_secret)
        .reply();

      manager.revokeRefreshToken(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should include the headers specified in the instance options', (done) => {
      nock.cleanAll();

      const data = {
        token: 'TEST_REFRESH_TOKEN',
      };

      const request = nock(BASE_URL)
        .post(path)
        .matchHeader('Test-Header', validOptions.headers['Test-Header'])
        .reply(200);

      manager.revokeRefreshToken(data).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
