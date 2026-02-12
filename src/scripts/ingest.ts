import "dotenv/config";
import * as path from "path";
import { chunkAllMarkdownFiles } from "../lib/chunker";
import { upsertChunk } from "../lib/vectorstore";

async function main() {
  const docsDir = path.join(process.cwd(), "docs", "md");

  console.log(`\nReading markdown files from: ${docsDir}\n`);

  const chunks = chunkAllMarkdownFiles(docsDir);

  if (chunks.length === 0) {
    console.log("No markdown chunks found. Add .md files to docs/md/ and try again.");
    return;
  }

  // Group by file for display
  const byFile = new Map<string, number>();
  for (const chunk of chunks) {
    byFile.set(chunk.sourceFile, (byFile.get(chunk.sourceFile) ?? 0) + 1);
  }

  for (const [file, count] of byFile) {
    console.log(`  ${file}: ${count} chunks`);
  }

  console.log(`\nIngesting ${chunks.length} chunks into vector store...\n`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    process.stdout.write(`  [${i + 1}/${chunks.length}] ${chunk.id}\r`);
    await upsertChunk(chunk);
  }

  console.log(`\nDone! ${chunks.length} chunks ingested successfully.\n`);
}

main().catch(console.error);
