import nock from 'nock';
import querystring from 'querystring';

import { AuthorizeOptions, Backchannel } from '../../src/auth/backchannel.js';

const opts = {
  domain: 'test-domain.auth0.com',
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
};

const jwtOpts = {
  ...opts,
  clientAssertion: 'test-client-assertion',
  clientAssertionType: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
};

const mtlsOpts = {
  ...opts,
  clientCertificate: 'test-client-certificate',
  clientCertificateCA: 'test-client-certificate-ca-verified',
};

describe('Backchannel', () => {
  let backchannel: Backchannel;

  beforeAll(() => {
    backchannel = new Backchannel(opts);
  });

  beforeEach(() => {
    nock.cleanAll();
  });

  describe('#authorize', () => {
    it('should require a userId', async () => {
      nock(`https://${opts.domain}`).post('/bc-authorize').reply(400, {
        error: 'invalid_request',
        error_description:
          'login_hint parameter validation failed: "sub" contains unsupported format',
      });

      await expect(backchannel.authorize({} as AuthorizeOptions)).rejects.toThrow(
        'login_hint parameter validation failed: "sub" contains unsupported format'
      );
    });

    it('should require a binding_message', async () => {
      nock(`https://${opts.domain}`).post('/bc-authorize').reply(400, {
        error: 'invalid_request',
        error_description: 'binding_message is required',
      });

      await expect(
        backchannel.authorize({ userId: 'auth0|test-user-id' } as AuthorizeOptions)
      ).rejects.toThrow('binding_message is required');
    });

    it('should require a valid openid scope', async () => {
      nock(`https://${opts.domain}`).post('/bc-authorize').reply(400, {
        error: 'invalid_scope',
        error_description: 'openid scope must be requested',
      });

      await expect(
        backchannel.authorize({
          userId: 'auth0|test-user-id',
          binding_message: 'Test binding message',
          scope: 'invalid_scope',
        } as AuthorizeOptions)
      ).rejects.toThrow('openid scope must be requested');
    });

    it('should return authorization response', async () => {
      nock(`https://${opts.domain}`).post('/bc-authorize').reply(200, {
        auth_req_id: 'test-auth-req-id',
        expires_in: 300,
        interval: 5,
      });

      await expect(
        backchannel.authorize({
          userId: 'auth0|test-user-id',
          binding_message: 'Test binding message',
          scope: 'openid',
        })
      ).resolves.toMatchObject({
        auth_req_id: 'test-auth-req-id',
        expires_in: 300,
        interval: 5,
      });
    });

    it('should pass authorization_details to /bc-authorize', async () => {
      let receivedAuthorizationDetails: { type: string }[] = [];
      nock(`https://${opts.domain}`)
        .post('/bc-authorize')
        .reply(201, (uri, requestBody, cb) => {
          receivedAuthorizationDetails = JSON.parse(
            querystring.parse(requestBody as any)['authorization_details'] as string
          );
          cb(null, {
            auth_req_id: 'test-auth-req-id',
            expires_in: 300,
            interval: 5,
          });
        });

      await backchannel.authorize({
        userId: 'auth0|test-user-id',
        binding_message: 'Test binding message',
        scope: 'openid',
        authorization_details: JSON.stringify([{ type: 'test-type' }]),
      });

      expect(receivedAuthorizationDetails[0].type).toBe('test-type');
    });

    it('should throw for invalid request', async () => {
      nock(`https://${opts.domain}`).post('/bc-authorize').reply(400, {
        error: 'invalid_request',
        error_description: 'Invalid request parameters',
      });

      await expect(
        backchannel.authorize({
          userId: 'auth0|test-user-id',
          binding_message: 'Test binding message',
          scope: 'openid',
        })
      ).rejects.toThrowError(
        expect.objectContaining({
          body: expect.anything(),
        })
      );
    });

    it('should support Private Key JWT authentication', async () => {
      const jwtBackchannel = new Backchannel(jwtOpts);

      nock(`https://${opts.domain}`).post('/bc-authorize').reply(200, {
        auth_req_id: 'test-auth-req-id',
        expires_in: 300,
        interval: 5,
      });

      await expect(
        jwtBackchannel.authorize({
          userId: 'auth0|test-user-id',
          binding_message: 'Test binding message',
          scope: 'openid',
        })
      ).resolves.toMatchObject({
        auth_req_id: 'test-auth-req-id',
        expires_in: 300,
        interval: 5,
      });
    });

    it('should support mTLS authentication', async () => {
      const mtlsBackchannel = new Backchannel(mtlsOpts);

      nock(`https://${opts.domain}`).post('/bc-authorize').reply(200, {
        auth_req_id: 'test-auth-req-id',
        expires_in: 300,
        interval: 5,
      });

      await expect(
        mtlsBackchannel.authorize({
          userId: 'auth0|test-user-id',
          binding_message: 'Test binding message',
          scope: 'openid',
        })
      ).resolves.toMatchObject({
        auth_req_id: 'test-auth-req-id',
        expires_in: 300,
        interval: 5,
      });
    });
  });

  describe('#backchannelGrant', () => {
    it('should throw for invalid or expired auth_req_id', async () => {
      nock(`https://${opts.domain}`).post('/oauth/token').reply(401, {
        error: 'invalid_grant',
        error_description: 'Invalid or expired auth_req_id',
      });

      await expect(
        backchannel.backchannelGrant({
          auth_req_id: 'invalid-auth-req-id',
        })
      ).rejects.toThrow('Invalid or expired auth_req_id');
    });

    it('should return token response', async () => {
      nock(`https://${opts.domain}`).post('/oauth/token').reply(200, {
        access_token: 'test-access-token',
        id_token: 'test-id-token',
        expires_in: 86400,
        scope: 'openid',
      });

      await expect(
        backchannel.backchannelGrant({
          auth_req_id: 'test-auth-req-id',
        })
      ).resolves.toMatchObject({
        access_token: 'test-access-token',
        id_token: 'test-id-token',
        expires_in: 86400,
        scope: 'openid',
      });
    });

    it('should return token response, including authorization_details when available', async () => {
      const authorization_details = JSON.stringify([{ type: 'test-type' }]);
      nock(`https://${opts.domain}`).post('/oauth/token').reply(200, {
        access_token: 'test-access-token',
        id_token: 'test-id-token',
        expires_in: 86400,
        scope: 'openid',
        authorization_details,
      });

      await expect(
        backchannel.backchannelGrant({
          auth_req_id: 'test-auth-req-id',
        })
      ).resolves.toMatchObject({
        access_token: 'test-access-token',
        id_token: 'test-id-token',
        expires_in: 86400,
        scope: 'openid',
        authorization_details,
      });
    });

    it('should throw for authorization pending', async () => {
      nock(`https://${opts.domain}`).post('/oauth/token').reply(400, {
        error: 'authorization_pending',
        error_description: 'The end-user authorization is pending',
      });

      await expect(
        backchannel.backchannelGrant({
          auth_req_id: 'test-auth-req-id',
        })
      ).rejects.toThrowError(
        expect.objectContaining({
          body: expect.anything(),
        })
      );
    });

    it('should throw for access denied', async () => {
      nock(`https://${opts.domain}`).post('/oauth/token').reply(400, {
        error: 'access_denied',
        error_description: 'The end-user denied the authorization request or it has been expired',
      });

      await expect(
        backchannel.backchannelGrant({
          auth_req_id: 'test-auth-req-id',
        })
      ).rejects.toThrowError(
        expect.objectContaining({
          body: expect.anything(),
        })
      );
    });

    it('should throw for polling too quickly', async () => {
      nock(`https://${opts.domain}`).post('/oauth/token').reply(400, {
        error: 'slow_down',
        error_description: 'You are polling faster than allowed. Try again in 10 seconds.',
      });

      await expect(
        backchannel.backchannelGrant({
          auth_req_id: 'test-auth-req-id',
        })
      ).rejects.toThrowError(
        expect.objectContaining({
          body: expect.anything(),
        })
      );
    });

    it('should support Private Key JWT authentication', async () => {
      const jwtBackchannel = new Backchannel(jwtOpts);

      nock(`https://${opts.domain}`).post('/oauth/token').reply(200, {
        access_token: 'test-access-token',
        id_token: 'test-id-token',
        expires_in: 86400,
        scope: 'openid',
      });

      await expect(
        jwtBackchannel.backchannelGrant({
          auth_req_id: 'test-auth-req-id',
        })
      ).resolves.toMatchObject({
        access_token: 'test-access-token',
        id_token: 'test-id-token',
        expires_in: 86400,
        scope: 'openid',
      });
    });

    it('should support mTLS authentication', async () => {
      const mtlsBackchannel = new Backchannel(mtlsOpts);

      nock(`https://${opts.domain}`).post('/oauth/token').reply(200, {
        access_token: 'test-access-token',
        id_token: 'test-id-token',
        expires_in: 86400,
        scope: 'openid',
      });

      await expect(
        mtlsBackchannel.backchannelGrant({
          auth_req_id: 'test-auth-req-id',
        })
      ).resolves.toMatchObject({
        access_token: 'test-access-token',
        id_token: 'test-id-token',
        expires_in: 86400,
        scope: 'openid',
      });
    });
  });
});
