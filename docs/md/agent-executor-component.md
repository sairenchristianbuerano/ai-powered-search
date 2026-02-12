# Agent Executor Component

Runs an AI agent that can use tools, reason through multi-step tasks, and take actions. Enables autonomous task execution with configurable tool access and safety limits.

## Overview

The Agent Executor orchestrates an LLM agent that can reason, plan, and use tools to accomplish tasks. It implements a ReAct-style loop where the agent thinks, selects a tool, executes it, observes the result, and repeats until the task is complete.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `task` | `string` | Yes | The task or question for the agent |
| `tools` | `list[dict]` | Yes | Available tools with name, description, and function |
| `model` | `string` | No | LLM model for the agent (default: `claude-sonnet-4-20250514`) |
| `api_key` | `secret` | Yes | API key for the LLM provider |
| `max_iterations` | `int` | No | Maximum reasoning steps (default: 10) |
| `system_prompt` | `string` | No | Custom system prompt for the agent |
| `memory` | `list[dict]` | No | Previous conversation history |
| `verbose` | `bool` | No | Log each reasoning step (default: `false`) |
| `early_stop` | `bool` | No | Stop when the agent signals completion (default: `true`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `result` | `string` | Final answer from the agent |
| `steps` | `list[dict]` | All reasoning steps with thoughts, actions, and observations |
| `tools_used` | `list[string]` | Names of tools that were invoked |
| `iterations` | `int` | Number of reasoning iterations used |
| `status` | `string` | Completion status: `success`, `max_iterations_reached`, `error` |

## Tool Definition Format

```python
tools = [
    {
        "name": "search_docs",
        "description": "Search documentation for relevant information",
        "parameters": {
            "query": {"type": "string", "description": "Search query"}
        },
        "function": search_docs_fn
    },
    {
        "name": "calculator",
        "description": "Perform mathematical calculations",
        "parameters": {
            "expression": {"type": "string", "description": "Math expression to evaluate"}
        },
        "function": calculator_fn
    }
]
```

## Usage Example

```python
from custom_components import AgentExecutorComponent

agent = AgentExecutorComponent()
result = agent.run(
    task="Find the total API cost for processing 10,000 documents at $0.002 per 1K tokens, assuming 500 tokens per document",
    tools=[search_tool, calculator_tool],
    model="claude-sonnet-4-20250514",
    api_key="sk-ant-...",
    verbose=True
)
print(f"Answer: {result.result}")
print(f"Steps taken: {result.iterations}")
```

## Common Use Cases

- Building autonomous research assistants that search and synthesize information
- Creating task automation agents with access to APIs and databases
- Implementing multi-step reasoning for complex queries
- Building customer support agents with tool access (order lookup, ticket creation)
