const { promisify } = require('util');
const { expect } = require('chai');
const nock = require('nock');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { TEST_PUBLIC_KEY, TEST_PRIVATE_KEY } = require('./constants');

const verify = promisify(jwt.verify);
const sign = promisify(jwt.sign);

const { AuthenticationClient, ManagementClient } = require('../src', {});

const URL = 'https://tenant.auth0.com/';
const clientId = 'test-client-id';
const verifyOpts = {
  algorithms: ['RS256'],
  audience: URL,
  issuer: clientId,
  subject: clientId,
  maxAge: 180,
};

describe('client authentication', () => {
  let path;
  let body;
  let headers;
  let clientAssertion;

  beforeEach(() => {
    path = sinon.spy();
    body = sinon.spy();
    headers = sinon.spy();
    clientAssertion = sinon.spy();

    async function handler(pathIn, bodyIn) {
      path(pathIn);
      body(bodyIn);
      headers(this.req.headers);
      if (bodyIn.client_assertion) {
        clientAssertion(await verify(bodyIn.client_assertion, TEST_PUBLIC_KEY, verifyOpts));
      }
      return {
        access_token: 'test-access-token',
      };
    }

    nock(URL)
      .post('/oauth/token')
      .reply(200, handler)
      .post('/oauth/revoke')
      .reply(200, handler)
      .get('/api/v2/clients')
      .reply(200, handler)
      .persist();
  });

  afterEach(() => {
    nock.cleanAll();
    path = null;
    body = null;
    headers = null;
    clientAssertion = null;
  });

  it('should do client credentials grant with a client secret', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientSecret: 'foo',
    });
    await auth0.clientCredentialsGrant({
      audience: 'my-api',
    });
    sinon.assert.calledWith(path, '/oauth/token');
    sinon.assert.calledWithMatch(body, {
      grant_type: 'client_credentials',
      client_id: clientId,
      audience: 'my-api',
      client_secret: 'foo',
    });
  });

  it('should do client credentials grant with a client assertion', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientAssertionSigningKey: TEST_PRIVATE_KEY,
    });
    await auth0.clientCredentialsGrant({
      audience: 'my-api',
    });
    sinon.assert.calledWith(path, '/oauth/token');
    sinon.assert.calledWithMatch(body, {
      grant_type: 'client_credentials',
      client_id: clientId,
      audience: 'my-api',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    });
    sinon.assert.calledWithMatch(clientAssertion, {
      iss: clientId,
      sub: clientId,
      aud: URL,
      iat: sinon.match.number,
      exp: sinon.match.number,
      jti: sinon.match.string,
    });
  });

  it('should require a client secret or client assertion with client credentials grant', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
    });
    expect(() =>
      auth0.clientCredentialsGrant({
        audience: 'my-api',
      })
    ).to.throw('The client_secret or client_assertion field is required.');
  });

  it('should allow you to pass your own client assertion', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
    });
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: clientId,
      sub: clientId,
      aud: URL,
      iat: now,
      exp: now + 180,
      jti: 'foo',
    };
    await auth0.clientCredentialsGrant({
      audience: 'my-api',
      client_assertion: await sign(payload, TEST_PRIVATE_KEY, { algorithm: 'RS256' }),
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    });
    sinon.assert.calledWith(path, '/oauth/token');
    sinon.assert.calledWithMatch(body, {
      grant_type: 'client_credentials',
      client_id: clientId,
      audience: 'my-api',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    });
    sinon.assert.calledWithMatch(clientAssertion, {
      iss: clientId,
      sub: clientId,
      aud: URL,
      iat: sinon.match.number,
      exp: sinon.match.number,
      jti: 'foo',
    });
  });

  it('should do password grant with a client secret', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientSecret: 'foo',
    });
    await auth0.passwordGrant({
      username: 'foo',
      password: 'bar',
    });
    sinon.assert.calledWith(path, '/oauth/token');
    sinon.assert.calledWithMatch(body, {
      grant_type: 'password',
      username: 'foo',
      password: 'bar',
      client_secret: 'foo',
    });
  });

  it('should do password grant grant with a client assertion', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientAssertionSigningKey: TEST_PRIVATE_KEY,
    });
    await auth0.passwordGrant({
      username: 'foo',
      password: 'bar',
    });
    sinon.assert.calledWith(path, '/oauth/token');
    sinon.assert.calledWithMatch(body, {
      grant_type: 'password',
      username: 'foo',
      password: 'bar',
      client_id: clientId,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    });
    sinon.assert.calledWithMatch(clientAssertion, {
      iss: clientId,
      sub: clientId,
      aud: URL,
      iat: sinon.match.number,
      exp: sinon.match.number,
      jti: sinon.match.string,
    });
  });

  it('should do authz code grant with a client secret', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientSecret: 'foo',
    });
    await auth0.oauth.authorizationCodeGrant({
      code: 'foo',
      redirect_uri: 'bar',
    });
    sinon.assert.calledWith(path, '/oauth/token');
    sinon.assert.calledWithMatch(body, {
      grant_type: 'authorization_code',
      client_id: 'test-client-id',
      code: 'foo',
      redirect_uri: 'bar',
      client_secret: 'foo',
    });
  });

  it('should do authz code grant with a client assertion', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientAssertionSigningKey: TEST_PRIVATE_KEY,
    });
    await auth0.oauth.authorizationCodeGrant({
      code: 'foo',
      redirect_uri: 'bar',
    });
    sinon.assert.calledWith(path, '/oauth/token');
    sinon.assert.calledWithMatch(body, {
      grant_type: 'authorization_code',
      client_id: 'test-client-id',
      code: 'foo',
      redirect_uri: 'bar',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    });
    sinon.assert.calledWithMatch(clientAssertion, {
      iss: clientId,
      sub: clientId,
      aud: URL,
      iat: sinon.match.number,
      exp: sinon.match.number,
      jti: sinon.match.string,
    });
  });

  it('should do refresh grant with a client secret', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientSecret: 'foo',
    });
    await auth0.oauth.refreshToken({
      refresh_token: 'foo',
    });
    sinon.assert.calledWith(path, '/oauth/token');
    sinon.assert.calledWithMatch(body, {
      grant_type: 'refresh_token',
      client_id: 'test-client-id',
      refresh_token: 'foo',
      client_secret: 'foo',
    });
  });

  it('should do refresh grant with a client assertion', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientAssertionSigningKey: TEST_PRIVATE_KEY,
    });
    await auth0.oauth.refreshToken({
      refresh_token: 'foo',
    });
    sinon.assert.calledWith(path, '/oauth/token');
    sinon.assert.calledWithMatch(body, {
      grant_type: 'refresh_token',
      client_id: 'test-client-id',
      refresh_token: 'foo',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    });
    sinon.assert.calledWithMatch(clientAssertion, {
      iss: clientId,
      sub: clientId,
      aud: URL,
      iat: sinon.match.number,
      exp: sinon.match.number,
      jti: sinon.match.string,
    });
  });

  it('should revoke refresh token with a client secret', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientSecret: 'foo',
    });
    await auth0.tokens.revokeRefreshToken({
      token: 'foo',
    });
    sinon.assert.calledWith(path, '/oauth/revoke');
    sinon.assert.calledWithMatch(body, {
      client_id: 'test-client-id',
      token: 'foo',
      client_secret: 'foo',
    });
  });

  it('should do revoke refresh token with a client assertion', async () => {
    const auth0 = new AuthenticationClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientAssertionSigningKey: TEST_PRIVATE_KEY,
    });
    await auth0.tokens.revokeRefreshToken({
      token: 'foo',
    });
    sinon.assert.calledWith(path, '/oauth/revoke');
    sinon.assert.calledWithMatch(body, {
      client_id: 'test-client-id',
      token: 'foo',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    });
    sinon.assert.calledWithMatch(clientAssertion, {
      iss: clientId,
      sub: clientId,
      aud: URL,
      iat: sinon.match.number,
      exp: sinon.match.number,
      jti: sinon.match.string,
    });
  });

  it('should use the management api with a client secret', async () => {
    const auth0 = new ManagementClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientSecret: 'foo',
    });
    await auth0.getClients();
    sinon.assert.calledWith(path, '/oauth/token');
    sinon.assert.calledWith(path, '/api/v2/clients');
    sinon.assert.calledWithMatch(body, {
      grant_type: 'client_credentials',
      client_id: clientId,
      audience: 'https://tenant.auth0.com/api/v2/',
      client_secret: 'foo',
    });
    sinon.assert.calledWithMatch(headers, {
      authorization: 'Bearer test-access-token',
    });
  });
  it('should use the management api with a client assertion', async () => {
    const auth0 = new ManagementClient({
      domain: 'tenant.auth0.com',
      clientId,
      clientAssertionSigningKey: TEST_PRIVATE_KEY,
    });
    await auth0.getClients();
    sinon.assert.calledWith(path, '/oauth/token');
    sinon.assert.calledWith(path, '/api/v2/clients');
    sinon.assert.calledWithMatch(body, {
      grant_type: 'client_credentials',
      client_id: clientId,
      audience: 'https://tenant.auth0.com/api/v2/',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    });
    sinon.assert.calledWithMatch(headers, {
      authorization: 'Bearer test-access-token',
    });
    sinon.assert.calledWithMatch(clientAssertion, {
      iss: clientId,
      sub: clientId,
      aud: URL,
      iat: sinon.match.number,
      exp: sinon.match.number,
      jti: sinon.match.string,
    });
  });
});
