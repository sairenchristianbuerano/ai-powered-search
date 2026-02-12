# Rate Limiter Component

Controls the rate of requests or operations in a flow. Prevents exceeding API rate limits and manages throughput for batch processing.

## Overview

The Rate Limiter throttles operations to stay within defined rate limits. It queues excess requests and releases them at the configured rate, ensuring smooth flow execution without hitting provider-imposed limits.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `input_data` | `any` | Yes | Data to pass through (unchanged) |
| `requests_per_minute` | `int` | No | Maximum operations per minute (default: 60) |
| `requests_per_second` | `int` | No | Maximum operations per second (overrides per-minute if set) |
| `burst_size` | `int` | No | Allow short bursts above the limit (default: 1) |
| `strategy` | `dropdown` | No | Limiting strategy: `fixed_window`, `sliding_window`, `token_bucket` (default: `token_bucket`) |
| `queue_timeout` | `int` | No | Maximum seconds to wait in queue before failing (default: 300) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `output_data` | `any` | The input data passed through unchanged |
| `wait_time_ms` | `int` | Time spent waiting in the rate limiter queue |
| `queue_position` | `int` | Position in queue when the request was queued |

## Usage Example

```python
from custom_components import RateLimiterComponent

limiter = RateLimiterComponent()

# Process 1000 items at max 20 per second
for item in items:
    result = limiter.run(
        input_data=item,
        requests_per_second=20,
        strategy="token_bucket"
    )
    process(result.output_data)
```

## Common Use Cases

- Throttling OpenAI API calls to stay within tier limits
- Controlling batch embedding generation speed
- Managing concurrent web scraping requests
- Preventing database overload during bulk operations
