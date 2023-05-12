import { TelemetryMiddleware } from '../lib/middleware/telemetry-middleware';
import { Options } from './base-auth-api';
import { Database } from './database';
import { OAuth } from './oauth';
import { Passwordless } from './passwordless';

export * from './database';
export * from './oauth';
export * from './passwordless';
export { IDTokenValidateOptions, IdTokenValidatorError } from './id-token-validator';
export { AuthApiError, Options } from './base-auth-api';

export class AuthenticationClient {
  database: Database;
  oauth: OAuth;
  passwordless: Passwordless;

  constructor(options: Options) {
    if (options.telemetry !== false) {
      options.middleware = [...(options.middleware || []), new TelemetryMiddleware(options)];
    }

    this.database = new Database(options);
    this.oauth = new OAuth(options);
    this.passwordless = new Passwordless(options);
  }
}
