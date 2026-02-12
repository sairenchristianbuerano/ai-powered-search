import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { search } from "../lib/vectorstore";
import { askClaude, detectPlatform } from "../lib/claude";
import { SearchResponse } from "../lib/types";

const SCORE_THRESHOLD = 0.3;

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

function printResponse(res: SearchResponse): void {
  console.log("");
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
    console.log(
      `  Component Factory / Component Generator.\n`
    );
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
  }
}

async function handleQuery(question: string): Promise<void> {
  const totalFiles = getTotalMdFiles();
  const startTime = performance.now();

  // Check for platform mention
  const platform = detectPlatform(question);

  // Semantic search
  const results = await search(question, 10);
  const matchedFiles = deduplicateFiles(results);

  const searchTime = (performance.now() - startTime) / 1000;

  // No relevant results
  if (matchedFiles.length === 0) {
    const response: SearchResponse = {
      query: question,
      answer: "",
      files: [],
      fileCount: 0,
      totalFilesSearched: totalFiles,
      searchTimeSeconds: searchTime,
      isEmpty: true,
    };

    printResponse(response);

    if (platform) {
      console.log(
        `  Unfortunately, we don't have that component for now, but you can`
      );
      console.log(
        `  build a custom component in ${platform} using the Component Factory.\n`
      );
    }
    return;
  }

  // Filter chunks to only those above threshold for Claude context
  const relevantChunks = results.filter((r) => r.score >= SCORE_THRESHOLD);

  // Get AI answer
  let answer = "";
  try {
    answer = await askClaude(
      question,
      relevantChunks.map((r) => ({ ...r.chunk, score: r.score }))
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    answer = `[Claude API error: ${message}]`;
  }

  const totalTime = (performance.now() - startTime) / 1000;

  const response: SearchResponse = {
    query: question,
    answer,
    files: matchedFiles,
    fileCount: matchedFiles.length,
    totalFilesSearched: totalFiles,
    searchTimeSeconds: totalTime,
    isEmpty: false,
  };

  printResponse(response);

  if (platform) {
    console.log(
      `  Tip: If the above components don't match your needs, you can build`
    );
    console.log(
      `  a custom component in ${platform} using the Component Factory.\n`
    );
  }
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (prompt: string): Promise<string> =>
    new Promise((resolve) => rl.question(prompt, resolve));

  console.log("\n=== AI-Powered Search ===");
  console.log('Type your question and press Enter. Type "exit" to quit.\n');

  while (true) {
    const question = await ask("Question: ");

    if (
      question.toLowerCase() === "exit" ||
      question.toLowerCase() === "quit"
    ) {
      console.log("Goodbye!\n");
      break;
    }

    if (!question.trim()) continue;

    console.log("\nSearching...");
    await handleQuery(question);
  }

  rl.close();
}

main().catch(console.error);
