import * as runtime from '../../runtime';
import type { InitOverride, InitOverrideFunction, ApiResponse } from '../../../../../src/runtime';
import type {
  CustomDomain,
  PatchCustomDomainsByIdRequest,
  PostCustomDomains201Response,
  PostCustomDomainsRequest,
  PostVerify200Response,
} from '../models';

const { BaseAPI } = runtime;

export interface DeleteCustomDomainsByIdRequest {
  /**
   * ID of the custom domain to delete.
   * @type {string}
   */
  id: string;
}

export interface GetCustomDomainsByIdRequest {
  /**
   * ID of the custom domain to retrieve.
   * @type {string}
   */
  id: string;
}

export interface PatchCustomDomainsByIdOperationRequest {
  /**
   * The id of the custom domain to update
   * @type {string}
   */
  id: string;
}

export interface PostVerifyRequest {
  /**
   * ID of the custom domain to verify.
   * @type {string}
   */
  id: string;
}

/**
 *
 */
export class CustomDomainsManager extends BaseAPI {
  /**
   * Delete a custom domain and stop serving requests for it.
   * Delete custom domain configuration
   * @throws {RequiredError}
   */
  async deleteRaw(
    requestParameters: DeleteCustomDomainsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<void>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/custom-domains/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'DELETE',
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Delete a custom domain and stop serving requests for it.
   * Delete custom domain configuration
   */
  async delete(
    requestParameters: DeleteCustomDomainsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve details on <a href="https://auth0.com/docs/custom-domains">custom domains</a>.
   * Get custom domains configurations
   * @throws {RequiredError}
   */
  async getAllRaw(initOverrides?: InitOverride): Promise<ApiResponse<Array<CustomDomain>>> {
    const response = await this.request(
      {
        path: `/custom-domains`,
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve details on <a href=\"https://auth0.com/docs/custom-domains\">custom domains</a>.
   * Get custom domains configurations
   */
  async getAll(initOverrides?: InitOverride): Promise<Array<CustomDomain>> {
    const response = await this.getAllRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a custom domain configuration and status.
   * Get custom domain configuration
   * @throws {RequiredError}
   */
  async getRaw(
    requestParameters: GetCustomDomainsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<CustomDomain>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/custom-domains/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'GET',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Retrieve a custom domain configuration and status.
   * Get custom domain configuration
   */
  async get(
    requestParameters: GetCustomDomainsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<CustomDomain> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update a custom domain.
   *
   * These are the attributes that can be updated:
   *
   * - custom_client_ip_header
   * - tls_policy
   *
   * <h5>Updating CUSTOM_CLIENT_IP_HEADER for a custom domain</h5>To update the <code>custom_client_ip_header</code> for a domain, the body to
   * send should be:
   * <pre><code>{ "custom_client_ip_header": "cf-connecting-ip" }</code></pre>
   *
   * <h5>Updating TLS_POLICY for a custom domain</h5>To update the <code>tls_policy</code> for a domain, the body to send should be:
   * <pre><code>{ "tls_policy": "compatible" }</code></pre>
   *
   *
   * TLS Policies:
   *
   * - recommended - for modern usage this includes TLS 1.2 only
   * - compatible - compatible with older browsers this policy includes TLS 1.0, 1.1, 1.2
   *
   *
   * Some considerations:
   *
   * - The TLS ciphers and protocols available in each TLS policy follow industry recommendations, and may be updated occasionally.
   * - Do not use the <code>compatible</code> TLS policy unless you have clients that require TLS 1.0.
   *
   * Update custom domain configuration
   * @throws {RequiredError}
   */
  async updateRaw(
    requestParameters: PatchCustomDomainsByIdOperationRequest,
    bodyParameters: PatchCustomDomainsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostCustomDomains201Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/custom-domains/{id}`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'PATCH',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update a custom domain.<br/><br/>These are the attributes that can be updated:<br/><br/>- custom_client_ip_header<br/>- tls_policy<br/><br/><h5>Updating CUSTOM_CLIENT_IP_HEADER for a custom domain</h5>To update the <code>custom_client_ip_header</code> for a domain, the body to<br/>send should be:<br/><pre><code>{ \"custom_client_ip_header\": \"cf-connecting-ip\" }</code></pre><br/><br/><h5>Updating TLS_POLICY for a custom domain</h5>To update the <code>tls_policy</code> for a domain, the body to send should be:<br/><pre><code>{ \"tls_policy\": \"compatible\" }</code></pre><br/><br/><br/>TLS Policies:<br/><br/>- recommended - for modern usage this includes TLS 1.2 only<br/>- compatible - compatible with older browsers this policy includes TLS 1.0, 1.1, 1.2<br/><br/><br/>Some considerations:<br/><br/>- The TLS ciphers and protocols available in each TLS policy follow industry recommendations, and may be updated occasionally.<br/>- Do not use the <code>compatible</code> TLS policy unless you have clients that require TLS 1.0.<br/>
   * Update custom domain configuration
   */
  async update(
    requestParameters: PatchCustomDomainsByIdOperationRequest,
    bodyParameters: PatchCustomDomainsByIdRequest,
    initOverrides?: InitOverride
  ): Promise<PostCustomDomains201Response> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a new custom domain.
   *
   * Note: The custom domain will need to be verified before it will accept
   * requests.
   *
   * Optional attributes that can be updated:
   *
   * - custom_client_ip_header
   * - tls_policy
   *
   *
   * TLS Policies:
   *
   * - recommended - for modern usage this includes TLS 1.2 only
   * - compatible - compatible with older browsers this policy includes TLS 1.0, 1.1, 1.2
   *
   *
   * Some considerations:
   *
   * - The TLS ciphers and protocols available in each TLS policy follow industry recommendations, and may be updated occasionally.
   * - Do not use the <code>compatible</code> TLS policy unless you have clients that require TLS 1.0.
   *
   * Configure a new custom domain
   * @throws {RequiredError}
   */
  async createRaw(
    bodyParameters: PostCustomDomainsRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostCustomDomains201Response>> {
    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/custom-domains`,
        method: 'POST',
        headers: headerParameters,
        body: bodyParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Create a new custom domain.<br/><br/>Note: The custom domain will need to be verified before it will accept<br/>requests.<br/><br/>Optional attributes that can be updated:<br/><br/>- custom_client_ip_header<br/>- tls_policy<br/><br/><br/>TLS Policies:<br/><br/>- recommended - for modern usage this includes TLS 1.2 only<br/>- compatible - compatible with older browsers this policy includes TLS 1.0, 1.1, 1.2<br/><br/><br/>Some considerations:<br/><br/>- The TLS ciphers and protocols available in each TLS policy follow industry recommendations, and may be updated occasionally.<br/>- Do not use the <code>compatible</code> TLS policy unless you have clients that require TLS 1.0.<br/>
   * Configure a new custom domain
   */
  async create(
    bodyParameters: PostCustomDomainsRequest,
    initOverrides?: InitOverride
  ): Promise<PostCustomDomains201Response> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Run the verification process on a custom domain.
   *
   * Note: Check the <code>status</code> field to see its verification status. Once verification is complete, it may take up to 10 minutes before the custom domain can start accepting requests.
   *
   * For <code>self_managed_certs</code>, when the custom domain is verified for the first time, the response will also include the <code>cname_api_key</code> which you will need to configure your proxy. This key must be kept secret, and is used to validate the proxy requests.
   *
   * <a href="https://auth0.com/docs/custom-domains#step-2-verify-ownership">Learn more</a> about verifying custom domains that use Auth0 Managed certificates.
   * <a href="https://auth0.com/docs/custom-domains/self-managed-certificates#step-2-verify-ownership">Learn more</a> about verifying custom domains that use Self Managed certificates.
   *
   * Verify a custom domain
   * @throws {RequiredError}
   */
  async verifyRaw(
    requestParameters: PostVerifyRequest,
    initOverrides?: InitOverride
  ): Promise<ApiResponse<PostVerify200Response>> {
    runtime.validateRequiredRequestParams(requestParameters, ['id']);

    const response = await this.request(
      {
        path: `/custom-domains/{id}/verify`.replace(
          '{id}',
          encodeURIComponent(String(requestParameters.id))
        ),
        method: 'POST',
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Run the verification process on a custom domain.<br/><br/>Note: Check the <code>status</code> field to see its verification status. Once verification is complete, it may take up to 10 minutes before the custom domain can start accepting requests.<br/><br/>For <code>self_managed_certs</code>, when the custom domain is verified for the first time, the response will also include the <code>cname_api_key</code> which you will need to configure your proxy. This key must be kept secret, and is used to validate the proxy requests.<br/><br/><a href=\"https://auth0.com/docs/custom-domains#step-2-verify-ownership\">Learn more</a> about verifying custom domains that use Auth0 Managed certificates.<br/><a href=\"https://auth0.com/docs/custom-domains/self-managed-certificates#step-2-verify-ownership\">Learn more</a> about verifying custom domains that use Self Managed certificates.<br/>
   * Verify a custom domain
   */
  async verify(
    requestParameters: PostVerifyRequest,
    initOverrides?: InitOverride
  ): Promise<PostVerify200Response> {
    const response = await this.verifyRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
