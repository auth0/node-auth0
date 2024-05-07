import * as jose from 'jose';
import { v4 as uuid } from 'uuid';

export interface AddClientAuthenticationPayload {
  client_id?: string;
  client_secret?: string;
  client_assertion?: string;
  client_assertion_type?: string;
  [key: string]: any;
}

interface AddClientAuthenticationOptions {
  payload: AddClientAuthenticationPayload;
  domain: string;
  clientId: string;
  required?: boolean;
  clientAssertionSigningKey?: string;
  clientAssertionSigningAlg?: string;
  clientSecret?: string;
  useMTLS?: boolean;
}

/**
 * Adds client authentication, if available, to the provided payload.
 *
 * Adds `client_secret` for Client Secret Post token endpoint auth method (the SDK doesn't use Client Secret Basic)
 * Adds `client_assertion` and `client_assertion_type` for Private Key JWT token endpoint auth method.
 *
 * If `clientAssertionSigningKey` is provided it takes precedent over `clientSecret` .
 */
export const addClientAuthentication = async ({
  payload,
  domain,
  clientId,
  clientAssertionSigningKey,
  clientAssertionSigningAlg,
  clientSecret,
  useMTLS,
}: AddClientAuthenticationOptions): Promise<Record<string, unknown>> => {
  const cid = payload.client_id || clientId;
  if (clientAssertionSigningKey && !payload.client_assertion) {
    const alg = clientAssertionSigningAlg || 'RS256';
    const privateKey = await jose.importPKCS8(clientAssertionSigningKey, alg);

    payload.client_assertion = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setSubject(cid)
      .setJti(uuid())
      .setIssuer(cid)
      .setAudience(`https://${domain}/`)
      .setExpirationTime('2mins')
      .sign(privateKey);
    payload.client_assertion_type = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';
  } else if (clientSecret && !payload.client_secret) {
    payload.client_secret = clientSecret;
  }
  if (
    (!payload.client_secret || payload.client_secret.trim().length === 0) &&
    (!payload.client_assertion || payload.client_assertion.trim().length === 0) &&
    !useMTLS
  ) {
    throw new Error(
      'The client_secret or client_assertion field is required, or it should be mTLS request.'
    );
  }
  return payload;
};
