import { Configuration } from './BaseAuthApi';
import OAuth from './OAuth';
import Passwordless from './Passwordless';

export class AuthenticationClient {
  oauth: OAuth;
  passwordless: Passwordless;

  constructor(options: Configuration) {
    this.oauth = new OAuth(options);
    this.passwordless = new Passwordless(options);
  }
}
