# Web Scraper Component

Fetches and extracts content from web pages. Converts HTML to clean text or markdown for downstream processing in AI pipelines.

## Overview

The Web Scraper component downloads web pages and extracts their main content, stripping away navigation, ads, and boilerplate HTML. It uses smart content detection to identify the primary article or page body.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | `string` | Yes | The URL to scrape |
| `urls` | `list[string]` | No | Multiple URLs to scrape in batch |
| `output_format` | `dropdown` | No | Output format: `text`, `markdown`, `html` (default: `markdown`) |
| `include_links` | `bool` | No | Preserve hyperlinks in output (default: `true`) |
| `include_images` | `bool` | No | Include image alt text and URLs (default: `false`) |
| `timeout` | `int` | No | Request timeout in seconds (default: 30) |
| `headers` | `dict` | No | Custom HTTP headers for the request |
| `wait_for_js` | `bool` | No | Wait for JavaScript rendering (default: `false`) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `content` | `string` | Extracted page content |
| `title` | `string` | Page title |
| `metadata` | `dict` | Page metadata (description, author, publish date) |
| `links` | `list[string]` | All links found on the page |
| `status_code` | `int` | HTTP response status code |

## Usage Example

```python
from custom_components import WebScraperComponent

scraper = WebScraperComponent()
result = scraper.run(
    url="https://docs.example.com/getting-started",
    output_format="markdown",
    include_links=True
)
print(result.title)
print(result.content[:500])
```

## JavaScript Rendering

Set `wait_for_js=True` for single-page applications (SPAs) that render content via JavaScript. This uses a headless browser and is slower than standard HTTP requests.

## Common Use Cases

- Scraping documentation sites for knowledge base ingestion
- Extracting blog posts for content summarization
- Building web-based datasets for training or evaluation
- Monitoring competitor pages for content changes
