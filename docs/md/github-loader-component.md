# GitHub Loader Component

Loads content from GitHub repositories including files, directories, issues, and pull requests. Enables flows to process code, documentation, and project data directly from GitHub.

## Overview

The GitHub Loader connects to the GitHub API and retrieves content from repositories. It supports loading individual files, entire directories, README files, issues, pull requests, and commit history.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repo` | `string` | Yes | Repository in `owner/repo` format (e.g., `langflow-ai/langflow`) |
| `content_type` | `dropdown` | Yes | What to load: `file`, `directory`, `readme`, `issues`, `pull_requests`, `commits` |
| `path` | `string` | No | File or directory path within the repo (for `file`/`directory` types) |
| `branch` | `string` | No | Branch name (default: `main`) |
| `github_token` | `secret` | No | GitHub Personal Access Token (required for private repos, increases rate limits) |
| `file_filter` | `string` | No | Glob pattern to filter files (e.g., `*.md`, `src/**/*.py`) |
| `max_items` | `int` | No | Maximum items to load for issues/PRs/commits (default: 50) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `content` | `string` or `list[dict]` | Loaded content (text for files, list for issues/PRs) |
| `files` | `list[dict]` | File metadata including path, size, and content |
| `metadata` | `dict` | Repository metadata (stars, language, last updated) |

## Usage Example

```python
from custom_components import GitHubLoaderComponent

loader = GitHubLoaderComponent()
result = loader.run(
    repo="langflow-ai/langflow",
    content_type="directory",
    path="docs",
    file_filter="*.md",
    github_token="ghp_..."
)
print(f"Loaded {len(result.files)} markdown files from docs/")
```

## Common Use Cases

- Loading documentation from GitHub repos for knowledge base creation
- Ingesting code files for AI-powered code review
- Monitoring issues and PRs for automated triage
- Building datasets from open-source repositories
