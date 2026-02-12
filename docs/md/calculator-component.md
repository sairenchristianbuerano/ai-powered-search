# Calculator Component

A utility component that performs mathematical operations on numeric inputs. Useful for computing scores, aggregating values, or transforming numeric data within your flow.

## Overview

The Calculator component accepts two numeric inputs and an operation type, then outputs the computed result. It supports basic arithmetic as well as advanced operations like power, modulo, and percentage calculations.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value_a` | `float` | Yes | The first numeric operand |
| `value_b` | `float` | Yes | The second numeric operand |
| `operation` | `dropdown` | Yes | The math operation to perform: `add`, `subtract`, `multiply`, `divide`, `power`, `modulo`, `percentage` |
| `round_decimals` | `int` | No | Number of decimal places to round the result (default: no rounding) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `result` | `float` | The computed result of the operation |
| `expression` | `string` | A human-readable string showing the full expression (e.g., `"10 + 5 = 15"`) |

## Usage Example

```python
from custom_components import CalculatorComponent

calc = CalculatorComponent()
result = calc.run(value_a=100, value_b=15, operation="percentage")
# result: 15.0 (15% of 100)
```

## Error Handling

- Division by zero returns an error message instead of crashing the flow.
- Non-numeric inputs are rejected with a validation error.
- If `round_decimals` is negative, it is ignored.

## Common Use Cases

- Computing similarity score thresholds in retrieval pipelines
- Aggregating token counts across multiple LLM calls
- Calculating cost estimates based on token usage and pricing
- Normalizing values before passing to downstream components
