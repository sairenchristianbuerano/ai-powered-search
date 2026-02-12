import { LocalIndex } from "vectra";
import * as path from "path";
import { DocumentChunk, SearchResult } from "./types";
import { generateEmbedding } from "./embeddings";

const INDEX_PATH = path.join(process.cwd(), "data", "vectorstore");

let index: LocalIndex | null = null;

async function getIndex(): Promise<LocalIndex> {
  if (!index) {
    index = new LocalIndex(INDEX_PATH);
    if (!(await index.isIndexCreated())) {
      await index.createIndex();
    }
  }
  return index;
}

export async function upsertChunk(chunk: DocumentChunk): Promise<void> {
  const idx = await getIndex();
  const vector = await generateEmbedding(chunk.text);

  await idx.upsertItem({
    id: chunk.id,
    vector,
    metadata: {
      chunkId: chunk.id,
      text: chunk.text,
      sourceFile: chunk.sourceFile,
      heading: chunk.heading,
    },
  });
}

export async function search(
  query: string,
  topK: number = 5
): Promise<SearchResult[]> {
  const idx = await getIndex();
  const queryVector = await generateEmbedding(query);
  const results = await idx.queryItems(queryVector, topK);

  return results.map((r) => ({
    chunk: {
      id: (r.item.metadata.chunkId as string) ?? "",
      text: r.item.metadata.text as string,
      sourceFile: r.item.metadata.sourceFile as string,
      heading: r.item.metadata.heading as string,
    },
    score: r.score,
  }));
}
