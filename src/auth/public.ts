import { TelemetryMiddleware } from '../lib/middleware/telemetry-middleware.js';
import { AuthenticationClientOptions } from './base-auth-api.js';
import { Database } from './database.js';
import { OAuth } from './oauth.js';
import { Passwordless } from './passwordless.js';
import { pick } from '../utils.js';

export * from './database.js';
export * from './oauth.js';
export * from './passwordless.js';
export { IDTokenValidateOptions, IdTokenValidatorError } from './id-token-validator.js';
export { AuthApiError, AuthenticationClientOptions } from './base-auth-api.js';

export type PublicAuthenticationClientOptions = Omit<
  AuthenticationClientOptions,
  'clientSecret' | 'clientAssertionSigningKey' | 'clientAssertionSigningAlg'
>;

/**
 * This contains all the things you can do on the Authentication API from a Public Client.
 *
 * See https://auth0.com/docs/api/authentication
 */
export class PublicAuthenticationClient {
  database: Database;
  oauth: Pick<
    OAuth,
    'authorizationCodeGrantWithPKCE' | 'passwordGrant' | 'refreshTokenGrant' | 'revokeRefreshToken'
  >;
  passwordless: Passwordless;

  constructor(options: PublicAuthenticationClientOptions) {
    if (options.telemetry !== false) {
      options.middleware = [...(options.middleware || []), new TelemetryMiddleware(options)];
    }

    this.database = new Database(options);
    this.oauth = pick(
      new OAuth(options),
      'authorizationCodeGrantWithPKCE',
      'passwordGrant',
      'refreshTokenGrant',
      'revokeRefreshToken'
    );
    this.passwordless = new Passwordless(options);
  }
}
