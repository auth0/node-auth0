import fetch, { RequestInfo as NFRequestInfo, RequestInit as NFRequestInit } from 'node-fetch';
import { ConfigurationParameters, Configuration } from './BaseAuthApi';
import OAuth from './OAuth';

export class AuthenticationClient {
  oauth: OAuth;
  constructor(options: ConfigurationParameters) {
    const config = new Configuration({
      fetchApi: (url: RequestInfo, init: RequestInit) => {
        return fetch(url as NFRequestInfo, init as NFRequestInit) as unknown as Promise<Response>;
      },
      ...options,
    });

    this.oauth = new OAuth(config);
  }
}
