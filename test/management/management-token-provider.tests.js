const { expect } = require('chai');
const nock = require('nock');
const sinon = require('sinon');
const { ArgumentError } = require('rest-facade');
const { SanitizedError } = require('../../src/errors');

const ManagementTokenProvider = require('../../src/management/ManagementTokenProvider');

describe('ManagementTokenProvider', () => {
  const defaultOptions = {
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    domain: 'auth0-node-sdk.auth0.com',
    audience: 'https://auth0-node-sdk.auth0.com/api/v2/',
  };

  it('should expose an instance of ManagementTokenProvider', () => {
    expect(new ManagementTokenProvider(defaultOptions)).to.exist.to.be.an.instanceOf(
      ManagementTokenProvider
    );
  });

  it('should raise an error when no options object is provided', () => {
    expect(() => {
      new ManagementTokenProvider();
    }).to.throw(ArgumentError, 'Options must be an object');
  });

  it('should raise an error when domain is not set', () => {
    const options = Object.assign({}, defaultOptions);
    delete options.domain;

    expect(() => {
      new ManagementTokenProvider(options);
    }).to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when domain is not valid', () => {
    const options = { ...defaultOptions, domain: '' };

    expect(() => {
      new ManagementTokenProvider(options);
    }).to.throw(ArgumentError, 'Must provide a domain');
  });

  it('should raise an error when clientId is not set', () => {
    const options = { ...defaultOptions };
    delete options.clientId;

    expect(() => {
      new ManagementTokenProvider(options);
    }).to.throw(ArgumentError, 'Must provide a clientId');
  });

  it('should raise an error when clientId is not valid', () => {
    const options = { ...defaultOptions, clientId: '' };

    expect(() => {
      new ManagementTokenProvider(options);
    }).to.throw(ArgumentError, 'Must provide a clientId');
  });

  it('should raise an error when clientSecret is not set', () => {
    const options = Object.assign({}, defaultOptions);
    delete options.clientSecret;

    expect(() => {
      new ManagementTokenProvider(options);
    }).to.throw(ArgumentError, 'Must provide a clientSecret');
  });

  it('should raise an error when clientSecret is not valid', () => {
    const options = { ...defaultOptions, clientSecret: '' };

    expect(() => {
      new ManagementTokenProvider(options);
    }).to.throw(ArgumentError, 'Must provide a clientSecret');
  });

  it('should raise an error when enableCache is not of type boolean', () => {
    const options = { ...defaultOptions, enableCache: 'string' };

    expect(() => {
      new ManagementTokenProvider(options);
    }).to.throw(ArgumentError, 'enableCache must be a boolean');
  });

  it('should raise an error when scope is not of type string', () => {
    const options = { ...defaultOptions, scope: ['foo', 'bar'] };

    expect(() => {
      new ManagementTokenProvider(options);
    }).to.throw(ArgumentError, 'scope must be a string');
  });

  it('should set scope to read:users when passed as read:users', () => {
    const options = Object.assign({}, defaultOptions);
    options.scope = 'read:users';
    const provider = new ManagementTokenProvider(options);
    expect(provider.options.scope).to.be.equal('read:users');
  });

  it('should set enableCache to true when not specified', () => {
    const options = Object.assign({}, defaultOptions);
    delete options.enableCache;
    const provider = new ManagementTokenProvider(options);
    expect(provider.options.enableCache).to.be.true;
  });

  it('should set enableCache to true when passed as true', () => {
    const options = Object.assign({}, defaultOptions);
    options.enableCache = true;
    const provider = new ManagementTokenProvider(options);
    expect(provider.options.enableCache).to.be.true;
  });

  it('should set enableCache to false when passed as false', () => {
    const options = Object.assign({}, defaultOptions);
    options.enableCache = false;
    const provider = new ManagementTokenProvider(options);
    expect(provider.options.enableCache).to.be.false;
  });

  it('should raise an error when the cacheTTLInSeconds is not of type number', () => {
    const options = { ...defaultOptions, cacheTTLInSeconds: 'string' };

    expect(() => {
      new ManagementTokenProvider(options);
    }).to.throw(ArgumentError, 'cacheTTLInSeconds must be a number');
  });

  it('should raise an error when the cacheTTLInSeconds is not a greater than 0', () => {
    const options = { ...defaultOptions, cacheTTLInSeconds: -1 };

    expect(() => {
      new ManagementTokenProvider(options);
    }).to.throw(ArgumentError, 'cacheTTLInSeconds must be a greater than 0');
  });

  it('should set cacheTTLInSeconds to 15 when passed as 15', () => {
    const options = Object.assign({}, defaultOptions);
    options.cacheTTLInSeconds = 15;
    const provider = new ManagementTokenProvider(options);
    expect(provider.options.cacheTTLInSeconds).to.be.equal(15);
  });

  it('should set headers when passed into options', () => {
    const options = Object.assign({}, defaultOptions);
    options.headers = {
      'User-Agent': 'node.js',
      'Content-Type': 'application/json',
    };
    const provider = new ManagementTokenProvider(options);
    expect(provider.options.headers).to.be.equal(options.headers);
  });

  it('should handle network errors correctly', async () => {
    const options = Object.assign({}, defaultOptions);
    options.domain = 'domain';
    const client = new ManagementTokenProvider(options);

    nock(`https://${options.domain}`).post('/oauth/token').reply(401);

    try {
      await client.getAccessToken();
    } catch (err) {
      expect(err).to.exist;
      nock.cleanAll();
    }
  });

  it('should handle unauthorized errors correctly', async () => {
    const client = new ManagementTokenProvider(defaultOptions);
    nock(`https://${defaultOptions.domain}`).post('/oauth/token').reply(401);

    try {
      await client.getAccessToken();
    } catch (err) {
      expect(err).to.exist.to.be.an.instanceOf(SanitizedError);
      expect(err.statusCode).to.be.equal(401);
      nock.cleanAll();
    }
  });

  it('should expire access token from cache by the expires_in setting', async () => {
    const clock = sinon.useFakeTimers();
    const options = Object.assign({}, defaultOptions);
    options.domain = 'auth0-node-sdk-1.auth0.com';
    const client = new ManagementTokenProvider(options);

    nock(`https://${options.domain}`).post('/oauth/token').reply(200, {
      access_token: 'token',
      expires_in: 10,
    });

    let getAccessTokenPromise = client.getAccessToken();
    await clock.runAllAsync();
    await clock.runAllAsync();
    await clock.runAllAsync();
    const access_token = await getAccessTokenPromise;
    expect(access_token).to.exist;
    expect(access_token).to.be.equal('token');
    getAccessTokenPromise = client.getAccessToken();
    await clock.runAllAsync();
    await getAccessTokenPromise;
    await clock.tickAsync(10000 + 1); // + 1 ms so that the first mocked request can expire

    nock(`https://${options.domain}`).post('/oauth/token').reply(200, {
      access_token: 'token2',
      expires_in: 10,
    });
    getAccessTokenPromise = client.getAccessToken();
    await clock.runAllAsync();
    await clock.runAllAsync();
    await clock.runAllAsync();
    const access_token2 = await getAccessTokenPromise;
    expect(access_token2).to.exist;
    expect(access_token2).to.be.equal('token2');

    nock.cleanAll();
    clock.restore();
  });

  it('should return access token', async () => {
    const options = Object.assign({}, defaultOptions);
    options.domain = 'auth0-node-sdk-1.auth0.com';
    const client = new ManagementTokenProvider(options);

    nock(`https://${options.domain}`).post('/oauth/token').reply(200, {
      access_token: 'token',
      expires_in: 3600,
    });

    const accessToken = await client.getAccessToken();
    expect(accessToken).to.exist;
    expect(accessToken).to.be.equal('token');
  });

  it('should contain correct body payload', (done) => {
    const options = Object.assign({}, defaultOptions);
    options.domain = 'auth0-node-sdk-2.auth0.com';
    const client = new ManagementTokenProvider(options);

    nock(`https://${options.domain}`)
      .post('/oauth/token', (body) => {
        expect(body.client_id).to.equal('clientId');
        expect(body.client_secret).to.equal('clientSecret');
        expect(body.grant_type).to.equal('client_credentials');
        nock.cleanAll();
        done();
        return true;
      })
      .reply((uri, requestBody, cb) =>
        cb(null, [200, { access_token: 'token', expires_in: 3600 }])
      );

    client.getAccessToken();
  });

  it('should return access token from the cache the second call', async () => {
    const options = Object.assign({}, defaultOptions);
    options.domain = 'auth0-node-sdk-3.auth0.com';
    const client = new ManagementTokenProvider(options);

    nock(`https://${options.domain}`).post('/oauth/token').once().reply(200, {
      access_token: 'access_token',
      expires_in: 3600,
    });

    const clock = sinon.useFakeTimers();
    let getAccessTokenPromise = client.getAccessToken();
    await clock.runAllAsync();
    await clock.runAllAsync();
    await clock.runAllAsync();
    const accessToken = await getAccessTokenPromise;
    expect(accessToken).to.exist;
    expect(accessToken).to.be.equal('access_token');

    clock.tick(40);

    getAccessTokenPromise = client.getAccessToken();
    await clock.runAllAsync();
    const accessToken2 = await getAccessTokenPromise;
    expect(accessToken2).to.exist;
    expect(accessToken2).to.be.equal('access_token');
    nock.cleanAll();
    clock.restore();
  });

  it('should request new access token when cache is expired', (done) => {
    const options = Object.assign({}, defaultOptions);
    options.domain = 'auth0-node-sdk-4.auth0.com';
    const client = new ManagementTokenProvider(options);

    nock(`https://${options.domain}`)
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
    const options = Object.assign({}, defaultOptions);
    options.enableCache = false;
    options.domain = 'auth0-node-sdk-3.auth0.com';
    const client = new ManagementTokenProvider(options);

    nock(`https://${options.domain}`)
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
    const options = Object.assign({}, defaultOptions);
    options.domain = 'auth0-node-sdk-5.auth0.com';
    options.cacheTTLInSeconds = 10; // 1sec / 40 = 25ms;
    const client = new ManagementTokenProvider(options);

    nock(`https://${options.domain}`)
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
    const options = Object.assign({}, defaultOptions);
    options.domain = 'auth0-node-sdk-6.auth0.com';
    options.cacheTTLInSeconds = 1 / 40; // 1sec / 40 = 25ms
    const client = new ManagementTokenProvider(options);

    nock(`https://${options.domain}`)
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
    const options = Object.assign({}, defaultOptions);
    const client = new ManagementTokenProvider(options);

    nock(`https://${options.domain}`)
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
    const options = Object.assign({}, defaultOptions);
    options.enableCache = false;
    const client = new ManagementTokenProvider(options);

    nock(`https://${options.domain}`)
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
