import { BaseAuthAPI, TokenResponse } from './base-auth-api.js';

type TokenForConnectionTokenSet = {
  refresh_token?: string;
};

export const getValidRefreshToken = (tokenSet: TokenForConnectionTokenSet): string => {
  if (!tokenSet.refresh_token) throw new Error('refresh_token not present');
  return tokenSet.refresh_token;
};

/**
 * Options to exchange a federated connection token.
 */
export type TokenForConnectionOptions = {
  tokenSet: TokenForConnectionTokenSet;
  /**
   * The target social provider connection (e.g., "google-oauth2").
   */
  connection: string;
  /**
   * Optional login hint to target a specific account.
   */
  loginHint?: string;
};

/**
 * Interface for exchanging federated connection access tokens.
 */
export interface ITokenForConnection {
  /**
   * Exchanges the given subject token for an access token for the federated connection.
   *
   * @param options - Options including the subject token and the connection name.
   * @returns A promise that resolves with the federated connection token response.
   */
  exchangeToken(options: TokenForConnectionOptions): Promise<TokenResponse>;
}

const FCAT_GRANT_TYPE =
  'urn:auth0:params:oauth:grant-type:token-exchange:federated-connection-access-token';

const FCAT_TOKEN_TYPE = 'urn:ietf:params:oauth:token-type:refresh_token';
const FCAT_REQUESTED_TOKEN_TYPE =
  'http://auth0.com/oauth/token-type/federated-connection-access-token';
/**
 * Class implementing the federated connection access token exchange.
 */
export class TokenForConnection extends BaseAuthAPI implements ITokenForConnection {
  /**
   * Exchanges a subject token (e.g. a refresh token) for a federated connection access token.
   *
   * The request body includes:
   * - client_id (and client_secret via addClientAuthentication)
   * - grant_type set to FCAT_GRANT_TYPE
   * - subject_token and fixed subject_token_type value for refresh tokens
   * - requested_token_type indicating that a federated connection access token is desired
   * - connection name and an optional login_hint if provided
   *
   * @param options - The federated connection options.
   * @returns A promise with the token response data.
   * @throws An error if the exchange fails.
   */
  async exchangeToken({
    connection,
    tokenSet,
    loginHint,
  }: TokenForConnectionOptions): Promise<TokenResponse> {
    const subjectToken = getValidRefreshToken(tokenSet);

    const body: Record<string, string> = {
      grant_type: FCAT_GRANT_TYPE,
      subject_token: subjectToken,
      subject_token_type: FCAT_TOKEN_TYPE,
      requested_token_type: FCAT_REQUESTED_TOKEN_TYPE,
      connection: connection,
    };

    // Add the login_hint param if provided.
    if (loginHint) {
      body['login_hint'] = loginHint;
    }

    // Append client authentication information (e.g. client secret or assertions)
    await this.addClientAuthentication(body);

    return await this.getGenericResponseData<TokenResponse>({ body });
  }
}
