# Language Detector Component

Detects the language of input text. Returns language code, name, and confidence score. Supports over 50 languages.

## Overview

The Language Detector identifies the primary language of text input using statistical analysis. It can detect multiple languages in mixed-language text and supports both short snippets and long documents.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | Text to analyze |
| `detect_multiple` | `bool` | No | Detect all languages in mixed-language text (default: `false`) |
| `min_confidence` | `float` | No | Minimum confidence threshold (default: 0.5) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `language` | `string` | ISO 639-1 language code (e.g., `en`, `es`, `fr`, `ja`) |
| `language_name` | `string` | Full language name (e.g., `English`, `Spanish`) |
| `confidence` | `float` | Detection confidence (0.0 to 1.0) |
| `all_languages` | `list[dict]` | All detected languages with scores (if `detect_multiple` is true) |

## Usage Example

```python
from custom_components import LanguageDetectorComponent

detector = LanguageDetectorComponent()
result = detector.run(text="Bonjour, comment allez-vous?")
# result.language: "fr"
# result.language_name: "French"
# result.confidence: 0.98
```

## Common Use Cases

- Routing multilingual support tickets to language-appropriate agents
- Selecting the correct LLM prompt template based on input language
- Filtering non-English content in data processing pipelines
- Triggering automatic translation for non-native language inputs
