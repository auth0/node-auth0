const { expect } = require('chai');
const nock = require('nock');

const isPromise = (thing) => thing && typeof thing.then === 'function';

const BASE_URL = 'https://tenant.auth0.com';
const CLIENT_ID = 'TEST_CLIENT_ID';

const { ArgumentError } = require('rest-facade');
const UsersManager = require('../../src/auth/UsersManager');

describe('UsersManager', () => {
  const options = {
    baseUrl: BASE_URL,
    clientId: CLIENT_ID,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  afterEach(() => {
    nock.cleanAll();
  });

  describe('#constructor', () => {
    it('should require an options object', () => {
      expect(() => {
        new UsersManager();
      }).to.throw(ArgumentError, 'Missing users manager options');
    });

    it('should require a base URL', () => {
      expect(() => {
        new UsersManager({});
      }).to.throw(ArgumentError, 'baseUrl field is required');
    });
  });

  describe('instance', () => {
    const manager = new UsersManager(options);
    const methods = ['getInfo', 'impersonate'];

    methods.forEach((methodName) => {
      it(`should have a ${methodName} method`, () => {
        expect(manager[methodName]).to.exist.to.be.an.instanceOf(Function);
      });
    });
  });

  describe('#getInfo', () => {
    const manager = new UsersManager(options);
    const path = '/userinfo';

    beforeEach(function () {
      this.request = nock(BASE_URL).get(path).reply(200);
    });

    it('should require an access token', () => {
      const getInfo = manager.getInfo.bind(manager);

      expect(getInfo).to.throw(ArgumentError, 'An access token is required');
    });

    it('should throw an error when the token is invalid', () => {
      const getInfo = manager.getInfo.bind(manager, '');

      expect(getInfo).to.throw(ArgumentError, 'Invalid access token');
    });

    it('should not throw errors when the token is valid', () => {
      const getInfo = manager.getInfo.bind(manager, 'VALID_TOKEN');

      expect(getInfo).to.not.throw(ArgumentError);
    });

    it('should accept a callback', (done) => {
      manager.getInfo('ACCESS_TOKEN', done.bind(null, null));
    });

    it('should not return a promise when a callback is provided', () => {
      const returnValue = manager.getInfo('ACCESS_TOKEN', () => {});

      expect(returnValue).to.equal(undefined);
    });

    it('should return a promise when no callback is provided', () => {
      const returnValue = manager.getInfo('ACCESS_TOKEN');

      expect(isPromise(returnValue)).ok;
    });

    it(`should perform a GET request to ${path}`, function (done) {
      const { request } = this;

      manager
        .getInfo('ACCESS_TOKEN')
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should include the headers specified in the UsersManager options', (done) => {
      nock.cleanAll();

      const request = nock(BASE_URL)
        .get('/userinfo')
        .matchHeader('Content-Type', options.headers['Content-Type'])
        .reply(200);

      manager
        .getInfo('ACCESS_TOKEN')
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should send the access token in the Authorization header', (done) => {
      nock.cleanAll();

      const request = nock(BASE_URL)
        .get('/userinfo')
        .matchHeader('Authorization', 'Bearer ACCESS_TOKEN')
        .reply(200);

      manager
        .getInfo('ACCESS_TOKEN')
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });
  });

  describe('#impersonate', () => {
    const USER_ID = encodeURIComponent('github|12345');
    const token = 'API V1 TOKEN';
    const manager = new UsersManager(options);
    const path = `/users/${USER_ID}/impersonate`;

    beforeEach(function () {
      this.request = nock(BASE_URL).post(path).reply(200);
    });

    it('should require a user ID', () => {
      const impersonate = manager.impersonate.bind(manager);

      expect(impersonate).to.throw(ArgumentError, 'You must specify a user ID');
    });

    it('should throw an error when the user ID is not valid', () => {
      const impersonate = manager.impersonate.bind(manager, '');

      expect(impersonate).to.throw(ArgumentError, 'The user ID is not valid');
    });

    it('should require the impersonation settings object', () => {
      const impersonate = manager.impersonate.bind(manager, USER_ID);

      expect(impersonate).to.throw(ArgumentError, 'Missing impersonation settings object');
    });

    it('should require an impersonator ID', () => {
      const impersonate = manager.impersonate.bind(manager, USER_ID, {});

      expect(impersonate).to.throw(ArgumentError, 'impersonator_id field is required');
    });

    it('should require a token', () => {
      const settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
      };
      const impersonate = manager.impersonate.bind(manager, USER_ID, settings);

      expect(impersonate).to.throw(ArgumentError, 'token field is required');
    });

    it('should require a protocol', () => {
      const settings = {
        impersonator_id: 'auth0|12345',
      };
      const impersonate = manager.impersonate.bind(manager, USER_ID, settings);

      expect(impersonate).to.throw(ArgumentError, 'protocol field is required');
    });

    it('should accept a callback', (done) => {
      const settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
        token,
      };

      manager.impersonate(USER_ID, settings, done.bind(null, null));
    });

    it('should not return a promise when a callback is provided', () => {
      const settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
        token,
      };
      const returnValue = manager.impersonate(USER_ID, settings, () => {});

      expect(returnValue).to.equal(undefined);
    });

    it('should return a promise when no callback is provided', () => {
      const settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
        token,
      };
      const returnValue = manager.impersonate(USER_ID, settings);

      expect(isPromise(returnValue)).ok;
    });

    it(`should perform a POST request to ${path}`, function (done) {
      const { request } = this;
      const settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
        token,
      };

      manager
        .impersonate(USER_ID, settings)
        .then(() => {
          expect(request.isDone()).to.be.true;

          done();
        })
        .catch(done);
    });

    it('should use the default client ID', (done) => {
      nock.cleanAll();

      const settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
        token,
      };
      const request = nock(BASE_URL)
        .post(path, (body) => body.client_id === CLIENT_ID)
        .reply(200);

      manager.impersonate(USER_ID, settings).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should allow the user to override the client ID', (done) => {
      nock.cleanAll();

      const settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
        clientId: 'OVERRIDEN_CLIENT_ID',
        token,
      };
      const request = nock(BASE_URL)
        .post(path, (body) => body.client_id === 'OVERRIDEN_CLIENT_ID')
        .reply(200);

      manager.impersonate(USER_ID, settings).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should use the default headers', (done) => {
      nock.cleanAll();

      const settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
        token,
      };
      const request = nock(BASE_URL)
        .post(path)
        .matchHeader('Content-Type', options.headers['Content-Type'])
        .reply(200);

      manager.impersonate(USER_ID, settings).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should use the authorization header', (done) => {
      nock.cleanAll();

      const settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
        token,
      };
      const request = nock(BASE_URL)
        .post(path)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      manager.impersonate(USER_ID, settings).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });

    it('should allow the user to add additional parameters', (done) => {
      nock.cleanAll();

      const settings = {
        impersonator_id: 'auth0|12345',
        protocol: 'oauth2',
        additionalParameters: {
          response_type: 'code',
        },
        token,
      };
      const request = nock(BASE_URL)
        .post(path, (body) => body.additionalParameters.response_type === 'code')
        .reply(200);

      manager.impersonate(USER_ID, settings).then(() => {
        expect(request.isDone()).to.be.true;

        done();
      });
    });
  });
});
