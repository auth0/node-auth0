/* tslint:disable */
/* eslint-disable */
import * as runtime from '../../runtime';
import type {
  CustomDomain,
  PatchCustomDomainsByIdRequest,
  PostCustomDomains201Response,
  PostCustomDomainsRequest,
  PostVerify200Response,
} from '../models';

export interface DeleteCustomDomainsByIdRequest {
  id: string;
}

export interface GetCustomDomainsByIdRequest {
  id: string;
}

export interface PatchCustomDomainsByIdOperationRequest {
  id: string;
}

export interface PostVerifyRequest {
  id: string;
}

/**
 *
 */
export class CustomDomainsManager extends runtime.BaseAPI {
  /**
   * Delete a custom domain and stop serving requests for it.
   * Delete custom domain configuration
   * @throws {RequiredError}
   * @memberof CustomDomainsManager
   */
  async deleteRaw(
    requestParameters: DeleteCustomDomainsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling delete.'
      );
    }

    const response = await this.request(
      {
        path: `/custom-domains/{id}`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.deleteRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieve details on <a href=\"https://auth0.com/docs/custom-domains\">custom domains</a>.
   * Get custom domains configurations
   * @throws {RequiredError}
   * @memberof CustomDomainsManager
   */
  async getAllRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<CustomDomain>>> {
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
  async getAll(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<CustomDomain>> {
    const response = await this.getAllRaw(initOverrides);
    return await response.value();
  }

  /**
   * Retrieve a custom domain configuration and status.
   * Get custom domain configuration
   * @throws {RequiredError}
   * @memberof CustomDomainsManager
   */
  async getRaw(
    requestParameters: GetCustomDomainsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<CustomDomain>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling get.'
      );
    }

    const response = await this.request(
      {
        path: `/custom-domains/{id}`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<CustomDomain> {
    const response = await this.getRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update a custom domain.<br/><br/>These are the attributes that can be updated:<br/><br/>- custom_client_ip_header<br/>- tls_policy<br/><br/><h5>Updating CUSTOM_CLIENT_IP_HEADER for a custom domain</h5>To update the <code>custom_client_ip_header</code> for a domain, the body to<br/>send should be:<br/><pre><code>{ \"custom_client_ip_header\": \"cf-connecting-ip\" }</code></pre><br/><br/><h5>Updating TLS_POLICY for a custom domain</h5>To update the <code>tls_policy</code> for a domain, the body to send should be:<br/><pre><code>{ \"tls_policy\": \"compatible\" }</code></pre><br/><br/><br/>TLS Policies:<br/><br/>- recommended - for modern usage this includes TLS 1.2 only<br/>- compatible - compatible with older browsers this policy includes TLS 1.0, 1.1, 1.2<br/><br/><br/>Some considerations:<br/><br/>- The TLS ciphers and protocols available in each TLS policy follow industry recommendations, and may be updated occasionally.<br/>- Do not use the <code>compatible</code> TLS policy unless you have clients that require TLS 1.0.<br/>
   * Update custom domain configuration
   * @throws {RequiredError}
   * @memberof CustomDomainsManager
   */
  async updateRaw(
    requestParameters: PatchCustomDomainsByIdOperationRequest,
    bodyParameters: PatchCustomDomainsByIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostCustomDomains201Response>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling update.'
      );
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/custom-domains/{id}`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostCustomDomains201Response> {
    const response = await this.updateRaw(requestParameters, bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Create a new custom domain.<br/><br/>Note: The custom domain will need to be verified before it will accept<br/>requests.<br/><br/>Optional attributes that can be updated:<br/><br/>- custom_client_ip_header<br/>- tls_policy<br/><br/><br/>TLS Policies:<br/><br/>- recommended - for modern usage this includes TLS 1.2 only<br/>- compatible - compatible with older browsers this policy includes TLS 1.0, 1.1, 1.2<br/><br/><br/>Some considerations:<br/><br/>- The TLS ciphers and protocols available in each TLS policy follow industry recommendations, and may be updated occasionally.<br/>- Do not use the <code>compatible</code> TLS policy unless you have clients that require TLS 1.0.<br/>
   * Configure a new custom domain
   * @throws {RequiredError}
   * @memberof CustomDomainsManager
   */
  async createRaw(
    bodyParameters: PostCustomDomainsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostCustomDomains201Response>> {
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostCustomDomains201Response> {
    const response = await this.createRaw(bodyParameters, initOverrides);
    return await response.value();
  }

  /**
   * Run the verification process on a custom domain.<br/><br/>Note: Check the <code>status</code> field to see its verification status. Once verification is complete, it may take up to 10 minutes before the custom domain can start accepting requests.<br/><br/>For <code>self_managed_certs</code>, when the custom domain is verified for the first time, the response will also include the <code>cname_api_key</code> which you will need to configure your proxy. This key must be kept secret, and is used to validate the proxy requests.<br/><br/><a href=\"https://auth0.com/docs/custom-domains#step-2-verify-ownership\">Learn more</a> about verifying custom domains that use Auth0 Managed certificates.<br/><a href=\"https://auth0.com/docs/custom-domains/self-managed-certificates#step-2-verify-ownership\">Learn more</a> about verifying custom domains that use Self Managed certificates.<br/>
   * Verify a custom domain
   * @throws {RequiredError}
   * @memberof CustomDomainsManager
   */
  async verifyRaw(
    requestParameters: PostVerifyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PostVerify200Response>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling verify.'
      );
    }

    const response = await this.request(
      {
        path: `/custom-domains/{id}/verify`.replace(
          `{${'id'}}`,
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
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PostVerify200Response> {
    const response = await this.verifyRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
