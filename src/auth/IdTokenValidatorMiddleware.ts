import { Middleware, ResponseContext } from '../runtime';
import { IDTokenValidator } from './IdTokenValidator';
import { Options } from './BaseAuthApi';
import { TokenSet } from './OAuth';

export class IdTokenValidatorMiddleware implements Middleware {
  private idTokenValidator: IDTokenValidator;
  constructor(options: Options) {
    this.idTokenValidator = new IDTokenValidator(options);
  }

  async post?({ response, init }: ResponseContext): Promise<void> {
    let json: TokenSet;
    try {
      json = (await response.json()) as TokenSet;
    } catch (e) {
      // Response is not JSON exiting
      return;
    }
    if (!json.id_token) {
      // Response has no ID Token exiting
      return;
    }
    const { nonce, maxAge, organization } = Object.fromEntries(
      (init.body as FormData).entries()
    ) as { [k: string]: string };
    await this.idTokenValidator.validate(json.id_token, {
      nonce,
      maxAge: maxAge ? +maxAge : undefined,
      organization,
    });
  }
}
