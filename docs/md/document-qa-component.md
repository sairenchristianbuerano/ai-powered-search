# Document QA Component

Answers questions about uploaded documents using a RAG pipeline. Combines document loading, chunking, embedding, retrieval, and LLM answer generation in a single component.

## Overview

The Document QA component is an all-in-one solution for question answering over documents. Upload a document, ask a question, and get an answer with source citations. Under the hood, it orchestrates text extraction, chunking, embedding, vector search, and LLM generation.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `document` | `file` | Yes | The document to query (PDF, DOCX, TXT, MD, CSV) |
| `question` | `string` | Yes | The question to answer |
| `model` | `string` | No | LLM model for answer generation (default: `claude-sonnet-4-20250514`) |
| `api_key` | `secret` | Yes | API key for the LLM provider |
| `chunk_size` | `int` | No | Document chunk size (default: 500) |
| `top_k` | `int` | No | Number of chunks to retrieve (default: 5) |
| `include_sources` | `bool` | No | Include source citations in the answer (default: `true`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `answer` | `string` | The generated answer |
| `sources` | `list[dict]` | Source chunks used, with page numbers and text excerpts |
| `confidence` | `float` | Estimated answer confidence (0.0 to 1.0) |
| `chunks_retrieved` | `int` | Number of relevant chunks found |

## Usage Example

```python
from custom_components import DocumentQAComponent

qa = DocumentQAComponent()
result = qa.run(
    document="reports/quarterly-report.pdf",
    question="What was the revenue growth in Q3?",
    model="claude-sonnet-4-20250514",
    api_key="sk-ant-...",
    top_k=5
)
print(result.answer)
for source in result.sources:
    print(f"  Page {source['page']}: {source['text'][:100]}...")
```

## How It Works Internally

1. **Load** — Extracts text from the uploaded document based on file type
2. **Chunk** — Splits text into overlapping chunks of `chunk_size` characters
3. **Embed** — Generates embeddings for all chunks using a local model
4. **Retrieve** — Finds the top-K most similar chunks to the question
5. **Generate** — Sends retrieved chunks + question to the LLM for answer synthesis

## Common Use Cases

- Quick Q&A over uploaded PDFs without building a full pipeline
- Customer-facing document search interfaces
- Internal knowledge base querying
- Research paper analysis and fact extraction
