const { expect } = require('chai');
const nock = require('nock');
const { ArgumentError } = require('rest-facade');
const { SanitizedError } = require('../../src/errors');

const ManagementTokenProvider = require('../../src/management/ManagementTokenProvider');

describe('ManagementTokenProvider', () => {
  const defaultConfig = {
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    domain: 'auth0-node-sdk.auth0.com',
    audience: 'https://auth0-node-sdk.auth0.com/api/v2/',
  };

  it('should expose an instance of ManagementTokenProvider', () => {
    expect(new ManagementTokenProvider(defaultConfig)).to.exist.to.be.an.instanceOf(
      ManagementTokenProvider
    );
  });

  it('should raise an error when no options object is provided', () => {
    expect(ManagementTokenProvider).to.throw(ArgumentError, 'Options must be an object');
  });

  it('should raise an error when domain is not set', () => {
    const config = Object.assign({}, defaultConfig);
    delete config.domain;
    const provider = ManagementTokenProvider.bind(null, config);

    expect(provider).to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when domain is not valid', () => {
    const config = Object.assign({}, defaultConfig);
    config.domain = '';
    const provider = ManagementTokenProvider.bind(null, config);

    expect(provider).to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when clientId is not set', () => {
    const config = Object.assign({}, defaultConfig);
    delete config.clientId;
    const provider = ManagementTokenProvider.bind(null, config);

    expect(provider).to.throw(ArgumentError, 'Must provide a clientId');
  });

  it('should raise an error when clientId is not valid', () => {
    const config = Object.assign({}, defaultConfig);
    config.clientId = '';
    const provider = ManagementTokenProvider.bind(null, config);

    expect(provider).to.throw(ArgumentError, 'Must provide a clientId');
  });

  it('should raise an error when clientSecret is not set', () => {
    const config = Object.assign({}, defaultConfig);
    delete config.clientSecret;
    const provider = ManagementTokenProvider.bind(null, config);

    expect(provider).to.throw(ArgumentError, 'Must provide a clientSecret');
  });

  it('should raise an error when clientSecret is not valid', () => {
    const config = Object.assign({}, defaultConfig);
    config.clientSecret = '';
    const provider = ManagementTokenProvider.bind(null, config);

    expect(provider).to.throw(ArgumentError, 'Must provide a clientSecret');
  });

  it('should raise an error when enableCache is not of type boolean', () => {
    const config = Object.assign({}, defaultConfig);
    config.enableCache = 'string';
    const provider = ManagementTokenProvider.bind(null, config);

    expect(provider).to.throw(ArgumentError, 'enableCache must be a boolean');
  });

  it('should raise an error when scope is not of type string', () => {
    const config = Object.assign({}, defaultConfig);
    config.scope = ['foo', 'bar'];
    const provider = ManagementTokenProvider.bind(null, config);

    expect(provider).to.throw(ArgumentError, 'scope must be a string');
  });

  it('should set scope to read:users when passed as read:users', () => {
    const config = Object.assign({}, defaultConfig);
    config.scope = 'read:users';
    const provider = new ManagementTokenProvider(config);
    expect(provider.options.scope).to.be.equal('read:users');
  });

  it('should set enableCache to true when not specified', () => {
    const config = Object.assign({}, defaultConfig);
    delete config.enableCache;
    const provider = new ManagementTokenProvider(config);
    expect(provider.options.enableCache).to.be.true;
  });

  it('should set enableCache to true when passed as true', () => {
    const config = Object.assign({}, defaultConfig);
    config.enableCache = true;
    const provider = new ManagementTokenProvider(config);
    expect(provider.options.enableCache).to.be.true;
  });

  it('should set enableCache to false when passed as false', () => {
    const config = Object.assign({}, defaultConfig);
    config.enableCache = false;
    const provider = new ManagementTokenProvider(config);
    expect(provider.options.enableCache).to.be.false;
  });

  it('should raise an error when the cacheTTLInSeconds is not of type number', () => {
    const config = Object.assign({}, defaultConfig);
    config.cacheTTLInSeconds = 'string';
    const provider = ManagementTokenProvider.bind(null, config);

    expect(provider).to.throw(ArgumentError, 'cacheTTLInSeconds must be a number');
  });

  it('should raise an error when the cacheTTLInSeconds is not a greater than 0', () => {
    const config = Object.assign({}, defaultConfig);
    config.cacheTTLInSeconds = -1;
    const provider = ManagementTokenProvider.bind(null, config);

    expect(provider).to.throw(ArgumentError, 'cacheTTLInSeconds must be a greater than 0');
  });

  it('should set cacheTTLInSeconds to 15 when passed as 15', () => {
    const config = Object.assign({}, defaultConfig);
    config.cacheTTLInSeconds = 15;
    const provider = new ManagementTokenProvider(config);
    expect(provider.options.cacheTTLInSeconds).to.be.equal(15);
  });

  it('should set headers when passed into options', () => {
    const config = Object.assign({}, defaultConfig);
    config.headers = {
      'User-Agent': 'node.js',
      'Content-Type': 'application/json',
    };
    const provider = new ManagementTokenProvider(config);
    expect(provider.options.headers).to.be.equal(config.headers);
  });

  it('should handle network errors correctly', (done) => {
    const config = Object.assign({}, defaultConfig);
    config.domain = 'domain';
    const client = new ManagementTokenProvider(config);

    nock(`https://${config.domain}`).post('/oauth/token').reply(401);

    client.getAccessToken().catch((err) => {
      expect(err).to.exist;
      done();
      nock.cleanAll();
    });
  });

  it('should handle unauthorized errors correctly', (done) => {
    const client = new ManagementTokenProvider(defaultConfig);
    nock(`https://${defaultConfig.domain}`).post('/oauth/token').reply(401);

    client.getAccessToken().catch((err) => {
      expect(err).to.exist.to.be.an.instanceOf(SanitizedError);
      expect(err.statusCode).to.be.equal(401);
      done();
      nock.cleanAll();
    });
  });
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  it('should expire access token from cache by the expires_in setting', async function () {
    this.timeout(15000); // buffer time to test an artificial delay of 10s

    const config = Object.assign({}, defaultConfig);
    config.domain = 'auth0-node-sdk-1.auth0.com';
    const client = new ManagementTokenProvider(config);

    nock(`https://${config.domain}`).post('/oauth/token').reply(200, {
      access_token: 'token',
      expires_in: 10,
    });

    const access_token = await client.getAccessToken();
    expect(access_token).to.exist;
    expect(access_token).to.be.equal('token');
    await client.getAccessToken();
    await timeout(10000);

    nock(`https://${config.domain}`).post('/oauth/token').reply(200, {
      access_token: 'token2',
      expires_in: 10,
    });
    const access_token2 = await client.getAccessToken();
    expect(access_token2).to.exist;
    expect(access_token2).to.be.equal('token2');

    nock.cleanAll();
  });

  it('should return access token', (done) => {
    const config = Object.assign({}, defaultConfig);
    config.domain = 'auth0-node-sdk-1.auth0.com';
    const client = new ManagementTokenProvider(config);

    nock(`https://${config.domain}`).post('/oauth/token').reply(200, {
      access_token: 'token',
      expires_in: 3600,
    });

    client.getAccessToken().then((access_token) => {
      expect(access_token).to.exist;
      expect(access_token).to.be.equal('token');
      done();
      nock.cleanAll();
    });
  });

  it('should contain correct body payload', (done) => {
    const config = Object.assign({}, defaultConfig);
    config.domain = 'auth0-node-sdk-2.auth0.com';
    const client = new ManagementTokenProvider(config);

    nock(`https://${config.domain}`)
      .post('/oauth/token', (body) => {
        expect(body.client_id).to.equal('clientId');
        expect(body.client_secret).to.equal('clientSecret');
        expect(body.grant_type).to.equal('client_credentials');
        return true;
      })
      .reply((uri, requestBody, cb) =>
        cb(null, [200, { access_token: 'token', expires_in: 3600 }])
      );

    client.getAccessToken().then(() => {
      done();
      nock.cleanAll();
    });
  });

  it('should return access token from the cache the second call', (done) => {
    const config = Object.assign({}, defaultConfig);
    config.domain = 'auth0-node-sdk-3.auth0.com';
    const client = new ManagementTokenProvider(config);

    nock(`https://${config.domain}`).post('/oauth/token').once().reply(200, {
      access_token: 'access_token',
      expires_in: 3600,
    });

    client.getAccessToken().then((access_token) => {
      expect(access_token).to.exist;
      expect(access_token).to.be.equal('access_token');

      setTimeout(() => {
        client
          .getAccessToken()
          .then((access_token) => {
            expect(access_token).to.exist;
            expect(access_token).to.be.equal('access_token');
            done();
            nock.cleanAll();
          })
          .catch(() => {
            expect.fail();
            done();
            nock.cleanAll();
          });
      }, 40);
    });
  });

  it('should request new access token when cache is expired', (done) => {
    const config = Object.assign({}, defaultConfig);
    config.domain = 'auth0-node-sdk-4.auth0.com';
    const client = new ManagementTokenProvider(config);

    nock(`https://${config.domain}`)
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
        expires_in: 1 / 40, // 1sec / 40 = 25ms
      })
      .post('/oauth/token')
      .reply(200, {
        access_token: 'new_access_token',
        expires_in: 3600,
      });

    client.getAccessToken().then((access_token) => {
      expect(access_token).to.exist;
      expect(access_token).to.be.equal('access_token');

      setTimeout(() => {
        client
          .getAccessToken()
          .then((access_token) => {
            expect(access_token).to.exist;
            expect(access_token).to.be.equal('new_access_token');
            done();
            nock.cleanAll();
          })
          .catch(() => {
            expect.fail();
            done();
            nock.cleanAll();
          });
      }, 40);
    });
  });

  it('should return new access token on the second call when cache is disabled', (done) => {
    const config = Object.assign({}, defaultConfig);
    config.enableCache = false;
    config.domain = 'auth0-node-sdk-3.auth0.com';
    const client = new ManagementTokenProvider(config);

    nock(`https://${config.domain}`)
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
        expires_in: 3600,
      })
      .post('/oauth/token')
      .reply(200, {
        access_token: 'new_access_token',
        expires_in: 3600,
      });

    client.getAccessToken().then((access_token) => {
      expect(access_token).to.exist;
      expect(access_token).to.be.equal('access_token');

      setTimeout(() => {
        client
          .getAccessToken()
          .then((access_token) => {
            expect(access_token).to.exist;
            expect(access_token).to.be.equal('new_access_token');
            done();
            nock.cleanAll();
          })
          .catch(() => {
            expect.fail();
            done();
            nock.cleanAll();
          });
      }, 40);
    });
  });

  it('should return cached access token on the second call when cacheTTLInSeconds is not passed', (done) => {
    const config = Object.assign({}, defaultConfig);
    config.domain = 'auth0-node-sdk-5.auth0.com';
    config.cacheTTLInSeconds = 10; // 1sec / 40 = 25ms;
    const client = new ManagementTokenProvider(config);

    nock(`https://${config.domain}`)
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
      })
      .post('/oauth/token')
      .reply(200, {
        access_token: 'new_access_token',
      });

    client.getAccessToken().then((access_token) => {
      expect(access_token).to.exist;
      expect(access_token).to.be.equal('access_token');

      setTimeout(() => {
        client
          .getAccessToken()
          .then((access_token) => {
            expect(access_token).to.exist;
            expect(access_token).to.be.equal('access_token');
            done();
            nock.cleanAll();
          })
          .catch(() => {
            expect.fail();
            done();
            nock.cleanAll();
          });
      }, 40);
    });
  });

  it('should return new access token on the second call when cacheTTLInSeconds is passed', (done) => {
    const config = Object.assign({}, defaultConfig);
    config.domain = 'auth0-node-sdk-6.auth0.com';
    config.cacheTTLInSeconds = 1 / 40; // 1sec / 40 = 25ms
    const client = new ManagementTokenProvider(config);

    nock(`https://${config.domain}`)
      .post('/oauth/token')
      .reply(200, {
        access_token: 'access_token',
      })
      .post('/oauth/token')
      .reply(200, {
        access_token: 'new_access_token',
      });

    client.getAccessToken().then((access_token) => {
      expect(access_token).to.exist;
      expect(access_token).to.be.equal('access_token');

      setTimeout(() => {
        client
          .getAccessToken()
          .then((access_token) => {
            expect(access_token).to.exist;
            expect(access_token).to.be.equal('new_access_token');
            done();
            nock.cleanAll();
          })
          .catch(() => {
            expect.fail();
            done();
            nock.cleanAll();
          });
      }, 40);
    });
  });

  it('should pass the correct payload in the body of the oauth/token request with cache enabled', (done) => {
    const config = Object.assign({}, defaultConfig);
    const client = new ManagementTokenProvider(config);

    nock(`https://${config.domain}`)
      .post('/oauth/token', (payload) => {
        expect(payload).to.exist;
        expect(payload.client_id).to.be.equal('clientId');
        expect(payload.client_secret).to.be.equal('clientSecret');
        expect(payload.grant_type).to.be.equal('client_credentials');
        return true;
      })
      .reply(200);

    client.getAccessToken().then(() => {
      done();
      nock.cleanAll();
    });
  });

  it('should pass the correct payload in the body of the oauth/token request with cache disabled', (done) => {
    const config = Object.assign({}, defaultConfig);
    config.enableCache = false;
    const client = new ManagementTokenProvider(config);

    nock(`https://${config.domain}`)
      .post('/oauth/token', (payload) => {
        expect(payload).to.exist;
        expect(payload.client_id).to.be.equal('clientId');
        expect(payload.client_secret).to.be.equal('clientSecret');
        expect(payload.grant_type).to.be.equal('client_credentials');
        return true;
      })
      .reply(200);

    client.getAccessToken().then(() => {
      done();
      nock.cleanAll();
    });
  });
});
