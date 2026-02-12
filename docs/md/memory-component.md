# Memory Component

Maintains conversation history and context across multiple interactions. Enables stateful chatbots and multi-turn conversational flows.

## Overview

The Memory component stores and retrieves conversation messages, providing context window management for LLM interactions. It supports multiple storage backends and automatic summarization for long conversations.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `action` | `dropdown` | Yes | Operation: `add`, `get`, `clear`, `summarize` |
| `message` | `dict` | No | Message to add: `{"role": "user"|"assistant", "content": "..."}` |
| `session_id` | `string` | Yes | Unique session identifier for the conversation |
| `max_messages` | `int` | No | Maximum messages to retain (default: 50) |
| `max_tokens` | `int` | No | Maximum total tokens in memory (default: 4000) |
| `backend` | `dropdown` | No | Storage: `in_memory`, `redis`, `sqlite`, `file` (default: `in_memory`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `messages` | `list[dict]` | Current conversation history |
| `message_count` | `int` | Number of messages in memory |
| `token_count` | `int` | Estimated token count of all messages |
| `summary` | `string` | Conversation summary (when using `summarize` action) |

## Memory Strategies

### Sliding Window (Default)
Keeps the most recent N messages, dropping oldest messages first.

### Token Limit
Removes oldest messages when total token count exceeds `max_tokens`.

### Summarization
When the conversation exceeds limits, older messages are summarized into a single summary message, preserving key context while reducing token usage.

## Usage Example

```python
from custom_components import MemoryComponent

memory = MemoryComponent()

# Add a user message
memory.run(action="add", session_id="sess_123", message={"role": "user", "content": "What is Python?"})

# Add assistant response
memory.run(action="add", session_id="sess_123", message={"role": "assistant", "content": "Python is a programming language..."})

# Get full history
result = memory.run(action="get", session_id="sess_123")
print(result.messages)
```

## Common Use Cases

- Maintaining chat context in conversational AI applications
- Storing retrieval history for follow-up questions
- Building agents that remember previous tool calls and results
- Implementing session-based personalization
