import { BaseAPI, Configuration as BaseConfiguration } from '../runtime';
import { AddClientAuthenticationPayload, addClientAuthentication } from './clientAuthentication';

export interface Configuration extends Omit<BaseConfiguration, 'baseUrl'> {
  domain: string;
  clientId: string;
  clientSecret?: string;
  clientAssertionSigningKey?: string;
  clientAssertionSigningAlg?: string;
}

export default class BaseAuthAPI extends BaseAPI {
  domain: string;
  clientId: string;
  clientSecret?: string;
  clientAssertionSigningKey?: string;
  clientAssertionSigningAlg?: string;

  constructor(configuration: Configuration) {
    super({ ...configuration, baseUrl: `https://${configuration.domain}` });

    this.domain = configuration.domain;
    this.clientId = configuration.clientId;
    this.clientSecret = configuration.clientSecret;
    this.clientAssertionSigningKey = configuration.clientAssertionSigningKey;
    this.clientAssertionSigningAlg = configuration.clientAssertionSigningAlg;
  }

  protected async addClientAuthentication(
    payload: AddClientAuthenticationPayload,
    required: boolean
  ): Promise<AddClientAuthenticationPayload> {
    return addClientAuthentication({
      payload,
      domain: this.domain,
      required,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      clientAssertionSigningKey: this.clientAssertionSigningKey,
      clientAssertionSigningAlg: this.clientAssertionSigningAlg,
    });
  }
}
