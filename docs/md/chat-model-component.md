# Chat Model Component

Sends messages to an LLM and returns the generated response. The core component for any conversational or text generation flow.

## Overview

The Chat Model component provides a unified interface for interacting with large language models from multiple providers including OpenAI, Anthropic, Google, and local models via Ollama. It handles message formatting, streaming, and token management.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messages` | `list[dict]` | Yes | Chat messages in `[{"role": "user", "content": "..."}]` format |
| `model` | `dropdown` | Yes | Model identifier (e.g., `gpt-4o`, `claude-sonnet-4-20250514`, `gemini-pro`) |
| `provider` | `dropdown` | Yes | Provider: `openai`, `anthropic`, `google`, `ollama` |
| `api_key` | `secret` | Yes | API key for the selected provider |
| `temperature` | `float` | No | Sampling temperature 0.0-2.0 (default: 0.7) |
| `max_tokens` | `int` | No | Maximum tokens in the response (default: 1024) |
| `system_message` | `string` | No | System prompt to prepend to messages |
| `stream` | `bool` | No | Whether to stream the response (default: `false`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `response` | `string` | The generated text response |
| `usage` | `dict` | Token usage: `prompt_tokens`, `completion_tokens`, `total_tokens` |
| `model` | `string` | The model that was actually used |
| `finish_reason` | `string` | Why generation stopped: `stop`, `length`, `tool_use` |

## Usage Example

```python
from custom_components import ChatModelComponent

chat = ChatModelComponent()
result = chat.run(
    provider="anthropic",
    model="claude-sonnet-4-20250514",
    api_key="sk-ant-...",
    system_message="You are a helpful coding assistant.",
    messages=[{"role": "user", "content": "Explain Python decorators"}],
    temperature=0.3
)
print(result.response)
```

## Common Use Cases

- Generating answers from retrieved context in RAG pipelines
- Powering conversational chatbot interfaces
- Text summarization and transformation tasks
- Code generation and explanation
