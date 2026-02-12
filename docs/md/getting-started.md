# Getting Started

Welcome to our platform documentation. This guide will help you set up and start using the platform quickly.

## Installation

To install the platform, you need Node.js 18 or higher. Run the following command:

```bash
npm install @our-platform/sdk
```

After installation, import the SDK in your project:

```javascript
import { Platform } from '@our-platform/sdk';

const platform = new Platform({
  apiKey: 'your-api-key',
});
```

## Authentication

All API requests require authentication using an API key. You can generate an API key from your dashboard under **Settings > API Keys**.

There are two types of API keys:
- **Public keys**: Used for client-side operations (prefixed with `pk_`)
- **Secret keys**: Used for server-side operations (prefixed with `sk_`)

Never expose your secret key in client-side code.

## Creating Your First Project

1. Navigate to the Dashboard
2. Click **New Project**
3. Enter a project name and description
4. Select your preferred region (US, EU, or Asia)
5. Click **Create**

Your project will be ready in a few seconds. Each project gets a unique project ID that you'll use in API calls.

## Configuration Options

You can configure the SDK with the following options:

- `apiKey` (required): Your API key
- `region`: The region for your project (default: `us`)
- `timeout`: Request timeout in milliseconds (default: `30000`)
- `retries`: Number of retry attempts (default: `3`)
- `debug`: Enable debug logging (default: `false`)

```javascript
const platform = new Platform({
  apiKey: 'your-api-key',
  region: 'eu',
  timeout: 60000,
  debug: true,
});
```
