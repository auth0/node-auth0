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

Retrieve an email template by pre-defined name. These names are `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, and `user_invitation`. The names `change_password`, and `password_reset` are also supported for legacy scenarios.

</dd>
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

**templateName:** `Management.EmailTemplateNameEnum` — Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).

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

**templateName:** `Management.EmailTemplateNameEnum` — Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).

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

**templateName:** `Management.EmailTemplateNameEnum` — Template name. Can be `verify_email`, `verify_email_by_code`, `reset_email`, `reset_email_by_code`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `user_invitation`, `change_password` (legacy), or `password_reset` (legacy).

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

<details><summary><code>client.eventStreams.<a href="/src/management/api/resources/eventStreams/client/Client.ts">getStats</a>(id, { ...params }) -> Management.GetEventStreamStatsResponseContent</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eventStreams.getStats("id");
```

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

**request:** `Management.EventStreamsGetStatsRequest`

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

**request:** `Management.actions.ListActionVersionsRequestParameters`

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

**request:** `Management.actions.triggers.ListActionTriggerBindingsRequestParameters`

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

**request:** `Management.actions.triggers.UpdateActionBindingsRequestContent`

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

**request:** `Management.attackProtection.UpdateBreachedPasswordDetectionSettingsRequestContent`

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

**request:** `Management.attackProtection.UpdateBruteForceSettingsRequestContent`

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

**request:** `Management.attackProtection.UpdateSuspiciousIpThrottlingSettingsRequestContent`

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

**request:** `Management.branding.CreateBrandingThemeRequestContent`

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
