# Data Transformer Component

Transforms data between formats and structures. Converts, maps, filters, and reshapes data as it flows between components.

## Overview

The Data Transformer applies transformation operations to input data including field mapping, type conversion, filtering, sorting, and custom Python expressions. It acts as the glue between components that produce different data shapes.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `any` | Yes | Input data to transform |
| `operations` | `list[dict]` | Yes | List of transformation operations to apply in order |
| `error_handling` | `dropdown` | No | On error: `skip`, `fail`, `default_value` (default: `skip`) |

## Supported Operations

| Operation | Description |
|-----------|-------------|
| `map_fields` | Rename or restructure fields: `{"from": "old_name", "to": "new_name"}` |
| `filter` | Keep only records matching a condition: `{"field": "age", "operator": "gt", "value": 18}` |
| `sort` | Sort records: `{"field": "score", "order": "desc"}` |
| `convert_type` | Type conversion: `{"field": "price", "to": "float"}` |
| `add_field` | Add computed field: `{"name": "full_name", "expression": "first_name + ' ' + last_name"}` |
| `remove_fields` | Drop fields: `{"fields": ["internal_id", "temp_flag"]}` |
| `flatten` | Flatten nested objects to a single level |
| `group_by` | Group records by a field with aggregation |

## Usage Example

```python
from custom_components import DataTransformerComponent

transformer = DataTransformerComponent()
result = transformer.run(
    data=[
        {"first_name": "Alice", "last_name": "Smith", "age": 30, "score": 0.95},
        {"first_name": "Bob", "last_name": "Jones", "age": 17, "score": 0.72},
    ],
    operations=[
        {"type": "filter", "field": "age", "operator": "gte", "value": 18},
        {"type": "add_field", "name": "full_name", "expression": "first_name + ' ' + last_name"},
        {"type": "remove_fields", "fields": ["first_name", "last_name"]},
    ]
)
# result: [{"age": 30, "score": 0.95, "full_name": "Alice Smith"}]
```

## Common Use Cases

- Reshaping API responses to match downstream component expectations
- Filtering and ranking retrieval results before LLM processing
- Converting database query results into LLM-friendly text formats
- Preparing data for visualization or export
