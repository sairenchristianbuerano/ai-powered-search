# Text Splitter Component

Splits large text documents into smaller chunks for embedding, indexing, or processing. Essential for RAG pipelines where documents exceed the LLM context window.

## Overview

The Text Splitter component breaks down long-form text into smaller, overlapping chunks using configurable strategies. It preserves semantic boundaries where possible by splitting on paragraphs, sentences, or custom delimiters.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | The input text to split |
| `chunk_size` | `int` | Yes | Maximum number of characters per chunk (default: 1000) |
| `chunk_overlap` | `int` | No | Number of overlapping characters between chunks (default: 200) |
| `split_strategy` | `dropdown` | No | Splitting method: `recursive`, `sentence`, `paragraph`, `token`, `character` (default: `recursive`) |
| `separator` | `string` | No | Custom separator for splitting (only used with `character` strategy) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `chunks` | `list[string]` | List of text chunks |
| `chunk_count` | `int` | Total number of chunks generated |
| `metadata` | `list[dict]` | Metadata for each chunk including index, start/end positions |

## Splitting Strategies

### Recursive (Default)
Attempts to split on double newlines first, then single newlines, then sentences, then words. This produces the most semantically coherent chunks.

### Sentence
Splits on sentence boundaries using punctuation detection. Best for natural language text where sentence integrity matters.

### Paragraph
Splits on paragraph boundaries (double newlines). Produces larger chunks that preserve full paragraph context.

### Token
Splits based on token count rather than character count. More accurate for LLM context window management but requires a tokenizer.

## Usage Example

```python
from custom_components import TextSplitterComponent

splitter = TextSplitterComponent()
result = splitter.run(
    text=long_document,
    chunk_size=500,
    chunk_overlap=50,
    split_strategy="recursive"
)
print(f"Generated {result.chunk_count} chunks")
```

## Best Practices

- Use `chunk_overlap` of 10-20% of `chunk_size` to maintain context across chunk boundaries.
- For code documentation, use `paragraph` or `character` strategy with `\n\n` separator.
- For conversational text, use `sentence` strategy to keep dialogue turns intact.
- Monitor chunk sizes — very small chunks lose context, very large chunks waste embedding space.
