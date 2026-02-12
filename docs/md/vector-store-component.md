# Vector Store Component

Stores and retrieves vector embeddings for semantic search. Acts as the memory layer in RAG pipelines, enabling fast similarity-based document retrieval.

## Overview

The Vector Store component provides a unified interface for storing document embeddings and performing similarity searches. It supports multiple backends including ChromaDB, Pinecone, Weaviate, and a built-in local JSON store.

## Inputs

### For Storing

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `embeddings` | `list[list[float]]` | Yes | Vector embeddings to store |
| `documents` | `list[string]` | Yes | The original text documents corresponding to each embedding |
| `metadata` | `list[dict]` | No | Metadata for each document (source, title, etc.) |
| `ids` | `list[string]` | No | Unique IDs for each document (auto-generated if not provided) |
| `collection_name` | `string` | No | Name of the collection to store in (default: `"default"`) |

### For Searching

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query_embedding` | `list[float]` | Yes | The query vector to search with |
| `top_k` | `int` | No | Number of results to return (default: 5) |
| `score_threshold` | `float` | No | Minimum similarity score to include (default: 0.0) |
| `filter` | `dict` | No | Metadata filter for narrowing results |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `results` | `list[dict]` | Search results with document text, score, and metadata |
| `documents` | `list[string]` | Just the document texts from results |
| `scores` | `list[float]` | Similarity scores for each result |

## Backend Configuration

### ChromaDB (Default)
```python
config = {
    "backend": "chroma",
    "persist_directory": "./data/chroma",
    "collection_name": "my_docs"
}
```

### Pinecone
```python
config = {
    "backend": "pinecone",
    "api_key": "your-pinecone-key",
    "index_name": "my-index",
    "environment": "us-east-1"
}
```

## Usage Example

```python
from custom_components import VectorStoreComponent

store = VectorStoreComponent(backend="chroma")

# Store documents
store.store(
    embeddings=[[0.1, 0.2, ...], [0.3, 0.4, ...]],
    documents=["Doc 1 text", "Doc 2 text"],
    metadata=[{"source": "file1.md"}, {"source": "file2.md"}]
)

# Search
results = store.search(
    query_embedding=[0.15, 0.25, ...],
    top_k=3
)
```

## Common Use Cases

- Storing document chunk embeddings for RAG retrieval
- Building a semantic search index for knowledge bases
- Caching embeddings to avoid recomputation
- Implementing memory for conversational agents
