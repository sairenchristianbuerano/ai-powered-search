import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { search } from "../lib/vectorstore";
import { askClaude, detectPlatform } from "../lib/claude";
import { SearchResponse } from "../lib/types";

const SCORE_THRESHOLD = 0.3;

const TEST_QUERIES = [
  // Component search queries
  "Calculator component",
  "Which components handle speech and audio?",
  "How do I add safety guardrails to my LLM?",
  "What NVIDIA components are available?",
  "I need to split a large document into smaller chunks",
  "How to send notifications to Slack or email?",
  "Which components can load data from files?",
  "How do I parse JSON output from an LLM?",
  "What is the reranker and how does it improve search?",
  "How to build a question answering system over documents?",
  // Platform detection queries (should suggest Component Factory)
  "I need a WhatsApp integration component for Langflow",
  "Build a Stripe payment component for Flowise",
  // Empty state query (unlikely to match anything well)
  "quantum entanglement simulation for particle physics",
];

function getTotalMdFiles(): number {
  const docsDir = path.join(process.cwd(), "docs", "md");
  return fs.readdirSync(docsDir).filter((f) => f.endsWith(".md")).length;
}

function deduplicateFiles(
  results: Awaited<ReturnType<typeof search>>
): string[] {
  const seen = new Set<string>();
  for (const r of results) {
    if (r.score >= SCORE_THRESHOLD) {
      seen.add(r.chunk.sourceFile);
    }
  }
  return Array.from(seen);
}

function printResponse(res: SearchResponse, platform: string | null): void {
  console.log(`──────────────────────────────────────────────────`);
  console.log(`  Search Time    : ${res.searchTimeSeconds.toFixed(2)}s`);
  console.log(`  Files Searched : ${res.totalFilesSearched} md files`);
  console.log(`  Files Returned : ${res.fileCount} md file(s)`);
  console.log(`──────────────────────────────────────────────────`);

  if (res.isEmpty) {
    console.log(`\n  No matching components found.\n`);
    console.log(
      `  Suggestion: You can build a custom component using the`
    );
    console.log(`  Component Factory / Component Generator.\n`);
    if (platform) {
      console.log(
        `  Unfortunately, we don't have that component for now, but you can`
      );
      console.log(
        `  build a custom component in ${platform} using the Component Factory.\n`
      );
    }
  } else {
    console.log(`\n  Matched Files:`);
    for (const file of res.files) {
      console.log(`    - ${file}`);
    }
    console.log(`\n  AI Answer:`);
    const indented = res.answer
      .split("\n")
      .map((line) => `    ${line}`)
      .join("\n");
    console.log(`${indented}\n`);
    if (platform) {
      console.log(
        `  Tip: If the above components don't match your needs, you can build`
      );
      console.log(
        `  a custom component in ${platform} using the Component Factory.\n`
      );
    }
  }
}

async function main() {
  const totalFiles = getTotalMdFiles();

  console.log("\n=== AI-Powered Search — Test Suite ===");
  console.log(`Total md files in docs/md/: ${totalFiles}`);
  console.log(`Running ${TEST_QUERIES.length} test queries...\n`);

  for (let i = 0; i < TEST_QUERIES.length; i++) {
    const query = TEST_QUERIES[i];
    console.log(
      `\n${"=".repeat(50)}\nTest ${i + 1}/${TEST_QUERIES.length}: "${query}"\n${"=".repeat(50)}`
    );

    const platform = detectPlatform(query);
    const startTime = performance.now();

    const results = await search(query, 10);
    const matchedFiles = deduplicateFiles(results);

    const searchTime = (performance.now() - startTime) / 1000;

    if (matchedFiles.length === 0) {
      printResponse(
        {
          query,
          answer: "",
          files: [],
          fileCount: 0,
          totalFilesSearched: totalFiles,
          searchTimeSeconds: searchTime,
          isEmpty: true,
        },
        platform
      );
      continue;
    }

    const relevantChunks = results.filter((r) => r.score >= SCORE_THRESHOLD);

    let answer = "";
    try {
      answer = await askClaude(
        query,
        relevantChunks.map((r) => ({ ...r.chunk, score: r.score }))
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      answer = `[Claude API error: ${message}]`;
    }

    const totalTime = (performance.now() - startTime) / 1000;

    printResponse(
      {
        query,
        answer,
        files: matchedFiles,
        fileCount: matchedFiles.length,
        totalFilesSearched: totalFiles,
        searchTimeSeconds: totalTime,
        isEmpty: false,
      },
      platform
    );
  }

  console.log("\n=== Test Suite Complete ===\n");
}

main().catch(console.error);
