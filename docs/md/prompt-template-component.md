# Prompt Template Component

Constructs dynamic prompts by injecting variables into a template string. A foundational component for building LLM-powered flows with customizable instructions.

## Overview

The Prompt Template component uses Jinja2-style template syntax to create dynamic prompts. Variables are defined using `{{ variable_name }}` placeholders and are replaced at runtime with actual values from upstream components.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `template` | `text` | Yes | The prompt template with `{{ variable }}` placeholders |
| `variables` | `dict` | Yes | Key-value pairs mapping variable names to their values |
| `validate` | `bool` | No | Whether to validate all template variables are provided (default: `true`) |
| `default_values` | `dict` | No | Default values for optional template variables |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `prompt` | `string` | The rendered prompt with all variables replaced |
| `token_estimate` | `int` | Estimated token count of the rendered prompt |
| `variables_used` | `list[string]` | List of variable names that were injected |

## Usage Example

```python
from custom_components import PromptTemplateComponent

template_comp = PromptTemplateComponent()
result = template_comp.run(
    template="You are a {{ role }}. Answer the question based on the context.\n\nContext: {{ context }}\n\nQuestion: {{ question }}",
    variables={
        "role": "helpful assistant",
        "context": "Python is a programming language.",
        "question": "What is Python?"
    }
)
print(result.prompt)
```

## Template Syntax

### Basic Variable
```
Hello, {{ name }}!
```

### Conditional Block
```
{% if context %}
Use the following context: {{ context }}
{% else %}
Answer based on your knowledge.
{% endif %}
```

### Loop
```
Sources:
{% for source in sources %}
- {{ source.title }}: {{ source.url }}
{% endfor %}
```

## Common Use Cases

- Building system prompts with dynamic context injection
- Creating few-shot prompt templates with example slots
- Assembling multi-step chain-of-thought prompts
- Formatting RAG prompts with retrieved document chunks
