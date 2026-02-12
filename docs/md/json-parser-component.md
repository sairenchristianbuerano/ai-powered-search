# JSON Parser Component

Parses, extracts, and transforms JSON data. Enables structured data manipulation within flows using JSONPath expressions or key-based access.

## Overview

The JSON Parser component takes raw JSON strings or objects and extracts specific fields using JSONPath queries. It can also validate JSON against schemas, flatten nested structures, and convert between formats.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `json_input` | `string` or `dict` | Yes | Raw JSON string or pre-parsed object |
| `jsonpath` | `string` | No | JSONPath expression to extract specific data (e.g., `$.data[*].name`) |
| `keys` | `list[string]` | No | Simple key path for extraction (e.g., `["data", "results", "0", "name"]`) |
| `flatten` | `bool` | No | Flatten nested JSON into a single level (default: `false`) |
| `schema` | `dict` | No | JSON Schema to validate against |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `result` | `any` | The extracted or transformed data |
| `is_valid` | `bool` | Whether the input matched the schema (if provided) |
| `errors` | `list[string]` | Validation errors (if schema provided) |
| `text` | `string` | String representation of the result |

## JSONPath Examples

| Expression | Description |
|-----------|-------------|
| `$.name` | Root-level `name` field |
| `$.data[*].title` | All `title` fields in the `data` array |
| `$.items[?(@.price > 10)]` | Items where price is greater than 10 |
| `$..email` | All `email` fields at any depth |

## Usage Example

```python
from custom_components import JSONParserComponent

parser = JSONParserComponent()
result = parser.run(
    json_input='{"users": [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]}',
    jsonpath="$.users[*].name"
)
# result.result: ["Alice", "Bob"]
```

## Common Use Cases

- Extracting fields from API responses before passing to LLM
- Validating structured LLM output against expected schemas
- Transforming webhook payloads into component-compatible formats
- Flattening nested data for CSV export or display
