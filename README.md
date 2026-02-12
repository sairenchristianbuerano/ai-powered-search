# AI-Powered Search

A lightweight AI-powered semantic search engine over markdown documentation files. Built with a RAG (Retrieval-Augmented Generation) pipeline that chunks markdown content, generates vector embeddings locally, and uses Claude AI to synthesize answers with source citations.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        INGESTION PIPELINE                       │
│                        (npm run ingest)                         │
│                                                                 │
│  ┌──────────┐    ┌──────────────┐    ┌───────────┐    ┌──────┐ │
│  │ docs/md/ │───▶│   Chunker    │───▶│ Embedding │───▶│Vectra│ │
│  │ *.md     │    │ Split by     │    │ Model     │    │Vector│ │
│  │ files    │    │ headings     │    │(MiniLM-L6)│    │Store │ │
│  └──────────┘    └──────────────┘    └───────────┘    └──────┘ │
│                                                          │      │
│                  Stored as: chunk text + embedding        │      │
│                  + metadata (source file, heading)        │      │
└──────────────────────────────────────────────────────────┼──────┘
                                                           │
                                              data/vectorstore/
                                                index.json
                                                           │
┌──────────────────────────────────────────────────────────┼──────┐
│                        SEARCH PIPELINE                   │      │
│                        (npm run search)                   │      │
│                                                          ▼      │
│  ┌──────────┐    ┌───────────┐    ┌──────┐    ┌──────────────┐ │
│  │  User    │───▶│ Embedding │───▶│Vectra│───▶│  Claude API  │ │
│  │ Question │    │ Model     │    │Top-K │    │  (Answer +   │ │
│  │          │    │(MiniLM-L6)│    │Search│    │   Sources)   │ │
│  └──────────┘    └───────────┘    └──────┘    └──────┬───────┘ │
│                                                       │         │
│  ┌────────────────────────────────────────────────────▼──────┐  │
│  │  Output: AI-generated answer with source file citations   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Component Overview

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Chunker** | Custom TypeScript | Splits `.md` files by headings (`#`, `##`, `###`) into searchable chunks |
| **Embeddings** | `@huggingface/transformers` (all-MiniLM-L6-v2) | Generates 384-dim vector embeddings locally — no external API needed |
| **Vector Store** | Vectra (LocalIndex) | Stores embeddings as JSON on disk, performs cosine similarity search |
| **LLM** | Claude Sonnet 4 via `@anthropic-ai/sdk` | Synthesizes natural language answers from retrieved context chunks |

## Tech Stack

- **Next.js + TypeScript** — Project foundation (future web UI ready)
- **Vectra** — Local vector database, no server required
- **@huggingface/transformers** — Local embedding model (all-MiniLM-L6-v2, ~23MB)
- **@anthropic-ai/sdk** — Claude Sonnet 4 (`claude-sonnet-4-20250514`) for answer generation
- **dotenv** — Environment variable management

## Project Structure

```
ai-powered-search/
├── docs/md/                     # Place your markdown files here
├── src/
│   ├── lib/
│   │   ├── types.ts             # Shared types (DocumentChunk, SearchResult)
│   │   ├── chunker.ts           # Markdown chunking by headings
│   │   ├── embeddings.ts        # Local embedding generation
│   │   ├── vectorstore.ts       # Vectra vector store wrapper
│   │   └── claude.ts            # Claude API wrapper
│   ├── scripts/
│   │   ├── ingest.ts            # CLI: ingest markdown files
│   │   └── search.ts            # CLI: interactive AI search
│   └── app/                     # Next.js app (future web UI)
├── data/vectorstore/            # Generated vector index (gitignored)
├── .env                         # API keys (gitignored)
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
git clone https://github.com/sairenchristianbuerano/ai-powered-search.git
cd ai-powered-search
npm install
```

### Configuration

Copy the example env file and add your API key:

```bash
cp .env.example .env
```

Then edit `.env` with your actual values:

```
ANTHROPIC_API_KEY=your-api-key-here
CLAUDE_MAX_TOKENS=2048
```

### Usage

#### 1. Add markdown files

Place your `.md` files in the `docs/md/` directory. Sample files are included to get started.

#### 2. Ingest documents

Parse, chunk, and embed your markdown files into the vector store:

```bash
npm run ingest
```

Output:
```
Reading markdown files from: .../docs/md

  api-reference.md: 12 chunks
  getting-started.md: 5 chunks

Ingesting 17 chunks into vector store...

Done! 17 chunks ingested successfully.
```

#### 3. Search with AI

Start the interactive search CLI:

```bash
npm run search
```

Then ask questions about your documentation:

```
=== AI-Powered Search ===
Type your question and press Enter. Type "exit" to quit.

Question: How do I authenticate API requests?

Searching...
Found 5 relevant chunks. Asking Claude...

--- Answer ---
API requests require authentication using an API key...

--- Sources ---
  - getting-started.md | ## Authentication (score: 0.842)
  - api-reference.md | ## Rate Limits (score: 0.654)
```

### Adding More Documents

1. Drop new `.md` files into `docs/md/`
2. Re-run `npm run ingest`
3. New content is immediately searchable

The ingestion script uses upsert — existing chunks are updated, not duplicated.

## How It Works

1. **Chunking** — Each markdown file is split into chunks at heading boundaries (`#`, `##`, `###`). Each chunk includes the heading and its content.

2. **Embedding** — Each chunk is converted into a 384-dimensional vector using the all-MiniLM-L6-v2 model, which runs locally via ONNX Runtime (no external API calls).

3. **Storage** — Vectors and metadata are stored in Vectra's local JSON-based index at `data/vectorstore/index.json`.

4. **Search** — When you ask a question, it's embedded using the same model, then compared against all stored chunks via cosine similarity. The top 5 most relevant chunks are retrieved.

5. **Answer Generation** — The retrieved chunks are sent as context to Claude Sonnet 4 (`claude-sonnet-4-20250514`) along with your question. Claude generates a natural language answer citing the source files.

## License

ISC
