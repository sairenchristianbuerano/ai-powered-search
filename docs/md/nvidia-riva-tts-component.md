# NVIDIA Riva TTS Component

Converts text to natural-sounding speech using NVIDIA Riva Text-to-Speech. Generates audio output from text input with customizable voice, language, and speaking style.

## Overview

The NVIDIA Riva TTS component uses GPU-accelerated speech synthesis to generate high-quality audio from text. It supports multiple voices, languages, SSML markup for fine-grained control, and real-time streaming for low-latency applications.

## Prerequisites

- NVIDIA Riva server running (self-hosted or NVIDIA API Catalog)
- GPU with at least 4GB VRAM for self-hosted TTS deployment
- TTS models enabled in Riva configuration

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | Text to synthesize into speech |
| `voice` | `string` | No | Voice name (e.g., `English-US.Female-1`, `English-US.Male-1`) |
| `language_code` | `string` | No | Language code (default: `en-US`) |
| `riva_url` | `string` | Yes | Riva server gRPC endpoint |
| `sample_rate` | `int` | No | Audio sample rate in Hz (default: 22050) |
| `output_format` | `dropdown` | No | Output format: `wav`, `mp3`, `pcm` (default: `wav`) |
| `speaking_rate` | `float` | No | Speech speed multiplier 0.5-2.0 (default: 1.0) |
| `pitch` | `float` | No | Voice pitch adjustment -20 to 20 semitones (default: 0) |
| `ssml` | `bool` | No | Interpret input as SSML markup (default: `false`) |
| `api_key` | `secret` | No | NVIDIA API key (for hosted endpoints) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `audio` | `bytes` | Generated audio data |
| `audio_path` | `string` | Path to saved audio file |
| `duration_seconds` | `float` | Duration of generated audio |
| `sample_rate` | `int` | Audio sample rate used |

## SSML Example

```xml
<speak>
  Welcome to the <emphasis level="strong">AI-powered</emphasis> documentation search.
  <break time="500ms"/>
  Please ask your question after the tone.
</speak>
```

## Usage Example

```python
from custom_components import NvidiaRivaTTSComponent

tts = NvidiaRivaTTSComponent()
result = tts.run(
    text="The quarterly revenue increased by 15% compared to the previous quarter.",
    voice="English-US.Female-1",
    riva_url="localhost:50051",
    output_format="wav",
    speaking_rate=1.1
)
print(f"Generated {result.duration_seconds}s audio at {result.audio_path}")
```

## Common Use Cases

- Adding voice output to conversational AI applications
- Generating audio versions of AI-summarized content
- Building accessible interfaces with text-to-speech
- Creating automated phone system (IVR) responses
- Voice narration for generated reports or documentation
