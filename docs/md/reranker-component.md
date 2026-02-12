# Reranker Component

Re-ranks search results using a cross-encoder model for improved relevance. Refines initial retrieval results by scoring each document against the query with higher accuracy.

## Overview

The Reranker takes an initial set of search results (from vector search or keyword search) and re-scores them using a cross-encoder model. Cross-encoders jointly process the query and document together, producing more accurate relevance scores than the initial embedding-based retrieval.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | Yes | The search query |
| `documents` | `list[string]` | Yes | Documents to re-rank |
| `model` | `string` | No | Reranker model: `cross-encoder/ms-marco-MiniLM-L-6-v2`, `BAAI/bge-reranker-base`, `cohere-rerank` (default: `cross-encoder/ms-marco-MiniLM-L-6-v2`) |
| `top_k` | `int` | No | Number of top results to return (default: 5) |
| `score_threshold` | `float` | No | Minimum score to include (default: 0.0) |
| `api_key` | `secret` | No | API key (for Cohere reranker) |
| `return_scores` | `bool` | No | Include relevance scores in output (default: `true`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `documents` | `list[string]` | Re-ranked documents (most relevant first) |
| `scores` | `list[float]` | Relevance scores for each document |
| `indices` | `list[int]` | Original indices of the re-ranked documents |

## How It Differs from Vector Search

| Approach | Speed | Accuracy | How It Works |
|----------|-------|----------|-------------|
| Vector Search | Fast | Good | Compares pre-computed query and document embeddings independently |
| Reranker | Slower | Better | Processes query + document together through a cross-encoder |

The typical pattern is: **vector search (fast, broad)** → **reranker (slower, precise)**.

## Usage Example

```python
from custom_components import RerankerComponent

reranker = RerankerComponent()

# Initial retrieval returned 20 results, now re-rank for top 5
result = reranker.run(
    query="How to configure authentication?",
    documents=initial_search_results,  # 20 documents
    model="cross-encoder/ms-marco-MiniLM-L-6-v2",
    top_k=5
)

for doc, score in zip(result.documents, result.scores):
    print(f"[{score:.3f}] {doc[:100]}...")
```

## Common Use Cases

- Improving RAG pipeline accuracy by re-ranking retrieved chunks
- Two-stage retrieval: fast vector search followed by precise reranking
- Boosting search result quality for user-facing search interfaces
- Filtering out irrelevant results that passed initial vector similarity threshold
