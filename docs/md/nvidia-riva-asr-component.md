# NVIDIA Riva ASR Component

Performs automatic speech recognition (ASR) using NVIDIA Riva. Converts audio to text with high accuracy and low latency, supporting real-time streaming and batch transcription.

## Overview

The NVIDIA Riva ASR component leverages NVIDIA's GPU-accelerated speech recognition pipeline to transcribe audio into text. Built on NVIDIA Riva AI Services, it supports over 20 languages, real-time streaming, word-level timestamps, punctuation restoration, and speaker diarization.

## Prerequisites

- NVIDIA Riva server running (self-hosted or NVIDIA API Catalog)
- GPU with at least 8GB VRAM for self-hosted deployment
- Riva Quick Start scripts for local setup: `ngc registry resource download-version nvidia/riva/riva_quickstart`

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `audio` | `file` or `bytes` | Yes | Audio input (WAV, MP3, FLAC, OGG, or raw PCM) |
| `language_code` | `string` | No | Language code: `en-US`, `es-ES`, `fr-FR`, `de-DE`, `ja-JP`, etc. (default: `en-US`) |
| `riva_url` | `string` | Yes | Riva server gRPC endpoint (e.g., `localhost:50051`) |
| `mode` | `dropdown` | No | Recognition mode: `batch`, `streaming` (default: `batch`) |
| `enable_punctuation` | `bool` | No | Auto-add punctuation to transcript (default: `true`) |
| `enable_diarization` | `bool` | No | Identify different speakers (default: `false`) |
| `max_speakers` | `int` | No | Maximum speakers for diarization (default: 4) |
| `word_timestamps` | `bool` | No | Include per-word timing information (default: `false`) |
| `model_name` | `string` | No | Specific Riva ASR model to use (default: server default) |
| `api_key` | `secret` | No | NVIDIA API key (for NVIDIA API Catalog hosted endpoint) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `transcript` | `string` | Full transcribed text |
| `words` | `list[dict]` | Word-level details with timestamps and confidence |
| `speakers` | `list[dict]` | Speaker segments (if diarization enabled) |
| `confidence` | `float` | Overall transcription confidence score |
| `language` | `string` | Detected or specified language |
| `duration_seconds` | `float` | Audio duration in seconds |

## Usage Example

```python
from custom_components import NvidiaRivaASRComponent

asr = NvidiaRivaASRComponent()
result = asr.run(
    audio="recordings/meeting.wav",
    riva_url="localhost:50051",
    language_code="en-US",
    enable_punctuation=True,
    enable_diarization=True,
    word_timestamps=True
)
print(f"Transcript ({result.duration_seconds}s):")
print(result.transcript)
for speaker in result.speakers:
    print(f"  Speaker {speaker['id']}: {speaker['text']}")
```

## Streaming Mode

For real-time transcription, use `mode="streaming"`:

```python
async for partial in asr.stream(audio_stream, riva_url="localhost:50051"):
    print(f"Partial: {partial.transcript}", end="\r")
```

Streaming mode provides interim results that update as more audio is received, enabling live transcription UIs.

## Self-Hosted Deployment

```bash
# Download Riva Quick Start
ngc registry resource download-version nvidia/riva/riva_quickstart:2.18.0

# Configure and start Riva
cd riva_quickstart
bash riva_init.sh
bash riva_start.sh
```

## Common Use Cases

- Transcribing customer support calls for analysis
- Building voice-powered search interfaces
- Converting meeting recordings to searchable text
- Real-time captioning for live events
- Voice input for conversational AI agents
