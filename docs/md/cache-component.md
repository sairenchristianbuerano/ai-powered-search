# Cache Component

Caches component outputs to avoid redundant computation. Speeds up flows by reusing previous results for identical inputs.

## Overview

The Cache component stores and retrieves results based on input keys. When the same input is seen again, it returns the cached result instead of recomputing. Supports TTL (time-to-live), multiple backends, and cache invalidation.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | Cache key (typically derived from the input data) |
| `value` | `any` | No | Value to cache (omit to only read) |
| `action` | `dropdown` | No | Operation: `get_or_set`, `get`, `set`, `delete`, `clear` (default: `get_or_set`) |
| `ttl_seconds` | `int` | No | Time-to-live in seconds (default: 3600) |
| `backend` | `dropdown` | No | Storage: `in_memory`, `redis`, `file`, `sqlite` (default: `in_memory`) |
| `namespace` | `string` | No | Cache namespace for grouping related entries |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `value` | `any` | The cached or computed value |
| `cache_hit` | `bool` | Whether the value was served from cache |
| `age_seconds` | `int` | Age of the cached value in seconds |

## Usage Example

```python
from custom_components import CacheComponent

cache = CacheComponent()

# Check cache first, compute if miss
result = cache.run(
    key=f"embedding:{hash(text)}",
    action="get"
)

if not result.cache_hit:
    embedding = compute_embedding(text)
    cache.run(key=f"embedding:{hash(text)}", value=embedding, action="set", ttl_seconds=86400)
```

## Common Use Cases

- Caching LLM responses for frequently asked questions
- Storing computed embeddings to avoid reprocessing unchanged documents
- Caching API responses to reduce external API calls and costs
- Speeding up iterative development by caching intermediate results
