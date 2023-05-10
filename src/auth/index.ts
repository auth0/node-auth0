import { TelemetryMiddleware } from '../lib/middleware/TelemetryMiddleware';
import { Options } from './BaseAuthApi';
import { Database } from './Database';
import { OAuth } from './OAuth';
import { Passwordless } from './Passwordless';

export * from './Database';
export * from './OAuth';
export * from './Passwordless';
export { AuthApiError } from './BaseAuthApi';

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
