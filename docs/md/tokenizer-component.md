# Tokenizer Component

Counts, encodes, and decodes tokens for LLM context management. Helps estimate costs, check context window limits, and split text at token boundaries.

## Overview

The Tokenizer component provides token-level operations for text. It counts tokens accurately for specific models, encodes text into token IDs, decodes tokens back to text, and truncates text to fit within token limits.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | Input text to tokenize |
| `model` | `string` | No | Model to use for tokenization (default: `cl100k_base` for GPT-4/Claude) |
| `action` | `dropdown` | No | Operation: `count`, `encode`, `decode`, `truncate` (default: `count`) |
| `max_tokens` | `int` | No | Token limit for truncation |
| `truncation_side` | `dropdown` | No | Where to truncate: `end`, `start`, `middle` (default: `end`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `token_count` | `int` | Number of tokens in the text |
| `tokens` | `list[int]` | Token IDs (for `encode` action) |
| `text` | `string` | Decoded or truncated text |
| `is_truncated` | `bool` | Whether the text was truncated |

## Usage Example

```python
from custom_components import TokenizerComponent

tokenizer = TokenizerComponent()

# Count tokens
result = tokenizer.run(text="Hello, how are you?", action="count")
print(f"Token count: {result.token_count}")

# Truncate to fit context window
result = tokenizer.run(
    text=very_long_document,
    action="truncate",
    max_tokens=4000,
    truncation_side="end"
)
print(f"Truncated: {result.is_truncated}, tokens: {result.token_count}")
```

## Common Use Cases

- Checking if context fits within LLM token limits before sending
- Estimating API costs based on token counts
- Splitting text at token boundaries for accurate chunking
- Truncating long documents to fit context windows
