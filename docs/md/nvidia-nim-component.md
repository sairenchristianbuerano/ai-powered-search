# NVIDIA NIM Component

Runs inference on NVIDIA NIM (NVIDIA Inference Microservices) endpoints. Access pre-optimized LLMs, vision models, and embedding models through a standardized API.

## Overview

The NVIDIA NIM component connects to NIM endpoints — containerized, GPU-accelerated AI model microservices. NIM provides pre-optimized models from the NVIDIA NGC catalog with built-in TensorRT-LLM acceleration, making deployment and inference straightforward.

## Prerequisites

- NVIDIA NIM endpoint running (self-hosted container or NVIDIA API Catalog)
- For self-hosted: NVIDIA GPU with appropriate VRAM for the model
- NVIDIA API key (for NVIDIA API Catalog hosted endpoints)

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `prompt` | `string` or `list[dict]` | Yes | Text prompt or chat messages |
| `nim_url` | `string` | Yes | NIM endpoint URL (e.g., `http://localhost:8000/v1` or `https://integrate.api.nvidia.com/v1`) |
| `model` | `string` | Yes | Model name (e.g., `meta/llama-3.1-70b-instruct`, `nvidia/nv-embedqa-e5-v5`) |
| `api_key` | `secret` | No | NVIDIA API key (required for hosted endpoints) |
| `task` | `dropdown` | No | Task type: `chat`, `completion`, `embedding` (default: `chat`) |
| `temperature` | `float` | No | Sampling temperature (default: 0.7) |
| `max_tokens` | `int` | No | Maximum response tokens (default: 1024) |
| `top_p` | `float` | No | Nucleus sampling parameter (default: 0.9) |
| `stream` | `bool` | No | Stream the response (default: `false`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `response` | `string` | Generated text response |
| `embeddings` | `list[list[float]]` | Embedding vectors (for embedding task) |
| `usage` | `dict` | Token usage: `prompt_tokens`, `completion_tokens` |
| `model` | `string` | Model used for inference |

## Usage Example

```python
from custom_components import NvidiaNIMComponent

nim = NvidiaNIMComponent()
result = nim.run(
    prompt=[{"role": "user", "content": "Explain GPU acceleration for AI inference"}],
    nim_url="https://integrate.api.nvidia.com/v1",
    model="meta/llama-3.1-70b-instruct",
    api_key="nvapi-...",
    task="chat",
    temperature=0.3
)
print(result.response)
```

## Self-Hosted Deployment

```bash
docker run -d --gpus all \
  -p 8000:8000 \
  -e NGC_API_KEY=$NGC_API_KEY \
  nvcr.io/nim/meta/llama-3.1-70b-instruct:latest
```

## Common Use Cases

- Running LLM inference with NVIDIA-optimized models on your own GPUs
- Using NVIDIA API Catalog for cloud-hosted model access
- Building GPU-accelerated RAG pipelines with NIM embeddings
- Deploying enterprise AI applications with NVIDIA-supported models
