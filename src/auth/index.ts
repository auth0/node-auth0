import { Configuration } from './BaseAuthApi';
import OAuth from './OAuth';

export class AuthenticationClient {
  oauth: OAuth;
  constructor(options: Configuration) {
    this.oauth = new OAuth(options);
  }
}
