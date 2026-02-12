# API Request Component

Makes HTTP requests to external APIs and returns the response. A versatile integration component for connecting flows to any REST API endpoint.

## Overview

The API Request component sends HTTP requests (GET, POST, PUT, PATCH, DELETE) to any URL and returns the response body, headers, and status code. It supports authentication, custom headers, request bodies, and query parameters.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | `string` | Yes | The API endpoint URL |
| `method` | `dropdown` | No | HTTP method: `GET`, `POST`, `PUT`, `PATCH`, `DELETE` (default: `GET`) |
| `headers` | `dict` | No | Request headers (e.g., `{"Authorization": "Bearer token"}`) |
| `body` | `dict` or `string` | No | Request body (JSON object or raw string) |
| `query_params` | `dict` | No | URL query parameters |
| `timeout` | `int` | No | Request timeout in seconds (default: 30) |
| `auth_type` | `dropdown` | No | Authentication type: `none`, `bearer`, `basic`, `api_key` |
| `auth_value` | `secret` | No | Authentication credential |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `response_body` | `dict` or `string` | Parsed JSON response or raw text |
| `status_code` | `int` | HTTP response status code |
| `headers` | `dict` | Response headers |
| `is_success` | `bool` | Whether status code is 2xx |
| `elapsed_ms` | `int` | Request duration in milliseconds |

## Usage Example

```python
from custom_components import APIRequestComponent

api = APIRequestComponent()
result = api.run(
    url="https://api.example.com/users",
    method="POST",
    headers={"Content-Type": "application/json"},
    body={"name": "Alice", "email": "alice@example.com"},
    auth_type="bearer",
    auth_value="sk-your-token"
)
if result.is_success:
    print(f"Created user: {result.response_body['id']}")
```

## Error Handling

- Network errors return a descriptive error message without crashing the flow.
- Timeout errors are raised when the request exceeds the `timeout` value.
- Non-2xx responses are still returned — check `is_success` to handle errors.

## Common Use Cases

- Fetching data from third-party APIs for LLM context
- Sending processed results to webhooks or downstream services
- Integrating with CRM, ticketing, or notification systems
- Calling custom ML model endpoints for predictions
