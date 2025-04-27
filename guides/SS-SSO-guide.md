# **Self Service SSO Management API Documentation**

## **Overview**

The Self Service SSO feature allows business-to-business (B2B) customers to streamline the onboarding process of their customers by enabling them to set up Single-Sign-On (SSO) on their own. This feature is intended for B2B SaaS companies to provide their enterprise customers with an easy-to-use method of configuring SSO access to their applications.

## **Prerequisites**

- Ensure the `self_service_sso_enabled` flag is enabled on your tenant.
- Familiarity with the Auth0 Management API.

## **Usage Example**

### 1. Create a Self Service Profile

- **Endpoint:** `POST /api/v2/self-service-profiles`
- **Request Body:**

```json
{
  "saml_mappings": [
    {
      "name": "mapping0-1719998496750",
      "description": "This is a mapping",
      "is_optional": true
    }
  ],
  "oidc_scopes": ["sub", "profile"],
  "branding": {
    "logo_url": "https://example.com/logo.png",
    "colors": {
      "primary": "#334455"
    }
  }
}
```

- **Response:**

```json
{
  "id": "selfsso_mK2CVe4NJ1cr6wa9c2vDGL",
  "saml_mappings": [
    {
      "name": "mapping0-1719998496750",
      "description": "This is a mapping",
      "is_optional": true
    }
  ],
  "oidc_scopes": ["sub", "profile"],
  "created_at": "2024-07-03T07:21:36.799Z",
  "updated_at": "2024-07-03T07:21:36.799Z",
  "branding": {
    "logo_url": "https://example.com/logo.png",
    "colors": {
      "primary": "#334455"
    }
  }
}
```

- **Curl Command:**

```bash
curl -X POST \
    https://your-tenant.auth0.com/api/v2/self-service-profiles \
    -H 'Content-Type: application/json' \
    -d '{
                "name": "My Self Service Profile",
                "description": "This is my self service profile",
                "user_attributes": [
                    {
                        "name": "attribute1",
                        "description": "This is attribute 1",
                        "is_optional": true
                    }
                ],
                "branding": {
                    "logo_url": "https://example.com/logo.png",
                    "colors": {
                        "primary": "#334455"
                    }
                },
                "allowed_strategies": ["oidc", "samlp"]
            }'
```

- **TS Snippet:**

```typescript
const profileData: SsProfileCreate = {
  name: 'My Self Service Profile',
  description: 'This is my self service profile',
  user_attributes: [
    {
      name: 'attribute1',
      description: 'This is attribute 1',
      is_optional: true,
    },
  ],
  branding: {
    logo_url: 'https://example.com/logo.png',
    colors: {
      primary: '#334455',
    },
  },
  allowed_strategies: [
    SsProfileCreateAllowedStrategiesEnum.oidc,
    SsProfileCreateAllowedStrategiesEnum.samlp,
  ],
};

const response = await selfServiceProfileApi.create(profileData);
```

### 2. Get a Self Service Profile by ID

- **Endpoint:** `GET /api/v2/self-service-profiles/{id}`
- **Path Parameters:**

  - `id`: The ID of the Self Service Profile to retrieve.

- **Response:**

```json
{
  "id": "selfsso_mK2CVe4NJ1cr6wa9c2vDGL",
  "saml_mappings": [
    {
      "name": "mapping0-1719998496750",
      "description": "This is a mapping",
      "is_optional": true
    }
  ],
  "oidc_scopes": ["sub", "profile"],
  "created_at": "2024-07-03T07:21:36.799Z",
  "updated_at": "2024-07-03T07:21:36.799Z",
  "branding": {
    "logo_url": "https://example.com/logo.png",
    "colors": {
      "primary": "#334455"
    }
  }
}
```

- **Curl Command:**

```bash
curl -X GET \
    https://your-tenant.auth0.com/api/v2/self-service-profiles/{id} \
    -H 'Content-Type: application/json'
```

- **TS Snippet:**

```typescript
const id = 'profile-id';
const response = await selfServiceProfileApi.get({ id });
```

### 3. Update a Self Service Profile

- **Endpoint:** `PATCH /api/v2/self-service-profiles/{id}`
- **Path Parameters:**

  - `id`: The ID of the Self Service Profile to update.

- **Request Body:**

```json
{
  "saml_mappings": [
    {
      "name": "mapping0-1719998496750",
      "description": "This is a mapping",
      "is_optional": true
    }
  ],
  "oidc_scopes": ["sub", "profile"],
  "branding": {
    "logo_url": "https://example.com/logo.png",
    "colors": {
      "primary": "#334455"
    }
  }
}
```

- **Response:**

```json
{
  "id": "selfsso_mK2CVe4NJ1cr6wa9c2vDGL",
  "saml_mappings": [
    {
      "name": "mapping0-1719998496750",
      "description": "This is a mapping",
      "is_optional": true
    }
  ],
  "oidc_scopes": ["sub", "profile"],
  "created_at": "2024-07-03T07:21:36.799Z",
  "updated_at": "2024-07-03T07:23:15.040Z",
  "branding": {
    "logo_url": "https://example.com/logo.png",
    "colors": {
      "primary": "#334455"
    }
  }
}
```

- **Curl Command:**

```bash
curl -X PATCH \
    https://your-tenant.auth0.com/api/v2/self-service-profiles/{id} \
    -H 'Content-Type: application/json' \
    -d '{
                "name": "My Updated Self Service Profile",
                "description": "This is my updated self service profile",
                "user_attributes": [
                    {
                        "name": "attribute1",
                        "description": "This is attribute 1",
                        "is_optional": true
                    }
                ],
                "branding": {
                    "logo_url": "https://example.com/logo.png",
                    "colors": {
                        "primary": "#334455"
                    }
                },
                "allowed_strategies": ["oidc", "samlp"]
            }'
```

- **TS Snippet:**

```typescript
const id = 'profile-id';
const updatedProfileData: SsProfileUpdate = {
  name: 'My Updated Self Service Profile',
  description: 'This is my updated self service profile',
  user_attributes: [
    {
      name: 'attribute1',
      description: 'This is attribute 1',
      is_optional: true,
    },
  ],
  branding: {
    logo_url: 'https://example.com/logo.png',
    colors: {
      primary: '#334455',
    },
  },
  allowed_strategies: ['oidc', 'samlp'],
};

const response = await selfServiceProfileApi.update({ id }, updatedProfileData);
```

### 4. Get Custom Text for a Self Service Profile

- **Curl Command:**

```bash
curl -X GET \
    https://your-tenant.auth0.com/api/v2/self-service-profiles/{id}/custom-text \
    -H 'Content-Type: application/json'
```

- **TS Snippet:**

```typescript
const id = 'profile-id';
const response = await selfServiceProfileApi.getCustomText({ id });
```

### 5. Update Custom Text for a Self Service Profile

- **Curl Command:**

```bash
curl -X PUT \
    https://your-tenant.auth0.com/api/v2/self-service-profiles/{id}/custom-text \
    -H 'Content-Type: application/json' \
    -d '{
                "key": "value"
            }'
```

- **TS Snippet:**

```typescript
const id = 'profile-id';
const customTextData = { key: 'value' };

const response = await selfServiceProfileApi.updateCustomText({ id }, customTextData);
```

### 6. Create an SSO Access Ticket

- **Endpoint:** `POST /api/v2/tickets/sso-access`
- **Request Body:**

```json
{
  "sso_profile_id": "selfsso_mK2CVe4NJ1cr6wa9c2vDGL",
  "connection_config": {
    "name": "sso-generated-SAML-customer-12"
  },
  "clients_to_enable": ["clientId1", "clientId2"],
  "organizations_to_enable": ["org_id1", "org_id2"]
}
```

- **Response:**

```json
{
  "ticket": "https://{domain}/self-service/connections-flow?ticket={id}"
}
```

- **Curl Command:**

```bash
curl -X POST \
    https://your-tenant.auth0.com/api/v2/tickets/sso-access \
    -H 'Content-Type: application/json' \
    -d '{
                "sso_profile_id": "{sso_profile_id}",
                "connection_config": {
                    "name": "sso-generated-SAML-customer-12"
                },
                "clients_to_enable": ["clientId1", "clientId2"],
                "organizations_to_enable": ["org_id1", "org_id2"]
            }'
```

- **TS Snippet:**

```typescript
const ssoProfileId = 'sso-profile-id';
const ticketRequestData: SsoTicketRequestJson = {
  sso_profile_id: ssoProfileId,
  connection_config: {
    name: 'sso-generated-SAML-customer-12',
  },
  enabled_clients: ['clientId1', 'clientId2'],
  enabled_organizations: [
    {
      organization_id: 'org_id1',
    },
    {
      organization_id: 'org_id2',
    },
  ],
};

const response = await selfServiceProfileApi.createSsoTicket({}, ticketRequestData);
```

### 7. Revoke an SSO Access Ticket

- **Curl Command:**

```bash
curl -X POST \
    https://your-tenant.auth0.com/api/v2/tickets/revoke \
    -H 'Content-Type: application/json' \
    -d '{
                "ticket": "{ticket_id}"
            }'
```

- **TS Snippet:**

```typescript
const ticketId = 'ticket-id';
const revokeRequestData: { ticket: string } = { ticket: ticketId };

const response = await selfServiceProfileApi.revokeSsoTicket(revokeRequestData);
```

### 8. Delete a Self Service Profile

- **Endpoint:** `DELETE /api/v2/self-service-profiles/{id}`
- **Path Parameters:**

  - `id`: The ID of the Self Service Profile to delete.

- **Curl Command:**

```bash
curl -X DELETE \
    https://your-tenant.auth0.com/api/v2/self-service-profiles/{id} \
    -H 'Content-Type: application/json'
```

- **TS Snippet:**

```typescript
const id = 'profile-id';
const response = await selfServiceProfileApi.delete({ id });
```
