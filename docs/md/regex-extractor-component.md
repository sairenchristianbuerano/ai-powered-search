# Regex Extractor Component

Extracts patterns from text using regular expressions. Useful for parsing structured data, extracting entities, or validating formats.

## Overview

The Regex Extractor applies one or more regular expression patterns to input text and returns all matches. It supports named capture groups, multi-match extraction, and replacement operations.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | The input text to search |
| `pattern` | `string` | Yes | Regular expression pattern |
| `flags` | `list[string]` | No | Regex flags: `ignorecase`, `multiline`, `dotall` |
| `group` | `int` or `string` | No | Capture group to return (0 for full match, name for named group) |
| `mode` | `dropdown` | No | Operation mode: `extract`, `extract_all`, `replace`, `split` (default: `extract_all`) |
| `replacement` | `string` | No | Replacement string (only for `replace` mode) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `matches` | `list[string]` | All matches found |
| `groups` | `list[dict]` | Named capture groups for each match |
| `count` | `int` | Number of matches found |
| `result` | `string` | Modified text (for `replace` mode) or original text |

## Pattern Examples

| Pattern | Extracts |
|---------|----------|
| `\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b` | Email addresses |
| `\b\d{3}[-.]?\d{3}[-.]?\d{4}\b` | Phone numbers |
| `https?://[^\s]+` | URLs |
| `\$[\d,]+\.?\d*` | Currency amounts |
| `(?P<key>\w+)=(?P<value>[^&]+)` | Key-value pairs from query strings |

## Usage Example

```python
from custom_components import RegexExtractorComponent

extractor = RegexExtractorComponent()
result = extractor.run(
    text="Contact us at support@example.com or sales@example.com",
    pattern=r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b",
    flags=["ignorecase"]
)
# result.matches: ["support@example.com", "sales@example.com"]
```

## Common Use Cases

- Extracting emails, URLs, or phone numbers from LLM output
- Parsing structured data from unstructured text
- Validating output format before passing to downstream components
- Cleaning text by removing unwanted patterns
