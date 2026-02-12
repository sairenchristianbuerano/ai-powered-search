# Text Combiner Component

Merges multiple text inputs into a single output string. Used to concatenate context, combine results, or assemble multi-part prompts.

## Overview

The Text Combiner takes a list of text strings and joins them with a configurable separator. It can optionally add prefixes, suffixes, and numbering to each input for structured output.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `texts` | `list[string]` | Yes | List of text strings to combine |
| `separator` | `string` | No | String to place between each text (default: `"\n\n"`) |
| `prefix` | `string` | No | String to prepend to the final output |
| `suffix` | `string` | No | String to append to the final output |
| `numbered` | `bool` | No | Add numbering to each text (default: `false`) |
| `filter_empty` | `bool` | No | Remove empty strings before combining (default: `true`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `combined_text` | `string` | The merged text output |
| `input_count` | `int` | Number of text inputs that were combined |
| `character_count` | `int` | Total character count of the output |

## Usage Example

```python
from custom_components import TextCombinerComponent

combiner = TextCombinerComponent()
result = combiner.run(
    texts=["Context from doc 1", "Context from doc 2", "Context from doc 3"],
    separator="\n---\n",
    prefix="Relevant documents:\n",
    numbered=True
)
# Output:
# Relevant documents:
# 1. Context from doc 1
# ---
# 2. Context from doc 2
# ---
# 3. Context from doc 3
```

## Common Use Cases

- Combining retrieved document chunks into a single context for LLM input
- Merging outputs from parallel processing branches
- Assembling multi-section reports from individual components
- Building formatted prompts from multiple dynamic parts
