import { AuthenticationClientOptions } from './base-auth-api.js';
import { Database } from './database.js';
import { OAuth } from './oauth.js';
import { Passwordless } from './passwordless.js';

export * from './database.js';
export * from './oauth.js';
export * from './passwordless.js';
export { IDTokenValidateOptions, IdTokenValidatorError } from './id-token-validator.js';
export { AuthApiError, AuthenticationClientOptions } from './base-auth-api.js';

export class AuthenticationClient {
  database: Database;
  oauth: OAuth;
  passwordless: Passwordless;

  constructor(options: AuthenticationClientOptions) {
    this.database = new Database(options);
    this.oauth = new OAuth(options);
    this.passwordless = new Passwordless(options);
  }
}
