# Webhook Trigger Component

Starts a flow when an external webhook is received. Acts as an entry point for event-driven automation pipelines.

## Overview

The Webhook Trigger creates an HTTP endpoint that listens for incoming requests. When a request arrives, it extracts the payload and triggers the connected flow. Supports payload validation, authentication, and request filtering.

## Inputs (Configuration)

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | URL path for the webhook (e.g., `/hooks/my-trigger`) |
| `method` | `dropdown` | No | Accepted HTTP method: `POST`, `PUT`, `GET`, `ANY` (default: `POST`) |
| `auth_type` | `dropdown` | No | Authentication: `none`, `header_token`, `hmac_signature`, `basic` (default: `none`) |
| `auth_secret` | `secret` | No | Secret for authentication verification |
| `payload_schema` | `dict` | No | JSON Schema to validate incoming payloads |
| `response_mode` | `dropdown` | No | When to respond: `immediate` (200 OK right away), `after_flow` (respond with flow result) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `body` | `dict` | The request body/payload |
| `headers` | `dict` | Request headers |
| `query_params` | `dict` | URL query parameters |
| `method` | `string` | The HTTP method used |
| `source_ip` | `string` | IP address of the caller |

## Usage Example

Configure the webhook trigger with path `/hooks/new-document`, then send a POST request:

```bash
curl -X POST https://your-flow-server.com/hooks/new-document \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: your-secret" \
  -d '{"document_url": "https://example.com/report.pdf", "notify": true}'
```

The flow receives the payload and processes the document automatically.

## Security

- Always use authentication in production to prevent unauthorized triggers.
- HMAC signature verification is recommended for webhooks from known providers (GitHub, Stripe, etc.).
- Rate limiting is applied automatically (100 requests per minute per endpoint).

## Common Use Cases

- Triggering document processing when files are uploaded to cloud storage
- Starting AI analysis when new support tickets are created
- Processing form submissions through an AI pipeline
- Integrating with CI/CD systems for automated code review
