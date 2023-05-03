import nock from 'nock';
import * as jose from 'jose';

export const withIdToken = async ({
  domain,
  clientId,
  clientSecret,
}: {
  domain: string;
  clientId: string;
  clientSecret: string;
}) => {
  const secret = new TextEncoder().encode(clientSecret);

  const idToken = await new jose.SignJWT({ 'urn:example:claim': true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(`https://${domain}/`)
    .setSubject('me')
    .setAudience(clientId)
    .setExpirationTime('2h')
    .sign(secret);

  return (def: nock.Definition) => {
    const response = def.response as { id_token?: string };
    if (response.id_token) {
      response.id_token = idToken;
    }
  };
};
