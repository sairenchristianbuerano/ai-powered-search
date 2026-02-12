# API Reference

Complete reference for all available API endpoints and methods.

## Users API

### Create User

Create a new user in your project.

```
POST /api/users
```

**Request Body:**
- `email` (string, required): User's email address
- `name` (string, required): User's full name
- `role` (string, optional): User role, either `admin`, `editor`, or `viewer`. Default: `viewer`
- `metadata` (object, optional): Custom metadata key-value pairs

**Response:**
```json
{
  "id": "usr_abc123",
  "email": "john@example.com",
  "name": "John Doe",
  "role": "viewer",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### List Users

Retrieve a paginated list of users.

```
GET /api/users?page=1&limit=20
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)
- `role` (string): Filter by role
- `search` (string): Search by name or email

### Delete User

Delete a user by their ID.

```
DELETE /api/users/:id
```

This action is irreversible. All user data will be permanently removed after 30 days.

## Projects API

### Create Project

```
POST /api/projects
```

**Request Body:**
- `name` (string, required): Project name
- `description` (string, optional): Project description
- `region` (string, optional): Deployment region (`us`, `eu`, `asia`). Default: `us`

### Get Project

```
GET /api/projects/:id
```

Returns the full project details including usage statistics and billing information.

### Update Project Settings

```
PATCH /api/projects/:id/settings
```

**Request Body:**
- `name` (string): Updated project name
- `webhookUrl` (string): URL for webhook notifications
- `allowedOrigins` (string[]): CORS allowed origins
- `rateLimitPerMinute` (number): API rate limit (default: 60)

## Webhooks

Webhooks allow you to receive real-time notifications when events happen in your project.

### Supported Events

- `user.created`: A new user was created
- `user.deleted`: A user was deleted
- `project.updated`: Project settings were changed
- `usage.threshold`: Usage threshold was exceeded

### Webhook Payload

All webhook payloads follow this structure:

```json
{
  "event": "user.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": { ... },
  "projectId": "prj_xyz789"
}
```

### Verifying Webhooks

Each webhook request includes an `X-Signature` header. Verify it using your webhook secret:

```javascript
import { verifyWebhookSignature } from '@our-platform/sdk';

const isValid = verifyWebhookSignature(payload, signature, webhookSecret);
```

## Rate Limits

All API endpoints are rate-limited. The default limit is 60 requests per minute per API key.

Rate limit headers are included in every response:
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Unix timestamp when the window resets

When rate limited, the API returns a `429 Too Many Requests` response.
