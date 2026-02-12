# Image Analyzer Component

Analyzes images using multimodal AI models. Extracts descriptions, detects objects, reads text (OCR), and answers questions about image content.

## Overview

The Image Analyzer sends images to a multimodal LLM (GPT-4 Vision, Claude Vision, or Gemini) for analysis. It can describe images, extract text, identify objects, and answer specific questions about visual content.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `image` | `file` or `string` | Yes | Image file path, URL, or base64 encoded string |
| `prompt` | `string` | No | Specific question or instruction about the image (default: "Describe this image") |
| `model` | `dropdown` | No | Vision model: `gpt-4o`, `claude-sonnet-4-20250514`, `gemini-pro-vision` (default: `gpt-4o`) |
| `provider` | `dropdown` | Yes | Provider: `openai`, `anthropic`, `google` |
| `api_key` | `secret` | Yes | API key for the selected provider |
| `detail` | `dropdown` | No | Image detail level: `auto`, `low`, `high` (default: `auto`) |
| `max_tokens` | `int` | No | Maximum tokens in the response (default: 500) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `description` | `string` | AI-generated analysis of the image |
| `extracted_text` | `string` | Any text detected in the image (if applicable) |
| `usage` | `dict` | Token usage details |

## Usage Example

```python
from custom_components import ImageAnalyzerComponent

analyzer = ImageAnalyzerComponent()
result = analyzer.run(
    image="screenshots/dashboard.png",
    prompt="What data is shown in this chart? Extract all numbers and labels.",
    model="gpt-4o",
    provider="openai",
    api_key="sk-..."
)
print(result.description)
```

## Common Use Cases

- Extracting data from charts and graphs in documents
- Reading text from screenshots or scanned images
- Generating alt text for accessibility
- Analyzing product images for catalog metadata
- Validating visual design against specifications
