import { Configuration } from './BaseAuthApi';
import Database from './Database';
import OAuth from './OAuth';

export class AuthenticationClient {
  oauth: OAuth;
  database: Database;
  constructor(options: Configuration) {
    this.oauth = new OAuth(options);
    this.database = new Database(options);
  }
}
