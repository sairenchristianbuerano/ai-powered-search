# Text Translator Component

Translates text between languages using LLMs or dedicated translation APIs. Supports over 100 language pairs with context-aware translation.

## Overview

The Text Translator converts text from a source language to a target language. It can use LLMs for high-quality, context-aware translations or dedicated APIs (Google Translate, DeepL) for faster, cost-effective translations.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | Text to translate |
| `target_language` | `string` | Yes | Target language code (e.g., `en`, `es`, `fr`, `ja`) |
| `source_language` | `string` | No | Source language code (auto-detected if not provided) |
| `provider` | `dropdown` | No | Translation provider: `llm`, `google`, `deepl` (default: `llm`) |
| `model` | `string` | No | LLM model (when using `llm` provider) |
| `api_key` | `secret` | Yes | API key for the selected provider |
| `preserve_formatting` | `bool` | No | Maintain original formatting (markdown, HTML) (default: `true`) |
| `context` | `string` | No | Additional context for more accurate translation |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `translated_text` | `string` | The translated text |
| `source_language` | `string` | Detected or provided source language |
| `provider_used` | `string` | Which translation provider was used |

## Usage Example

```python
from custom_components import TextTranslatorComponent

translator = TextTranslatorComponent()
result = translator.run(
    text="How do I reset my password?",
    target_language="ja",
    provider="llm",
    model="claude-sonnet-4-20250514",
    api_key="sk-ant-...",
    context="Customer support FAQ for a SaaS product"
)
print(result.translated_text)
```

## Common Use Cases

- Translating documentation for international audiences
- Multilingual chatbot responses
- Localizing AI-generated content for different markets
- Translating user queries before processing in English-optimized pipelines
