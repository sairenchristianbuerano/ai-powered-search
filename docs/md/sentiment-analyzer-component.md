# Sentiment Analyzer Component

Analyzes the sentiment and emotional tone of text. Returns sentiment classification, confidence scores, and emotion detection.

## Overview

The Sentiment Analyzer uses an LLM to classify text sentiment as positive, negative, neutral, or mixed. It provides confidence scores and can detect specific emotions like joy, anger, sadness, fear, and surprise.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | The text to analyze |
| `granularity` | `dropdown` | No | Analysis level: `document`, `sentence`, `aspect` (default: `document`) |
| `detect_emotions` | `bool` | No | Also detect specific emotions (default: `false`) |
| `aspects` | `list[string]` | No | Specific aspects to analyze sentiment for (e.g., `["price", "quality", "support"]`) |
| `model` | `string` | No | LLM model to use for analysis |
| `api_key` | `secret` | Yes | API key for the LLM provider |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `sentiment` | `string` | Overall sentiment: `positive`, `negative`, `neutral`, `mixed` |
| `score` | `float` | Sentiment score from -1.0 (very negative) to 1.0 (very positive) |
| `confidence` | `float` | Confidence in the classification (0.0 to 1.0) |
| `emotions` | `dict` | Emotion scores (if `detect_emotions` is enabled) |
| `aspect_sentiments` | `list[dict]` | Per-aspect sentiment (if `aspects` provided) |

## Usage Example

```python
from custom_components import SentimentAnalyzerComponent

analyzer = SentimentAnalyzerComponent()
result = analyzer.run(
    text="The product is great but shipping was terrible and took 3 weeks.",
    granularity="aspect",
    aspects=["product", "shipping"],
    detect_emotions=True
)
# result.sentiment: "mixed"
# result.aspect_sentiments: [
#   {"aspect": "product", "sentiment": "positive", "score": 0.8},
#   {"aspect": "shipping", "sentiment": "negative", "score": -0.7}
# ]
```

## Common Use Cases

- Analyzing customer reviews for product feedback
- Monitoring support ticket sentiment for escalation
- Classifying social media mentions by brand sentiment
- Scoring NPS survey responses automatically
