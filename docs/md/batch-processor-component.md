# Batch Processor Component

Processes lists of items through a sub-flow in parallel or sequentially. Enables batch operations like embedding multiple documents, analyzing multiple texts, or calling APIs for each record.

## Overview

The Batch Processor iterates over a list of input items and runs each through a connected sub-flow. It supports parallel execution with configurable concurrency, progress tracking, and error handling per item.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `list[any]` | Yes | List of items to process |
| `concurrency` | `int` | No | Maximum parallel executions (default: 5) |
| `error_handling` | `dropdown` | No | On item error: `skip`, `fail_all`, `retry` (default: `skip`) |
| `max_retries` | `int` | No | Retry attempts per failed item (default: 2) |
| `progress_callback` | `bool` | No | Emit progress events (default: `true`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `results` | `list[any]` | Results from each item processed |
| `succeeded` | `int` | Number of successfully processed items |
| `failed` | `int` | Number of failed items |
| `errors` | `list[dict]` | Error details for failed items |
| `duration_ms` | `int` | Total processing time in milliseconds |

## Usage Example

```python
from custom_components import BatchProcessorComponent

batch = BatchProcessorComponent()
result = batch.run(
    items=["doc1.pdf", "doc2.pdf", "doc3.pdf"],
    concurrency=3,
    error_handling="skip"
)
print(f"Processed {result.succeeded}/{len(items)} successfully in {result.duration_ms}ms")
```

## Common Use Cases

- Embedding hundreds of document chunks in parallel
- Batch-processing customer records through an AI classification pipeline
- Running sentiment analysis on a list of reviews
- Generating summaries for multiple documents concurrently
