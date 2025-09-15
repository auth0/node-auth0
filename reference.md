# Reference

## Actions

<details><summary><code>client.actions.<a href="/src/management/api/resources/actions/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.Action></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all actions.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.actions.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.actions.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListActionsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.actions.<a href="/src/management/api/resources/actions/client/Client.ts">create</a>({ ...params }) -> Management.CreateActionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create an action. Once an action is created, it must be deployed, and then bound to a trigger before it will be executed as part of a flow.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.create({
    name: "name",
    supported_triggers: [
        {
            id: "id",
        },
    ],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateActionRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.actions.<a href="/src/management/api/resources/actions/client/Client.ts">get</a>(id) -> Management.GetActionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve an action by its ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the action to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.actions.<a href="/src/management/api/resources/actions/client/Client.ts">delete</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes an action and all of its associated versions. An action must be unbound from all triggers before it can be deleted.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the action to delete.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.DeleteActionRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.actions.<a href="/src/management/api/resources/actions/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateActionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update an existing action. If this action is currently bound to a trigger, updating it will <strong>not</strong> affect any user flows until the action is deployed.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the action to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateActionRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.actions.<a href="/src/management/api/resources/actions/client/Client.ts">deploy</a>(id) -> Management.DeployActionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deploy an action. Deploying an action will create a new immutable version of the action. If the action is currently bound to a trigger, then the system will begin executing the newly deployed version of the action immediately. Otherwise, the action will only be executed as a part of a flow once it is bound to that flow.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.deploy("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of an action.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.actions.<a href="/src/management/api/resources/actions/client/Client.ts">test</a>(id, { ...params }) -> Management.TestActionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Test an action. After updating an action, it can be tested prior to being deployed to ensure it behaves as expected.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.test("id", {
    payload: {
        key: "value",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the action to test.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.TestActionRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Branding

<details><summary><code>client.branding.<a href="/src/management/api/resources/branding/client/Client.ts">get</a>() -> Management.GetBrandingResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve branding settings.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Branding.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.<a href="/src/management/api/resources/branding/client/Client.ts">update</a>({ ...params }) -> Management.UpdateBrandingResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update branding settings.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.update();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateBrandingRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Branding.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## ClientGrants

<details><summary><code>client.clientGrants.<a href="/src/management/api/resources/clientGrants/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.ClientGrantResponseContent></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a list of <a href="https://auth0.com/docs/api-auth/grant/client-credentials">client grants</a>, including the scopes associated with the application/API pair.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.clientGrants.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.clientGrants.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListClientGrantsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ClientGrants.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clientGrants.<a href="/src/management/api/resources/clientGrants/client/Client.ts">create</a>({ ...params }) -> Management.CreateClientGrantResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a client grant for a machine-to-machine login flow. To learn more, read <a href="https://www.auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow">Client Credential Flow</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clientGrants.create({
    client_id: "client_id",
    audience: "audience",
    scope: ["scope"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateClientGrantRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ClientGrants.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clientGrants.<a href="/src/management/api/resources/clientGrants/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete the <a href="https://www.auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow">Client Credential Flow</a> from your machine-to-machine application.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clientGrants.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the client grant to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ClientGrants.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clientGrants.<a href="/src/management/api/resources/clientGrants/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateClientGrantResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a client grant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clientGrants.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the client grant to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateClientGrantRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ClientGrants.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Clients

<details><summary><code>client.clients.<a href="/src/management/api/resources/clients/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.Client></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve clients (applications and SSO integrations) matching provided filters. A list of fields to include or exclude may also be specified.
For more information, read <a href="https://www.auth0.com/docs/get-started/applications"> Applications in Auth0</a> and <a href="https://www.auth0.com/docs/authenticate/single-sign-on"> Single Sign-On</a>.

<ul>
  <li>
    The following can be retrieved with any scope:
    <code>client_id</code>, <code>app_type</code>, <code>name</code>, and <code>description</code>.
  </li>
  <li>
    The following properties can only be retrieved with the <code>read:clients</code> or
    <code>read:client_keys</code> scope:
    <code>callbacks</code>, <code>oidc_logout</code>, <code>allowed_origins</code>,
    <code>web_origins</code>, <code>tenant</code>, <code>global</code>, <code>config_route</code>,
    <code>callback_url_template</code>, <code>jwt_configuration</code>,
    <code>jwt_configuration.lifetime_in_seconds</code>, <code>jwt_configuration.secret_encoded</code>,
    <code>jwt_configuration.scopes</code>, <code>jwt_configuration.alg</code>, <code>api_type</code>,
    <code>logo_uri</code>, <code>allowed_clients</code>, <code>owners</code>, <code>custom_login_page</code>,
    <code>custom_login_page_off</code>, <code>sso</code>, <code>addons</code>, <code>form_template</code>,
    <code>custom_login_page_codeview</code>, <code>resource_servers</code>, <code>client_metadata</code>,
    <code>mobile</code>, <code>mobile.android</code>, <code>mobile.ios</code>, <code>allowed_logout_urls</code>,
    <code>token_endpoint_auth_method</code>, <code>is_first_party</code>, <code>oidc_conformant</code>,
    <code>is_token_endpoint_ip_header_trusted</code>, <code>initiate_login_uri</code>, <code>grant_types</code>,
    <code>refresh_token</code>, <code>refresh_token.rotation_type</code>, <code>refresh_token.expiration_type</code>,
    <code>refresh_token.leeway</code>, <code>refresh_token.token_lifetime</code>, <code>refresh_token.policies</code>, <code>organization_usage</code>,
    <code>organization_require_behavior</code>.
  </li>
  <li>
    The following properties can only be retrieved with the
    <code>read:client_keys</code> or <code>read:client_credentials</code> scope:
    <code>encryption_key</code>, <code>encryption_key.pub</code>, <code>encryption_key.cert</code>,
    <code>client_secret</code>, <code>client_authentication_methods</code> and <code>signing_key</code>.
  </li>
</ul>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.clients.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.clients.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListClientsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Clients.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clients.<a href="/src/management/api/resources/clients/client/Client.ts">create</a>({ ...params }) -> Management.CreateClientResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new client (application or SSO integration). For more information, read <a href="https://www.auth0.com/docs/get-started/auth0-overview/create-applications">Create Applications</a>
<a href="https://www.auth0.com/docs/authenticate/single-sign-on/api-endpoints-for-single-sign-on>">API Endpoints for Single Sign-On</a>.

Notes:

- We recommend leaving the `client_secret` parameter unspecified to allow the generation of a safe secret.
- The <code>client_authentication_methods</code> and <code>token_endpoint_auth_method</code> properties are mutually exclusive. Use
  <code>client_authentication_methods</code> to configure the client with Private Key JWT authentication method. Otherwise, use <code>token_endpoint_auth_method</code>
  to configure the client with client secret (basic or post) or with no authentication method (none).
- When using <code>client_authentication_methods</code> to configure the client with Private Key JWT authentication method, specify fully defined credentials.
  These credentials will be automatically enabled for Private Key JWT authentication on the client.
- To configure <code>client_authentication_methods</code>, the <code>create:client_credentials</code> scope is required.
- To configure <code>client_authentication_methods</code>, the property <code>jwt_configuration.alg</code> must be set to RS256.

<div class="alert alert-warning">SSO Integrations created via this endpoint will accept login requests and share user profile information.</div>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clients.create({
    name: "name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateClientRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Clients.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clients.<a href="/src/management/api/resources/clients/client/Client.ts">get</a>(id, { ...params }) -> Management.GetClientResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve client details by ID. Clients are SSO connections or Applications linked with your Auth0 tenant. A list of fields to include or exclude may also be specified.
For more information, read <a href="https://www.auth0.com/docs/get-started/applications"> Applications in Auth0</a> and <a href="https://www.auth0.com/docs/authenticate/single-sign-on"> Single Sign-On</a>.

<ul>
  <li>
    The following properties can be retrieved with any of the scopes:
    <code>client_id</code>, <code>app_type</code>, <code>name</code>, and <code>description</code>.
  </li>
  <li>
    The following properties can only be retrieved with the <code>read:clients</code> or
    <code>read:client_keys</code> scopes:
    <code>callbacks</code>, <code>oidc_logout</code>, <code>allowed_origins</code>,
    <code>web_origins</code>, <code>tenant</code>, <code>global</code>, <code>config_route</code>,
    <code>callback_url_template</code>, <code>jwt_configuration</code>,
    <code>jwt_configuration.lifetime_in_seconds</code>, <code>jwt_configuration.secret_encoded</code>,
    <code>jwt_configuration.scopes</code>, <code>jwt_configuration.alg</code>, <code>api_type</code>,
    <code>logo_uri</code>, <code>allowed_clients</code>, <code>owners</code>, <code>custom_login_page</code>,
    <code>custom_login_page_off</code>, <code>sso</code>, <code>addons</code>, <code>form_template</code>,
    <code>custom_login_page_codeview</code>, <code>resource_servers</code>, <code>client_metadata</code>,
    <code>mobile</code>, <code>mobile.android</code>, <code>mobile.ios</code>, <code>allowed_logout_urls</code>,
    <code>token_endpoint_auth_method</code>, <code>is_first_party</code>, <code>oidc_conformant</code>,
    <code>is_token_endpoint_ip_header_trusted</code>, <code>initiate_login_uri</code>, <code>grant_types</code>,
    <code>refresh_token</code>, <code>refresh_token.rotation_type</code>, <code>refresh_token.expiration_type</code>,
    <code>refresh_token.leeway</code>, <code>refresh_token.token_lifetime</code>, <code>refresh_token.policies</code>, <code>organization_usage</code>,
    <code>organization_require_behavior</code>.
  </li>
  <li>
    The following properties can only be retrieved with the <code>read:client_keys</code> or <code>read:client_credentials</code> scopes:
    <code>encryption_key</code>, <code>encryption_key.pub</code>, <code>encryption_key.cert</code>,
    <code>client_secret</code>, <code>client_authentication_methods</code> and <code>signing_key</code>.
  </li>
</ul>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clients.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the client to retrieve.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetClientRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Clients.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clients.<a href="/src/management/api/resources/clients/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a client and related configuration (rules, connections, etc).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clients.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the client to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Clients.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clients.<a href="/src/management/api/resources/clients/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateClientResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates a client's settings. For more information, read <a href="https://www.auth0.com/docs/get-started/applications"> Applications in Auth0</a> and <a href="https://www.auth0.com/docs/authenticate/single-sign-on"> Single Sign-On</a>.

Notes:

- The `client_secret` and `signing_key` attributes can only be updated with the `update:client_keys` scope.
- The <code>client_authentication_methods</code> and <code>token_endpoint_auth_method</code> properties are mutually exclusive. Use <code>client_authentication_methods</code> to configure the client with Private Key JWT authentication method. Otherwise, use <code>token_endpoint_auth_method</code> to configure the client with client secret (basic or post) or with no authentication method (none).
- When using <code>client_authentication_methods</code> to configure the client with Private Key JWT authentication method, only specify the credential IDs that were generated when creating the credentials on the client.
- To configure <code>client_authentication_methods</code>, the <code>update:client_credentials</code> scope is required.
- To configure <code>client_authentication_methods</code>, the property <code>jwt_configuration.alg</code> must be set to RS256.
- To change a client's <code>is_first_party</code> property to <code>false</code>, the <code>organization_usage</code> and <code>organization_require_behavior</code> properties must be unset.
  </dd>
  </dl>
  </dd>
  </dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clients.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the client to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateClientRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Clients.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clients.<a href="/src/management/api/resources/clients/client/Client.ts">rotateSecret</a>(id) -> Management.RotateClientSecretResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Rotate a client secret.

This endpoint cannot be used with clients configured with Private Key JWT authentication method (client_authentication_methods configured with private_key_jwt). The generated secret is NOT base64 encoded.

For more information, read <a href="https://www.auth0.com/docs/get-started/applications/rotate-client-secret">Rotate Client Secrets</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clients.rotateSecret("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the client that will rotate secrets.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Clients.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Connections

<details><summary><code>client.connections.<a href="/src/management/api/resources/connections/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.ConnectionForList></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves detailed list of all <a href="https://auth0.com/docs/authenticate/identity-providers">connections</a> that match the specified strategy. If no strategy is provided, all connections within your tenant are retrieved. This action can accept a list of fields to include or exclude from the resulting list of connections.

This endpoint supports two types of pagination:

<ul>
<li>Offset pagination</li>
<li>Checkpoint pagination</li>
</ul>

Checkpoint pagination must be used if you need to retrieve more than 1000 connections.

<h2>Checkpoint Pagination</h2>

To search by checkpoint, use the following parameters:

<ul>
<li><code>from</code>: Optional id from which to start selection.</li>
<li><code>take</code>: The total amount of entries to retrieve when using the from parameter. Defaults to 50.</li>
</ul>

<b>Note</b>: The first time you call this endpoint using checkpoint pagination, omit the <code>from</code> parameter. If there are more results, a <code>next</code> value is included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, no pages are remaining.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.connections.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.connections.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListConnectionsQueryParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.<a href="/src/management/api/resources/connections/client/Client.ts">create</a>({ ...params }) -> Management.CreateConnectionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a new connection according to the JSON object received in <code>body</code>.<br/>

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.create({
    name: "name",
    strategy: "ad",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateConnectionRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.<a href="/src/management/api/resources/connections/client/Client.ts">get</a>(id, { ...params }) -> Management.GetConnectionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details for a specified <a href="https://auth0.com/docs/authenticate/identity-providers">connection</a> along with options that can be used for identity provider configuration.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection to retrieve

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetConnectionRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.<a href="/src/management/api/resources/connections/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Removes a specific <a href="https://auth0.com/docs/authenticate/identity-providers">connection</a> from your tenant. This action cannot be undone. Once removed, users can no longer use this connection to authenticate.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection to delete

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.<a href="/src/management/api/resources/connections/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateConnectionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update details for a specific <a href="https://auth0.com/docs/authenticate/identity-providers">connection</a>, including option properties for identity provider configuration.

<b>Note</b>: If you use the <code>options</code> parameter, the entire <code>options</code> object is overriden. To avoid partial data or other issues, ensure all parameters are present when using this option.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection to update

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateConnectionRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.<a href="/src/management/api/resources/connections/client/Client.ts">checkStatus</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves the status of an ad/ldap connection referenced by its <code>ID</code>. <code>200 OK</code> http status code response is returned when the connection is online, otherwise a <code>404</code> status code is returned along with an error message

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.checkStatus("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the connection to check

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## CustomDomains

<details><summary><code>client.customDomains.<a href="/src/management/api/resources/customDomains/client/Client.ts">list</a>() -> Management.ListCustomDomainsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details on <a href="https://auth0.com/docs/custom-domains">custom domains</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.customDomains.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `CustomDomains.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.customDomains.<a href="/src/management/api/resources/customDomains/client/Client.ts">create</a>({ ...params }) -> Management.CreateCustomDomainResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new custom domain.

Note: The custom domain will need to be verified before it will accept
requests.

Optional attributes that can be updated:

- custom_client_ip_header
- tls_policy

TLS Policies:

- recommended - for modern usage this includes TLS 1.2 only
  </dd>
  </dl>
  </dd>
  </dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.customDomains.create({
    domain: "domain",
    type: "auth0_managed_certs",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateCustomDomainRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomDomains.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.customDomains.<a href="/src/management/api/resources/customDomains/client/Client.ts">get</a>(id) -> Management.GetCustomDomainResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a custom domain configuration and status.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.customDomains.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the custom domain to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomDomains.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.customDomains.<a href="/src/management/api/resources/customDomains/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a custom domain and stop serving requests for it.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.customDomains.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the custom domain to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomDomains.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.customDomains.<a href="/src/management/api/resources/customDomains/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateCustomDomainResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a custom domain.

These are the attributes that can be updated:

- custom_client_ip_header
- tls_policy

<h5>Updating CUSTOM_CLIENT_IP_HEADER for a custom domain</h5>To update the <code>custom_client_ip_header</code> for a domain, the body to
send should be:
<pre><code>{ "custom_client_ip_header": "cf-connecting-ip" }</code></pre>

<h5>Updating TLS_POLICY for a custom domain</h5>To update the <code>tls_policy</code> for a domain, the body to send should be:
<pre><code>{ "tls_policy": "recommended" }</code></pre>

TLS Policies:

- recommended - for modern usage this includes TLS 1.2 only

Some considerations:

- The TLS ciphers and protocols available in each TLS policy follow industry recommendations, and may be updated occasionally.
- The <code>compatible</code> TLS policy is no longer supported.
  </dd>
  </dl>
  </dd>
  </dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.customDomains.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the custom domain to update

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateCustomDomainRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomDomains.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.customDomains.<a href="/src/management/api/resources/customDomains/client/Client.ts">test</a>(id) -> Management.TestCustomDomainResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Run the test process on a custom domain.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.customDomains.test("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the custom domain to test.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomDomains.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.customDomains.<a href="/src/management/api/resources/customDomains/client/Client.ts">verify</a>(id) -> Management.VerifyCustomDomainResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Run the verification process on a custom domain.

Note: Check the <code>status</code> field to see its verification status. Once verification is complete, it may take up to 10 minutes before the custom domain can start accepting requests.

For <code>self_managed_certs</code>, when the custom domain is verified for the first time, the response will also include the <code>cname_api_key</code> which you will need to configure your proxy. This key must be kept secret, and is used to validate the proxy requests.

<a href="https://auth0.com/docs/custom-domains#step-2-verify-ownership">Learn more</a> about verifying custom domains that use Auth0 Managed certificates.
<a href="https://auth0.com/docs/custom-domains/self-managed-certificates#step-2-verify-ownership">Learn more</a> about verifying custom domains that use Self Managed certificates.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.customDomains.verify("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the custom domain to verify.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomDomains.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## DeviceCredentials

<details><summary><code>client.deviceCredentials.<a href="/src/management/api/resources/deviceCredentials/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.DeviceCredential></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve device credential information (<code>public_key</code>, <code>refresh_token</code>, or <code>rotating_refresh_token</code>) associated with a specific user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.deviceCredentials.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.deviceCredentials.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListDeviceCredentialsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeviceCredentials.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.deviceCredentials.<a href="/src/management/api/resources/deviceCredentials/client/Client.ts">createPublicKey</a>({ ...params }) -> Management.CreatePublicKeyDeviceCredentialResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a device credential public key to manage refresh token rotation for a given <code>user_id</code>. Device Credentials APIs are designed for ad-hoc administrative use only and paging is by default enabled for GET requests.

When refresh token rotation is enabled, the endpoint becomes consistent. For more information, read <a href="https://auth0.com/docs/get-started/tenant-settings/signing-keys"> Signing Keys</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deviceCredentials.createPublicKey({
    device_name: "device_name",
    value: "value",
    device_id: "device_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreatePublicKeyDeviceCredentialRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeviceCredentials.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.deviceCredentials.<a href="/src/management/api/resources/deviceCredentials/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Permanently delete a device credential (such as a refresh token or public key) with the given ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deviceCredentials.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the credential to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeviceCredentials.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## EmailTemplates

<details><summary><code>client.emailTemplates.<a href="/src/management/api/resources/emailTemplates/client/Client.ts">create</a>({ ...params }) -> Management.CreateEmailTemplateResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create an email template.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.emailTemplates.create({
    template: "verify_email",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateEmailTemplateRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EmailTemplates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.emailTemplates.<a href="/src/management/api/resources/emailTemplates/client/Client.ts">get</a>(templateName) -> Management.GetEmailTemplateResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve an email template by pre-defined name. These names are `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, and `async_approval`. The names `change_password`, and `password_reset` are also supported for legacy scenarios.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.emailTemplates.get("verify_email");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**templateName:** `Management.EmailTemplateNameEnum` — Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `async_approval`, `change_password` (legacy), or `password_reset` (legacy).

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EmailTemplates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.emailTemplates.<a href="/src/management/api/resources/emailTemplates/client/Client.ts">set</a>(templateName, { ...params }) -> Management.SetEmailTemplateResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update an email template.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.emailTemplates.set("verify_email", {
    template: "verify_email",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**templateName:** `Management.EmailTemplateNameEnum` — Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `async_approval`, `change_password` (legacy), or `password_reset` (legacy).

</dd>
</dl>

<dl>
<dd>

**request:** `Management.SetEmailTemplateRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EmailTemplates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.emailTemplates.<a href="/src/management/api/resources/emailTemplates/client/Client.ts">update</a>(templateName, { ...params }) -> Management.UpdateEmailTemplateResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Modify an email template.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.emailTemplates.update("verify_email");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**templateName:** `Management.EmailTemplateNameEnum` — Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `async_approval`, `change_password` (legacy), or `password_reset` (legacy).

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateEmailTemplateRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EmailTemplates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## EventStreams

<details><summary><code>client.eventStreams.<a href="/src/management/api/resources/eventStreams/client/Client.ts">list</a>({ ...params }) -> Management.EventStreamResponseContent[]</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eventStreams.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListEventStreamsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventStreams.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.eventStreams.<a href="/src/management/api/resources/eventStreams/client/Client.ts">create</a>({ ...params }) -> Management.CreateEventStreamResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eventStreams.create({
    destination: {
        type: "webhook",
        configuration: {
            webhook_endpoint: "webhook_endpoint",
            webhook_authorization: {
                method: "basic",
                username: "username",
            },
        },
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.EventStreamsCreateRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventStreams.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.eventStreams.<a href="/src/management/api/resources/eventStreams/client/Client.ts">get</a>(id) -> Management.GetEventStreamResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eventStreams.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the event stream.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventStreams.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.eventStreams.<a href="/src/management/api/resources/eventStreams/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eventStreams.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the event stream.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventStreams.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.eventStreams.<a href="/src/management/api/resources/eventStreams/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateEventStreamResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eventStreams.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the event stream.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateEventStreamRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventStreams.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.eventStreams.<a href="/src/management/api/resources/eventStreams/client/Client.ts">test</a>(id, { ...params }) -> Management.CreateEventStreamTestEventResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eventStreams.test("id", {
    event_type: "user.created",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the event stream.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreateEventStreamTestEventRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventStreams.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Flows

<details><summary><code>client.flows.<a href="/src/management/api/resources/flows/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.FlowSummary></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.flows.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.flows.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.FlowsListRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Flows.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.flows.<a href="/src/management/api/resources/flows/client/Client.ts">create</a>({ ...params }) -> Management.CreateFlowResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.flows.create({
    name: "name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateFlowRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Flows.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.flows.<a href="/src/management/api/resources/flows/client/Client.ts">get</a>(id, { ...params }) -> Management.GetFlowResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.flows.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Flow identifier

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetFlowRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Flows.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.flows.<a href="/src/management/api/resources/flows/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.flows.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Flow id

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Flows.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.flows.<a href="/src/management/api/resources/flows/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateFlowResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.flows.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Flow identifier

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateFlowRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Flows.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Forms

<details><summary><code>client.forms.<a href="/src/management/api/resources/forms/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.FormSummary></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.forms.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.forms.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListFormsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Forms.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.forms.<a href="/src/management/api/resources/forms/client/Client.ts">create</a>({ ...params }) -> Management.CreateFormResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.forms.create({
    name: "name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateFormRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Forms.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.forms.<a href="/src/management/api/resources/forms/client/Client.ts">get</a>(id, { ...params }) -> Management.GetFormResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.forms.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the form to retrieve.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetFormRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Forms.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.forms.<a href="/src/management/api/resources/forms/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.forms.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the form to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Forms.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.forms.<a href="/src/management/api/resources/forms/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateFormResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.forms.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the form to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateFormRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Forms.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## UserGrants

<details><summary><code>client.userGrants.<a href="/src/management/api/resources/userGrants/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.UserGrant></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the <a href="https://auth0.com/docs/api-auth/which-oauth-flow-to-use">grants</a> associated with your account.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.userGrants.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.userGrants.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListUserGrantsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UserGrants.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.userGrants.<a href="/src/management/api/resources/userGrants/client/Client.ts">deleteByUserId</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a grant associated with your account.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.userGrants.deleteByUserId({
    user_id: "user_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.DeleteUserGrantByUserIdRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UserGrants.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.userGrants.<a href="/src/management/api/resources/userGrants/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a grant associated with your account.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.userGrants.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the grant to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UserGrants.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Hooks

<details><summary><code>client.hooks.<a href="/src/management/api/resources/hooks/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.Hook></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all <a href="https://auth0.com/docs/hooks">hooks</a>. Accepts a list of fields to include or exclude in the result.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.hooks.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.hooks.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListHooksRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Hooks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.hooks.<a href="/src/management/api/resources/hooks/client/Client.ts">create</a>({ ...params }) -> Management.CreateHookResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new hook.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.hooks.create({
    name: "name",
    script: "script",
    triggerId: "credentials-exchange",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateHookRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Hooks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.hooks.<a href="/src/management/api/resources/hooks/client/Client.ts">get</a>(id, { ...params }) -> Management.GetHookResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve <a href="https://auth0.com/docs/hooks">a hook</a> by its ID. Accepts a list of fields to include in the result.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.hooks.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the hook to retrieve.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetHookRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Hooks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.hooks.<a href="/src/management/api/resources/hooks/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a hook.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.hooks.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the hook to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Hooks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.hooks.<a href="/src/management/api/resources/hooks/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateHookResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update an existing hook.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.hooks.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the hook to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateHookRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Hooks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Jobs

<details><summary><code>client.jobs.<a href="/src/management/api/resources/jobs/client/Client.ts">get</a>(id) -> Management.GetJobResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves a job. Useful to check its status.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.jobs.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the job.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Jobs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## LogStreams

<details><summary><code>client.logStreams.<a href="/src/management/api/resources/logStreams/client/Client.ts">list</a>() -> Management.LogStreamResponseSchema[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details on <a href="https://auth0.com/docs/logs/streams">log streams</a>.

<h5>Sample Response</h5><pre><code>[{
	"id": "string",
	"name": "string",
	"type": "eventbridge",
	"status": "active|paused|suspended",
	"sink": {
		"awsAccountId": "string",
		"awsRegion": "string",
		"awsPartnerEventSource": "string"
	}
}, {
	"id": "string",
	"name": "string",
	"type": "http",
	"status": "active|paused|suspended",
	"sink": {
		"httpContentFormat": "JSONLINES|JSONARRAY",
		"httpContentType": "string",
		"httpEndpoint": "string",
		"httpAuthorization": "string"
	}
},
{
	"id": "string",
	"name": "string",
	"type": "eventgrid",
	"status": "active|paused|suspended",
	"sink": {
		"azureSubscriptionId": "string",
		"azureResourceGroup": "string",
		"azureRegion": "string",
		"azurePartnerTopic": "string"
	}
},
{
	"id": "string",
	"name": "string",
	"type": "splunk",
	"status": "active|paused|suspended",
	"sink": {
		"splunkDomain": "string",
		"splunkToken": "string",
		"splunkPort": "string",
		"splunkSecure": "boolean"
	}
},
{
	"id": "string",
	"name": "string",
	"type": "sumo",
	"status": "active|paused|suspended",
	"sink": {
		"sumoSourceAddress": "string",
	}
},
{
	"id": "string",
	"name": "string",
	"type": "datadog",
	"status": "active|paused|suspended",
	"sink": {
		"datadogRegion": "string",
		"datadogApiKey": "string"
	}
}]</code></pre>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.logStreams.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `LogStreams.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.logStreams.<a href="/src/management/api/resources/logStreams/client/Client.ts">create</a>({ ...params }) -> Management.CreateLogStreamResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a log stream.

<h5>Log Stream Types</h5> The <code>type</code> of log stream being created determines the properties required in the <code>sink</code> payload.
<h5>HTTP Stream</h5> For an <code>http</code> Stream, the <code>sink</code> properties are listed in the payload below
Request: <pre><code>{
	"name": "string",
	"type": "http",
	"sink": {
		"httpEndpoint": "string",
		"httpContentType": "string",
		"httpContentFormat": "JSONLINES|JSONARRAY",
		"httpAuthorization": "string"
	}
}</code></pre>
Response: <pre><code>{
	"id": "string",
	"name": "string",
	"type": "http",
	"status": "active",
	"sink": {
		"httpEndpoint": "string",
		"httpContentType": "string",
		"httpContentFormat": "JSONLINES|JSONARRAY",
		"httpAuthorization": "string"
	}
}</code></pre>
<h5>Amazon EventBridge Stream</h5> For an <code>eventbridge</code> Stream, the <code>sink</code> properties are listed in the payload below
Request: <pre><code>{
	"name": "string",
	"type": "eventbridge",
	"sink": {
		"awsRegion": "string",
		"awsAccountId": "string"
	}
}</code></pre>
The response will include an additional field <code>awsPartnerEventSource</code> in the <code>sink</code>: <pre><code>{
	"id": "string",
	"name": "string",
	"type": "eventbridge",
	"status": "active",
	"sink": {
		"awsAccountId": "string",
		"awsRegion": "string",
		"awsPartnerEventSource": "string"
	}
}</code></pre>
<h5>Azure Event Grid Stream</h5> For an <code>Azure Event Grid</code> Stream, the <code>sink</code> properties are listed in the payload below
Request: <pre><code>{
	"name": "string",
	"type": "eventgrid",
	"sink": {
		"azureSubscriptionId": "string",
		"azureResourceGroup": "string",
		"azureRegion": "string"
	}
}</code></pre>
Response: <pre><code>{
	"id": "string",
	"name": "string",
	"type": "http",
	"status": "active",
	"sink": {
		"azureSubscriptionId": "string",
		"azureResourceGroup": "string",
		"azureRegion": "string",
		"azurePartnerTopic": "string"
	}
}</code></pre>
<h5>Datadog Stream</h5> For a <code>Datadog</code> Stream, the <code>sink</code> properties are listed in the payload below
Request: <pre><code>{
	"name": "string",
	"type": "datadog",
	"sink": {
		"datadogRegion": "string",
		"datadogApiKey": "string"
	}
}</code></pre>
Response: <pre><code>{
	"id": "string",
	"name": "string",
	"type": "datadog",
	"status": "active",
	"sink": {
		"datadogRegion": "string",
		"datadogApiKey": "string"
	}
}</code></pre>
<h5>Splunk Stream</h5> For a <code>Splunk</code> Stream, the <code>sink</code> properties are listed in the payload below
Request: <pre><code>{
	"name": "string",
	"type": "splunk",
	"sink": {
		"splunkDomain": "string",
		"splunkToken": "string",
		"splunkPort": "string",
		"splunkSecure": "boolean"
	}
}</code></pre>
Response: <pre><code>{
	"id": "string",
	"name": "string",
	"type": "splunk",
	"status": "active",
	"sink": {
		"splunkDomain": "string",
		"splunkToken": "string",
		"splunkPort": "string",
		"splunkSecure": "boolean"
	}
}</code></pre>
<h5>Sumo Logic Stream</h5> For a <code>Sumo Logic</code> Stream, the <code>sink</code> properties are listed in the payload below
Request: <pre><code>{
	"name": "string",
	"type": "sumo",
	"sink": {
		"sumoSourceAddress": "string",
	}
}</code></pre>
Response: <pre><code>{
	"id": "string",
	"name": "string",
	"type": "sumo",
	"status": "active",
	"sink": {
		"sumoSourceAddress": "string",
	}
}</code></pre>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.logStreams.create({
    type: "http",
    sink: {
        httpEndpoint: "httpEndpoint",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateLogStreamRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `LogStreams.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.logStreams.<a href="/src/management/api/resources/logStreams/client/Client.ts">get</a>(id) -> Management.GetLogStreamResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a log stream configuration and status.

<h5>Sample responses</h5><h5>Amazon EventBridge Log Stream</h5><pre><code>{
	"id": "string",
	"name": "string",
	"type": "eventbridge",
	"status": "active|paused|suspended",
	"sink": {
		"awsAccountId": "string",
		"awsRegion": "string",
		"awsPartnerEventSource": "string"
	}
}</code></pre> <h5>HTTP Log Stream</h5><pre><code>{
	"id": "string",
	"name": "string",
	"type": "http",
	"status": "active|paused|suspended",
	"sink": {
		"httpContentFormat": "JSONLINES|JSONARRAY",
		"httpContentType": "string",
		"httpEndpoint": "string",
		"httpAuthorization": "string"
	}
}</code></pre> <h5>Datadog Log Stream</h5><pre><code>{
	"id": "string",
	"name": "string",
	"type": "datadog",
	"status": "active|paused|suspended",
	"sink": {
		"datadogRegion": "string",
		"datadogApiKey": "string"
	}

}</code></pre><h5>Mixpanel</h5>
Request: <pre><code>{
"name": "string",
"type": "mixpanel",
"sink": {
"mixpanelRegion": "string", // "us" | "eu",
"mixpanelProjectId": "string",
"mixpanelServiceAccountUsername": "string",
"mixpanelServiceAccountPassword": "string"
}
} </code></pre>
Response: <pre><code>{
"id": "string",
"name": "string",
"type": "mixpanel",
"status": "active",
"sink": {
"mixpanelRegion": "string", // "us" | "eu",
"mixpanelProjectId": "string",
"mixpanelServiceAccountUsername": "string",
"mixpanelServiceAccountPassword": "string" // the following is redacted on return
}
} </code></pre>

    <h5>Segment</h5>

    Request: <pre><code> {
      "name": "string",
      "type": "segment",
      "sink": {
    	"segmentWriteKey": "string"
      }
    }</code></pre>

    Response: <pre><code>{
      "id": "string",
      "name": "string",
      "type": "segment",
      "status": "active",
      "sink": {
    	"segmentWriteKey": "string"
      }
    } </code></pre>

<h5>Splunk Log Stream</h5><pre><code>{
	"id": "string",
	"name": "string",
	"type": "splunk",
	"status": "active|paused|suspended",
	"sink": {
		"splunkDomain": "string",
		"splunkToken": "string",
		"splunkPort": "string",
		"splunkSecure": "boolean"
	}
}</code></pre> <h5>Sumo Logic Log Stream</h5><pre><code>{
	"id": "string",
	"name": "string",
	"type": "sumo",
	"status": "active|paused|suspended",
	"sink": {
		"sumoSourceAddress": "string",
	}
}</code></pre> <h5>Status</h5> The <code>status</code> of a log stream maybe any of the following:
1. <code>active</code> - Stream is currently enabled.
2. <code>paused</code> - Stream is currently user disabled and will not attempt log delivery.
3. <code>suspended</code> - Stream is currently disabled because of errors and will not attempt log delivery.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.logStreams.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the log stream to get

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `LogStreams.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.logStreams.<a href="/src/management/api/resources/logStreams/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a log stream.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.logStreams.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the log stream to delete

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `LogStreams.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.logStreams.<a href="/src/management/api/resources/logStreams/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateLogStreamResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a log stream.

<h4>Examples of how to use the PATCH endpoint.</h4> The following fields may be updated in a PATCH operation: <ul><li>name</li><li>status</li><li>sink</li></ul> Note: For log streams of type <code>eventbridge</code> and <code>eventgrid</code>, updating the <code>sink</code> is not permitted.
<h5>Update the status of a log stream</h5><pre><code>{
	"status": "active|paused"
}</code></pre>
<h5>Update the name of a log stream</h5><pre><code>{
	"name": "string"
}</code></pre>
<h5>Update the sink properties of a stream of type <code>http</code></h5><pre><code>{
  "sink": {
    "httpEndpoint": "string",
    "httpContentType": "string",
    "httpContentFormat": "JSONARRAY|JSONLINES",
    "httpAuthorization": "string"
  }
}</code></pre>
<h5>Update the sink properties of a stream of type <code>datadog</code></h5><pre><code>{
  "sink": {
		"datadogRegion": "string",
		"datadogApiKey": "string"
  }
}</code></pre>
<h5>Update the sink properties of a stream of type <code>splunk</code></h5><pre><code>{
  "sink": {
    "splunkDomain": "string",
    "splunkToken": "string",
    "splunkPort": "string",
    "splunkSecure": "boolean"
  }
}</code></pre>
<h5>Update the sink properties of a stream of type <code>sumo</code></h5><pre><code>{
  "sink": {
    "sumoSourceAddress": "string"
  }
}</code></pre> 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.logStreams.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the log stream to get

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateLogStreamRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `LogStreams.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Logs

<details><summary><code>client.logs.<a href="/src/management/api/resources/logs/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.Log></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve log entries that match the specified search criteria (or all log entries if no criteria specified).

Set custom search criteria using the <code>q</code> parameter, or search from a specific log ID (<i>"search from checkpoint"</i>).

For more information on all possible event types, their respective acronyms, and descriptions, see <a href="https://auth0.com/docs/logs/log-event-type-codes">Log Event Type Codes</a>.

<h5>To set custom search criteria, use the following parameters:</h5>

<ul>
    <li><b>q:</b> Search Criteria using <a href="https://auth0.com/docs/logs/log-search-query-syntax">Query String Syntax</a></li>
    <li><b>page:</b> Page index of the results to return. First page is 0.</li>
    <li><b>per_page:</b> Number of results per page.</li>
    <li><b>sort:</b> Field to use for sorting appended with `:1` for ascending and `:-1` for descending. e.g. `date:-1`</li>
    <li><b>fields:</b> Comma-separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve all fields.</li>
    <li><b>include_fields:</b> Whether specified fields are to be included (true) or excluded (false).</li>
    <li><b>include_totals:</b> Return results inside an object that contains the total result count (true) or as a direct array of results (false, default). <b>Deprecated:</b> this field is deprecated and should be removed from use. See <a href="https://auth0.com/docs/product-lifecycle/deprecations-and-migrations/migrate-to-tenant-log-search-v3#pagination">Search Engine V3 Breaking Changes</a></li>
</ul>

For more information on the list of fields that can be used in <code>fields</code> and <code>sort</code>, see <a href="https://auth0.com/docs/logs/log-search-query-syntax#searchable-fields">Searchable Fields</a>.

Auth0 <a href="https://auth0.com/docs/logs/retrieve-log-events-using-mgmt-api#limitations">limits the number of logs</a> you can return by search criteria to 100 logs per request. Furthermore, you may paginate only through 1,000 search results. If you exceed this threshold, please redefine your search or use the <a href="https://auth0.com/docs/logs/retrieve-log-events-using-mgmt-api#retrieve-logs-by-checkpoint">get logs by checkpoint method</a>.

<h5>To search from a checkpoint log ID, use the following parameters:</h5>
<ul>
    <li><b>from:</b> Log Event ID from which to start retrieving logs. You can limit the number of logs returned using the <code>take</code> parameter. If you use <code>from</code> at the same time as <code>q</code>, <code>from</code> takes precedence and <code>q</code> is ignored.</li>
    <li><b>take:</b> Number of entries to retrieve when using the <code>from</code> parameter.</li>
</ul>

<strong>Important:</strong> When fetching logs from a checkpoint log ID, any parameter other than <code>from</code> and <code>take</code> will be ignored, and date ordering is not guaranteed.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.logs.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.logs.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListLogsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Logs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.logs.<a href="/src/management/api/resources/logs/client/Client.ts">get</a>(id) -> Management.GetLogResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve an individual log event.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.logs.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — log_id of the log to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Logs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## NetworkAcls

<details><summary><code>client.networkAcls.<a href="/src/management/api/resources/networkAcls/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.NetworkAclsResponseContent></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get all access control list entries for your client.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.networkAcls.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.networkAcls.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListNetworkAclsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `NetworkAcls.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.networkAcls.<a href="/src/management/api/resources/networkAcls/client/Client.ts">create</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new access control list for your client.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.networkAcls.create({
    description: "description",
    active: true,
    priority: 1.1,
    rule: {
        action: {},
        scope: "management",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateNetworkAclRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `NetworkAcls.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.networkAcls.<a href="/src/management/api/resources/networkAcls/client/Client.ts">get</a>(id) -> Management.GetNetworkAclsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get a specific access control list entry for your client.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.networkAcls.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the access control list to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `NetworkAcls.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.networkAcls.<a href="/src/management/api/resources/networkAcls/client/Client.ts">set</a>(id, { ...params }) -> Management.SetNetworkAclsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update existing access control list for your client.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.networkAcls.set("id", {
    description: "description",
    active: true,
    priority: 1.1,
    rule: {
        action: {},
        scope: "management",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the ACL to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.SetNetworkAclRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `NetworkAcls.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.networkAcls.<a href="/src/management/api/resources/networkAcls/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete existing access control list for your client.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.networkAcls.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the ACL to delete

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `NetworkAcls.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.networkAcls.<a href="/src/management/api/resources/networkAcls/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateNetworkAclResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update existing access control list for your client.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.networkAcls.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the ACL to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateNetworkAclRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `NetworkAcls.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Organizations

<details><summary><code>client.organizations.<a href="/src/management/api/resources/organizations/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.Organization></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve detailed list of all Organizations available in your tenant. For more information, see Auth0 Organizations.

This endpoint supports two types of pagination:

<ul>
<li>Offset pagination</li>
<li>Checkpoint pagination</li>
</ul>

Checkpoint pagination must be used if you need to retrieve more than 1000 organizations.

<h2>Checkpoint Pagination</h2>

To search by checkpoint, use the following parameters:

<ul>
<li><code>from</code>: Optional id from which to start selection.</li>
<li><code>take</code>: The total number of entries to retrieve when using the <code>from</code> parameter. Defaults to 50.</li>
</ul>

<b>Note</b>: The first time you call this endpoint using checkpoint pagination, omit the <code>from</code> parameter. If there are more results, a <code>next</code> value is included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, no pages are remaining.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.organizations.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.organizations.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListOrganizationsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Organizations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.<a href="/src/management/api/resources/organizations/client/Client.ts">create</a>({ ...params }) -> Management.CreateOrganizationResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new Organization within your tenant. To learn more about Organization settings, behavior, and configuration options, review <a href="https://auth0.com/docs/manage-users/organizations/create-first-organization">Create Your First Organization</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.create({
    name: "name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateOrganizationRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Organizations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.<a href="/src/management/api/resources/organizations/client/Client.ts">getByName</a>(name) -> Management.GetOrganizationByNameResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details about a single Organization specified by name.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.getByName("name");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**name:** `string` — name of the organization to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Organizations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.<a href="/src/management/api/resources/organizations/client/Client.ts">get</a>(id) -> Management.GetOrganizationResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details about a single Organization specified by ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the organization to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Organizations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.<a href="/src/management/api/resources/organizations/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove an Organization from your tenant. This action cannot be undone.

<b>Note</b>: Members are automatically disassociated from an Organization when it is deleted. However, this action does <b>not</b> delete these users from your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Organizations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.<a href="/src/management/api/resources/organizations/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateOrganizationResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update the details of a specific <a href="https://auth0.com/docs/manage-users/organizations/configure-organizations/create-organizations">Organization</a>, such as name and display name, branding options, and metadata.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the organization to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateOrganizationRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Organizations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Prompts

<details><summary><code>client.prompts.<a href="/src/management/api/resources/prompts/client/Client.ts">getSettings</a>() -> Management.GetSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of the Universal Login configuration of your tenant. This includes the <a href="https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first">Identifier First Authentication</a> and <a href="https://auth0.com/docs/secure/multi-factor-authentication/fido-authentication-with-webauthn/configure-webauthn-device-biometrics-for-mfa">WebAuthn with Device Biometrics for MFA</a> features.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompts.getSettings();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Prompts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.prompts.<a href="/src/management/api/resources/prompts/client/Client.ts">updateSettings</a>({ ...params }) -> Management.UpdateSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update the Universal Login configuration of your tenant. This includes the <a href="https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first">Identifier First Authentication</a> and <a href="https://auth0.com/docs/secure/multi-factor-authentication/fido-authentication-with-webauthn/configure-webauthn-device-biometrics-for-mfa">WebAuthn with Device Biometrics for MFA</a> features.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompts.updateSettings();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateSettingsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## RefreshTokens

<details><summary><code>client.refreshTokens.<a href="/src/management/api/resources/refreshTokens/client/Client.ts">get</a>(id) -> Management.GetRefreshTokenResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve refresh token information.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.refreshTokens.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID refresh token to retrieve

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefreshTokens.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.refreshTokens.<a href="/src/management/api/resources/refreshTokens/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a refresh token by its ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.refreshTokens.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the refresh token to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefreshTokens.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## ResourceServers

<details><summary><code>client.resourceServers.<a href="/src/management/api/resources/resourceServers/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.ResourceServer></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of all APIs associated with your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.resourceServers.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.resourceServers.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListResourceServerRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ResourceServers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.resourceServers.<a href="/src/management/api/resources/resourceServers/client/Client.ts">create</a>({ ...params }) -> Management.CreateResourceServerResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new API associated with your tenant. Note that all new APIs must be registered with Auth0. For more information, read <a href="https://www.auth0.com/docs/get-started/apis"> APIs</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.resourceServers.create({
    identifier: "identifier",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateResourceServerRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ResourceServers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.resourceServers.<a href="/src/management/api/resources/resourceServers/client/Client.ts">get</a>(id, { ...params }) -> Management.GetResourceServerResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve <a href="https://auth0.com/docs/apis">API</a> details with the given ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.resourceServers.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID or audience of the resource server to retrieve.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetResourceServerRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ResourceServers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.resourceServers.<a href="/src/management/api/resources/resourceServers/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete an existing API by ID. For more information, read <a href="https://www.auth0.com/docs/get-started/apis/api-settings">API Settings</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.resourceServers.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID or the audience of the resource server to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ResourceServers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.resourceServers.<a href="/src/management/api/resources/resourceServers/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateResourceServerResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Change an existing API setting by resource server ID. For more information, read <a href="https://www.auth0.com/docs/get-started/apis/api-settings">API Settings</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.resourceServers.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID or audience of the resource server to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateResourceServerRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ResourceServers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Roles

<details><summary><code>client.roles.<a href="/src/management/api/resources/roles/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.Role></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve detailed list of user roles created in your tenant.

<b>Note</b>: The returned list does not include standard roles available for tenant members, such as Admin or Support Access.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.roles.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.roles.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListRolesRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Roles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.roles.<a href="/src/management/api/resources/roles/client/Client.ts">create</a>({ ...params }) -> Management.CreateRoleResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a user role for <a href="https://auth0.com/docs/manage-users/access-control/rbac">Role-Based Access Control</a>.

<b>Note</b>: New roles are not associated with any permissions by default. To assign existing permissions to your role, review Associate Permissions with a Role. To create new permissions, review Add API Permissions.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.roles.create({
    name: "name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateRoleRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Roles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.roles.<a href="/src/management/api/resources/roles/client/Client.ts">get</a>(id) -> Management.GetRoleResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details about a specific <a href="https://auth0.com/docs/manage-users/access-control/rbac">user role</a> specified by ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.roles.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the role to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Roles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.roles.<a href="/src/management/api/resources/roles/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a specific <a href="https://auth0.com/docs/manage-users/access-control/rbac">user role</a> from your tenant. Once deleted, it is removed from any user who was previously assigned that role. This action cannot be undone.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.roles.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the role to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Roles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.roles.<a href="/src/management/api/resources/roles/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateRoleResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Modify the details of a specific <a href="https://auth0.com/docs/manage-users/access-control/rbac">user role</a> specified by ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.roles.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the role to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateRoleRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Roles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Rules

<details><summary><code>client.rules.<a href="/src/management/api/resources/rules/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.Rule></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a filtered list of <a href="https://auth0.com/docs/rules">rules</a>. Accepts a list of fields to include or exclude.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.rules.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.rules.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListRulesRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Rules.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.rules.<a href="/src/management/api/resources/rules/client/Client.ts">create</a>({ ...params }) -> Management.CreateRuleResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a <a href="https://auth0.com/docs/rules#create-a-new-rule-using-the-management-api">new rule</a>.

Note: Changing a rule's stage of execution from the default <code>login_success</code> can change the rule's function signature to have user omitted.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.rules.create({
    name: "name",
    script: "script",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateRuleRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Rules.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.rules.<a href="/src/management/api/resources/rules/client/Client.ts">get</a>(id, { ...params }) -> Management.GetRuleResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve <a href="https://auth0.com/docs/rules">rule</a> details. Accepts a list of fields to include or exclude in the result.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.rules.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the rule to retrieve.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetRuleRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Rules.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.rules.<a href="/src/management/api/resources/rules/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a rule.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.rules.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the rule to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Rules.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.rules.<a href="/src/management/api/resources/rules/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateRuleResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update an existing rule.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.rules.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the rule to retrieve.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateRuleRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Rules.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## RulesConfigs

<details><summary><code>client.rulesConfigs.<a href="/src/management/api/resources/rulesConfigs/client/Client.ts">list</a>() -> Management.RulesConfig[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve rules config variable keys.

    Note: For security, config variable values cannot be retrieved outside rule execution.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.rulesConfigs.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `RulesConfigs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.rulesConfigs.<a href="/src/management/api/resources/rulesConfigs/client/Client.ts">set</a>(key, { ...params }) -> Management.SetRulesConfigResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Sets a rules config variable.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.rulesConfigs.set("key", {
    value: "value",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**key:** `string` — Key of the rules config variable to set (max length: 127 characters).

</dd>
</dl>

<dl>
<dd>

**request:** `Management.SetRulesConfigRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RulesConfigs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.rulesConfigs.<a href="/src/management/api/resources/rulesConfigs/client/Client.ts">delete</a>(key) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a rules config variable identified by its key.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.rulesConfigs.delete("key");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**key:** `string` — Key of the rules config variable to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RulesConfigs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## SelfServiceProfiles

<details><summary><code>client.selfServiceProfiles.<a href="/src/management/api/resources/selfServiceProfiles/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.SelfServiceProfile></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves self-service profiles.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.selfServiceProfiles.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.selfServiceProfiles.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListSelfServiceProfilesRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SelfServiceProfiles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.selfServiceProfiles.<a href="/src/management/api/resources/selfServiceProfiles/client/Client.ts">create</a>({ ...params }) -> Management.CreateSelfServiceProfileResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a self-service profile.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.selfServiceProfiles.create({
    name: "name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateSelfServiceProfileRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SelfServiceProfiles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.selfServiceProfiles.<a href="/src/management/api/resources/selfServiceProfiles/client/Client.ts">get</a>(id) -> Management.GetSelfServiceProfileResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves a self-service profile by Id.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.selfServiceProfiles.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the self-service profile to retrieve

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SelfServiceProfiles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.selfServiceProfiles.<a href="/src/management/api/resources/selfServiceProfiles/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a self-service profile by Id.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.selfServiceProfiles.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the self-service profile to delete

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SelfServiceProfiles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.selfServiceProfiles.<a href="/src/management/api/resources/selfServiceProfiles/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateSelfServiceProfileResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates a self-service profile.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.selfServiceProfiles.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the self-service profile to update

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateSelfServiceProfileRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SelfServiceProfiles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Sessions

<details><summary><code>client.sessions.<a href="/src/management/api/resources/sessions/client/Client.ts">get</a>(id) -> Management.GetSessionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve session information.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sessions.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of session to retrieve

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.sessions.<a href="/src/management/api/resources/sessions/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a session by ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sessions.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the session to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.sessions.<a href="/src/management/api/resources/sessions/client/Client.ts">revoke</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Revokes a session by ID and all associated refresh tokens.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sessions.revoke("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the session to revoke.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Stats

<details><summary><code>client.stats.<a href="/src/management/api/resources/stats/client/Client.ts">getActiveUsersCount</a>() -> Management.GetActiveUsersCountStatsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the number of active users that logged in during the last 30 days.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.stats.getActiveUsersCount();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Stats.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.stats.<a href="/src/management/api/resources/stats/client/Client.ts">getDaily</a>({ ...params }) -> Management.DailyStats[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the number of logins, signups and breached-password detections (subscription required) that occurred each day within a specified date range.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.stats.getDaily();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.GetDailyStatsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Stats.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## SupplementalSignals

<details><summary><code>client.supplementalSignals.<a href="/src/management/api/resources/supplementalSignals/client/Client.ts">get</a>() -> Management.GetSupplementalSignalsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the supplemental signals configuration for a tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.supplementalSignals.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `SupplementalSignals.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.supplementalSignals.<a href="/src/management/api/resources/supplementalSignals/client/Client.ts">patch</a>({ ...params }) -> Management.PatchSupplementalSignalsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update the supplemental signals configuration for a tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.supplementalSignals.patch({
    akamai_enabled: true,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateSupplementalSignalsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SupplementalSignals.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Tickets

<details><summary><code>client.tickets.<a href="/src/management/api/resources/tickets/client/Client.ts">verifyEmail</a>({ ...params }) -> Management.VerifyEmailTicketResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create an email verification ticket for a given user. An email verification ticket is a generated URL that the user can consume to verify their email address.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tickets.verifyEmail({
    user_id: "user_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.VerifyEmailTicketRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tickets.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tickets.<a href="/src/management/api/resources/tickets/client/Client.ts">changePassword</a>({ ...params }) -> Management.ChangePasswordTicketResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a password change ticket for a given user. A password change ticket is a generated URL that the user can consume to start a reset password flow.

Note: This endpoint does not verify the given user’s identity. If you call this endpoint within your application, you must design your application to verify the user’s identity.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tickets.changePassword();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ChangePasswordTicketRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tickets.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## TokenExchangeProfiles

<details><summary><code>client.tokenExchangeProfiles.<a href="/src/management/api/resources/tokenExchangeProfiles/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.TokenExchangeProfileResponseContent></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a list of all Token Exchange Profiles available in your tenant.

This endpoint supports Checkpoint pagination. To search by checkpoint, use the following parameters:

<ul>
<li><code>from</code>: Optional id from which to start selection.</li>
<li><code>take</code>: The total amount of entries to retrieve when using the from parameter. Defaults to 50.</li>
</ul>

<b>Note</b>: The first time you call this endpoint using checkpoint pagination, omit the <code>from</code> parameter. If there are more results, a <code>next</code> value is included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, no pages are remaining.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.tokenExchangeProfiles.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.tokenExchangeProfiles.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.TokenExchangeProfilesListRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TokenExchangeProfiles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tokenExchangeProfiles.<a href="/src/management/api/resources/tokenExchangeProfiles/client/Client.ts">create</a>({ ...params }) -> Management.CreateTokenExchangeProfileResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new Token Exchange Profile within your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokenExchangeProfiles.create({
    name: "name",
    subject_token_type: "subject_token_type",
    action_id: "action_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateTokenExchangeProfileRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TokenExchangeProfiles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tokenExchangeProfiles.<a href="/src/management/api/resources/tokenExchangeProfiles/client/Client.ts">get</a>(id) -> Management.GetTokenExchangeProfileResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details about a single Token Exchange Profile specified by ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokenExchangeProfiles.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the Token Exchange Profile to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TokenExchangeProfiles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tokenExchangeProfiles.<a href="/src/management/api/resources/tokenExchangeProfiles/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a Token Exchange Profile within your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokenExchangeProfiles.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the Token Exchange Profile to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TokenExchangeProfiles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tokenExchangeProfiles.<a href="/src/management/api/resources/tokenExchangeProfiles/client/Client.ts">update</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a Token Exchange Profile within your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokenExchangeProfiles.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the Token Exchange Profile to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateTokenExchangeProfileRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TokenExchangeProfiles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## UserBlocks

<details><summary><code>client.userBlocks.<a href="/src/management/api/resources/userBlocks/client/Client.ts">listByIdentifier</a>({ ...params }) -> Management.ListUserBlocksByIdentifierResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of all <a href="https://auth0.com/docs/secure/attack-protection/brute-force-protection">Brute-force Protection</a> blocks for a user with the given identifier (username, phone number, or email).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.userBlocks.listByIdentifier({
    identifier: "identifier",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListUserBlocksByIdentifierRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UserBlocks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.userBlocks.<a href="/src/management/api/resources/userBlocks/client/Client.ts">deleteByIdentifier</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove all <a href="https://auth0.com/docs/secure/attack-protection/brute-force-protection">Brute-force Protection</a> blocks for the user with the given identifier (username, phone number, or email).

Note: This endpoint does not unblock users that were <a href="https://auth0.com/docs/user-profile#block-and-unblock-a-user">blocked by a tenant administrator</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.userBlocks.deleteByIdentifier({
    identifier: "identifier",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.DeleteUserBlocksByIdentifierRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UserBlocks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.userBlocks.<a href="/src/management/api/resources/userBlocks/client/Client.ts">list</a>(id, { ...params }) -> Management.ListUserBlocksResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of all <a href="https://auth0.com/docs/secure/attack-protection/brute-force-protection">Brute-force Protection</a> blocks for the user with the given ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.userBlocks.list("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — user_id of the user blocks to retrieve.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListUserBlocksRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UserBlocks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.userBlocks.<a href="/src/management/api/resources/userBlocks/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove all <a href="https://auth0.com/docs/secure/attack-protection/brute-force-protection">Brute-force Protection</a> blocks for the user with the given ID.

Note: This endpoint does not unblock users that were <a href="https://auth0.com/docs/user-profile#block-and-unblock-a-user">blocked by a tenant administrator</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.userBlocks.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The user_id of the user to update.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UserBlocks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users

<details><summary><code>client.users.<a href="/src/management/api/resources/users/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.UserResponseSchema></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of users. It is possible to:

- Specify a search criteria for users
- Sort the users to be returned
- Select the fields to be returned
- Specify the number of users to retrieve per page and the page index
     <!-- only v3 is available -->
    The <code>q</code> query parameter can be used to get users that match the specified criteria <a href="https://auth0.com/docs/users/search/v3/query-syntax">using query string syntax.</a>

<a href="https://auth0.com/docs/users/search/v3">Learn more about searching for users.</a>

Read about <a href="https://auth0.com/docs/users/search/best-practices">best practices</a> when working with the API endpoints for retrieving users.

Auth0 limits the number of users you can return. If you exceed this threshold, please redefine your search, use the <a href="https://auth0.com/docs/api/management/v2#!/Jobs/post_users_exports">export job</a>, or the <a href="https://auth0.com/docs/extensions/user-import-export">User Import / Export</a> extension.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.users.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.users.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListUsersRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/management/api/resources/users/client/Client.ts">create</a>({ ...params }) -> Management.CreateUserResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new user for a given <a href="https://auth0.com/docs/connections/database">database</a> or <a href="https://auth0.com/docs/connections/passwordless">passwordless</a> connection.

Note: <code>connection</code> is required but other parameters such as <code>email</code> and <code>password</code> are dependent upon the type of connection.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.create({
    connection: "connection",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateUserRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/management/api/resources/users/client/Client.ts">listUsersByEmail</a>({ ...params }) -> Management.UserResponseSchema[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Find users by email. If Auth0 is the identity provider (idP), the email address associated with a user is saved in lower case, regardless of how you initially provided it.

For example, if you register a user as JohnSmith@example.com, Auth0 saves the user's email as johnsmith@example.com.

Therefore, when using this endpoint, make sure that you are searching for users via email addresses using the correct case.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.listUsersByEmail({
    email: "email",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListUsersByEmailRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/management/api/resources/users/client/Client.ts">get</a>(id, { ...params }) -> Management.GetUserResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve user details. A list of fields to include or exclude may also be specified. For more information, see <a href="https://auth0.com/docs/manage-users/user-search/retrieve-users-with-get-users-endpoint">Retrieve Users with the Get Users Endpoint</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to retrieve.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetUserRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/management/api/resources/users/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a user by user ID. This action cannot be undone. For Auth0 Dashboard instructions, see <a href="https://auth0.com/docs/manage-users/user-accounts/delete-users">Delete Users</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/management/api/resources/users/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateUserResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a user.

These are the attributes that can be updated at the root level:

<ul>
    <li>app_metadata</li>
    <li>blocked</li>
    <li>email</li>
    <li>email_verified</li>
    <li>family_name</li>
    <li>given_name</li>
    <li>name</li>
    <li>nickname</li>
    <li>password</li>
    <li>phone_number</li>
    <li>phone_verified</li>
    <li>picture</li>
    <li>username</li>
    <li>user_metadata</li>
    <li>verify_email</li>
</ul>

Some considerations:

<ul>
    <li>The properties of the new object will replace the old ones.</li>
    <li>The metadata fields are an exception to this rule (<code>user_metadata</code> and <code>app_metadata</code>). These properties are merged instead of being replaced but be careful, the merge only occurs on the first level.</li>
    <li>If you are updating <code>email</code>, <code>email_verified</code>, <code>phone_number</code>, <code>phone_verified</code>, <code>username</code> or <code>password</code> of a secondary identity, you need to specify the <code>connection</code> property too.</li>
    <li>If you are updating <code>email</code> or <code>phone_number</code> you can specify, optionally, the <code>client_id</code> property.</li>
    <li>Updating <code>email_verified</code> is not supported for enterprise and passwordless sms connections.</li>
    <li>Updating the <code>blocked</code> to <code>false</code> does not affect the user's blocked state from an excessive amount of incorrectly provided credentials. Use the "Unblock a user" endpoint from the "User Blocks" API to change the user's state.</li>
    <li>Supported attributes can be unset by supplying <code>null</code> as the value.</li>
</ul>

<h5>Updating a field (non-metadata property)</h5>
To mark the email address of a user as verified, the body to send should be:
<pre><code>{ "email_verified": true }</code></pre>

<h5>Updating a user metadata root property</h5>Let's assume that our test user has the following <code>user_metadata</code>:
<pre><code>{ "user_metadata" : { "profileCode": 1479 } }</code></pre>

To add the field <code>addresses</code> the body to send should be:

<pre><code>{ "user_metadata" : { "addresses": {"work_address": "100 Industrial Way"} }}</code></pre>

The modified object ends up with the following <code>user_metadata</code> property:<pre><code>{
"user_metadata": {
"profileCode": 1479,
"addresses": { "work_address": "100 Industrial Way" }
}
}</code></pre>

<h5>Updating an inner user metadata property</h5>If there's existing user metadata to which we want to add  <code>"home_address": "742 Evergreen Terrace"</code> (using the <code>addresses</code> property) we should send the whole <code>addresses</code> object. Since this is a first-level object, the object will be merged in, but its own properties will not be. The body to send should be:
<pre><code>{
  "user_metadata": {
    "addresses": {
      "work_address": "100 Industrial Way",
      "home_address": "742 Evergreen Terrace"
    }
  }
}</code></pre>

The modified object ends up with the following <code>user_metadata</code> property:

<pre><code>{
  "user_metadata": {
    "profileCode": 1479,
    "addresses": {
      "work_address": "100 Industrial Way",
      "home_address": "742 Evergreen Terrace"
    }
  }
}</code></pre>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateUserRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/management/api/resources/users/client/Client.ts">regenerateRecoveryCode</a>(id) -> Management.RegenerateUsersRecoveryCodeResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove an existing multi-factor authentication (MFA) <a href="https://auth0.com/docs/secure/multi-factor-authentication/reset-user-mfa">recovery code</a> and generate a new one. If a user cannot access the original device or account used for MFA enrollment, they can use a recovery code to authenticate.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.regenerateRecoveryCode("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to regenerate a multi-factor authentication recovery code for.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/management/api/resources/users/client/Client.ts">revokeAccess</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Revokes selected resources related to a user (sessions, refresh tokens, ...).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.revokeAccess("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.RevokeUserAccessRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Actions Versions

<details><summary><code>client.actions.versions.<a href="/src/management/api/resources/actions/resources/versions/client/Client.ts">list</a>(actionId, { ...params }) -> core.Page<Management.ActionVersion></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all of an action's versions. An action version is created whenever an action is deployed. An action version is immutable, once created.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.actions.versions.list("actionId");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.actions.versions.list("actionId");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**actionId:** `string` — The ID of the action.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListActionVersionsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Versions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.actions.versions.<a href="/src/management/api/resources/actions/resources/versions/client/Client.ts">get</a>(actionId, id) -> Management.GetActionVersionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a specific version of an action. An action version is created whenever an action is deployed. An action version is immutable, once created.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.versions.get("actionId", "id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**actionId:** `string` — The ID of the action.

</dd>
</dl>

<dl>
<dd>

**id:** `string` — The ID of the action version.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Versions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.actions.versions.<a href="/src/management/api/resources/actions/resources/versions/client/Client.ts">deploy</a>(id, actionId, { ...params }) -> Management.DeployActionVersionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Performs the equivalent of a roll-back of an action to an earlier, specified version. Creates a new, deployed action version that is identical to the specified version. If this action is currently bound to a trigger, the system will begin executing the newly-created version immediately.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.versions.deploy("id", "actionId", undefined);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of an action version.

</dd>
</dl>

<dl>
<dd>

**actionId:** `string` — The ID of an action.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.DeployActionVersionRequestContent | undefined`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Versions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Actions Executions

<details><summary><code>client.actions.executions.<a href="/src/management/api/resources/actions/resources/executions/client/Client.ts">get</a>(id) -> Management.GetActionExecutionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve information about a specific execution of a trigger. Relevant execution IDs will be included in tenant logs generated as part of that authentication flow. Executions will only be stored for 10 days after their creation.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.executions.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the execution to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Executions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Actions Triggers

<details><summary><code>client.actions.triggers.<a href="/src/management/api/resources/actions/resources/triggers/client/Client.ts">list</a>() -> Management.ListActionTriggersResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the set of triggers currently available within actions. A trigger is an extensibility point to which actions can be bound.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.triggers.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Triggers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Actions Triggers Bindings

<details><summary><code>client.actions.triggers.bindings.<a href="/src/management/api/resources/actions/resources/triggers/resources/bindings/client/Client.ts">list</a>(triggerId, { ...params }) -> core.Page<Management.ActionBinding></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the actions that are bound to a trigger. Once an action is created and deployed, it must be attached (i.e. bound) to a trigger so that it will be executed as part of a flow. The list of actions returned reflects the order in which they will be executed during the appropriate flow.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.actions.triggers.bindings.list("triggerId");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.actions.triggers.bindings.list("triggerId");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `Management.ActionTriggerTypeEnum` — An actions extensibility point.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListActionTriggerBindingsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Bindings.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.actions.triggers.bindings.<a href="/src/management/api/resources/actions/resources/triggers/resources/bindings/client/Client.ts">updateMany</a>(triggerId, { ...params }) -> Management.UpdateActionBindingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update the actions that are bound (i.e. attached) to a trigger. Once an action is created and deployed, it must be attached (i.e. bound) to a trigger so that it will be executed as part of a flow. The order in which the actions are provided will determine the order in which they are executed.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.triggers.bindings.updateMany("triggerId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `Management.ActionTriggerTypeEnum` — An actions extensibility point.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateActionBindingsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Bindings.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Anomaly Blocks

<details><summary><code>client.anomaly.blocks.<a href="/src/management/api/resources/anomaly/resources/blocks/client/Client.ts">checkIp</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Check if the given IP address is blocked via the <a href="https://auth0.com/docs/configure/attack-protection/suspicious-ip-throttling">Suspicious IP Throttling</a> due to multiple suspicious attempts.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.anomaly.blocks.checkIp("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `Management.AnomalyIpFormat` — IP address to check.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Blocks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.anomaly.blocks.<a href="/src/management/api/resources/anomaly/resources/blocks/client/Client.ts">unblockIp</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove a block imposed by <a href="https://auth0.com/docs/configure/attack-protection/suspicious-ip-throttling">Suspicious IP Throttling</a> for the given IP address.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.anomaly.blocks.unblockIp("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `Management.AnomalyIpFormat` — IP address to unblock.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Blocks.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## AttackProtection BreachedPasswordDetection

<details><summary><code>client.attackProtection.breachedPasswordDetection.<a href="/src/management/api/resources/attackProtection/resources/breachedPasswordDetection/client/Client.ts">get</a>() -> Management.GetBreachedPasswordDetectionSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of the Breached Password Detection configuration of your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.attackProtection.breachedPasswordDetection.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `BreachedPasswordDetection.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.attackProtection.breachedPasswordDetection.<a href="/src/management/api/resources/attackProtection/resources/breachedPasswordDetection/client/Client.ts">update</a>({ ...params }) -> Management.UpdateBreachedPasswordDetectionSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update details of the Breached Password Detection configuration of your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.attackProtection.breachedPasswordDetection.update();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateBreachedPasswordDetectionSettingsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `BreachedPasswordDetection.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## AttackProtection BruteForceProtection

<details><summary><code>client.attackProtection.bruteForceProtection.<a href="/src/management/api/resources/attackProtection/resources/bruteForceProtection/client/Client.ts">get</a>() -> Management.GetBruteForceSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of the Brute-force Protection configuration of your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.attackProtection.bruteForceProtection.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `BruteForceProtection.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.attackProtection.bruteForceProtection.<a href="/src/management/api/resources/attackProtection/resources/bruteForceProtection/client/Client.ts">update</a>({ ...params }) -> Management.UpdateBruteForceSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update the Brute-force Protection configuration of your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.attackProtection.bruteForceProtection.update();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateBruteForceSettingsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `BruteForceProtection.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## AttackProtection SuspiciousIpThrottling

<details><summary><code>client.attackProtection.suspiciousIpThrottling.<a href="/src/management/api/resources/attackProtection/resources/suspiciousIpThrottling/client/Client.ts">get</a>() -> Management.GetSuspiciousIpThrottlingSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of the Suspicious IP Throttling configuration of your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.attackProtection.suspiciousIpThrottling.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `SuspiciousIpThrottling.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.attackProtection.suspiciousIpThrottling.<a href="/src/management/api/resources/attackProtection/resources/suspiciousIpThrottling/client/Client.ts">update</a>({ ...params }) -> Management.UpdateSuspiciousIpThrottlingSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update the details of the Suspicious IP Throttling configuration of your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.attackProtection.suspiciousIpThrottling.update();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateSuspiciousIpThrottlingSettingsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SuspiciousIpThrottling.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Branding Templates

<details><summary><code>client.branding.templates.<a href="/src/management/api/resources/branding/resources/templates/client/Client.ts">getUniversalLogin</a>() -> Management.GetUniversalLoginTemplateResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.templates.getUniversalLogin();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.templates.<a href="/src/management/api/resources/branding/resources/templates/client/Client.ts">updateUniversalLogin</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update the Universal Login branding template.

<p>When <code>content-type</code> header is set to <code>application/json</code>, the expected body must be JSON:</p>
<pre>
{
  "template": "&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;{%- auth0:head -%}&lt;/head&gt;&lt;body&gt;{%- auth0:widget -%}&lt;/body&gt;&lt;/html&gt;"
}
</pre>

<p>
  When <code>content-type</code> header is set to <code>text/html</code>, the expected body must be the HTML template:
</p>
<pre>
&lt!DOCTYPE html&gt;
&lt;code&gt;
  &lt;html&gt;
    &lt;head&gt;
     {%- auth0:head -%}
    &lt;/head&gt;
    &lt;body&gt;
      {%- auth0:widget -%}
    &lt;/body&gt;
  &lt;/html&gt;
&lt;/code&gt;
</pre>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.templates.updateUniversalLogin("string");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateUniversalLoginTemplateRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.templates.<a href="/src/management/api/resources/branding/resources/templates/client/Client.ts">deleteUniversalLogin</a>() -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.templates.deleteUniversalLogin();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Branding Themes

<details><summary><code>client.branding.themes.<a href="/src/management/api/resources/branding/resources/themes/client/Client.ts">create</a>({ ...params }) -> Management.CreateBrandingThemeResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create branding theme.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.themes.create({
    borders: {
        button_border_radius: 1.1,
        button_border_weight: 1.1,
        buttons_style: "pill",
        input_border_radius: 1.1,
        input_border_weight: 1.1,
        inputs_style: "pill",
        show_widget_shadow: true,
        widget_border_weight: 1.1,
        widget_corner_radius: 1.1,
    },
    colors: {
        body_text: "body_text",
        error: "error",
        header: "header",
        icons: "icons",
        input_background: "input_background",
        input_border: "input_border",
        input_filled_text: "input_filled_text",
        input_labels_placeholders: "input_labels_placeholders",
        links_focused_components: "links_focused_components",
        primary_button: "primary_button",
        primary_button_label: "primary_button_label",
        secondary_button_border: "secondary_button_border",
        secondary_button_label: "secondary_button_label",
        success: "success",
        widget_background: "widget_background",
        widget_border: "widget_border",
    },
    fonts: {
        body_text: {
            bold: true,
            size: 1.1,
        },
        buttons_text: {
            bold: true,
            size: 1.1,
        },
        font_url: "font_url",
        input_labels: {
            bold: true,
            size: 1.1,
        },
        links: {
            bold: true,
            size: 1.1,
        },
        links_style: "normal",
        reference_text_size: 1.1,
        subtitle: {
            bold: true,
            size: 1.1,
        },
        title: {
            bold: true,
            size: 1.1,
        },
    },
    page_background: {
        background_color: "background_color",
        background_image_url: "background_image_url",
        page_layout: "center",
    },
    widget: {
        header_text_alignment: "center",
        logo_height: 1.1,
        logo_position: "center",
        logo_url: "logo_url",
        social_buttons_layout: "bottom",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateBrandingThemeRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Themes.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.themes.<a href="/src/management/api/resources/branding/resources/themes/client/Client.ts">getDefault</a>() -> Management.GetBrandingDefaultThemeResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve default branding theme.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.themes.getDefault();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Themes.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.themes.<a href="/src/management/api/resources/branding/resources/themes/client/Client.ts">get</a>(themeId) -> Management.GetBrandingThemeResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve branding theme.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.themes.get("themeId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**themeId:** `string` — The ID of the theme

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Themes.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.themes.<a href="/src/management/api/resources/branding/resources/themes/client/Client.ts">delete</a>(themeId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete branding theme.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.themes.delete("themeId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**themeId:** `string` — The ID of the theme

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Themes.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.themes.<a href="/src/management/api/resources/branding/resources/themes/client/Client.ts">update</a>(themeId, { ...params }) -> Management.UpdateBrandingThemeResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update branding theme.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.themes.update("themeId", {
    borders: {
        button_border_radius: 1.1,
        button_border_weight: 1.1,
        buttons_style: "pill",
        input_border_radius: 1.1,
        input_border_weight: 1.1,
        inputs_style: "pill",
        show_widget_shadow: true,
        widget_border_weight: 1.1,
        widget_corner_radius: 1.1,
    },
    colors: {
        body_text: "body_text",
        error: "error",
        header: "header",
        icons: "icons",
        input_background: "input_background",
        input_border: "input_border",
        input_filled_text: "input_filled_text",
        input_labels_placeholders: "input_labels_placeholders",
        links_focused_components: "links_focused_components",
        primary_button: "primary_button",
        primary_button_label: "primary_button_label",
        secondary_button_border: "secondary_button_border",
        secondary_button_label: "secondary_button_label",
        success: "success",
        widget_background: "widget_background",
        widget_border: "widget_border",
    },
    fonts: {
        body_text: {
            bold: true,
            size: 1.1,
        },
        buttons_text: {
            bold: true,
            size: 1.1,
        },
        font_url: "font_url",
        input_labels: {
            bold: true,
            size: 1.1,
        },
        links: {
            bold: true,
            size: 1.1,
        },
        links_style: "normal",
        reference_text_size: 1.1,
        subtitle: {
            bold: true,
            size: 1.1,
        },
        title: {
            bold: true,
            size: 1.1,
        },
    },
    page_background: {
        background_color: "background_color",
        background_image_url: "background_image_url",
        page_layout: "center",
    },
    widget: {
        header_text_alignment: "center",
        logo_height: 1.1,
        logo_position: "center",
        logo_url: "logo_url",
        social_buttons_layout: "bottom",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**themeId:** `string` — The ID of the theme

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateBrandingThemeRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Themes.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Branding Phone Providers

<details><summary><code>client.branding.phone.providers.<a href="/src/management/api/resources/branding/resources/phone/resources/providers/client/Client.ts">list</a>({ ...params }) -> Management.ListBrandingPhoneProvidersResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a list of <a href="https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers">phone providers</a> details set for a Tenant. A list of fields to include or exclude may also be specified.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.providers.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListBrandingPhoneProvidersRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Providers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.phone.providers.<a href="/src/management/api/resources/branding/resources/phone/resources/providers/client/Client.ts">create</a>({ ...params }) -> Management.CreateBrandingPhoneProviderResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a <a href="https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers">phone provider</a>.
The <code>credentials</code> object requires different properties depending on the phone provider (which is specified using the <code>name</code> property).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.providers.create({
    name: "twilio",
    credentials: {
        auth_token: "auth_token",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateBrandingPhoneProviderRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Providers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.phone.providers.<a href="/src/management/api/resources/branding/resources/phone/resources/providers/client/Client.ts">get</a>(id) -> Management.GetBrandingPhoneProviderResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve <a href="https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers">phone provider</a> details. A list of fields to include or exclude may also be specified.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.providers.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Providers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.phone.providers.<a href="/src/management/api/resources/branding/resources/phone/resources/providers/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete the configured phone provider.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.providers.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Providers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.phone.providers.<a href="/src/management/api/resources/branding/resources/phone/resources/providers/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateBrandingPhoneProviderResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a <a href="https://auth0.com/docs/customize/phone-messages/configure-phone-messaging-providers">phone provider</a>.
The <code>credentials</code> object requires different properties depending on the phone provider (which is specified using the <code>name</code> property).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.providers.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateBrandingPhoneProviderRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Providers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.phone.providers.<a href="/src/management/api/resources/branding/resources/phone/resources/providers/client/Client.ts">test</a>(id, { ...params }) -> Management.CreatePhoneProviderSendTestResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.providers.test("id", {
    to: "to",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreatePhoneProviderSendTestRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Providers.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Branding Phone Templates

<details><summary><code>client.branding.phone.templates.<a href="/src/management/api/resources/branding/resources/phone/resources/templates/client/Client.ts">list</a>({ ...params }) -> Management.ListPhoneTemplatesResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.templates.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListPhoneTemplatesRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.phone.templates.<a href="/src/management/api/resources/branding/resources/phone/resources/templates/client/Client.ts">create</a>({ ...params }) -> Management.CreatePhoneTemplateResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.templates.create();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreatePhoneTemplateRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.phone.templates.<a href="/src/management/api/resources/branding/resources/phone/resources/templates/client/Client.ts">get</a>(id) -> Management.GetPhoneTemplateResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.templates.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.phone.templates.<a href="/src/management/api/resources/branding/resources/phone/resources/templates/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.templates.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.phone.templates.<a href="/src/management/api/resources/branding/resources/phone/resources/templates/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdatePhoneTemplateResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.templates.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdatePhoneTemplateRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.phone.templates.<a href="/src/management/api/resources/branding/resources/phone/resources/templates/client/Client.ts">reset</a>(id, { ...params }) -> Management.ResetPhoneTemplateResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.templates.reset("id", {
    key: "value",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ResetPhoneTemplateRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.branding.phone.templates.<a href="/src/management/api/resources/branding/resources/phone/resources/templates/client/Client.ts">test</a>(id, { ...params }) -> Management.CreatePhoneTemplateTestNotificationResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.branding.phone.templates.test("id", {
    to: "to",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreatePhoneTemplateTestNotificationRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## ClientGrants Organizations

<details><summary><code>client.clientGrants.organizations.<a href="/src/management/api/resources/clientGrants/resources/organizations/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.Organization></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.clientGrants.organizations.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.clientGrants.organizations.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the client grant

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListClientGrantOrganizationsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Organizations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Clients Credentials

<details><summary><code>client.clients.credentials.<a href="/src/management/api/resources/clients/resources/credentials/client/Client.ts">list</a>(clientId) -> Management.ClientCredential[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the details of a client credential.

<b>Important</b>: To enable credentials to be used for a client authentication method, set the <code>client_authentication_methods</code> property on the client. To enable credentials to be used for JWT-Secured Authorization requests set the <code>signed_request_object</code> property on the client.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clients.credentials.list("client_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**clientId:** `string` — ID of the client.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Credentials.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clients.credentials.<a href="/src/management/api/resources/clients/resources/credentials/client/Client.ts">create</a>(clientId, { ...params }) -> Management.PostClientCredentialResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a client credential associated to your application. Credentials can be used to configure Private Key JWT and mTLS authentication methods, as well as for JWT-secured Authorization requests.

<h5>Public Key</h5>Public Key credentials can be used to set up Private Key JWT client authentication and JWT-secured Authorization requests.

Sample: <pre><code>{
"credential_type": "public_key",
"name": "string",
"pem": "string",
"alg": "RS256",
"parse_expiry_from_cert": false,
"expires_at": "2022-12-31T23:59:59Z"
}</code></pre>

<h5>Certificate (CA-signed & self-signed)</h5>Certificate credentials can be used to set up mTLS client authentication. CA-signed certificates can be configured either with a signed certificate or with just the certificate Subject DN.

CA-signed Certificate Sample (pem): <pre><code>{
"credential_type": "x509_cert",
"name": "string",
"pem": "string"
}</code></pre>CA-signed Certificate Sample (subject_dn): <pre><code>{
"credential_type": "cert_subject_dn",
"name": "string",
"subject_dn": "string"
}</code></pre>Self-signed Certificate Sample: <pre><code>{
"credential_type": "cert_subject_dn",
"name": "string",
"pem": "string"
}</code></pre>

The credential will be created but not yet enabled for use until you set the corresponding properties in the client:

<ul>
  <li>To enable the credential for Private Key JWT or mTLS authentication methods, set the <code>client_authentication_methods</code> property on the client. For more information, read <a href="https://auth0.com/docs/get-started/applications/configure-private-key-jwt">Configure Private Key JWT Authentication</a> and <a href="https://auth0.com/docs/get-started/applications/configure-mtls">Configure mTLS Authentication</a></li>
  <li>To enable the credential for JWT-secured Authorization requests, set the <code>signed_request_object</code>property on the client. For more information, read <a href="https://auth0.com/docs/get-started/applications/configure-jar">Configure JWT-secured Authorization Requests (JAR)</a></li>
</ul>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clients.credentials.create("client_id", {
    credential_type: "public_key",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**clientId:** `string` — ID of the client.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.PostClientCredentialRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Credentials.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clients.credentials.<a href="/src/management/api/resources/clients/resources/credentials/client/Client.ts">get</a>(clientId, credentialId) -> Management.GetClientCredentialResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the details of a client credential.

<b>Important</b>: To enable credentials to be used for a client authentication method, set the <code>client_authentication_methods</code> property on the client. To enable credentials to be used for JWT-Secured Authorization requests set the <code>signed_request_object</code> property on the client.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clients.credentials.get("client_id", "credential_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**clientId:** `string` — ID of the client.

</dd>
</dl>

<dl>
<dd>

**credentialId:** `string` — ID of the credential.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Credentials.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clients.credentials.<a href="/src/management/api/resources/clients/resources/credentials/client/Client.ts">delete</a>(clientId, credentialId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a client credential you previously created. May be enabled or disabled. For more information, read <a href="https://www.auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow">Client Credential Flow</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clients.credentials.delete("client_id", "credential_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**clientId:** `string` — ID of the client.

</dd>
</dl>

<dl>
<dd>

**credentialId:** `string` — ID of the credential to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Credentials.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.clients.credentials.<a href="/src/management/api/resources/clients/resources/credentials/client/Client.ts">update</a>(clientId, credentialId, { ...params }) -> Management.PatchClientCredentialResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Change a client credential you previously created. May be enabled or disabled. For more information, read <a href="https://www.auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow">Client Credential Flow</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.clients.credentials.update("client_id", "credential_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**clientId:** `string` — ID of the client.

</dd>
</dl>

<dl>
<dd>

**credentialId:** `string` — ID of the credential.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.PatchClientCredentialRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Credentials.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Clients Connections

<details><summary><code>client.clients.connections.<a href="/src/management/api/resources/clients/resources/connections/client/Client.ts">get</a>(id, { ...params }) -> core.Page<Management.ConnectionForList></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all connections that are enabled for the specified <a href="https://www.auth0.com/docs/get-started/applications"> Application</a>, using checkpoint pagination. A list of fields to include or exclude for each connection may also be specified.

<ul>
  <li>
    This endpoint requires the <code>read:connections</code> scope and any one of <code>read:clients</code> or <code>read:client_summary</code>.
  </li>
  <li>
    <b>Note</b>: The first time you call this endpoint, omit the <code>from</code> parameter. If there are more results, a <code>next</code> value is included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, no further results are remaining.
  </li>
</ul>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.clients.connections.get("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.clients.connections.get("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the client for which to retrieve enabled connections.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ConnectionsGetRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Connections Clients

<details><summary><code>client.connections.clients.<a href="/src/management/api/resources/connections/resources/clients/client/Client.ts">get</a>(id, { ...params }) -> core.Page<Management.ConnectionEnabledClient></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all clients that have the specified <a href="https://auth0.com/docs/authenticate/identity-providers">connection</a> enabled.

<b>Note</b>: The first time you call this endpoint, omit the <code>from</code> parameter. If there are more results, a <code>next</code> value is included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, no further results are remaining.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.connections.clients.get("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.connections.clients.get("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection for which enabled clients are to be retrieved

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetConnectionEnabledClientsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Clients.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.clients.<a href="/src/management/api/resources/connections/resources/clients/client/Client.ts">update</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.clients.update("id", [
    {
        client_id: "client_id",
        status: true,
    },
]);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection to modify

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateEnabledClientConnectionsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Clients.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Connections Keys

<details><summary><code>client.connections.keys.<a href="/src/management/api/resources/connections/resources/keys/client/Client.ts">get</a>(id) -> Management.ConnectionKey[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Gets the connection keys for the Okta or OIDC connection strategy.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.keys.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the connection

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Keys.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.keys.<a href="/src/management/api/resources/connections/resources/keys/client/Client.ts">rotate</a>(id, { ...params }) -> Management.RotateConnectionsKeysResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Rotates the connection keys for the Okta or OIDC connection strategies.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.keys.rotate("id", undefined);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the connection

</dd>
</dl>

<dl>
<dd>

**request:** `Management.RotateConnectionKeysRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Keys.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Connections ScimConfiguration

<details><summary><code>client.connections.scimConfiguration.<a href="/src/management/api/resources/connections/resources/scimConfiguration/client/Client.ts">get</a>(id) -> Management.GetScimConfigurationResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves a scim configuration by its <code>connectionId</code>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.scimConfiguration.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection to retrieve its SCIM configuration

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScimConfiguration.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.scimConfiguration.<a href="/src/management/api/resources/connections/resources/scimConfiguration/client/Client.ts">create</a>(id, { ...params }) -> Management.CreateScimConfigurationResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a scim configuration for a connection.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.scimConfiguration.create("id", undefined);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection to create its SCIM configuration

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreateScimConfigurationRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScimConfiguration.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.scimConfiguration.<a href="/src/management/api/resources/connections/resources/scimConfiguration/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a scim configuration by its <code>connectionId</code>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.scimConfiguration.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection to delete its SCIM configuration

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScimConfiguration.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.scimConfiguration.<a href="/src/management/api/resources/connections/resources/scimConfiguration/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateScimConfigurationResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a scim configuration by its <code>connectionId</code>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.scimConfiguration.update("id", {
    user_id_attribute: "user_id_attribute",
    mapping: [{}],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection to update its SCIM configuration

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateScimConfigurationRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScimConfiguration.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.scimConfiguration.<a href="/src/management/api/resources/connections/resources/scimConfiguration/client/Client.ts">getDefaultMapping</a>(id) -> Management.GetScimConfigurationDefaultMappingResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves a scim configuration's default mapping by its <code>connectionId</code>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.scimConfiguration.getDefaultMapping("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection to retrieve its default SCIM mapping

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScimConfiguration.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Connections Users

<details><summary><code>client.connections.users.<a href="/src/management/api/resources/connections/resources/users/client/Client.ts">deleteByEmail</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a specified connection user by its email (you cannot delete all users from specific connection). Currently, only Database Connections are supported.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.users.deleteByEmail("id", {
    email: "email",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection (currently only database connections are supported)

</dd>
</dl>

<dl>
<dd>

**request:** `Management.DeleteConnectionUsersByEmailQueryParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Connections ScimConfiguration Tokens

<details><summary><code>client.connections.scimConfiguration.tokens.<a href="/src/management/api/resources/connections/resources/scimConfiguration/resources/tokens/client/Client.ts">get</a>(id) -> Management.GetScimTokensResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves all scim tokens by its connection <code>id</code>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.scimConfiguration.tokens.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection to retrieve its SCIM configuration

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tokens.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.scimConfiguration.tokens.<a href="/src/management/api/resources/connections/resources/scimConfiguration/resources/tokens/client/Client.ts">create</a>(id, { ...params }) -> Management.CreateScimTokenResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a scim token for a scim client.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.scimConfiguration.tokens.create("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the connection to create its SCIM token

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreateScimTokenRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tokens.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.connections.scimConfiguration.tokens.<a href="/src/management/api/resources/connections/resources/scimConfiguration/resources/tokens/client/Client.ts">delete</a>(id, tokenId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a scim token by its connection <code>id</code> and <code>tokenId</code>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.connections.scimConfiguration.tokens.delete("id", "tokenId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The connection id that owns the SCIM token to delete

</dd>
</dl>

<dl>
<dd>

**tokenId:** `string` — The id of the scim token to delete

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tokens.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Emails Provider

<details><summary><code>client.emails.provider.<a href="/src/management/api/resources/emails/resources/provider/client/Client.ts">get</a>({ ...params }) -> Management.GetEmailProviderResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of the <a href="https://auth0.com/docs/customize/email/smtp-email-providers">email provider configuration</a> in your tenant. A list of fields to include or exclude may also be specified.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.emails.provider.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.GetEmailProviderRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Provider.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.emails.provider.<a href="/src/management/api/resources/emails/resources/provider/client/Client.ts">create</a>({ ...params }) -> Management.CreateEmailProviderResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create an <a href="https://auth0.com/docs/email/providers">email provider</a>. The <code>credentials</code> object
requires different properties depending on the email provider (which is specified using the <code>name</code> property):

<ul>
  <li><code>mandrill</code> requires <code>api_key</code></li>
  <li><code>sendgrid</code> requires <code>api_key</code></li>
  <li>
    <code>sparkpost</code> requires <code>api_key</code>. Optionally, set <code>region</code> to <code>eu</code> to use
    the SparkPost service hosted in Western Europe; set to <code>null</code> to use the SparkPost service hosted in
    North America. <code>eu</code> or <code>null</code> are the only valid values for <code>region</code>.
  </li>
  <li>
    <code>mailgun</code> requires <code>api_key</code> and <code>domain</code>. Optionally, set <code>region</code> to
    <code>eu</code> to use the Mailgun service hosted in Europe; set to <code>null</code> otherwise. <code>eu</code> or
    <code>null</code> are the only valid values for <code>region</code>.
  </li>
  <li><code>ses</code> requires <code>accessKeyId</code>, <code>secretAccessKey</code>, and <code>region</code></li>
  <li>
    <code>smtp</code> requires <code>smtp_host</code>, <code>smtp_port</code>, <code>smtp_user</code>, and
    <code>smtp_pass</code>
  </li>
</ul>
Depending on the type of provider it is possible to specify <code>settings</code> object with different configuration
options, which will be used when sending an email:
<ul>
  <li>
    <code>smtp</code> provider, <code>settings</code> may contain <code>headers</code> object.
    <ul>
      <li>
        When using AWS SES SMTP host, you may provide a name of configuration set in
        <code>X-SES-Configuration-Set</code> header. Value must be a string.
      </li>
      <li>
        When using Sparkpost host, you may provide value for
        <code>X-MSYS_API</code> header. Value must be an object.
      </li>
    </ul>
  </li>
  <li>
    for <code>ses</code> provider, <code>settings</code> may contain <code>message</code> object, where you can provide
    a name of configuration set in <code>configuration_set_name</code> property. Value must be a string.
  </li>
</ul>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.emails.provider.create({
    name: "mailgun",
    credentials: {
        api_key: "api_key",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateEmailProviderRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Provider.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.emails.provider.<a href="/src/management/api/resources/emails/resources/provider/client/Client.ts">delete</a>() -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete the email provider.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.emails.provider.delete();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Provider.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.emails.provider.<a href="/src/management/api/resources/emails/resources/provider/client/Client.ts">update</a>({ ...params }) -> Management.UpdateEmailProviderResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update an <a href="https://auth0.com/docs/email/providers">email provider</a>. The <code>credentials</code> object
requires different properties depending on the email provider (which is specified using the <code>name</code> property):

<ul>
  <li><code>mandrill</code> requires <code>api_key</code></li>
  <li><code>sendgrid</code> requires <code>api_key</code></li>
  <li>
    <code>sparkpost</code> requires <code>api_key</code>. Optionally, set <code>region</code> to <code>eu</code> to use
    the SparkPost service hosted in Western Europe; set to <code>null</code> to use the SparkPost service hosted in
    North America. <code>eu</code> or <code>null</code> are the only valid values for <code>region</code>.
  </li>
  <li>
    <code>mailgun</code> requires <code>api_key</code> and <code>domain</code>. Optionally, set <code>region</code> to
    <code>eu</code> to use the Mailgun service hosted in Europe; set to <code>null</code> otherwise. <code>eu</code> or
    <code>null</code> are the only valid values for <code>region</code>.
  </li>
  <li><code>ses</code> requires <code>accessKeyId</code>, <code>secretAccessKey</code>, and <code>region</code></li>
  <li>
    <code>smtp</code> requires <code>smtp_host</code>, <code>smtp_port</code>, <code>smtp_user</code>, and
    <code>smtp_pass</code>
  </li>
</ul>
Depending on the type of provider it is possible to specify <code>settings</code> object with different configuration
options, which will be used when sending an email:
<ul>
  <li>
    <code>smtp</code> provider, <code>settings</code> may contain <code>headers</code> object.
    <ul>
      <li>
        When using AWS SES SMTP host, you may provide a name of configuration set in
        <code>X-SES-Configuration-Set</code> header. Value must be a string.
      </li>
      <li>
        When using Sparkpost host, you may provide value for
        <code>X-MSYS_API</code> header. Value must be an object.
      </li>
    </ul>
    for <code>ses</code> provider, <code>settings</code> may contain <code>message</code> object, where you can provide
    a name of configuration set in <code>configuration_set_name</code> property. Value must be a string.
  </li>
</ul>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.emails.provider.update();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateEmailProviderRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Provider.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## EventStreams Deliveries

<details><summary><code>client.eventStreams.deliveries.<a href="/src/management/api/resources/eventStreams/resources/deliveries/client/Client.ts">list</a>(id, { ...params }) -> Management.EventStreamDelivery[]</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eventStreams.deliveries.list("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the event stream.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListEventStreamDeliveriesRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Deliveries.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.eventStreams.deliveries.<a href="/src/management/api/resources/eventStreams/resources/deliveries/client/Client.ts">getHistory</a>(id, eventId) -> Management.GetEventStreamDeliveryHistoryResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eventStreams.deliveries.getHistory("id", "event_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the event stream.

</dd>
</dl>

<dl>
<dd>

**eventId:** `string` — Unique identifier for the event

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Deliveries.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## EventStreams Redeliveries

<details><summary><code>client.eventStreams.redeliveries.<a href="/src/management/api/resources/eventStreams/resources/redeliveries/client/Client.ts">create</a>(id, { ...params }) -> Management.CreateEventStreamRedeliveryResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eventStreams.redeliveries.create("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the event stream.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreateEventStreamRedeliveryRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Redeliveries.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.eventStreams.redeliveries.<a href="/src/management/api/resources/eventStreams/resources/redeliveries/client/Client.ts">createById</a>(id, eventId) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eventStreams.redeliveries.createById("id", "event_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the event stream.

</dd>
</dl>

<dl>
<dd>

**eventId:** `string` — Unique identifier for the event

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Redeliveries.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Flows Executions

<details><summary><code>client.flows.executions.<a href="/src/management/api/resources/flows/resources/executions/client/Client.ts">list</a>(flowId, { ...params }) -> core.Page<Management.FlowExecutionSummary></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.flows.executions.list("flow_id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.flows.executions.list("flow_id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**flowId:** `string` — Flow id

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ExecutionsListRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Executions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.flows.executions.<a href="/src/management/api/resources/flows/resources/executions/client/Client.ts">get</a>(flowId, executionId, { ...params }) -> Management.GetFlowExecutionResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.flows.executions.get("flow_id", "execution_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**flowId:** `string` — Flow id

</dd>
</dl>

<dl>
<dd>

**executionId:** `string` — Flow execution id

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ExecutionsGetRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Executions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.flows.executions.<a href="/src/management/api/resources/flows/resources/executions/client/Client.ts">delete</a>(flowId, executionId) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.flows.executions.delete("flow_id", "execution_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**flowId:** `string` — Flows id

</dd>
</dl>

<dl>
<dd>

**executionId:** `string` — Flow execution identifier

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Executions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Flows Vault Connections

<details><summary><code>client.flows.vault.connections.<a href="/src/management/api/resources/flows/resources/vault/resources/connections/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.FlowsVaultConnectionSummary></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.flows.vault.connections.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.flows.vault.connections.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListFlowsVaultConnectionsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.flows.vault.connections.<a href="/src/management/api/resources/flows/resources/vault/resources/connections/client/Client.ts">create</a>({ ...params }) -> Management.CreateFlowsVaultConnectionResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.flows.vault.connections.create({
    name: "name",
    app_id: "ACTIVECAMPAIGN",
    setup: {
        type: "API_KEY",
        api_key: "api_key",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateFlowsVaultConnectionRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.flows.vault.connections.<a href="/src/management/api/resources/flows/resources/vault/resources/connections/client/Client.ts">get</a>(id) -> Management.GetFlowsVaultConnectionResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.flows.vault.connections.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Flows Vault connection ID

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.flows.vault.connections.<a href="/src/management/api/resources/flows/resources/vault/resources/connections/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.flows.vault.connections.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Vault connection id

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.flows.vault.connections.<a href="/src/management/api/resources/flows/resources/vault/resources/connections/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateFlowsVaultConnectionResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.flows.vault.connections.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Flows Vault connection ID

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateFlowsVaultConnectionRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Connections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Groups Members

<details><summary><code>client.groups.members.<a href="/src/management/api/resources/groups/resources/members/client/Client.ts">get</a>(id, { ...params }) -> core.Page<Management.GroupMember></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.groups.members.get("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.groups.members.get("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Unique identifier for the group (service-generated).

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetGroupMembersRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Members.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Guardian Enrollments

<details><summary><code>client.guardian.enrollments.<a href="/src/management/api/resources/guardian/resources/enrollments/client/Client.ts">createTicket</a>({ ...params }) -> Management.CreateGuardianEnrollmentTicketResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a <a href="https://auth0.com/docs/secure/multi-factor-authentication/auth0-guardian/create-custom-enrollment-tickets">multi-factor authentication (MFA) enrollment ticket</a>, and optionally send an email with the created ticket, to a given user.
Create a <a href="https://auth0.com/docs/secure/multi-factor-authentication/auth0-guardian/create-custom-enrollment-tickets">multi-factor authentication (MFA) enrollment ticket</a>, and optionally send an email with the created ticket to a given user. Enrollment tickets can specify which factor users must enroll with or allow existing MFA users to enroll in additional factors.<br/>

Note: Users cannot enroll in Email as a factor through custom enrollment tickets.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.enrollments.createTicket({
    user_id: "user_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateGuardianEnrollmentTicketRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Enrollments.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.enrollments.<a href="/src/management/api/resources/guardian/resources/enrollments/client/Client.ts">get</a>(id) -> Management.GetGuardianEnrollmentResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details, such as status and type, for a specific multi-factor authentication enrollment registered to a user account.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.enrollments.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the enrollment to be retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Enrollments.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.enrollments.<a href="/src/management/api/resources/guardian/resources/enrollments/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove a specific multi-factor authentication (MFA) enrollment from a user's account. This allows the user to re-enroll with MFA. For more information, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/reset-user-mfa">Reset User Multi-Factor Authentication and Recovery Codes</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.enrollments.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the enrollment to be deleted.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Enrollments.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Guardian Factors

<details><summary><code>client.guardian.factors.<a href="/src/management/api/resources/guardian/resources/factors/client/Client.ts">list</a>() -> Management.GuardianFactor[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of all <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors">multi-factor authentication factors</a> associated with your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Factors.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.<a href="/src/management/api/resources/guardian/resources/factors/client/Client.ts">set</a>(name, { ...params }) -> Management.SetGuardianFactorResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update the status (i.e., enabled or disabled) of a specific multi-factor authentication factor.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.set("push-notification", {
    enabled: true,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**name:** `Management.GuardianFactorNameEnum` — Factor name. Can be `sms`, `push-notification`, `email`, `duo` `otp` `webauthn-roaming`, `webauthn-platform`, or `recovery-code`.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.SetGuardianFactorRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Factors.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Guardian Policies

<details><summary><code>client.guardian.policies.<a href="/src/management/api/resources/guardian/resources/policies/client/Client.ts">list</a>() -> Management.ListGuardianPoliciesResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the <a href="https://auth0.com/docs/secure/multi-factor-authentication/enable-mfa">multi-factor authentication (MFA) policies</a> configured for your tenant.

The following policies are supported:

<ul>
<li><code>all-applications</code> policy prompts with MFA for all logins.</li>
<li><code>confidence-score</code> policy prompts with MFA only for low confidence logins.</li>
</ul>

<b>Note</b>: The <code>confidence-score</code> policy is part of the <a href="https://auth0.com/docs/secure/multi-factor-authentication/adaptive-mfa">Adaptive MFA feature</a>. Adaptive MFA requires an add-on for the Enterprise plan; review <a href="https://auth0.com/pricing">Auth0 Pricing</a> for more details.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.policies.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Policies.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.policies.<a href="/src/management/api/resources/guardian/resources/policies/client/Client.ts">set</a>({ ...params }) -> Management.SetGuardianPoliciesResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Set <a href="https://auth0.com/docs/secure/multi-factor-authentication/enable-mfa">multi-factor authentication (MFA) policies</a> for your tenant.

The following policies are supported:

<ul>
<li><code>all-applications</code> policy prompts with MFA for all logins.</li>
<li><code>confidence-score</code> policy prompts with MFA only for low confidence logins.</li>
</ul>

<b>Note</b>: The <code>confidence-score</code> policy is part of the <a href="https://auth0.com/docs/secure/multi-factor-authentication/adaptive-mfa">Adaptive MFA feature</a>. Adaptive MFA requires an add-on for the Enterprise plan; review <a href="https://auth0.com/pricing">Auth0 Pricing</a> for more details.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.policies.set(["all-applications"]);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianPoliciesRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Policies.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Guardian Factors Phone

<details><summary><code>client.guardian.factors.phone.<a href="/src/management/api/resources/guardian/resources/factors/resources/phone/client/Client.ts">getMessageTypes</a>() -> Management.GetGuardianFactorPhoneMessageTypesResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve list of <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-sms-voice-notifications-mfa">phone-type MFA factors</a> (i.e., sms and voice) that are enabled for your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.phone.getMessageTypes();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Phone.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.phone.<a href="/src/management/api/resources/guardian/resources/factors/resources/phone/client/Client.ts">setMessageTypes</a>({ ...params }) -> Management.SetGuardianFactorPhoneMessageTypesResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Replace the list of <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-sms-voice-notifications-mfa">phone-type MFA factors</a> (i.e., sms and voice) that are enabled for your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.phone.setMessageTypes({
    message_types: ["sms"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorPhoneMessageTypesRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Phone.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.phone.<a href="/src/management/api/resources/guardian/resources/factors/resources/phone/client/Client.ts">getTwilioProvider</a>() -> Management.GetGuardianFactorsProviderPhoneTwilioResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve configuration details for a Twilio phone provider that has been set up in your tenant. To learn more, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-sms-voice-notifications-mfa">Configure SMS and Voice Notifications for MFA</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.phone.getTwilioProvider();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Phone.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.phone.<a href="/src/management/api/resources/guardian/resources/factors/resources/phone/client/Client.ts">setTwilioProvider</a>({ ...params }) -> Management.SetGuardianFactorsProviderPhoneTwilioResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update the configuration of a Twilio phone provider that has been set up in your tenant. To learn more, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-sms-voice-notifications-mfa">Configure SMS and Voice Notifications for MFA</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.phone.setTwilioProvider();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorsProviderPhoneTwilioRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Phone.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.phone.<a href="/src/management/api/resources/guardian/resources/factors/resources/phone/client/Client.ts">getSelectedProvider</a>() -> Management.GetGuardianFactorsProviderPhoneResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of the multi-factor authentication phone provider configured for your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.phone.getSelectedProvider();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Phone.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.phone.<a href="/src/management/api/resources/guardian/resources/factors/resources/phone/client/Client.ts">setProvider</a>({ ...params }) -> Management.SetGuardianFactorsProviderPhoneResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.phone.setProvider({
    provider: "auth0",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorsProviderPhoneRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Phone.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.phone.<a href="/src/management/api/resources/guardian/resources/factors/resources/phone/client/Client.ts">getTemplates</a>() -> Management.GetGuardianFactorPhoneTemplatesResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of the multi-factor authentication enrollment and verification templates for phone-type factors available in your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.phone.getTemplates();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Phone.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.phone.<a href="/src/management/api/resources/guardian/resources/factors/resources/phone/client/Client.ts">setTemplates</a>({ ...params }) -> Management.SetGuardianFactorPhoneTemplatesResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Customize the messages sent to complete phone enrollment and verification (subscription required).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.phone.setTemplates({
    enrollment_message: "enrollment_message",
    verification_message: "verification_message",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorPhoneTemplatesRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Phone.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Guardian Factors PushNotification

<details><summary><code>client.guardian.factors.pushNotification.<a href="/src/management/api/resources/guardian/resources/factors/resources/pushNotification/client/Client.ts">getApnsProvider</a>() -> Management.GetGuardianFactorsProviderApnsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve configuration details for the multi-factor authentication APNS provider associated with your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.pushNotification.getApnsProvider();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `PushNotification.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.pushNotification.<a href="/src/management/api/resources/guardian/resources/factors/resources/pushNotification/client/Client.ts">setApnsProvider</a>({ ...params }) -> Management.SetGuardianFactorsProviderPushNotificationApnsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Modify configuration details of the multi-factor authentication APNS provider associated with your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.pushNotification.setApnsProvider({});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorsProviderPushNotificationApnsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PushNotification.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.pushNotification.<a href="/src/management/api/resources/guardian/resources/factors/resources/pushNotification/client/Client.ts">setFcmProvider</a>({ ...params }) -> Management.SetGuardianFactorsProviderPushNotificationFcmResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Modify configuration details of the multi-factor authentication FCM provider associated with your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.pushNotification.setFcmProvider({});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorsProviderPushNotificationFcmRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PushNotification.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.pushNotification.<a href="/src/management/api/resources/guardian/resources/factors/resources/pushNotification/client/Client.ts">setFcmv1Provider</a>({ ...params }) -> Management.SetGuardianFactorsProviderPushNotificationFcmv1ResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Modify configuration details of the multi-factor authentication FCMV1 provider associated with your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.pushNotification.setFcmv1Provider({});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorsProviderPushNotificationFcmv1RequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PushNotification.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.pushNotification.<a href="/src/management/api/resources/guardian/resources/factors/resources/pushNotification/client/Client.ts">getSnsProvider</a>() -> Management.GetGuardianFactorsProviderSnsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve configuration details for an AWS SNS push notification provider that has been enabled for MFA. To learn more, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-push-notifications-for-mfa">Configure Push Notifications for MFA</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.pushNotification.getSnsProvider();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `PushNotification.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.pushNotification.<a href="/src/management/api/resources/guardian/resources/factors/resources/pushNotification/client/Client.ts">setSnsProvider</a>({ ...params }) -> Management.SetGuardianFactorsProviderPushNotificationSnsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Configure the <a href="https://auth0.com/docs/multifactor-authentication/developer/sns-configuration">AWS SNS push notification provider configuration</a> (subscription required).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.pushNotification.setSnsProvider();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorsProviderPushNotificationSnsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PushNotification.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.pushNotification.<a href="/src/management/api/resources/guardian/resources/factors/resources/pushNotification/client/Client.ts">updateSnsProvider</a>({ ...params }) -> Management.UpdateGuardianFactorsProviderPushNotificationSnsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Configure the <a href="https://auth0.com/docs/multifactor-authentication/developer/sns-configuration">AWS SNS push notification provider configuration</a> (subscription required).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.pushNotification.updateSnsProvider();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateGuardianFactorsProviderPushNotificationSnsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PushNotification.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.pushNotification.<a href="/src/management/api/resources/guardian/resources/factors/resources/pushNotification/client/Client.ts">getSelectedProvider</a>() -> Management.GetGuardianFactorsProviderPushNotificationResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Modify the push notification provider configured for your tenant. For more information, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-push-notifications-for-mfa">Configure Push Notifications for MFA</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.pushNotification.getSelectedProvider();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `PushNotification.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.pushNotification.<a href="/src/management/api/resources/guardian/resources/factors/resources/pushNotification/client/Client.ts">setProvider</a>({ ...params }) -> Management.SetGuardianFactorsProviderPushNotificationResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Modify the push notification provider configured for your tenant. For more information, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-push-notifications-for-mfa">Configure Push Notifications for MFA</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.pushNotification.setProvider({
    provider: "guardian",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorsProviderPushNotificationRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PushNotification.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Guardian Factors Sms

<details><summary><code>client.guardian.factors.sms.<a href="/src/management/api/resources/guardian/resources/factors/resources/sms/client/Client.ts">getTwilioProvider</a>() -> Management.GetGuardianFactorsProviderSmsTwilioResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the <a href="https://auth0.com/docs/multifactor-authentication/twilio-configuration">Twilio SMS provider configuration</a> (subscription required).

    A new endpoint is available to retrieve the Twilio configuration related to phone factors (<a href='https://auth0.com/docs/api/management/v2/#!/Guardian/get_twilio'>phone Twilio configuration</a>). It has the same payload as this one. Please use it instead.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.sms.getTwilioProvider();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Sms.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.sms.<a href="/src/management/api/resources/guardian/resources/factors/resources/sms/client/Client.ts">setTwilioProvider</a>({ ...params }) -> Management.SetGuardianFactorsProviderSmsTwilioResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This endpoint has been deprecated. To complete this action, use the <a href="https://auth0.com/docs/api/management/v2/guardian/put-twilio">Update Twilio phone configuration</a> endpoint.

    <b>Previous functionality</b>: Update the Twilio SMS provider configuration.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.sms.setTwilioProvider();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorsProviderSmsTwilioRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sms.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.sms.<a href="/src/management/api/resources/guardian/resources/factors/resources/sms/client/Client.ts">getSelectedProvider</a>() -> Management.GetGuardianFactorsProviderSmsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This endpoint has been deprecated. To complete this action, use the <a href="https://auth0.com/docs/api/management/v2/guardian/get-phone-providers">Retrieve phone configuration</a> endpoint instead.

    <b>Previous functionality</b>: Retrieve details for the multi-factor authentication SMS provider configured for your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.sms.getSelectedProvider();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Sms.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.sms.<a href="/src/management/api/resources/guardian/resources/factors/resources/sms/client/Client.ts">setProvider</a>({ ...params }) -> Management.SetGuardianFactorsProviderSmsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This endpoint has been deprecated. To complete this action, use the <a href="https://auth0.com/docs/api/management/v2/guardian/put-phone-providers">Update phone configuration</a> endpoint instead.

    <b>Previous functionality</b>: Update the multi-factor authentication SMS provider configuration in your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.sms.setProvider({
    provider: "auth0",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorsProviderSmsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sms.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.sms.<a href="/src/management/api/resources/guardian/resources/factors/resources/sms/client/Client.ts">getTemplates</a>() -> Management.GetGuardianFactorSmsTemplatesResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This endpoint has been deprecated. To complete this action, use the <a href="https://auth0.com/docs/api/management/v2/guardian/get-factor-phone-templates">Retrieve enrollment and verification phone templates</a> endpoint instead.

    <b>Previous function</b>: Retrieve details of SMS enrollment and verification templates configured for your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.sms.getTemplates();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Sms.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.sms.<a href="/src/management/api/resources/guardian/resources/factors/resources/sms/client/Client.ts">setTemplates</a>({ ...params }) -> Management.SetGuardianFactorSmsTemplatesResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

This endpoint has been deprecated. To complete this action, use the <a href="https://auth0.com/docs/api/management/v2/guardian/put-factor-phone-templates">Update enrollment and verification phone templates</a> endpoint instead.

    <b>Previous functionality</b>: Customize the messages sent to complete SMS enrollment and verification.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.sms.setTemplates({
    enrollment_message: "enrollment_message",
    verification_message: "verification_message",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorSmsTemplatesRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sms.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Guardian Factors Duo Settings

<details><summary><code>client.guardian.factors.duo.settings.<a href="/src/management/api/resources/guardian/resources/factors/resources/duo/resources/settings/client/Client.ts">get</a>() -> Management.GetGuardianFactorDuoSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves the DUO account and factor configuration.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.duo.settings.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Settings.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.duo.settings.<a href="/src/management/api/resources/guardian/resources/factors/resources/duo/resources/settings/client/Client.ts">set</a>({ ...params }) -> Management.SetGuardianFactorDuoSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Set the DUO account configuration and other properties specific to this factor.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.duo.settings.set();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetGuardianFactorDuoSettingsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Settings.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.guardian.factors.duo.settings.<a href="/src/management/api/resources/guardian/resources/factors/resources/duo/resources/settings/client/Client.ts">update</a>({ ...params }) -> Management.UpdateGuardianFactorDuoSettingsResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.guardian.factors.duo.settings.update();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateGuardianFactorDuoSettingsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Settings.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Hooks Secrets

<details><summary><code>client.hooks.secrets.<a href="/src/management/api/resources/hooks/resources/secrets/client/Client.ts">get</a>(id) -> Management.GetHookSecretResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a hook's secrets by the ID of the hook.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.hooks.secrets.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the hook to retrieve secrets from.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Secrets.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.hooks.secrets.<a href="/src/management/api/resources/hooks/resources/secrets/client/Client.ts">create</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Add one or more secrets to an existing hook. Accepts an object of key-value pairs, where the key is the name of the secret. A hook can have a maximum of 20 secrets.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.hooks.secrets.create("id", {
    key: "value",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the hook to retrieve

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreateHookSecretRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Secrets.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.hooks.secrets.<a href="/src/management/api/resources/hooks/resources/secrets/client/Client.ts">delete</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete one or more existing secrets for a given hook. Accepts an array of secret names to delete.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.hooks.secrets.delete("id", ["string"]);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the hook whose secrets to delete.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.DeleteHookSecretRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Secrets.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.hooks.secrets.<a href="/src/management/api/resources/hooks/resources/secrets/client/Client.ts">update</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update one or more existing secrets for an existing hook. Accepts an object of key-value pairs, where the key is the name of the existing secret.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.hooks.secrets.update("id", {
    key: "value",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the hook whose secrets to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateHookSecretRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Secrets.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Jobs UsersExports

<details><summary><code>client.jobs.usersExports.<a href="/src/management/api/resources/jobs/resources/usersExports/client/Client.ts">create</a>({ ...params }) -> Management.CreateExportUsersResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Export all users to a file via a long-running job.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.jobs.usersExports.create();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateExportUsersRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UsersExports.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Jobs UsersImports

<details><summary><code>client.jobs.usersImports.<a href="/src/management/api/resources/jobs/resources/usersImports/client/Client.ts">create</a>({ ...params }) -> Management.CreateImportUsersResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Import users from a <a href="https://auth0.com/docs/users/references/bulk-import-database-schema-examples">formatted file</a> into a connection via a long-running job. When importing users, with or without upsert, the `email_verified` is set to `false` when the email address is added or updated. Users must verify their email address. To avoid this behavior, set `email_verified` to `true` in the imported data.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.jobs.usersImports.create({
    users: fs.createReadStream("/path/to/your/file"),
    connection_id: "connection_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateImportUsersRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UsersImports.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Jobs VerificationEmail

<details><summary><code>client.jobs.verificationEmail.<a href="/src/management/api/resources/jobs/resources/verificationEmail/client/Client.ts">create</a>({ ...params }) -> Management.CreateVerificationEmailResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Send an email to the specified user that asks them to click a link to <a href="https://auth0.com/docs/email/custom#verification-email">verify their email address</a>.

Note: You must have the `Status` toggle enabled for the verification email template for the email to be sent.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.jobs.verificationEmail.create({
    user_id: "user_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateVerificationEmailRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `VerificationEmail.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Jobs Errors

<details><summary><code>client.jobs.errors.<a href="/src/management/api/resources/jobs/resources/errors/client/Client.ts">get</a>(id) -> Management.ErrorsGetResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve error details of a failed job.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.jobs.errors.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the job.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Errors.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Keys CustomSigning

<details><summary><code>client.keys.customSigning.<a href="/src/management/api/resources/keys/resources/customSigning/client/Client.ts">get</a>() -> Management.GetCustomSigningKeysResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get entire jwks representation of custom signing keys.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.customSigning.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `CustomSigning.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.keys.customSigning.<a href="/src/management/api/resources/keys/resources/customSigning/client/Client.ts">set</a>({ ...params }) -> Management.SetCustomSigningKeysResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create or replace entire jwks representation of custom signing keys.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.customSigning.set({
    keys: [
        {
            kty: "EC",
        },
    ],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.SetCustomSigningKeysRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomSigning.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.keys.customSigning.<a href="/src/management/api/resources/keys/resources/customSigning/client/Client.ts">delete</a>() -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete entire jwks representation of custom signing keys.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.customSigning.delete();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `CustomSigning.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Keys Encryption

<details><summary><code>client.keys.encryption.<a href="/src/management/api/resources/keys/resources/encryption/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.EncryptionKey></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of all the encryption keys associated with your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.keys.encryption.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.keys.encryption.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListEncryptionKeysRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Encryption.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.keys.encryption.<a href="/src/management/api/resources/keys/resources/encryption/client/Client.ts">create</a>({ ...params }) -> Management.CreateEncryptionKeyResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create the new, pre-activated encryption key, without the key material.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.encryption.create({
    type: "customer-provided-root-key",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateEncryptionKeyRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Encryption.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.keys.encryption.<a href="/src/management/api/resources/keys/resources/encryption/client/Client.ts">rekey</a>() -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Perform rekeying operation on the key hierarchy.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.encryption.rekey();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Encryption.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.keys.encryption.<a href="/src/management/api/resources/keys/resources/encryption/client/Client.ts">get</a>(kid) -> Management.GetEncryptionKeyResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of the encryption key with the given ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.encryption.get("kid");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**kid:** `string` — Encryption key ID

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Encryption.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.keys.encryption.<a href="/src/management/api/resources/keys/resources/encryption/client/Client.ts">import</a>(kid, { ...params }) -> Management.ImportEncryptionKeyResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Import wrapped key material and activate encryption key.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.encryption.import("kid", {
    wrapped_key: "wrapped_key",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**kid:** `string` — Encryption key ID

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ImportEncryptionKeyRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Encryption.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.keys.encryption.<a href="/src/management/api/resources/keys/resources/encryption/client/Client.ts">delete</a>(kid) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete the custom provided encryption key with the given ID and move back to using native encryption key.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.encryption.delete("kid");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**kid:** `string` — Encryption key ID

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Encryption.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.keys.encryption.<a href="/src/management/api/resources/keys/resources/encryption/client/Client.ts">createPublicWrappingKey</a>(kid) -> Management.CreateEncryptionKeyPublicWrappingResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create the public wrapping key to wrap your own encryption key material.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.encryption.createPublicWrappingKey("kid");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**kid:** `string` — Encryption key ID

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Encryption.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Keys Signing

<details><summary><code>client.keys.signing.<a href="/src/management/api/resources/keys/resources/signing/client/Client.ts">list</a>() -> Management.SigningKeys[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of all the application signing keys associated with your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.signing.list();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Signing.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.keys.signing.<a href="/src/management/api/resources/keys/resources/signing/client/Client.ts">rotate</a>() -> Management.RotateSigningKeysResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Rotate the application signing key of your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.signing.rotate();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Signing.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.keys.signing.<a href="/src/management/api/resources/keys/resources/signing/client/Client.ts">get</a>(kid) -> Management.GetSigningKeysResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details of the application signing key with the given ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.signing.get("kid");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**kid:** `string` — Key id of the key to retrieve

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Signing.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.keys.signing.<a href="/src/management/api/resources/keys/resources/signing/client/Client.ts">revoke</a>(kid) -> Management.RevokedSigningKeysResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Revoke the application signing key with the given ID.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.keys.signing.revoke("kid");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**kid:** `string` — Key id of the key to revoke

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Signing.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Organizations ClientGrants

<details><summary><code>client.organizations.clientGrants.<a href="/src/management/api/resources/organizations/resources/clientGrants/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.OrganizationClientGrant></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.organizations.clientGrants.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.organizations.clientGrants.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListOrganizationClientGrantsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ClientGrants.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.clientGrants.<a href="/src/management/api/resources/organizations/resources/clientGrants/client/Client.ts">create</a>(id, { ...params }) -> Management.AssociateOrganizationClientGrantResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.clientGrants.create("id", {
    grant_id: "grant_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.AssociateOrganizationClientGrantRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ClientGrants.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.clientGrants.<a href="/src/management/api/resources/organizations/resources/clientGrants/client/Client.ts">delete</a>(id, grantId) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.clientGrants.delete("id", "grant_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**grantId:** `string` — The Client Grant ID to remove from the organization

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ClientGrants.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Organizations EnabledConnections

<details><summary><code>client.organizations.enabledConnections.<a href="/src/management/api/resources/organizations/resources/enabledConnections/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.OrganizationConnection></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details about a specific connection currently enabled for an Organization. Information returned includes details such as connection ID, name, strategy, and whether the connection automatically grants membership upon login.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.organizations.enabledConnections.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.organizations.enabledConnections.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListOrganizationConnectionsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EnabledConnections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.enabledConnections.<a href="/src/management/api/resources/organizations/resources/enabledConnections/client/Client.ts">add</a>(id, { ...params }) -> Management.AddOrganizationConnectionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Enable a specific connection for a given Organization. To enable a connection, it must already exist within your tenant; connections cannot be created through this action.

<a href="https://auth0.com/docs/authenticate/identity-providers">Connections</a> represent the relationship between Auth0 and a source of users. Available types of connections include database, enterprise, and social.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.enabledConnections.add("id", {
    connection_id: "connection_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.AddOrganizationConnectionRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EnabledConnections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.enabledConnections.<a href="/src/management/api/resources/organizations/resources/enabledConnections/client/Client.ts">get</a>(id, connectionId) -> Management.GetOrganizationConnectionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details about a specific connection currently enabled for an Organization. Information returned includes details such as connection ID, name, strategy, and whether the connection automatically grants membership upon login.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.enabledConnections.get("id", "connectionId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**connectionId:** `string` — Connection identifier.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EnabledConnections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.enabledConnections.<a href="/src/management/api/resources/organizations/resources/enabledConnections/client/Client.ts">delete</a>(id, connectionId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Disable a specific connection for an Organization. Once disabled, Organization members can no longer use that connection to authenticate.

<b>Note</b>: This action does not remove the connection from your tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.enabledConnections.delete("id", "connectionId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**connectionId:** `string` — Connection identifier.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EnabledConnections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.enabledConnections.<a href="/src/management/api/resources/organizations/resources/enabledConnections/client/Client.ts">update</a>(id, connectionId, { ...params }) -> Management.UpdateOrganizationConnectionResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Modify the details of a specific connection currently enabled for an Organization.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.enabledConnections.update("id", "connectionId");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**connectionId:** `string` — Connection identifier.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateOrganizationConnectionRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EnabledConnections.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Organizations Invitations

<details><summary><code>client.organizations.invitations.<a href="/src/management/api/resources/organizations/resources/invitations/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.OrganizationInvitation></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a detailed list of invitations sent to users for a specific Organization. The list includes details such as inviter and invitee information, invitation URLs, and dates of creation and expiration. To learn more about Organization invitations, review <a href="https://auth0.com/docs/manage-users/organizations/configure-organizations/invite-members">Invite Organization Members</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.organizations.invitations.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.organizations.invitations.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListOrganizationInvitationsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Invitations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.invitations.<a href="/src/management/api/resources/organizations/resources/invitations/client/Client.ts">create</a>(id, { ...params }) -> Management.CreateOrganizationInvitationResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a user invitation for a specific Organization. Upon creation, the listed user receives an email inviting them to join the Organization. To learn more about Organization invitations, review <a href="https://auth0.com/docs/manage-users/organizations/configure-organizations/invite-members">Invite Organization Members</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.invitations.create("id", {
    inviter: {
        name: "name",
    },
    invitee: {
        email: "email",
    },
    client_id: "client_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreateOrganizationInvitationRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Invitations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.invitations.<a href="/src/management/api/resources/organizations/resources/invitations/client/Client.ts">get</a>(id, invitationId, { ...params }) -> Management.GetOrganizationInvitationResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.invitations.get("id", "invitation_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**invitationId:** `string` — The id of the user invitation.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetOrganizationInvitationRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Invitations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.invitations.<a href="/src/management/api/resources/organizations/resources/invitations/client/Client.ts">delete</a>(id, invitationId) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.invitations.delete("id", "invitation_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**invitationId:** `string` — The id of the user invitation.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Invitations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Organizations Members

<details><summary><code>client.organizations.members.<a href="/src/management/api/resources/organizations/resources/members/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.OrganizationMember></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List organization members.
This endpoint is subject to eventual consistency. New users may not be immediately included in the response and deleted users may not be immediately removed from it.

<ul>
  <li>
    Use the <code>fields</code> parameter to optionally define the specific member details retrieved. If <code>fields</code> is left blank, all fields (except roles) are returned.
  </li>
  <li>
    Member roles are not sent by default. Use <code>fields=roles</code> to retrieve the roles assigned to each listed member. To use this parameter, you must include the <code>read:organization_member_roles</code> scope in the token.
  </li>
</ul>

This endpoint supports two types of pagination:

- Offset pagination
- Checkpoint pagination

Checkpoint pagination must be used if you need to retrieve more than 1000 organization members.

<h2>Checkpoint Pagination</h2>

To search by checkpoint, use the following parameters: - from: Optional id from which to start selection. - take: The total amount of entries to retrieve when using the from parameter. Defaults to 50. Note: The first time you call this endpoint using Checkpoint Pagination, you should omit the <code>from</code> parameter. If there are more results, a <code>next</code> value will be included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, this indicates there are no more pages remaining.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.organizations.members.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.organizations.members.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListOrganizationMembersRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Members.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.members.<a href="/src/management/api/resources/organizations/resources/members/client/Client.ts">create</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Set one or more existing users as members of a specific <a href="https://auth0.com/docs/manage-users/organizations">Organization</a>.

To add a user to an Organization through this action, the user must already exist in your tenant. If a user does not yet exist, you can <a href="https://auth0.com/docs/manage-users/organizations/configure-organizations/invite-members">invite them to create an account</a>, manually create them through the Auth0 Dashboard, or use the Management API.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.members.create("id", {
    members: ["members"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreateOrganizationMemberRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Members.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.members.<a href="/src/management/api/resources/organizations/resources/members/client/Client.ts">delete</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.members.delete("id", {
    members: ["members"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.DeleteOrganizationMembersRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Members.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Organizations Members Roles

<details><summary><code>client.organizations.members.roles.<a href="/src/management/api/resources/organizations/resources/members/resources/roles/client/Client.ts">list</a>(id, userId, { ...params }) -> core.Page<Management.Role></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve detailed list of roles assigned to a given user within the context of a specific Organization.

Users can be members of multiple Organizations with unique roles assigned for each membership. This action only returns the roles associated with the specified Organization; any roles assigned to the user within other Organizations are not included.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.organizations.members.roles.list("id", "user_id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.organizations.members.roles.list("id", "user_id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**userId:** `string` — ID of the user to associate roles with.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListOrganizationMemberRolesRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Roles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.members.roles.<a href="/src/management/api/resources/organizations/resources/members/resources/roles/client/Client.ts">assign</a>(id, userId, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Assign one or more <a href="https://auth0.com/docs/manage-users/access-control/rbac">roles</a> to a user to determine their access for a specific Organization.

Users can be members of multiple Organizations with unique roles assigned for each membership. This action assigns roles to a user only for the specified Organization. Roles cannot be assigned to a user across multiple Organizations in the same call.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.members.roles.assign("id", "user_id", {
    roles: ["roles"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**userId:** `string` — ID of the user to associate roles with.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.AssignOrganizationMemberRolesRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Roles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.organizations.members.roles.<a href="/src/management/api/resources/organizations/resources/members/resources/roles/client/Client.ts">delete</a>(id, userId, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove one or more Organization-specific <a href="https://auth0.com/docs/manage-users/access-control/rbac">roles</a> from a given user.

Users can be members of multiple Organizations with unique roles assigned for each membership. This action removes roles from a user in relation to the specified Organization. Roles assigned to the user within a different Organization cannot be managed in the same call.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.organizations.members.roles.delete("id", "user_id", {
    roles: ["roles"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Organization identifier.

</dd>
</dl>

<dl>
<dd>

**userId:** `string` — User ID of the organization member to remove roles from.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.DeleteOrganizationMemberRolesRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Roles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Prompts Rendering

<details><summary><code>client.prompts.rendering.<a href="/src/management/api/resources/prompts/resources/rendering/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.AculResponseContent></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get render setting configurations for all screens.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.prompts.rendering.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.prompts.rendering.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListAculsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Rendering.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.prompts.rendering.<a href="/src/management/api/resources/prompts/resources/rendering/client/Client.ts">get</a>(prompt, screen) -> Management.GetAculResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get render settings for a screen.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompts.rendering.get("login", "login");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**prompt:** `Management.PromptGroupNameEnum` — Name of the prompt

</dd>
</dl>

<dl>
<dd>

**screen:** `Management.ScreenGroupNameEnum` — Name of the screen

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Rendering.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.prompts.rendering.<a href="/src/management/api/resources/prompts/resources/rendering/client/Client.ts">update</a>(prompt, screen, { ...params }) -> Management.UpdateAculResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Learn more about <a href='https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/configure-acul-screens'>configuring render settings</a> for advanced customization.

<p>
  Example <code>head_tags</code> array. See our <a href='https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/configure-acul-screens'>documentation</a> on using Liquid variables within head tags.
</p>
<pre>{
  "head_tags": [
    {
      "tag": "script",
      "attributes": {
        "defer": true,
        "src": "URL_TO_ASSET",
        "async": true,
        "integrity": [
          "ASSET_SHA"
        ]
      }
    },
    {
      "tag": "link",
      "attributes": {
        "href": "URL_TO_ASSET",
        "rel": "stylesheet"
      }
    }
  ]
}
</pre>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompts.rendering.update("login", "login");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**prompt:** `Management.PromptGroupNameEnum` — Name of the prompt

</dd>
</dl>

<dl>
<dd>

**screen:** `Management.ScreenGroupNameEnum` — Name of the screen

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateAculRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Rendering.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Prompts CustomText

<details><summary><code>client.prompts.customText.<a href="/src/management/api/resources/prompts/resources/customText/client/Client.ts">get</a>(prompt, language) -> Management.GetCustomTextsByLanguageResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve custom text for a specific prompt and language.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompts.customText.get("login", "am");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**prompt:** `Management.PromptGroupNameEnum` — Name of the prompt.

</dd>
</dl>

<dl>
<dd>

**language:** `Management.PromptLanguageEnum` — Language to update.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomText.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.prompts.customText.<a href="/src/management/api/resources/prompts/resources/customText/client/Client.ts">set</a>(prompt, language, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Set custom text for a specific prompt. Existing texts will be overwritten.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompts.customText.set("login", "am", {
    key: "value",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**prompt:** `Management.PromptGroupNameEnum` — Name of the prompt.

</dd>
</dl>

<dl>
<dd>

**language:** `Management.PromptLanguageEnum` — Language to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.SetsCustomTextsByLanguageRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomText.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Prompts Partials

<details><summary><code>client.prompts.partials.<a href="/src/management/api/resources/prompts/resources/partials/client/Client.ts">get</a>(prompt) -> Management.GetPartialsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get template partials for a prompt

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompts.partials.get("login");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**prompt:** `Management.PartialGroupsEnum` — Name of the prompt.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Partials.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.prompts.partials.<a href="/src/management/api/resources/prompts/resources/partials/client/Client.ts">set</a>(prompt, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Set template partials for a prompt

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.prompts.partials.set("login", {
    key: "value",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**prompt:** `Management.PartialGroupsEnum` — Name of the prompt.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.SetPartialsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Partials.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## RiskAssessments Settings

<details><summary><code>client.riskAssessments.settings.<a href="/src/management/api/resources/riskAssessments/resources/settings/client/Client.ts">get</a>() -> Management.GetRiskAssessmentsSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Gets the tenant settings for risk assessments

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.riskAssessments.settings.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Settings.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.riskAssessments.settings.<a href="/src/management/api/resources/riskAssessments/resources/settings/client/Client.ts">update</a>({ ...params }) -> Management.UpdateRiskAssessmentsSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates the tenant settings for risk assessments

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.riskAssessments.settings.update({
    enabled: true,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateRiskAssessmentsSettingsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Settings.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## RiskAssessments Settings NewDevice

<details><summary><code>client.riskAssessments.settings.newDevice.<a href="/src/management/api/resources/riskAssessments/resources/settings/resources/newDevice/client/Client.ts">get</a>() -> Management.GetRiskAssessmentsSettingsNewDeviceResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Gets the risk assessment settings for the new device assessor

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.riskAssessments.settings.newDevice.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `NewDevice.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.riskAssessments.settings.newDevice.<a href="/src/management/api/resources/riskAssessments/resources/settings/resources/newDevice/client/Client.ts">update</a>({ ...params }) -> Management.UpdateRiskAssessmentsSettingsNewDeviceResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates the risk assessment settings for the new device assessor

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.riskAssessments.settings.newDevice.update({
    remember_for: 1,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateRiskAssessmentsSettingsNewDeviceRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `NewDevice.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Roles Permissions

<details><summary><code>client.roles.permissions.<a href="/src/management/api/resources/roles/resources/permissions/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.PermissionsResponsePayload></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve detailed list (name, description, resource server) of permissions granted by a specified user role.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.roles.permissions.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.roles.permissions.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the role to list granted permissions.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListRolePermissionsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Permissions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.roles.permissions.<a href="/src/management/api/resources/roles/resources/permissions/client/Client.ts">add</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Add one or more <a href="https://auth0.com/docs/manage-users/access-control/configure-core-rbac/manage-permissions">permissions</a> to a specified user role.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.roles.permissions.add("id", {
    permissions: [
        {
            resource_server_identifier: "resource_server_identifier",
            permission_name: "permission_name",
        },
    ],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the role to add permissions to.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.AddRolePermissionsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Permissions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.roles.permissions.<a href="/src/management/api/resources/roles/resources/permissions/client/Client.ts">delete</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove one or more <a href="https://auth0.com/docs/manage-users/access-control/configure-core-rbac/manage-permissions">permissions</a> from a specified user role.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.roles.permissions.delete("id", {
    permissions: [
        {
            resource_server_identifier: "resource_server_identifier",
            permission_name: "permission_name",
        },
    ],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the role to remove permissions from.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.DeleteRolePermissionsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Permissions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Roles Users

<details><summary><code>client.roles.users.<a href="/src/management/api/resources/roles/resources/users/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.RoleUser></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve list of users associated with a specific role. For Dashboard instructions, review <a href="https://auth0.com/docs/manage-users/access-control/configure-core-rbac/roles/view-users-assigned-to-roles">View Users Assigned to Roles</a>.

This endpoint supports two types of pagination:

<ul>
<li>Offset pagination</li>
<li>Checkpoint pagination</li>
</ul>

Checkpoint pagination must be used if you need to retrieve more than 1000 organization members.

<h2>Checkpoint Pagination</h2>

To search by checkpoint, use the following parameters:

<ul>
<li><code>from</code>: Optional id from which to start selection.</li>
<li><code>take</code>: The total amount of entries to retrieve when using the from parameter. Defaults to 50.</li>
</ul>

<b>Note</b>: The first time you call this endpoint using checkpoint pagination, omit the <code>from</code> parameter. If there are more results, a <code>next</code> value is included in the response. You can use this for subsequent API calls. When <code>next</code> is no longer included in the response, no pages are remaining.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.roles.users.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.roles.users.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the role to retrieve a list of users associated with.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListRoleUsersRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.roles.users.<a href="/src/management/api/resources/roles/resources/users/client/Client.ts">assign</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Assign one or more users to an existing user role. To learn more, review <a href="https://auth0.com/docs/manage-users/access-control/rbac">Role-Based Access Control</a>.

<b>Note</b>: New roles cannot be created through this action.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.roles.users.assign("id", {
    users: ["users"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the role to assign users to.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.AssignRoleUsersRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## SelfServiceProfiles CustomText

<details><summary><code>client.selfServiceProfiles.customText.<a href="/src/management/api/resources/selfServiceProfiles/resources/customText/client/Client.ts">list</a>(id, language, page) -> Management.ListSelfServiceProfileCustomTextResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves text customizations for a given self-service profile, language and Self Service SSO Flow page.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.selfServiceProfiles.customText.list("id", "en", "get-started");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the self-service profile.

</dd>
</dl>

<dl>
<dd>

**language:** `Management.SelfServiceProfileCustomTextLanguageEnum` — The language of the custom text.

</dd>
</dl>

<dl>
<dd>

**page:** `Management.SelfServiceProfileCustomTextPageEnum` — The page where the custom text is shown.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomText.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.selfServiceProfiles.customText.<a href="/src/management/api/resources/selfServiceProfiles/resources/customText/client/Client.ts">set</a>(id, language, page, { ...params }) -> Management.SetSelfServiceProfileCustomTextResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates text customizations for a given self-service profile, language and Self Service SSO Flow page.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.selfServiceProfiles.customText.set("id", "en", "get-started", {
    key: "value",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the self-service profile.

</dd>
</dl>

<dl>
<dd>

**language:** `Management.SelfServiceProfileCustomTextLanguageEnum` — The language of the custom text.

</dd>
</dl>

<dl>
<dd>

**page:** `Management.SelfServiceProfileCustomTextPageEnum` — The page where the custom text is shown.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.SetSelfServiceProfileCustomTextRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomText.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## SelfServiceProfiles SsoTicket

<details><summary><code>client.selfServiceProfiles.ssoTicket.<a href="/src/management/api/resources/selfServiceProfiles/resources/ssoTicket/client/Client.ts">create</a>(id, { ...params }) -> Management.CreateSelfServiceProfileSsoTicketResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates an SSO access ticket to initiate the Self Service SSO Flow using a self-service profile.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.selfServiceProfiles.ssoTicket.create("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The id of the self-service profile to retrieve

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreateSelfServiceProfileSsoTicketRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SsoTicket.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.selfServiceProfiles.ssoTicket.<a href="/src/management/api/resources/selfServiceProfiles/resources/ssoTicket/client/Client.ts">revoke</a>(profileId, id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Revokes an SSO access ticket and invalidates associated sessions. The ticket will no longer be accepted to initiate a Self-Service SSO session. If any users have already started a session through this ticket, their session will be terminated. Clients should expect a `202 Accepted` response upon successful processing, indicating that the request has been acknowledged and that the revocation is underway but may not be fully completed at the time of response. If the specified ticket does not exist, a `202 Accepted` response is also returned, signaling that no further action is required.
Clients should treat these `202` responses as an acknowledgment that the request has been accepted and is in progress, even if the ticket was not found.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.selfServiceProfiles.ssoTicket.revoke("profileId", "id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**profileId:** `string` — The id of the self-service profile

</dd>
</dl>

<dl>
<dd>

**id:** `string` — The id of the ticket to revoke

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SsoTicket.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Tenants Settings

<details><summary><code>client.tenants.settings.<a href="/src/management/api/resources/tenants/resources/settings/client/Client.ts">get</a>({ ...params }) -> Management.GetTenantSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve tenant settings. A list of fields to include or exclude may also be specified.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tenants.settings.get();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.GetTenantSettingsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Settings.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tenants.settings.<a href="/src/management/api/resources/tenants/resources/settings/client/Client.ts">update</a>({ ...params }) -> Management.UpdateTenantSettingsResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update settings for a tenant.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tenants.settings.update();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.UpdateTenantSettingsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Settings.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users AuthenticationMethods

<details><summary><code>client.users.authenticationMethods.<a href="/src/management/api/resources/users/resources/authenticationMethods/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.UserAuthenticationMethod></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve detailed list of authentication methods associated with a specified user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.users.authenticationMethods.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.users.authenticationMethods.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the user in question.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListUserAuthenticationMethodsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.authenticationMethods.<a href="/src/management/api/resources/users/resources/authenticationMethods/client/Client.ts">create</a>(id, { ...params }) -> Management.CreateUserAuthenticationMethodResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create an authentication method. Authentication methods created via this endpoint will be auto confirmed and should already have verification completed.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.authenticationMethods.create("id", {
    type: "phone",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the user to whom the new authentication method will be assigned.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreateUserAuthenticationMethodRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.authenticationMethods.<a href="/src/management/api/resources/users/resources/authenticationMethods/client/Client.ts">set</a>(id, { ...params }) -> Management.SetUserAuthenticationMethodResponseContent[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Replace the specified user <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors"> authentication methods</a> with supplied values.

    <b>Note</b>: Authentication methods supplied through this action do not iterate on existing methods. Instead, any methods passed will overwrite the user&#8217s existing settings.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.authenticationMethods.set("id", [
    {
        type: "phone",
    },
]);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the user in question.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.SetUserAuthenticationMethodsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.authenticationMethods.<a href="/src/management/api/resources/users/resources/authenticationMethods/client/Client.ts">deleteAll</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove all authentication methods (i.e., enrolled MFA factors) from the specified user account. This action cannot be undone.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.authenticationMethods.deleteAll("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the user in question.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.authenticationMethods.<a href="/src/management/api/resources/users/resources/authenticationMethods/client/Client.ts">get</a>(id, authenticationMethodId) -> Management.GetUserAuthenticationMethodResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.authenticationMethods.get("id", "authentication_method_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the user in question.

</dd>
</dl>

<dl>
<dd>

**authenticationMethodId:** `string` — The ID of the authentication methods in question.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.authenticationMethods.<a href="/src/management/api/resources/users/resources/authenticationMethods/client/Client.ts">delete</a>(id, authenticationMethodId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove the authentication method with the given ID from the specified user. For more information, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/manage-mfa-auth0-apis/manage-authentication-methods-with-management-api">Manage Authentication Methods with Management API</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.authenticationMethods.delete("id", "authentication_method_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the user in question.

</dd>
</dl>

<dl>
<dd>

**authenticationMethodId:** `string` — The ID of the authentication method to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.authenticationMethods.<a href="/src/management/api/resources/users/resources/authenticationMethods/client/Client.ts">update</a>(id, authenticationMethodId, { ...params }) -> Management.UpdateUserAuthenticationMethodResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Modify the authentication method with the given ID from the specified user. For more information, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/manage-mfa-auth0-apis/manage-authentication-methods-with-management-api">Manage Authentication Methods with Management API</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.authenticationMethods.update("id", "authentication_method_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the user in question.

</dd>
</dl>

<dl>
<dd>

**authenticationMethodId:** `string` — The ID of the authentication method to update.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateUserAuthenticationMethodRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthenticationMethods.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users Authenticators

<details><summary><code>client.users.authenticators.<a href="/src/management/api/resources/users/resources/authenticators/client/Client.ts">deleteAll</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove all authenticators registered to a given user ID, such as OTP, email, phone, and push-notification. This action cannot be undone. For more information, review <a href="https://auth0.com/docs/secure/multi-factor-authentication/manage-mfa-auth0-apis/manage-authentication-methods-with-management-api">Manage Authentication Methods with Management API</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.authenticators.deleteAll("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to delete.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Authenticators.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users Enrollments

<details><summary><code>client.users.enrollments.<a href="/src/management/api/resources/users/resources/enrollments/client/Client.ts">get</a>(id) -> Management.UsersEnrollment[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the first <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors">multi-factor authentication</a> enrollment that a specific user has confirmed.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.enrollments.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to list enrollments for.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Enrollments.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users FederatedConnectionsTokensets

<details><summary><code>client.users.federatedConnectionsTokensets.<a href="/src/management/api/resources/users/resources/federatedConnectionsTokensets/client/Client.ts">list</a>(id) -> Management.FederatedConnectionTokenSet[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List active federated connections tokensets for a provided user

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.federatedConnectionsTokensets.list("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — User identifier

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FederatedConnectionsTokensets.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.federatedConnectionsTokensets.<a href="/src/management/api/resources/users/resources/federatedConnectionsTokensets/client/Client.ts">delete</a>(id, tokensetId) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.federatedConnectionsTokensets.delete("id", "tokenset_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Id of the user that owns the tokenset

</dd>
</dl>

<dl>
<dd>

**tokensetId:** `string` — The tokenset id

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FederatedConnectionsTokensets.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users Groups

<details><summary><code>client.users.groups.<a href="/src/management/api/resources/users/resources/groups/client/Client.ts">get</a>(id, { ...params }) -> core.Page<Management.Group></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the first <a href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors">multi-factor authentication</a> enrollment that a specific user has confirmed.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.users.groups.get("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.users.groups.get("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to list groups for.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.GetUserGroupsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Groups.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users Identities

<details><summary><code>client.users.identities.<a href="/src/management/api/resources/users/resources/identities/client/Client.ts">link</a>(id, { ...params }) -> Management.UserIdentity[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Link two user accounts together forming a primary and secondary relationship. On successful linking, the endpoint returns the new array of the primary account identities.

Note: There are two ways of invoking the endpoint:

<ul>
  <li>With the authenticated primary account's JWT in the Authorization header, which has the <code>update:current_user_identities</code> scope:
    <pre>
      POST /api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities
      Authorization: "Bearer PRIMARY_ACCOUNT_JWT"
      {
        "link_with": "SECONDARY_ACCOUNT_JWT"
      }
    </pre>
    In this case, only the <code>link_with</code> param is required in the body, which also contains the JWT obtained upon the secondary account's authentication.
  </li>
  <li>With a token generated by the API V2 containing the <code>update:users</code> scope:
    <pre>
    POST /api/v2/users/PRIMARY_ACCOUNT_USER_ID/identities
    Authorization: "Bearer YOUR_API_V2_TOKEN"
    {
      "provider": "SECONDARY_ACCOUNT_PROVIDER",
      "connection_id": "SECONDARY_ACCOUNT_CONNECTION_ID(OPTIONAL)",
      "user_id": "SECONDARY_ACCOUNT_USER_ID"
    }
    </pre>
    In this case you need to send <code>provider</code> and <code>user_id</code> in the body. Optionally you can also send the <code>connection_id</code> param which is suitable for identifying a particular database connection for the 'auth0' provider.
  </li>
</ul>
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.identities.link("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the primary user account to link a second user account to.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.LinkUserIdentityRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Identities.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.identities.<a href="/src/management/api/resources/users/resources/identities/client/Client.ts">delete</a>(id, provider, userId) -> Management.DeleteUserIdentityResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Unlink a specific secondary account from a target user. This action requires the ID of both the target user and the secondary account.

Unlinking the secondary account removes it from the identities array of the target user and creates a new standalone profile for the secondary account. To learn more, review <a href="https://auth0.com/docs/manage-users/user-accounts/user-account-linking/unlink-user-accounts">Unlink User Accounts</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.identities.delete("id", "ad", "user_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the primary user account.

</dd>
</dl>

<dl>
<dd>

**provider:** `Management.UserIdentityProviderEnum` — Identity provider name of the secondary linked account (e.g. `google-oauth2`).

</dd>
</dl>

<dl>
<dd>

**userId:** `string` — ID of the secondary linked account (e.g. `123456789081523216417` part after the `|` in `google-oauth2|123456789081523216417`).

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Identities.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users Logs

<details><summary><code>client.users.logs.<a href="/src/management/api/resources/users/resources/logs/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.Log></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve log events for a specific user.

Note: For more information on all possible event types, their respective acronyms and descriptions, see <a href="https://auth0.com/docs/logs/log-event-type-codes">Log Event Type Codes</a>.

For more information on the list of fields that can be used in `sort`, see <a href="https://auth0.com/docs/logs/log-search-query-syntax#searchable-fields">Searchable Fields</a>.

Auth0 <a href="https://auth0.com/docs/logs/retrieve-log-events-using-mgmt-api#limitations">limits the number of logs</a> you can return by search criteria to 100 logs per request. Furthermore, you may only paginate through up to 1,000 search results. If you exceed this threshold, please redefine your search.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.users.logs.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.users.logs.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user of the logs to retrieve

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListUserLogsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Logs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users Multifactor

<details><summary><code>client.users.multifactor.<a href="/src/management/api/resources/users/resources/multifactor/client/Client.ts">invalidateRememberBrowser</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Invalidate all remembered browsers across all <a href="https://auth0.com/docs/multifactor-authentication">authentication factors</a> for a user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.multifactor.invalidateRememberBrowser("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to invalidate all remembered browsers and authentication factors for.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Multifactor.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.multifactor.<a href="/src/management/api/resources/users/resources/multifactor/client/Client.ts">deleteProvider</a>(id, provider) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove a <a href="https://auth0.com/docs/multifactor-authentication">multifactor</a> authentication configuration from a user's account. This forces the user to manually reconfigure the multi-factor provider.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.multifactor.deleteProvider("id", "duo");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to remove a multifactor configuration from.

</dd>
</dl>

<dl>
<dd>

**provider:** `Management.UserMultifactorProviderEnum` — The multi-factor provider. Supported values 'duo' or 'google-authenticator'

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Multifactor.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users Organizations

<details><summary><code>client.users.organizations.<a href="/src/management/api/resources/users/resources/organizations/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.Organization></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve list of the specified user's current Organization memberships. User must be specified by user ID. For more information, review <a href="https://auth0.com/docs/manage-users/organizations">Auth0 Organizations</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.users.organizations.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.users.organizations.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to retrieve the organizations for.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListUserOrganizationsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Organizations.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users Permissions

<details><summary><code>client.users.permissions.<a href="/src/management/api/resources/users/resources/permissions/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.UserPermissionSchema></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all permissions associated with the user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.users.permissions.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.users.permissions.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to retrieve the permissions for.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListUserPermissionsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Permissions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.permissions.<a href="/src/management/api/resources/users/resources/permissions/client/Client.ts">create</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Assign permissions to a user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.permissions.create("id", {
    permissions: [
        {
            resource_server_identifier: "resource_server_identifier",
            permission_name: "permission_name",
        },
    ],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to assign permissions to.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.CreateUserPermissionsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Permissions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.permissions.<a href="/src/management/api/resources/users/resources/permissions/client/Client.ts">delete</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove permissions from a user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.permissions.delete("id", {
    permissions: [
        {
            resource_server_identifier: "resource_server_identifier",
            permission_name: "permission_name",
        },
    ],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to remove permissions from.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.DeleteUserPermissionsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Permissions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users RiskAssessments

<details><summary><code>client.users.riskAssessments.<a href="/src/management/api/resources/users/resources/riskAssessments/client/Client.ts">clear</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Clear risk assessment assessors for a specific user

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.riskAssessments.clear("id", {
    connection: "connection",
    assessors: ["new-device"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to clear assessors for.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ClearAssessorsRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RiskAssessments.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users Roles

<details><summary><code>client.users.roles.<a href="/src/management/api/resources/users/resources/roles/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Management.Role></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve detailed list of all user roles currently assigned to a user.

<b>Note</b>: This action retrieves all roles assigned to a user in the context of your whole tenant. To retrieve Organization-specific roles, use the following endpoint: <a href="https://auth0.com/docs/api/management/v2/organizations/get-organization-member-roles">Get user roles assigned to an Organization member</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.users.roles.list("id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.users.roles.list("id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to list roles for.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListUserRolesRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Roles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.roles.<a href="/src/management/api/resources/users/resources/roles/client/Client.ts">assign</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Assign one or more existing user roles to a user. For more information, review <a href="https://auth0.com/docs/manage-users/access-control/rbac">Role-Based Access Control</a>.

<b>Note</b>: New roles cannot be created through this action. Additionally, this action is used to assign roles to a user in the context of your whole tenant. To assign roles in the context of a specific Organization, use the following endpoint: <a href="https://auth0.com/docs/api/management/v2/organizations/post-organization-member-roles">Assign user roles to an Organization member</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.roles.assign("id", {
    roles: ["roles"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to associate roles with.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.AssignUserRolesRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Roles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.roles.<a href="/src/management/api/resources/users/resources/roles/client/Client.ts">delete</a>(id, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove one or more specified user roles assigned to a user.

<b>Note</b>: This action removes a role from a user in the context of your whole tenant. If you want to unassign a role from a user in the context of a specific Organization, use the following endpoint: <a href="https://auth0.com/docs/api/management/v2/organizations/delete-organization-member-roles">Delete user roles from an Organization member</a>.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.roles.delete("id", {
    roles: ["roles"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the user to remove roles from.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.DeleteUserRolesRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Roles.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users RefreshToken

<details><summary><code>client.users.refreshToken.<a href="/src/management/api/resources/users/resources/refreshToken/client/Client.ts">list</a>(userId, { ...params }) -> core.Page<Management.RefreshTokenResponseContent></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details for a user's refresh tokens.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.users.refreshToken.list("user_id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.users.refreshToken.list("user_id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**userId:** `string` — ID of the user to get refresh tokens for

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListRefreshTokensRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefreshToken.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.refreshToken.<a href="/src/management/api/resources/users/resources/refreshToken/client/Client.ts">delete</a>(userId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete all refresh tokens for a user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.refreshToken.delete("user_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**userId:** `string` — ID of the user to get remove refresh tokens for

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefreshToken.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Users Sessions

<details><summary><code>client.users.sessions.<a href="/src/management/api/resources/users/resources/sessions/client/Client.ts">list</a>(userId, { ...params }) -> core.Page<Management.SessionResponseContent></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve details for a user's sessions.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.users.sessions.list("user_id");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.users.sessions.list("user_id");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**userId:** `string` — ID of the user to get sessions for

</dd>
</dl>

<dl>
<dd>

**request:** `Management.ListUserSessionsRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.users.sessions.<a href="/src/management/api/resources/users/resources/sessions/client/Client.ts">delete</a>(userId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete all sessions for a user.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.sessions.delete("user_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**userId:** `string` — ID of the user to get sessions for

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## VerifiableCredentials Verification Templates

<details><summary><code>client.verifiableCredentials.verification.templates.<a href="/src/management/api/resources/verifiableCredentials/resources/verification/resources/templates/client/Client.ts">list</a>({ ...params }) -> core.Page<Management.VerifiableCredentialTemplateResponse></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List a verifiable credential templates.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.verifiableCredentials.verification.templates.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.verifiableCredentials.verification.templates.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.ListVerifiableCredentialTemplatesRequestParameters`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.verifiableCredentials.verification.templates.<a href="/src/management/api/resources/verifiableCredentials/resources/verification/resources/templates/client/Client.ts">create</a>({ ...params }) -> Management.CreateVerifiableCredentialTemplateResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a verifiable credential template.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.verifiableCredentials.verification.templates.create({
    name: "name",
    type: "type",
    dialect: "dialect",
    presentation: {
        "org.iso.18013.5.1.mDL": {
            "org.iso.18013.5.1": {},
        },
    },
    well_known_trusted_issuers: "well_known_trusted_issuers",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Management.CreateVerifiableCredentialTemplateRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.verifiableCredentials.verification.templates.<a href="/src/management/api/resources/verifiableCredentials/resources/verification/resources/templates/client/Client.ts">get</a>(id) -> Management.GetVerifiableCredentialTemplateResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get a verifiable credential template.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.verifiableCredentials.verification.templates.get("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the template to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.verifiableCredentials.verification.templates.<a href="/src/management/api/resources/verifiableCredentials/resources/verification/resources/templates/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a verifiable credential template.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.verifiableCredentials.verification.templates.delete("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the template to retrieve.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.verifiableCredentials.verification.templates.<a href="/src/management/api/resources/verifiableCredentials/resources/verification/resources/templates/client/Client.ts">update</a>(id, { ...params }) -> Management.UpdateVerifiableCredentialTemplateResponseContent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a verifiable credential template.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.verifiableCredentials.verification.templates.update("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — ID of the template to retrieve.

</dd>
</dl>

<dl>
<dd>

**request:** `Management.UpdateVerifiableCredentialTemplateRequestContent`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Templates.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
