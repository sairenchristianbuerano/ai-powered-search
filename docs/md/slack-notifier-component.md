# Slack Notifier Component

Sends messages to Slack channels or users. Enables your flow to notify teams about results, errors, or completed tasks.

## Overview

The Slack Notifier posts messages to Slack using the Slack Web API. It supports plain text, rich Block Kit formatting, thread replies, and file attachments. Messages can be sent to channels, groups, or direct messages.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `string` | Yes | The message text to send |
| `channel` | `string` | Yes | Slack channel ID or name (e.g., `#general` or `C0123456`) |
| `bot_token` | `secret` | Yes | Slack Bot OAuth token (`xoxb-...`) |
| `blocks` | `list[dict]` | No | Slack Block Kit blocks for rich formatting |
| `thread_ts` | `string` | No | Thread timestamp to reply to an existing thread |
| `username` | `string` | No | Custom bot display name (default: bot name) |
| `icon_emoji` | `string` | No | Custom emoji for the bot avatar (e.g., `:robot_face:`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `message_ts` | `string` | Timestamp ID of the sent message |
| `channel_id` | `string` | Channel ID where the message was sent |
| `is_success` | `bool` | Whether the message was sent successfully |
| `error` | `string` | Error message if sending failed |

## Usage Example

```python
from custom_components import SlackNotifierComponent

slack = SlackNotifierComponent()
result = slack.run(
    message="RAG pipeline completed! Processed 150 documents with 98% success rate.",
    channel="#ai-pipeline-alerts",
    bot_token="xoxb-your-token"
)
```

## Common Use Cases

- Alerting teams when a document processing pipeline completes
- Sending error notifications when a flow fails
- Posting daily summaries of AI-generated reports
- Notifying reviewers when new content needs approval
