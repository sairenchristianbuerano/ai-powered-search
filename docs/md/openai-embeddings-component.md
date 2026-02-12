# OpenAI Embeddings Component

Generates vector embeddings from text using OpenAI's embedding models. These embeddings are used for semantic search, similarity matching, and retrieval in RAG pipelines.

## Overview

This component takes text input and returns a vector embedding using the OpenAI Embeddings API. It supports batch processing for multiple texts and handles rate limiting automatically with exponential backoff.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` or `list[string]` | Yes | The text(s) to embed |
| `model` | `dropdown` | No | Embedding model: `text-embedding-3-small`, `text-embedding-3-large`, `text-embedding-ada-002` (default: `text-embedding-3-small`) |
| `api_key` | `secret` | Yes | Your OpenAI API key |
| `dimensions` | `int` | No | Output vector dimensions (only for `text-embedding-3-*` models) |
| `batch_size` | `int` | No | Number of texts to embed per API call (default: 100, max: 2048) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `embeddings` | `list[list[float]]` | The generated embedding vectors |
| `token_count` | `int` | Total tokens consumed |
| `model_used` | `string` | The model that was used for generation |

## Model Comparison

| Model | Dimensions | Performance | Cost |
|-------|-----------|-------------|------|
| `text-embedding-3-small` | 1536 (configurable) | Good | Lowest |
| `text-embedding-3-large` | 3072 (configurable) | Best | Medium |
| `text-embedding-ada-002` | 1536 (fixed) | Good | Medium |

## Usage Example

```python
from custom_components import OpenAIEmbeddingsComponent

embedder = OpenAIEmbeddingsComponent()
result = embedder.run(
    text=["Hello world", "How are you?"],
    model="text-embedding-3-small",
    api_key="sk-..."
)
print(f"Generated {len(result.embeddings)} embeddings of dimension {len(result.embeddings[0])}")
```

## Rate Limiting

The component automatically handles rate limits by implementing exponential backoff with jitter. If you encounter persistent rate limit errors, reduce the `batch_size` or add delays between calls.

## Common Use Cases

- Generating embeddings for document chunks before storing in a vector database
- Creating query embeddings for semantic search retrieval
- Building similarity matrices for clustering or deduplication
- Embedding user queries for intent classification
