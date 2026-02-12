# S3 Loader Component

Loads files from Amazon S3 buckets. Downloads and reads documents, data files, and media from S3 for processing in your flow.

## Overview

The S3 Loader connects to AWS S3 and retrieves files by key, prefix, or pattern. It supports automatic format detection, batch downloading, and streaming large files.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucket` | `string` | Yes | S3 bucket name |
| `key` | `string` | No | Specific object key to download |
| `prefix` | `string` | No | Key prefix to list and download multiple files |
| `file_filter` | `string` | No | Glob pattern to filter files (e.g., `*.pdf`, `docs/*.md`) |
| `aws_access_key` | `secret` | Yes | AWS Access Key ID |
| `aws_secret_key` | `secret` | Yes | AWS Secret Access Key |
| `region` | `string` | No | AWS region (default: `us-east-1`) |
| `max_files` | `int` | No | Maximum files to download (default: 100) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `files` | `list[dict]` | Downloaded files with path, content, and metadata |
| `content` | `string` | Combined text content (for text files) |
| `file_count` | `int` | Number of files downloaded |
| `total_size_bytes` | `int` | Total download size |

## Usage Example

```python
from custom_components import S3LoaderComponent

loader = S3LoaderComponent()
result = loader.run(
    bucket="my-docs-bucket",
    prefix="knowledge-base/",
    file_filter="*.md",
    aws_access_key="AKIA...",
    aws_secret_key="...",
    region="us-west-2"
)
print(f"Downloaded {result.file_count} files ({result.total_size_bytes} bytes)")
```

## Common Use Cases

- Loading documents from S3 for knowledge base ingestion
- Fetching training data stored in cloud storage
- Processing uploaded files from an S3-backed application
- Batch downloading logs or reports for AI analysis
