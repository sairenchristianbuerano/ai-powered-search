# Output Parser Component

Parses and validates LLM output into structured formats. Converts free-text responses into JSON, lists, or typed objects based on defined schemas.

## Overview

The Output Parser enforces structure on LLM outputs by parsing them into defined formats. It supports JSON extraction, list parsing, key-value pair extraction, and custom schema validation. Failed parses can trigger automatic retry with corrective prompts.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | Raw LLM output text to parse |
| `format` | `dropdown` | Yes | Expected format: `json`, `list`, `key_value`, `boolean`, `number`, `custom` |
| `schema` | `dict` | No | JSON Schema for validation (used with `json` and `custom` formats) |
| `retry_on_fail` | `bool` | No | Attempt to auto-fix malformed output (default: `true`) |
| `retry_prompt` | `string` | No | Custom prompt for retry correction |
| `strict` | `bool` | No | Reject output that doesn't match schema exactly (default: `false`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `parsed` | `any` | The parsed structured output |
| `is_valid` | `bool` | Whether the output matched the expected format |
| `errors` | `list[string]` | Parsing or validation errors |
| `raw_text` | `string` | The original input text |

## Usage Example

```python
from custom_components import OutputParserComponent

parser = OutputParserComponent()
result = parser.run(
    text='The sentiment is positive with a score of 0.85. Key topics: AI, machine learning, Python.',
    format="json",
    schema={
        "type": "object",
        "properties": {
            "sentiment": {"type": "string"},
            "score": {"type": "number"},
            "topics": {"type": "array", "items": {"type": "string"}}
        }
    }
)
# result.parsed: {"sentiment": "positive", "score": 0.85, "topics": ["AI", "machine learning", "Python"]}
```

## Auto-Retry Behavior

When `retry_on_fail` is enabled and parsing fails, the component sends the raw output along with the error and schema back to the LLM, asking it to correct the format. This handles common issues like missing quotes, trailing commas, or markdown code fences around JSON.

## Common Use Cases

- Extracting structured data from LLM text responses
- Validating LLM output before storing in databases
- Converting natural language answers into API-compatible formats
- Enforcing consistent output format across different LLM providers
