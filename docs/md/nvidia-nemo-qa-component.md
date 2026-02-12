# NVIDIA NeMo QA Component

Performs extractive and generative question answering using NVIDIA NeMo models. Designed for high-accuracy QA over documents, knowledge bases, and structured data.

## Overview

The NVIDIA NeMo QA component leverages NeMo framework models for question answering tasks. It supports both extractive QA (finding exact answer spans in text) and generative QA (synthesizing answers using NeMo LLMs). Optimized for NVIDIA GPUs with TensorRT-LLM acceleration.

## Prerequisites

- NVIDIA NeMo framework installed (`pip install nemo_toolkit[all]`)
- NVIDIA Triton Inference Server (for production deployment)
- GPU with at least 16GB VRAM for generative QA models
- Pre-trained QA model from NVIDIA NGC catalog

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `question` | `string` | Yes | The question to answer |
| `context` | `string` or `list[string]` | Yes | Context passages to search for answers |
| `mode` | `dropdown` | No | QA mode: `extractive`, `generative` (default: `extractive`) |
| `model_path` | `string` | No | Path to NeMo QA model checkpoint |
| `triton_url` | `string` | No | Triton Inference Server URL (for deployed models) |
| `top_k` | `int` | No | Number of answer candidates to return (default: 3) |
| `max_answer_length` | `int` | No | Maximum answer length in tokens (default: 128) |
| `min_confidence` | `float` | No | Minimum confidence threshold (default: 0.1) |
| `use_tensorrt` | `bool` | No | Use TensorRT-LLM acceleration (default: `true`) |
| `batch_size` | `int` | No | Batch size for multi-context inference (default: 8) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `answer` | `string` | Best answer text |
| `answers` | `list[dict]` | Top-K answers with scores and source spans |
| `confidence` | `float` | Confidence score for the best answer |
| `source_context` | `string` | The context passage containing the answer |
| `start_position` | `int` | Character start position of the answer in context (extractive mode) |
| `end_position` | `int` | Character end position of the answer in context (extractive mode) |

## Extractive vs Generative QA

### Extractive QA
Finds the exact answer span within the provided context. Best for factual questions where the answer is stated verbatim in the text.

```
Context: "NVIDIA was founded in 1993 by Jensen Huang, Chris Malachowsky, and Curtis Priem."
Question: "When was NVIDIA founded?"
Answer: "1993" (extracted from position 25-29)
```

### Generative QA
Synthesizes a new answer based on the context using a NeMo LLM. Best for questions requiring reasoning, summarization, or inference.

```
Context: "Revenue was $10B in Q1 and $12B in Q2."
Question: "What was the revenue trend?"
Answer: "Revenue grew by 20% from $10B in Q1 to $12B in Q2, showing a positive trend."
```

## Usage Example

```python
from custom_components import NvidiaNenoQAComponent

qa = NvidiaNenoQAComponent()
result = qa.run(
    question="What GPU memory is required for deployment?",
    context=documentation_text,
    mode="extractive",
    top_k=3,
    min_confidence=0.5
)

print(f"Answer: {result.answer} (confidence: {result.confidence:.2f})")
for ans in result.answers:
    print(f"  - {ans['text']} (score: {ans['score']:.3f})")
```

## TensorRT-LLM Optimization

When `use_tensorrt=True`, the component compiles the model using TensorRT-LLM for significantly faster inference:

- **2-4x speedup** for extractive QA
- **3-8x speedup** for generative QA
- Lower GPU memory usage through INT8/FP8 quantization

## Deployment with Triton

```python
# Deploy model on Triton
result = qa.run(
    question="What are the system requirements?",
    context=docs,
    triton_url="http://triton-server:8000",
    mode="generative"
)
```

## Common Use Cases

- Building enterprise knowledge base Q&A systems
- Extracting specific facts from technical documentation
- Automating FAQ responses with high-accuracy answer extraction
- Research paper comprehension and fact verification
- Customer support automation with document-grounded answers
