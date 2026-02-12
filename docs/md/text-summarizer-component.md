# Text Summarizer Component

Generates concise summaries of long text using LLMs. Supports multiple summarization strategies including extractive, abstractive, and map-reduce approaches.

## Overview

The Text Summarizer takes long-form content and produces a shorter summary while preserving key information. For documents that exceed the LLM context window, it uses a map-reduce strategy to summarize sections individually and then combine them.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | The text to summarize |
| `max_length` | `int` | No | Target summary length in words (default: 150) |
| `style` | `dropdown` | No | Summary style: `concise`, `detailed`, `bullet_points`, `executive` (default: `concise`) |
| `strategy` | `dropdown` | No | Strategy: `single_pass`, `map_reduce`, `refine` (default: `single_pass`) |
| `focus` | `string` | No | Specific aspect to focus the summary on |
| `model` | `string` | No | LLM model to use (default: `claude-sonnet-4-20250514`) |
| `api_key` | `secret` | Yes | API key for the LLM provider |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `summary` | `string` | The generated summary |
| `word_count` | `int` | Word count of the summary |
| `compression_ratio` | `float` | Ratio of summary length to original length |
| `key_points` | `list[string]` | Extracted key points (for `bullet_points` style) |

## Summarization Strategies

### Single Pass
Sends the entire text to the LLM in one call. Best for texts that fit within the context window.

### Map-Reduce
Splits the text into chunks, summarizes each chunk independently, then combines all chunk summaries into a final summary. Best for very long documents.

### Refine
Summarizes the first chunk, then iteratively refines the summary by incorporating each subsequent chunk. Produces more coherent summaries than map-reduce but is slower.

## Usage Example

```python
from custom_components import TextSummarizerComponent

summarizer = TextSummarizerComponent()
result = summarizer.run(
    text=long_article,
    style="bullet_points",
    max_length=100,
    focus="financial performance"
)
for point in result.key_points:
    print(f"• {point}")
```

## Common Use Cases

- Summarizing retrieved documents before sending to LLM to reduce token usage
- Generating executive summaries of reports
- Creating abstracts for research papers
- Condensing meeting transcripts into action items
