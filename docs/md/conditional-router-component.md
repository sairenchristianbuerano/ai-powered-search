# Conditional Router Component

Routes data to different outputs based on conditional logic. Enables branching flows where different paths execute depending on input values.

## Overview

The Conditional Router evaluates one or more conditions against the input data and routes the output to the matching branch. It supports comparison operators, regex matching, and custom Python expressions.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `input_value` | `any` | Yes | The value to evaluate conditions against |
| `conditions` | `list[dict]` | Yes | List of conditions, each with `operator`, `value`, and `output_name` |
| `default_output` | `string` | No | Output name for when no conditions match (default: `"default"`) |
| `match_mode` | `dropdown` | No | Matching mode: `first_match`, `all_matches` (default: `first_match`) |

## Condition Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `equals` | Exact match | `value == "active"` |
| `not_equals` | Not equal | `value != "deleted"` |
| `contains` | Substring match | `"error" in value` |
| `greater_than` | Numeric comparison | `value > 0.8` |
| `less_than` | Numeric comparison | `value < 100` |
| `regex` | Pattern match | `value matches "^usr_"` |
| `is_empty` | Check if null/empty | `value is None or value == ""` |
| `expression` | Custom Python expression | `len(value) > 10 and value.startswith("sk-")` |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `matched_output` | `string` | Name of the matched output branch |
| `input_value` | `any` | The original input value (passed through) |
| `matched_condition` | `dict` | The condition that matched |

## Usage Example

```python
from custom_components import ConditionalRouterComponent

router = ConditionalRouterComponent()
result = router.run(
    input_value=0.92,
    conditions=[
        {"operator": "greater_than", "value": 0.9, "output_name": "high_confidence"},
        {"operator": "greater_than", "value": 0.7, "output_name": "medium_confidence"},
    ],
    default_output="low_confidence"
)
# result.matched_output: "high_confidence"
```

## Common Use Cases

- Routing high-confidence vs low-confidence retrieval results to different processing paths
- Branching based on user intent classification results
- Handling error vs success responses from API calls
- Directing different content types to specialized processing components
