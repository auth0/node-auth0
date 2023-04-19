import {
  BaseAPI,
  Configuration as BaseConfiguration,
  ConfigurationParameters as BaseConfigurationParameters,
} from '../runtime';
import { AddClientAuthenticationPayload, addClientAuthentication } from './clientAuthentication';

// TODO simplify config in the runtime
export interface ConfigurationParameters extends BaseConfigurationParameters {
  clientId: string;
  clientSecret?: string;
  clientAssertionSigningKey?: string;
  clientAssertionSigningAlg?: string;
}

export class Configuration extends BaseConfiguration {
  constructor(protected configuration: ConfigurationParameters) {
    super(configuration);
  }

  get clientId(): string {
    return this.configuration.clientId;
  }

  get clientSecret(): string | undefined {
    return this.configuration.clientSecret;
  }

  get clientAssertionSigningKey(): string | undefined {
    return this.configuration.clientAssertionSigningKey;
  }

  get clientAssertionSigningAlg(): string | undefined {
    return this.configuration.clientAssertionSigningAlg;
  }
}

export default class BaseAuthAPI extends BaseAPI {
  constructor(protected configuration: Configuration) {
    super(configuration);
  }

  protected async addClientAuthentication(
    payload: AddClientAuthenticationPayload,
    required: boolean
  ): Promise<AddClientAuthenticationPayload> {
    return addClientAuthentication({
      payload,
      // TODO Use domain instead of baseUrl in runtime
      domain: this.configuration.baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      required,
      clientId: this.configuration.clientId,
      clientSecret: this.configuration.clientSecret,
      clientAssertionSigningKey: this.configuration.clientAssertionSigningKey,
      clientAssertionSigningAlg: this.configuration.clientAssertionSigningAlg,
    });
  }
}
