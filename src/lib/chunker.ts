import * as fs from "fs";
import * as path from "path";
import { DocumentChunk } from "./types";

export function chunkMarkdownFile(filePath: string): DocumentChunk[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const fileName = path.basename(filePath);
  const lines = content.split("\n");
  const chunks: DocumentChunk[] = [];

  let currentHeading = "(intro)";
  let currentLines: string[] = [];

  function flush() {
    const text = currentLines.join("\n").trim();
    if (text.length < 50) {
      currentLines = [];
      return;
    }

    const slug = currentHeading
      .replace(/^#+\s*/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    chunks.push({
      id: `${fileName}#${slug}`,
      text: `${currentHeading}\n\n${text}`,
      sourceFile: fileName,
      heading: currentHeading,
    });

    currentLines = [];
  }

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (headingMatch) {
      flush();
      currentHeading = line;
    } else {
      currentLines.push(line);
    }
  }
  flush();

  return chunks;
}

export function chunkAllMarkdownFiles(docsDir: string): DocumentChunk[] {
  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md"));
  const allChunks: DocumentChunk[] = [];

  for (const file of files) {
    const filePath = path.join(docsDir, file);
    const chunks = chunkMarkdownFile(filePath);
    allChunks.push(...chunks);
  }

  return allChunks;
}
