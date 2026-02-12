# CSV Loader Component

Loads and parses CSV files into structured data for processing in your flow. Supports filtering, column selection, and automatic type detection.

## Overview

The CSV Loader component reads CSV files from a file path or uploaded file and converts them into a list of records. It handles various CSV formats including custom delimiters, quoting styles, and encoding types.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file_path` | `file` | Yes | Path to the CSV file or uploaded file |
| `delimiter` | `string` | No | Column delimiter character (default: `,`) |
| `encoding` | `dropdown` | No | File encoding: `utf-8`, `latin-1`, `ascii`, `utf-16` (default: `utf-8`) |
| `has_header` | `bool` | No | Whether the first row contains column names (default: `true`) |
| `columns` | `list[string]` | No | Specific columns to load (default: all columns) |
| `max_rows` | `int` | No | Maximum number of rows to load (default: no limit) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `records` | `list[dict]` | List of records as dictionaries |
| `columns` | `list[string]` | Column names detected or provided |
| `row_count` | `int` | Total number of rows loaded |
| `text` | `string` | All records concatenated as text (for LLM processing) |

## Usage Example

```python
from custom_components import CSVLoaderComponent

loader = CSVLoaderComponent()
result = loader.run(
    file_path="data/customers.csv",
    columns=["name", "email", "plan"],
    max_rows=1000
)
print(f"Loaded {result.row_count} records with columns: {result.columns}")
```

## Error Handling

- Malformed rows are skipped with a warning logged.
- Missing columns specified in the `columns` input raise a validation error.
- Files exceeding 100MB trigger a warning suggesting pagination.

## Common Use Cases

- Loading customer data for personalized prompt generation
- Importing FAQ datasets for knowledge base population
- Processing training data for fine-tuning pipelines
- Bulk loading metadata for document annotation
