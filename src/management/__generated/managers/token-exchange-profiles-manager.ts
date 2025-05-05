import * as runtime from '../../../lib/runtime.js';
import type { InitOverride, ApiResponse } from '../../../lib/runtime.js';
import type {
  GetTokenExchangeProfiles200Response,
  GetTokenExchangeProfilesById200Response,
  PatchTokenExchangeProfilesByIdRequest,
  PostTokenExchangeProfilesRequest,
  DeleteTokenExchangeProfilesByIdRequest,
  GetTokenExchangeProfilesRequest,
  GetTokenExchangeProfilesByIdRequest,
  PatchTokenExchangeProfilesByIdOperationRequest,
} from '../models/index.js';

const { BaseAPI } = runtime;

/**
 *
 */
export class TokenExchangeProfilesManager extends BaseAPI {
  /**
   * Delete a Token Exchange Profile within your tenant.
   * Delete a token exchange profile
   *
   * @throws {RequiredError}
   */
  async delete(
    requestParameters: DeleteTokenExchangeProfilesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/token-exchange-profiles/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Retrieve a list of all Token Exchange Profiles available in your tenant.
   *
   * This endpoint supports Checkpoint pagination. To search by checkpoint, use the following parameters:
   * <ul>
   * <li><code>from</code>: Optional id from which to start selection.</li>
   * <li><code>take</code>: The total amount of entries to retrieve when using the from parameter. Defaults to 50.</li>
   * </ul>
   *
   * <b>Note</b>: The first time you call this endpoint using checkpoint pagination, omit the <code>from</code> parameter. If there are more results, a <code>next</code> value is included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, no pages are remaining.
   * Get token exchange profiles
   *
   * @throws {RequiredError}
   */
  async getAll(
    requestParameters: GetTokenExchangeProfilesRequest = {},
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetTokenExchangeProfiles200Response>> {
    const queryParameters = runtime.applyQueryParams(requestParameters, [
      {
        key: 'from',
        config: {},
      },
      {
        key: 'take',
        config: {},
      },
    ]);

    const response = await this.request(
      {
        path: `/token-exchange-profiles`,
        method: 'GET',
        query: queryParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Retrieve details about a single Token Exchange Profile specified by ID.
   *
   * Get a token exchange profile
   *
   * @throws {RequiredError}
   */
  async get(
    requestParameters: GetTokenExchangeProfilesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetTokenExchangeProfilesById200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/token-exchange-profiles/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }

  /**
   * Update a Token Exchange Profile within your tenant.
   *
   * Update an existing token exchange profile
   *
   * @throws {RequiredError}
   */
  async update(
    requestParameters: PatchTokenExchangeProfilesByIdOperationRequest,
    bodyParameters: PatchTokenExchangeProfilesByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/token-exchange-profiles/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.VoidApiResponse.fromResponse(response);
  }

  /**
   * Create a new Token Exchange Profile within your tenant.
   *
   * Create a token exchange profile
   *
   * @throws {RequiredError}
   */
  async create(
    bodyParameters: PostTokenExchangeProfilesRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<GetTokenExchangeProfilesById200Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/token-exchange-profiles`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return runtime.JSONApiResponse.fromResponse(response);
  }
}
